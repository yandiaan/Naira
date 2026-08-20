package migrations

import "testing"

func TestExtractUpSQL(t *testing.T) {
	sql, err := extractUpSQL("-- +goose Up\nCREATE TABLE example (id text);\n-- +goose Down\nDROP TABLE example;")
	if err != nil {
		t.Fatalf("extractUpSQL() returned error: %v", err)
	}
	if sql != "CREATE TABLE example (id text);" {
		t.Fatalf("SQL = %q, want CREATE TABLE example (id text);", sql)
	}
}

func TestExtractUpSQLRejectsMissingMarker(t *testing.T) {
	if _, err := extractUpSQL("CREATE TABLE example (id text);"); err == nil {
		t.Fatal("extractUpSQL() expected missing marker error")
	}
}
