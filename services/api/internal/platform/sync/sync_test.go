package sync

import (
	"encoding/json"
	"testing"
)

func TestValidateMutationAcceptsSupportedOperations(t *testing.T) {
	for _, operation := range []MutationOperation{MutationCreate, MutationUpdate, MutationDelete} {
		err := ValidateMutation(MutationEnvelope{
			MutationID:      "mutation-1",
			EntityID:        "entity-1",
			ExpectedVersion: 1,
			Operation:       operation,
			Payload:         json.RawMessage(`{"name":"value"}`),
		})
		if err != nil {
			t.Fatalf("ValidateMutation(%q) returned error: %v", operation, err)
		}
	}
}

func TestValidateMutationRejectsInvalidInput(t *testing.T) {
	invalid := []MutationEnvelope{
		{EntityID: "entity-1", Operation: MutationUpdate, Payload: json.RawMessage(`{}`)},
		{MutationID: "mutation-1", Operation: MutationUpdate, ExpectedVersion: -1, Payload: json.RawMessage(`{}`)},
		{MutationID: "mutation-1", EntityID: "entity-1", Operation: "unknown", Payload: json.RawMessage(`{}`)},
	}

	for _, mutation := range invalid {
		if err := ValidateMutation(mutation); err == nil {
			t.Fatalf("ValidateMutation(%#v) expected an error", mutation)
		}
	}
}

func TestConflictResultContainsServerVersion(t *testing.T) {
	result := NewConflictResult("entity-1", 4)

	if result.Status != ApplyStatusConflict || result.ServerVersion != 4 {
		t.Fatalf("conflict result = %#v", result)
	}
}

func TestChangeRecordPreservesTombstone(t *testing.T) {
	record := ChangeRecord{EntityID: "entity-1", Version: 3, Deleted: true}

	if !record.Deleted || record.Version != 3 {
		t.Fatalf("tombstone record = %#v", record)
	}
}
