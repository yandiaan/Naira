package buildinfo

import "testing"

func TestDefaultContainsServiceAndDevelopmentVersion(t *testing.T) {
	info := Default()

	if info.Service != "naira-api" {
		t.Fatalf("Service = %q, want naira-api", info.Service)
	}
	if info.Version != "0.1.0-dev" {
		t.Fatalf("Version = %q, want 0.1.0-dev", info.Version)
	}
}
