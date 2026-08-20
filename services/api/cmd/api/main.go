package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"naira/services/api/internal/platform/buildinfo"
	"naira/services/api/internal/platform/config"
	"naira/services/api/internal/platform/health"
	postgresplatform "naira/services/api/internal/platform/postgres"
	redisplatform "naira/services/api/internal/platform/redis"
	"naira/services/api/internal/transport/httpx"
)

func main() {
	if err := run(); err != nil {
		slog.Error("api stopped", "error", err)
		os.Exit(1)
	}
}

func run() error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}

	bootstrapCtx, cancelBootstrap := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelBootstrap()

	postgresPool, err := postgresplatform.New(bootstrapCtx, cfg.DatabaseURL)
	if err != nil {
		return err
	}
	defer postgresPool.Close()

	redisClient, err := redisplatform.New(cfg.RedisURL)
	if err != nil {
		return err
	}
	defer redisClient.Close()

	checkers := []health.Checker{
		postgresplatform.HealthChecker(postgresPool),
		redisplatform.HealthChecker(redisClient),
	}

	server := &http.Server{
		Addr:              cfg.HTTPAddress,
		Handler:           httpx.NewRouter(buildinfo.Default(), checkers),
		ReadHeaderTimeout: 5 * time.Second,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	serverErr := make(chan error, 1)
	go func() {
		serverErr <- server.ListenAndServe()
	}()

	select {
	case err := <-serverErr:
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		return server.Shutdown(shutdownCtx)
	}
}
