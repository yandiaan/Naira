# Naira mobile client handoff

The future Flutter client consumes the committed OpenAPI document at packages/api-contracts/openapi/openapi.yaml.

The mobile client must use Authorization Code with PKCE, store tokens in secure OS storage, and keep offline mutation IDs and entity versions for synchronization. It must not access PostgreSQL, Redis, or object storage directly.
