package auth

import (
	"context"
	"testing"
)

func TestMissingBearerTokenIsUnauthorized(t *testing.T) {
	if _, err := ExtractBearerToken(""); err == nil {
		t.Fatal("ExtractBearerToken() expected missing-token error")
	}
}

func TestMalformedBearerTokenIsUnauthorized(t *testing.T) {
	if _, err := ExtractBearerToken("Basic abc"); err == nil {
		t.Fatal("ExtractBearerToken() expected malformed-token error")
	}
}

func TestUserCannotSatisfyAdminRole(t *testing.T) {
	principal := Principal{Subject: "user-1", PlatformRoles: []string{"user"}}

	if err := RequirePlatformRole(principal, "admin"); err == nil {
		t.Fatal("RequirePlatformRole() expected admin denial")
	}
}

func TestAdminRoleDoesNotGrantTripMembership(t *testing.T) {
	principal := Principal{Subject: "admin-1", PlatformRoles: []string{"admin"}}

	if err := RequireResourceRole(principal, "trip-1", "owner"); err == nil {
		t.Fatal("RequireResourceRole() expected missing trip membership denial")
	}
}

func TestUnknownProviderReturnsNotConfigured(t *testing.T) {
	_, err := (NotConfiguredAuthenticator{}).Authenticate(context.Background(), "token")
	if err == nil {
		t.Fatal("NotConfiguredAuthenticator expected an error")
	}
}
