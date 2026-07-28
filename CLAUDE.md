# WeAssist Portal Front

## Project context

This is an existing and advanced frontend application.

The architecture, visual design, routing conventions, component organization,
state management and API integration patterns are already established.

The current objective is incremental maintenance:

- Refactor selected areas.
- Improve readability and maintainability.
- Update the OpenAPI contract.
- Regenerate the API client.
- Adapt existing screens to contract changes.
- Preserve existing behavior and visual design.

Do not redesign or restructure the entire application.

## Technology

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Zustand
- React Hook Form
- Yup
- Axios
- Orval
- OpenAPI
- MSW
- React Bootstrap
- Sass
- i18next

## General rules

- Study existing implementations before changing code.
- Follow conventions already used in nearby modules.
- Prefer the smallest possible change.
- Do not introduce a new architecture.
- Do not rewrite working modules unnecessarily.
- Do not modify unrelated files.
- Preserve existing routes, UI behavior and translations.
- Do not add dependencies unless strictly necessary.
- Do not duplicate utilities, hooks or components that already exist.
- Do not add abstractions without an immediate concrete use.

## Generated API code

- OpenAPI is the source of truth for API contracts.
- Orval-generated files must not be edited manually.
- Update openapi.yml first.
- Run the configured Orval generator afterward.
- Adapt handwritten application code to the generated types and hooks.
- Never fix generated-code errors directly inside generated files.
- Verify whether a file is generated before modifying it.

## React guidelines

- Keep components focused on rendering and user interaction.
- Move reusable application behavior to hooks or services only when needed.
- Do not store server state in Zustand when React Query already manages it.
- Zustand is for client-side application state.
- React Query is for remote server state.
- Avoid unnecessary useEffect calls.
- Do not duplicate API responses into local state without a concrete reason.
- Preserve query keys and invalidation behavior.
- Use mutations for operations that modify server data.
- Treat loading, error, empty and success states explicitly.

## TypeScript guidelines

- Do not use any unless there is a documented unavoidable reason.
- Do not bypass errors with type assertions without validating the runtime value.
- Prefer generated OpenAPI models for API contracts.
- Do not create duplicate interfaces for generated API models.
- Keep null, undefined and optional fields distinct.
- Handle newly optional API fields safely.
- Use exhaustive checks where appropriate.

## Forms

- Continue using React Hook Form and Yup.
- Keep validation schemas aligned with the OpenAPI contract.
- Do not duplicate form state in useState.
- Preserve server-side validation handling.
- Update defaults when API fields become optional, nullable or required.

## Validation

Before finishing a change:

1. Run npm run api:gen when OpenAPI changes.
2. Run npm run lint.
3. Run npm run build.
4. Review the complete git diff.
5. Confirm that generated files were not manually modified.
6. Report any unverified runtime behavior.

Never say that lint or build passed unless the command was executed.