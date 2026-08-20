package errors

import (
	"errors"
	"fmt"
	"net/http"
)

type AppError struct {
	Code    string
	Message string
	Details map[string]any
	Status  int
	Cause   error
}

func New(code string, message string, status int, details map[string]any, cause error) *AppError {
	return &AppError{
		Code:    code,
		Message: message,
		Details: details,
		Status:  status,
		Cause:   cause,
	}
}

func (e *AppError) Error() string {
	if e.Cause == nil {
		return fmt.Sprintf("%s: %s", e.Code, e.Message)
	}

	return fmt.Sprintf("%s: %s: %v", e.Code, e.Message, e.Cause)
}

func (e *AppError) Unwrap() error {
	return e.Cause
}

func From(err error) *AppError {
	if err == nil {
		return nil
	}

	var appErr *AppError
	if errors.As(err, &appErr) {
		return appErr
	}

	return New("INTERNAL_ERROR", "An unexpected error occurred.", http.StatusInternalServerError, nil, err)
}
