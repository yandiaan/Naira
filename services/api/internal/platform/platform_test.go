package platform_test

import (
	"context"
	"io"
	"strings"
	"testing"
	"time"

	redisplatform "naira/services/api/internal/platform/redis"
	"naira/services/api/internal/platform/storage"
)

func TestRedisKeyUsesNamespace(t *testing.T) {
	if actual := redisplatform.NamespacedKey("cache", "trip:1"); actual != "naira:cache:trip:1" {
		t.Fatalf("NamespacedKey() = %q, want naira:cache:trip:1", actual)
	}
}

func TestDisabledObjectStoreReturnsDependencyError(t *testing.T) {
	store := storage.DisabledObjectStore{}
	err := store.Put(context.Background(), "file.txt", io.Reader(strings.NewReader("")), "text/plain")
	if err == nil {
		t.Fatal("Put() expected a dependency error")
	}

	if _, err := store.PresignPut(context.Background(), "file.txt", "text/plain", time.Minute); err == nil {
		t.Fatal("PresignPut() expected a dependency error")
	}
}
