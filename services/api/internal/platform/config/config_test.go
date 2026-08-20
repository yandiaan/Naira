package config

import "testing"

func TestLoadRejectsMissingEnvironment(t *testing.T) {
	t.Setenv("APP_ENV", "")

	if _, err := Load(); err == nil {
		t.Fatal("Load() expected an error when APP_ENV is missing")
	}
}

func TestLoadUsesLocalDefaults(t *testing.T) {
	t.Setenv("APP_ENV", "local")
	t.Setenv("HTTP_ADDRESS", "")
	t.Setenv("DATABASE_URL", "")
	t.Setenv("REDIS_URL", "")

	cfg, err := Load()
	if err != nil {
		t.Fatalf("Load() returned error: %v", err)
	}

	if cfg.HTTPAddress != ":8080" {
		t.Fatalf("HTTPAddress = %q, want :8080", cfg.HTTPAddress)
	}
	if cfg.DatabaseURL == "" || cfg.RedisURL == "" {
		t.Fatal("local defaults should include database and Redis URLs")
	}
}

func TestLoadRequiresDependenciesOutsideLocalEnvironment(t *testing.T) {
	t.Setenv("APP_ENV", "production")
	t.Setenv("DATABASE_URL", "")
	t.Setenv("REDIS_URL", "")

	if _, err := Load(); err == nil {
		t.Fatal("Load() expected an error when production dependencies are missing")
	}
}
