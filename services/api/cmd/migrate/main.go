package main

import (
	"context"
	"log/slog"
	"os"
	"time"

	"naira/services/api/internal/platform/config"
	"naira/services/api/internal/platform/migrations"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		slog.Error("migration configuration failed", "error", err)
		os.Exit(1)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := migrations.Run(ctx, cfg.DatabaseURL, "migrations"); err != nil {
		slog.Error("migration failed", "error", err)
		os.Exit(1)
	}

	slog.Info("migrations applied")
}
