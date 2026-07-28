---
name: validate-frontend
description: Performs final validation for the WeAssist React frontend before completing a change.
disable-model-invocation: true
---

Validate the current changes.

1. Run git status.
2. Inspect the complete git diff.
3. Classify changed files as:
   - OpenAPI contract
   - Generated
   - Handwritten
   - Configuration
   - Dependency lockfile
4. Check for accidental changes.
5. Check for manually modified generated files.
6. Run npm run lint.
7. Run npm run build.
8. Search changed code for:
   - any
   - @ts-ignore
   - @ts-expect-error
   - eslint-disable
   - TODO
   - FIXME
   - console.log
9. Verify that newly optional API fields are handled.
10. Verify that forms and validation schemas match the changed contract.
11. Verify mutation success invalidation when relevant.
12. Verify that no secrets or local URLs were committed.

Return:

- Changed files by category.
- Commands executed.
- Results.
- Remaining warnings.
- Manual verification scenarios.
- Suggested commit message.

Never claim a validation passed unless the command completed successfully.
Do not modify unrelated pre-existing problems.