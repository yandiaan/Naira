package jobs

import (
	"context"
	"encoding/json"
	"fmt"

	redisplatform "naira/services/api/internal/platform/redis"
)

type RedisQueue struct {
	client *redisplatform.Client
	name   string
}

func NewRedisQueue(client *redisplatform.Client, name string) *RedisQueue {
	return &RedisQueue{client: client, name: name}
}

func (q *RedisQueue) Enqueue(ctx context.Context, job Job) error {
	payload, err := json.Marshal(job)
	if err != nil {
		return err
	}

	return q.client.Push(ctx, "jobs:"+q.name, payload)
}

func (q *RedisQueue) Receive(ctx context.Context) (Job, error) {
	payload, err := q.client.BlockingPop(ctx, "jobs:"+q.name)
	if err != nil {
		return Job{}, err
	}

	var job Job
	if err := json.Unmarshal(payload, &job); err != nil {
		return Job{}, fmt.Errorf("decode job: %w", err)
	}

	return job, nil
}
