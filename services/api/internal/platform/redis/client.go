package redis

import (
	"context"
	"fmt"
	"time"

	goRedis "github.com/redis/go-redis/v9"
)

type Client struct {
	client *goRedis.Client
}

func New(redisURL string) (*Client, error) {
	options, err := goRedis.ParseURL(redisURL)
	if err != nil {
		return nil, err
	}

	return &Client{client: goRedis.NewClient(options)}, nil
}

func (c *Client) Ping(ctx context.Context) error {
	return c.client.Ping(ctx).Err()
}

func (c *Client) Close() error {
	return c.client.Close()
}

func (c *Client) Set(ctx context.Context, namespace string, key string, value any, ttl time.Duration) error {
	if ttl <= 0 {
		return fmt.Errorf("redis TTL must be positive")
	}

	return c.client.Set(ctx, NamespacedKey(namespace, key), value, ttl).Err()
}

func (c *Client) Push(ctx context.Context, namespace string, payload []byte) error {
	return c.client.RPush(ctx, NamespacedKey(namespace, "queue"), payload).Err()
}

func (c *Client) BlockingPop(ctx context.Context, namespace string) ([]byte, error) {
	values, err := c.client.BLPop(ctx, 0, NamespacedKey(namespace, "queue")).Result()
	if err != nil {
		return nil, err
	}
	if len(values) != 2 {
		return nil, fmt.Errorf("unexpected queue response")
	}

	return []byte(values[1]), nil
}

func NamespacedKey(namespace string, key string) string {
	return "naira:" + namespace + ":" + key
}
