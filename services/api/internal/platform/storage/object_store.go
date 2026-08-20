package storage

import (
	"context"
	"fmt"
	"io"
	"time"
)

type ObjectStore interface {
	Put(context.Context, string, io.Reader, string) error
	Delete(context.Context, string) error
	PresignPut(context.Context, string, string, time.Duration) (string, error)
}

type DisabledObjectStore struct{}

func (DisabledObjectStore) Put(context.Context, string, io.Reader, string) error {
	return fmt.Errorf("object storage is not configured")
}

func (DisabledObjectStore) Delete(context.Context, string) error {
	return fmt.Errorf("object storage is not configured")
}

func (DisabledObjectStore) PresignPut(context.Context, string, string, time.Duration) (string, error) {
	return "", fmt.Errorf("object storage is not configured")
}
