package migrations

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	upMarker   = "-- +goose Up"
	downMarker = "-- +goose Down"
)

const createMigrationsTable = "CREATE TABLE IF NOT EXISTS schema_migrations (" +
	"version text PRIMARY KEY, " +
	"applied_at timestamptz NOT NULL DEFAULT now()" +
	")"

func Run(ctx context.Context, databaseURL string, directory string) error {
	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return err
	}

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return err
	}
	defer pool.Close()

	if err := pool.Ping(ctx); err != nil {
		return err
	}
	if _, err := pool.Exec(ctx, createMigrationsTable); err != nil {
		return err
	}

	entries, err := os.ReadDir(directory)
	if err != nil {
		return err
	}
	files := make([]string, 0, len(entries))
	for _, entry := range entries {
		if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".sql") {
			files = append(files, entry.Name())
		}
	}
	sort.Strings(files)

	for _, filename := range files {
		version := strings.TrimSuffix(filename, ".sql")
		var applied bool
		if err := pool.QueryRow(ctx, "SELECT EXISTS (SELECT 1 FROM schema_migrations WHERE version = $1)", version).Scan(&applied); err != nil {
			return err
		}
		if applied {
			continue
		}

		contents, err := os.ReadFile(filepath.Join(directory, filename))
		if err != nil {
			return err
		}
		upSQL, err := extractUpSQL(string(contents))
		if err != nil {
			return fmt.Errorf("migration %s: %w", filename, err)
		}

		tx, err := pool.Begin(ctx)
		if err != nil {
			return err
		}
		if _, err := tx.Exec(ctx, upSQL); err != nil {
			_ = tx.Rollback(ctx)
			return fmt.Errorf("migration %s: %w", filename, err)
		}
		if _, err := tx.Exec(ctx, "INSERT INTO schema_migrations (version) VALUES ($1)", version); err != nil {
			_ = tx.Rollback(ctx)
			return err
		}
		if err := tx.Commit(ctx); err != nil {
			return err
		}
	}

	return nil
}

func extractUpSQL(contents string) (string, error) {
	upIndex := strings.Index(contents, upMarker)
	if upIndex == -1 {
		return "", fmt.Errorf("missing %s marker", upMarker)
	}

	start := upIndex + len(upMarker)
	end := strings.Index(contents[start:], downMarker)
	if end == -1 {
		return strings.TrimSpace(contents[start:]), nil
	}

	return strings.TrimSpace(contents[start : start+end]), nil
}
