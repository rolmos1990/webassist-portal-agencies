---
name: frontend-review
description: Reviews React, TypeScript, React Query and OpenAPI-related changes without editing files.
disable-model-invocation: true
---

Review the current git diff or requested module without changing files.

Prioritize findings by:

- Critical
- Important
- Improvement
- Optional

Check:

## Correctness

- Changed behavior.
- Incorrect conditions.
- Missing null or undefined handling.
- Incorrect form defaults.
- Broken navigation.
- Incorrect request payloads.
- Missing response fields.
- Stale state.
- Race conditions.

## OpenAPI and Orval

- Manual edits to generated files.
- Duplicate generated types.
- Outdated imports.
- Incorrect request models.
- Required fields omitted.
- Optional fields assumed to exist.
- operationId-related renames.
- Incorrect query or mutation usage.

## React Query

- Queries used for mutation operations.
- Mutations used for reads.
- Missing query-key dependencies.
- Incorrect invalidation.
- Duplicate requests.
- Server state copied unnecessarily into Zustand.
- Incorrect enabled conditions.
- Cache behavior regressions.

Query keys must represent the serializable values on which the fetched data depends. Missing dependencies can cause unrelated responses to share cache entries. :contentReference[oaicite:3]{index=3}

## React

- Hooks called conditionally.
- Effects used to derive renderable values.
- Missing effect dependencies.
- State synchronization loops.
- Unnecessary component state.
- Components that became substantially harder to understand.
- Missing loading, error or empty states.

## TypeScript

- any.
- Unsafe type assertions.
- Non-null assertions without proof.
- Duplicated interfaces.
- Incorrect optional or nullable handling.
- Swallowed errors.

## Project consistency

- New patterns that conflict with nearby modules.
- Duplicate components or utilities.
- New dependencies without justification.
- Changed styling or translation behavior.

For each finding provide:

1. File and location.
2. Confirmed problem.
3. User-visible or technical impact.
4. Minimal correction.
5. Whether it blocks merging.

Do not report hypothetical problems without evidence.
Do not modify files.