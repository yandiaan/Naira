package auth

import (
	"fmt"

	apperrors "naira/services/api/internal/platform/errors"
)

func RequirePlatformRole(principal Principal, required string) error {
	for _, role := range principal.PlatformRoles {
		if role == required {
			return nil
		}
	}

	return apperrors.New(
		"FORBIDDEN",
		"You do not have the required platform role.",
		403,
		map[string]any{"requiredRole": required},
		nil,
	)
}

func RequireResourceRole(principal Principal, resourceID string, required string) error {
	for _, role := range principal.ResourceRoles[resourceID] {
		if role == required {
			return nil
		}
	}

	return apperrors.New(
		"RESOURCE_ACCESS_DENIED",
		"You do not have the required resource role.",
		403,
		map[string]any{"resourceId": resourceID, "requiredRole": required},
		nil,
	)
}

func NotConfiguredError(provider string) error {
	return fmt.Errorf("identity provider %s is not configured", provider)
}
