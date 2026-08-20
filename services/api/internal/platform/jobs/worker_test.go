package jobs

import (
	"context"
	"errors"
	"sync"
	"testing"
	"time"
)

type fakeQueue struct {
	jobs chan Job
	mu   sync.Mutex
}

func newFakeQueue(jobs ...Job) *fakeQueue {
	queue := &fakeQueue{jobs: make(chan Job, 8)}
	for _, job := range jobs {
		queue.jobs <- job
	}
	return queue
}

func (q *fakeQueue) Enqueue(_ context.Context, job Job) error {
	q.mu.Lock()
	defer q.mu.Unlock()
	q.jobs <- job
	return nil
}

func (q *fakeQueue) Receive(ctx context.Context) (Job, error) {
	select {
	case job := <-q.jobs:
		return job, nil
	case <-ctx.Done():
		return Job{}, ctx.Err()
	}
}

func TestSupervisorStopsOnContext(t *testing.T) {
	queue := newFakeQueue()
	supervisor := NewSupervisor(NewWorker(queue, func(context.Context, Job) error { return nil }, 3))
	supervisor.Start(context.Background())

	shutdownCtx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	if err := supervisor.Shutdown(shutdownCtx); err != nil {
		t.Fatalf("Shutdown() returned error: %v", err)
	}
}

func TestWorkerRetriesFailedJobUntilHandlerSucceeds(t *testing.T) {
	queue := newFakeQueue(Job{ID: "job-1", Name: "test", Attempts: 0})
	attempts := 0
	worker := NewWorker(queue, func(context.Context, Job) error {
		attempts++
		if attempts == 1 {
			return errors.New("temporary failure")
		}
		return nil
	}, 3)

	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		<-time.After(20 * time.Millisecond)
		cancel()
	}()

	if err := worker.Run(ctx); err != nil {
		t.Fatalf("Run() returned error: %v", err)
	}
	if attempts != 2 {
		t.Fatalf("handler attempts = %d, want 2", attempts)
	}
}
