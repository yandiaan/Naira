package httpx

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"naira/services/api/internal/platform/buildinfo"
	apperrors "naira/services/api/internal/platform/errors"
)

func TestErrorResponseUsesStableEnvelope(t *testing.T) {
	response := httptest.NewRecorder()
	err := apperrors.New("VALIDATION_FAILED", "invalid request", http.StatusUnprocessableEntity, nil, nil)

	WriteError(response, "request-123", err)

	if response.Code != http.StatusUnprocessableEntity {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusUnprocessableEntity)
	}
	if response.Header().Get("X-Request-ID") != "request-123" {
		t.Fatal("request ID header was not written")
	}

	var body struct {
		Error struct {
			Code      string         `json:"code"`
			Message   string         `json:"message"`
			Details   map[string]any `json:"details"`
			RequestID string         `json:"requestId"`
		} `json:"error"`
	}
	if err := json.NewDecoder(response.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Error.Code != "VALIDATION_FAILED" || body.Error.RequestID != "request-123" {
		t.Fatalf("unexpected envelope: %#v", body.Error)
	}
}

func TestUnexpectedErrorHidesCause(t *testing.T) {
	response := httptest.NewRecorder()
	WriteError(response, "request-500", errors.New("database password=secret"))

	if response.Code != http.StatusInternalServerError {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusInternalServerError)
	}
	if body := response.Body.String(); body == "" || strings.Contains(body, "secret") {
		t.Fatalf("response leaked unexpected error: %s", body)
	}
}

func TestLiveHealthReturnsOK(t *testing.T) {
	handler := NewRouter(buildinfo.Default(), nil)
	request := httptest.NewRequest(http.MethodGet, "/health/live", nil)
	response := httptest.NewRecorder()

	handler.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
}

func TestVersionReturnsBuildInfo(t *testing.T) {
	info := buildinfo.BuildInfo{Service: "test", Version: "1.2.3", GitSHA: "abc", BuildTime: "now"}
	handler := NewRouter(info, nil)
	request := httptest.NewRequest(http.MethodGet, "/version", nil)
	response := httptest.NewRecorder()

	handler.ServeHTTP(response, request)

	var actual buildinfo.BuildInfo
	if err := json.NewDecoder(response.Body).Decode(&actual); err != nil {
		t.Fatalf("decode version: %v", err)
	}
	if actual != info {
		t.Fatalf("version = %#v, want %#v", actual, info)
	}
}
