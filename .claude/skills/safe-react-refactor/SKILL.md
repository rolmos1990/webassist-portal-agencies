---
name: safe-react-refactor
description: Refactors existing React and TypeScript code while preserving behavior, UI and established architecture.
disable-model-invocation: true
---

Refactor the requested code incrementally.

Before editing:

1. Read the complete target files.
2. Inspect their imports and direct consumers.
3. Find similar modules in the project.
4. Identify current observable behavior.
5. Identify generated API dependencies.
6. Check whether tests or MSW handlers cover the behavior.
7. Present a concise refactoring plan.

Refactoring priorities:

1. Preserve behavior.
2. Remove confirmed duplication.
3. Simplify confusing control flow.
4. Improve naming.
5. Reduce unnecessary state.
6. Remove unnecessary effects.
7. Improve TypeScript safety.
8. Separate rendering from complex application behavior when justified.
9. Preserve styling and visual structure.

React-specific checks:

- Unnecessary useEffect.
- State derived from props or query results.
- Duplicate server data in Zustand or useState.
- Missing hook dependencies.
- Unstable objects or callbacks causing meaningful re-renders.
- Conditional hooks.
- Incorrect query invalidation.
- Components with multiple unrelated responsibilities.
- Business behavior embedded deeply in JSX.
- Duplicate loading or error handling.

Constraints:

- Do not redesign components visually.
- Do not replace React Bootstrap.
- Do not replace Zustand.
- Do not replace React Query.
- Do not migrate validation libraries.
- Do not modify generated Orval files.
- Do not create generic abstractions for one use case.
- Do not perform unrelated formatting.
- Do not rename public routes without authorization.
- Do not change translation keys unnecessarily.

After editing:

1. Run the narrowest available validation.
2. Run npm run lint.
3. Run npm run build.
4. Review git diff.
5. Summarize exactly what behavior was preserved.