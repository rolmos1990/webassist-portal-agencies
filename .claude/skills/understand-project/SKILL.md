---
name: understand-project
description: Analyzes the existing WeAssist frontend architecture and conventions before implementing changes.
disable-model-invocation: true
---

Analyze the requested module without modifying files.

Inspect:

1. Folder and module structure.
2. Route definitions.
3. Components and page composition.
4. Existing hooks and service usage.
5. React Query conventions.
6. Zustand stores.
7. Forms and validation schemas.
8. Generated Orval API files.
9. Error handling.
10. Internationalization.
11. Existing tests and MSW handlers.
12. Similar implementations elsewhere in the project.

Determine:

- Which files are handwritten.
- Which files are generated.
- Existing naming conventions.
- Existing component patterns.
- Existing query and mutation patterns.
- Existing response mapping conventions.
- Potential impact of the requested change.

Return:

1. Current implementation summary.
2. Files likely to require modification.
3. Files that must not be modified.
4. Existing patterns that should be followed.
5. Risks and possible regressions.
6. Recommended minimal implementation plan.

Do not propose replacing the architecture.
Do not edit any files.