package storage

import (
	"context"
	"fmt"

	"naira/services/api/internal/platform/health"
)

type healthStore interface {
	Ping(context.Context) error
}

func HealthChecker(store healthStore) health.Checker {
	return health.CheckFunc{
		CheckName: "object-storage",
		CheckFn: func(ctx context.Context) error {
			if err := store.Ping(ctx); err != nil {
				return err
			}
			return nil
		},
	}
}

type disabledHealthStore struct{}

func (disabledHealthStore) Ping(context.Context) error {
	return fmt.Errorf("object storage is not configured")
}

func DisabledHealthChecker() health.Checker {
	return HealthChecker(disabledHealthStore{})
}
