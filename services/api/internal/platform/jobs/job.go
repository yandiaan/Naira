package jobs

import (
	"context"
	"encoding/json"
	"fmt"
	"time"
)

type Job struct {
	ID        string          `json:"id"`
	Name      string          `json:"name"`
	Payload   json.RawMessage `json:"payload"`
	Attempts  int             `json:"attempts"`
	CreatedAt time.Time       `json:"createdAt"`
}

type Queue interface {
	Enqueue(context.Context, Job) error
	Receive(context.Context) (Job, error)
}

type Handler func(context.Context, Job) error

type Worker struct {
	queue       Queue
	handler     Handler
	maxAttempts int
}

func NewWorker(queue Queue, handler Handler, maxAttempts int) Worker {
	if maxAttempts < 1 {
		maxAttempts = 1
	}

	return Worker{queue: queue, handler: handler, maxAttempts: maxAttempts}
}

func (w Worker) Run(ctx context.Context) error {
	for {
		job, err := w.queue.Receive(ctx)
		if err != nil {
			if ctx.Err() != nil {
				return nil
			}
			return err
		}

		if err := w.handler(ctx, job); err != nil {
			job.Attempts++
			if job.Attempts >= w.maxAttempts {
				return fmt.Errorf("job %s exceeded retry limit: %w", job.ID, err)
			}
			if enqueueErr := w.queue.Enqueue(ctx, job); enqueueErr != nil {
				return fmt.Errorf("retry job %s: %w", job.ID, enqueueErr)
			}
		}
	}
}
