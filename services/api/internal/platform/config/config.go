package config

import (
	"fmt"
	"os"
	"strings"
)

type Config struct {
	AppEnv                 string
	HTTPAddress            string
	DatabaseURL            string
	RedisURL               string
	ObjectStorageEndpoint  string
	ObjectStorageAccessKey string
	ObjectStorageSecretKey string
	CORSOrigins            []string
	LogLevel               string
}

func Load() (Config, error) {
	appEnv := strings.TrimSpace(os.Getenv("APP_ENV"))
	if appEnv == "" {
		return Config{}, fmt.Errorf("APP_ENV is required")
	}

	localDefaults := appEnv == "local" || appEnv == "test"
	cfg := Config{
		AppEnv:                 appEnv,
		HTTPAddress:            valueOrDefault("HTTP_ADDRESS", ":8080"),
		DatabaseURL:            valueOrDefault("DATABASE_URL", "postgres://naira:naira@localhost:5432/naira?sslmode=disable"),
		RedisURL:               valueOrDefault("REDIS_URL", "redis://localhost:6379/0"),
		ObjectStorageEndpoint:  valueOrDefault("OBJECT_STORAGE_ENDPOINT", "http://localhost:9000"),
		ObjectStorageAccessKey: os.Getenv("OBJECT_STORAGE_ACCESS_KEY"),
		ObjectStorageSecretKey: os.Getenv("OBJECT_STORAGE_SECRET_KEY"),
		CORSOrigins:            splitCSV(valueOrDefault("CORS_ORIGINS", "http://localhost:4322,http://localhost:5174")),
		LogLevel:               valueOrDefault("LOG_LEVEL", "info"),
	}

	if !localDefaults {
		if strings.TrimSpace(os.Getenv("DATABASE_URL")) == "" {
			return Config{}, fmt.Errorf("DATABASE_URL is required outside local and test environments")
		}
		if strings.TrimSpace(os.Getenv("REDIS_URL")) == "" {
			return Config{}, fmt.Errorf("REDIS_URL is required outside local and test environments")
		}
	}

	return cfg, nil
}

func valueOrDefault(key string, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		return value
	}

	return fallback
}

func splitCSV(value string) []string {
	values := strings.Split(value, ",")
	result := make([]string, 0, len(values))

	for _, item := range values {
		if trimmed := strings.TrimSpace(item); trimmed != "" {
			result = append(result, trimmed)
		}
	}

	return result
}
