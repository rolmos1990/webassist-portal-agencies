---
name: update-openapi-client
description: Updates the OpenAPI contract, regenerates the Orval client and adapts affected frontend code safely.
disable-model-invocation: true
---

Update the API integration using the OpenAPI-first workflow.

## Phase 1: inspect

Before modifying anything:

1. Read openapi.yml.
2. Read orval.config.ts.
3. Identify generated output directories.
4. Inspect package.json scripts.
5. Determine the configured Orval client type.
6. Determine whether React Query hooks and MSW mocks are generated.
7. Find application files importing affected generated models or operations.
8. Record the current git status.

## Phase 2: update the contract

Apply only the requested OpenAPI changes.

Check:

- Paths and HTTP methods.
- operationId uniqueness and stability.
- Request parameters.
- Request bodies.
- Response schemas.
- Required properties.
- Optional properties.
- Nullable properties.
- Enums.
- Date and date-time formats.
- Pagination models.
- Error responses.
- Authentication requirements.
- Component schema reuse.
- References under components/schemas.

Do not invent API behavior not present in the supplied contract.

Preserve existing operationId values unless the backend contract changed them.
Changing operationId may rename generated functions and hooks.

## Phase 3: generate

Run:

npm run api:gen

Do not manually edit generated output.

If generation fails:

1. Identify whether the cause is the OpenAPI contract or Orval configuration.
2. Fix the source configuration.
3. Run generation again.
4. Do not patch generated TypeScript manually.

## Phase 4: analyze generated changes

Inspect the generated diff and identify:

- New operations.
- Removed operations.
- Renamed functions.
- Renamed React Query hooks.
- Changed request types.
- Changed response types.
- Newly required fields.
- Newly optional fields.
- Newly nullable fields.
- Enum changes.
- Query-key changes.
- Generated MSW changes.

## Phase 5: adapt handwritten code

Update only affected handwritten files.

Search for:

- Imports from generated API modules.
- Forms using changed models.
- Validation schemas using changed fields.
- Tables displaying changed responses.
- Filters and search parameters.
- Mutation payloads.
- Query invalidations.
- Zustand stores containing API models.
- MSW overrides.
- Tests and fixtures.
- Translation keys needed for genuinely new fields.

Do not duplicate generated API models with manually written interfaces.

## Phase 6: validate

Run:

npm run lint
npm run build

Then inspect git diff.

Report:

1. OpenAPI changes.
2. Generated files changed.
3. Handwritten files changed.
4. Breaking contract changes.
5. Runtime scenarios requiring manual verification.
6. Validation commands and results.