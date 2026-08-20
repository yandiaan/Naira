package sync

import "encoding/json"

type MutationOperation string

const (
	MutationCreate MutationOperation = "create"
	MutationUpdate MutationOperation = "update"
	MutationDelete MutationOperation = "delete"
)

type MutationEnvelope struct {
	MutationID      string            `json:"mutationId"`
	EntityID        string            `json:"entityId"`
	ExpectedVersion int64             `json:"expectedVersion"`
	Operation       MutationOperation `json:"operation"`
	Payload         json.RawMessage   `json:"payload"`
}

type ApplyStatus string

const (
	ApplyStatusApplied  ApplyStatus = "applied"
	ApplyStatusConflict ApplyStatus = "conflict"
	ApplyStatusRejected ApplyStatus = "rejected"
)

type ApplyResult struct {
	Status        ApplyStatus `json:"status"`
	EntityID      string      `json:"entityId"`
	ServerVersion int64       `json:"serverVersion,omitempty"`
}

type Conflict struct {
	Code          string `json:"code"`
	EntityID      string `json:"entityId"`
	ServerVersion int64  `json:"serverVersion"`
}

type ChangeCursor string

type ChangeRecord struct {
	EntityID string          `json:"entityId"`
	Version  int64           `json:"version"`
	Deleted  bool            `json:"deleted"`
	Payload  json.RawMessage `json:"payload,omitempty"`
}

type ChangePage struct {
	Changes    []ChangeRecord `json:"changes"`
	NextCursor ChangeCursor   `json:"nextCursor"`
	HasMore    bool           `json:"hasMore"`
}

func NewConflictResult(entityID string, serverVersion int64) ApplyResult {
	return ApplyResult{
		Status:        ApplyStatusConflict,
		EntityID:      entityID,
		ServerVersion: serverVersion,
	}
}
