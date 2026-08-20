package logging

import (
	"log/slog"
	"net/http"
	"os"
	"time"
)

func New(level string) *slog.Logger {
	logLevel := new(slog.LevelVar)
	if level == "debug" {
		logLevel.Set(slog.LevelDebug)
	}

	return slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: logLevel}))
}

func Middleware(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		started := time.Now()
		wrapped := &responseWriter{ResponseWriter: writer, status: http.StatusOK}
		next.ServeHTTP(wrapped, request)

		logger.Info("http request",
			"method", request.Method,
			"path", request.URL.Path,
			"status", wrapped.status,
			"durationMs", time.Since(started).Milliseconds(),
		)
	})
}

type responseWriter struct {
	http.ResponseWriter
	status     int
	headerSent bool
}

func (writer *responseWriter) WriteHeader(status int) {
	if writer.headerSent {
		return
	}

	writer.status = status
	writer.headerSent = true
	writer.ResponseWriter.WriteHeader(status)
}

func (writer *responseWriter) Write(body []byte) (int, error) {
	if !writer.headerSent {
		writer.WriteHeader(http.StatusOK)
	}

	return writer.ResponseWriter.Write(body)
}
