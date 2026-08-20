package sync

import (
	"encoding/json"
	"strings"

	apperrors "naira/services/api/internal/platform/errors"
)

func ValidateMutation(mutation MutationEnvelope) error {
	if strings.TrimSpace(mutation.MutationID) == "" {
		return validationError("mutationId is required")
	}
	if strings.TrimSpace(mutation.EntityID) == "" {
		return validationError("entityId is required")
	}
	if mutation.ExpectedVersion < 0 {
		return validationError("expectedVersion must not be negative")
	}
	if mutation.Operation != MutationCreate && mutation.Operation != MutationUpdate && mutation.Operation != MutationDelete {
		return validationError("operation is not supported")
	}
	if len(mutation.Payload) > 0 && !json.Valid(mutation.Payload) {
		return validationError("payload must be valid JSON")
	}

	return nil
}

func validationError(message string) error {
	return apperrors.New("SYNC_VALIDATION_FAILED", message, 422, nil, nil)
}
