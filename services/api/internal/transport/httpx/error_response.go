package httpx

import (
	"encoding/json"
	"net/http"

	apperrors "naira/services/api/internal/platform/errors"
)

type errorEnvelope struct {
	Error errorBody `json:"error"`
}

type errorBody struct {
	Code      string         `json:"code"`
	Message   string         `json:"message"`
	Details   map[string]any `json:"details"`
	RequestID string         `json:"requestId"`
}

func WriteError(writer http.ResponseWriter, requestID string, err error) {
	if requestID != "" {
		writer.Header().Set("X-Request-ID", requestID)
	}

	appErr := apperrors.From(err)
	status := appErr.Status
	if status == 0 {
		status = http.StatusInternalServerError
	}

	details := appErr.Details
	if details == nil {
		details = map[string]any{}
	}

	writeJSON(writer, status, errorEnvelope{Error: errorBody{
		Code:      appErr.Code,
		Message:   appErr.Message,
		Details:   details,
		RequestID: requestID,
	}})
}

func writeJSON(writer http.ResponseWriter, status int, value any) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	_ = json.NewEncoder(writer).Encode(value)
}
