package jobs

import (
	"context"
	"sync"
)

type Supervisor struct {
	worker  Worker
	cancel  context.CancelFunc
	done    chan error
	mu      sync.Mutex
	started bool
}

func NewSupervisor(worker Worker) *Supervisor {
	return &Supervisor{worker: worker}
}

func (s *Supervisor) Start(parent context.Context) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.started {
		return
	}

	ctx, cancel := context.WithCancel(parent)
	s.cancel = cancel
	s.done = make(chan error, 1)
	s.started = true
	go func() {
		s.done <- s.worker.Run(ctx)
	}()
}

func (s *Supervisor) Shutdown(ctx context.Context) error {
	s.mu.Lock()
	if !s.started {
		s.mu.Unlock()
		return nil
	}
	cancel := s.cancel
	done := s.done
	s.mu.Unlock()

	cancel()
	select {
	case err := <-done:
		return err
	case <-ctx.Done():
		return ctx.Err()
	}
}
