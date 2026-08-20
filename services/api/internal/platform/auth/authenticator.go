package auth

import "context"

type Action string

type Resource struct {
	Type string
	ID   string
}

type Authorizer interface {
	Authorize(context.Context, Principal, Action, Resource) error
}
