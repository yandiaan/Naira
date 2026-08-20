package postgres

import (
	"context"

	"naira/services/api/internal/platform/health"
)

func HealthChecker(pool *Pool) health.Checker {
	return health.CheckFunc{
		CheckName: "postgres",
		CheckFn: func(ctx context.Context) error {
			return pool.Ping(ctx)
		},
	}
}
