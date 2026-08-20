package auth

import (
	"context"
	"fmt"
	"strings"

	apperrors "naira/services/api/internal/platform/errors"
)

type Principal struct {
	Subject       string
	PlatformRoles []string
	ResourceRoles map[string][]string
	Claims        map[string]any
}

type Authenticator interface {
	Authenticate(context.Context, string) (Principal, error)
}

type NotConfiguredAuthenticator struct{}

func (NotConfiguredAuthenticator) Authenticate(context.Context, string) (Principal, error) {
	return Principal{}, fmt.Errorf("identity provider is not configured")
}

func ExtractBearerToken(header string) (string, error) {
	parts := strings.Fields(header)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") || parts[1] == "" {
		return "", apperrors.New(
			"UNAUTHENTICATED",
			"Authentication is required.",
			401,
			nil,
			nil,
		)
	}

	return parts[1], nil
}
