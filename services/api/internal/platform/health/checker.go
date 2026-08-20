package health

import "context"

type Checker interface {
	Name() string
	Check(context.Context) error
}

type CheckFunc struct {
	CheckName string
	CheckFn   func(context.Context) error
}

func (f CheckFunc) Name() string {
	return f.CheckName
}

func (f CheckFunc) Check(ctx context.Context) error {
	return f.CheckFn(ctx)
}
