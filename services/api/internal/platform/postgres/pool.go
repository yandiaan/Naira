package postgres

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Pool struct {
	pool *pgxpool.Pool
}

func New(ctx context.Context, databaseURL string) (*Pool, error) {
	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return nil, err
	}

	config.MaxConns = 10
	config.MinConns = 1
	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return nil, err
	}

	return &Pool{pool: pool}, nil
}

func (p *Pool) Ping(ctx context.Context) error {
	return p.pool.Ping(ctx)
}

func (p *Pool) Close() {
	p.pool.Close()
}

func (p *Pool) WithTx(ctx context.Context, fn func(pgx.Tx) error) error {
	tx, err := p.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer func() { _ = tx.Rollback(ctx) }()

	if err := fn(tx); err != nil {
		return err
	}

	return tx.Commit(ctx)
}
