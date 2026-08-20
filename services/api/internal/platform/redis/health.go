package redis

import (
	"context"

	"naira/services/api/internal/platform/health"
)

func HealthChecker(client *Client) health.Checker {
	return health.CheckFunc{
		CheckName: "redis",
		CheckFn: func(ctx context.Context) error {
			return client.Ping(ctx)
		},
	}
}
