package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"naira/services/api/internal/platform/config"
	"naira/services/api/internal/platform/jobs"
	redisplatform "naira/services/api/internal/platform/redis"
)

func main() {
	if err := run(); err != nil {
		slog.Error("worker stopped", "error", err)
		os.Exit(1)
	}
}

func run() error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	redisClient, err := redisplatform.New(cfg.RedisURL)
	if err != nil {
		return err
	}
	defer redisClient.Close()

	queue := jobs.NewRedisQueue(redisClient, "default")
	worker := jobs.NewWorker(queue, func(_ context.Context, job jobs.Job) error {
		slog.Info("foundation worker consumed job", "jobId", job.ID, "jobName", job.Name)
		return nil
	}, 3)
	supervisor := jobs.NewSupervisor(worker)
	supervisor.Start(ctx)
	slog.Info("worker started", "environment", cfg.AppEnv)

	<-ctx.Done()
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := supervisor.Shutdown(shutdownCtx); err != nil {
		return err
	}
	slog.Info("worker stopped")

	return nil
}
