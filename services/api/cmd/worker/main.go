package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"naira/services/api/internal/platform/config"
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

	slog.Info("worker started", "environment", cfg.AppEnv)
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	<-ctx.Done()
	slog.Info("worker stopped")

	return nil
}
