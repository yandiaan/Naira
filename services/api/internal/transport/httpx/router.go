package httpx

import (
	"context"
	"net/http"

	"naira/services/api/internal/platform/buildinfo"
	"naira/services/api/internal/platform/errors"
	"naira/services/api/internal/platform/health"
	"naira/services/api/internal/platform/logging"
)

func NewRouter(info buildinfo.BuildInfo, checkers []health.Checker) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health/live", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]string{"status": "ok"})
	})
	mux.HandleFunc("GET /health/ready", func(writer http.ResponseWriter, request *http.Request) {
		checks := make(map[string]string, len(checkers))
		ready := true
		for _, checker := range checkers {
			if err := checker.Check(request.Context()); err != nil {
				ready = false
				checks[checker.Name()] = "unavailable"
				continue
			}
			checks[checker.Name()] = "ok"
		}

		if !ready {
			WriteError(writer, RequestIDFromContext(request.Context()), errors.New(
				"DEPENDENCY_UNAVAILABLE",
				"One or more dependencies are unavailable.",
				http.StatusServiceUnavailable,
				map[string]any{"checks": checks},
				nil,
			))
			return
		}

		writeJSON(writer, http.StatusOK, map[string]any{"status": "ready", "checks": checks})
	})
	mux.HandleFunc("GET /version", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, info)
	})

	return RequestID(recoverPanic(logging.Middleware(logging.New("info"), mux)))
}

func recoverPanic(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		defer func() {
			if recovered := recover(); recovered != nil {
				WriteError(writer, RequestIDFromContext(request.Context()), errors.New(
					"INTERNAL_ERROR",
					"An unexpected error occurred.",
					http.StatusInternalServerError,
					nil,
					panicError(recovered),
				))
			}
		}()

		next.ServeHTTP(writer, request)
	})
}

func panicError(value any) error {
	if err, ok := value.(error); ok {
		return err
	}

	return context.Canceled
}
