 Cursor Rules

## Whenever you need a React component

1. Carefully consider the component's purpose, functionality, and design

2. Think slowly, step by step, and outline your reasoning

3. Check if a similar component already exists in any of the following locations
   1. packages/ui/src/components
   2. apps/spa/src/components

4. If it doesn't exist, generate a detailed prompt for the component, including:
   - Component name and purpose
   - Desired props and their types
   - Any specific styling or behavior requirements
   - Mention of using Tailwind CSS for styling
   - Request for TypeScript usage

5. URL encode the prompt.

6. Create a clickable link in this format:
   [ComponentName](https://v0.dev/chat?q={encoded_prompt})

7. After generating, adapt the component to fit our project structure:
   - Import
     - common shadcn/ui components from <ui_package_alias>@repo/ui/components/ui/</ui_package_alias>
     - app specific components from <app_package_alias>@/components</app_package_alias>
   - Ensure it follows our existing component patterns
   - Add any necessary custom logic or state management

Example prompt template:
"Create a React component named {ComponentName} using TypeScript and Tailwind CSS. It should {description of functionality}. Props should include {list of props with types}. The component should {any specific styling or behavior notes}. Please provide the full component code."

Remember to replace placeholders like <ui_package_path> and <app_package_alias> with the actual values used in your project.

---
description: React best practices and patterns for modern web applications
globs: **/*.tsx, **/*.jsx, components/**/*
---

# React Best Practices

## Component Structure
- Use functional components over class components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement proper prop types with TypeScript
- Split large components into smaller, focused ones

## Hooks
- Follow the Rules of Hooks
- Use custom hooks for reusable logic
- Keep hooks focused and simple
- Use appropriate dependency arrays in useEffect
- Implement cleanup in useEffect when needed
- Avoid nested hooks

## State Management
- Use useState for local component state
- Implement useReducer for complex state logic
- Use Context API for shared state
- Keep state as close to where it's used as possible
- Avoid prop drilling through proper state management
- Use state management libraries only when necessary

## Performance
- Implement proper memoization (useMemo, useCallback)
- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Implement proper lazy loading
- Use proper key props in lists
- Profile and optimize render performance

## Forms
- Use controlled components for form inputs
- Implement proper form validation
- Handle form submission states properly
- Show appropriate loading and error states
- Use form libraries for complex forms
- Implement proper accessibility for forms

## Error Handling
- Implement Error Boundaries
- Handle async errors properly
- Show user-friendly error messages
- Implement proper fallback UI
- Log errors appropriately
- Handle edge cases gracefully

## Testing
- Write unit tests for components
- Implement integration tests for complex flows
- Use React Testing Library
- Test user interactions
- Test error scenarios
- Implement proper mock data

## Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Handle focus management
- Provide proper alt text for images

## Code Organization
- Group related components together
- Use proper file naming conventions
- Implement proper directory structure
- Keep styles close to components
- Use proper imports/exports
- Document complex component logic

---
description: TypeScript 5.9.3 + React 19.2 best practices for this project
globs: **/*.ts, **/*.tsx, **/*.jsx, **/*.js
---

# TypeScript 5.9.3 + React 19.2 Best Practices

## Project Structure
- Keep app code under `src/` with clear feature-based grouping (e.g., `features/`, `shared/`, `routes/`, `components/`).
- Separate UI primitives from feature components (e.g., `components/ui/` for generic UI, `features/*/components/` for domain UI).
- Centralize cross-cutting utilities (e.g., `lib/`, `hooks/`, `types/`, `config/`).
- Prefer barrel exports only for stable, low-churn modules to avoid circular dependencies.
- Enforce consistent module boundaries with path aliases and lint rules.

## Component Structure
- Use function components exclusively; avoid class components.
- Keep components small and focused; prefer composition over monoliths.
- Co-locate component files, styles, tests, and stories when feasible.
- Split container vs. presentational concerns when complexity grows.
- Use typed props with `type` or `interface` and default props via default values.

## Component Building
- Favor React 19 concurrent-friendly patterns (avoid blocking synchronous work in render).
- Use `useState`/`useReducer` for local state; lift state only when needed.
- Use `useEffect` only for side effects; avoid deriving state that can be computed.
- Memoize expensive computations with `useMemo` and callbacks with `useCallback` only when necessary.
- Use `Suspense` for async UI boundaries; keep fallbacks specific and meaningful.
- Prefer controlled components for form inputs; keep form state near the form.
- Keep DOM accessibility first: semantic tags, labels, ARIA only when required.

## TypeScript Practices
- Enable `strict` and `noUncheckedIndexedAccess` in `tsconfig`.
- Prefer `type` for unions/intersections and `interface` for object shapes that might be extended.
- Avoid `any`; use `unknown` with type guards when necessary.
- Model API responses with zod/io-ts validators and derive types from schemas.
- Avoid type assertions unless you can prove correctness with runtime checks.

## Unit Test Writing
- Use React Testing Library for UI; test user behavior, not implementation details.
- Keep tests isolated and deterministic; avoid relying on timers or real network.
- Use MSW or fetch mocks for API calls.
- Use `screen` queries that reflect user intent (e.g., `getByRole`, `getByLabelText`).
- Keep test data minimal and focused; prefer factories for complex fixtures.

## E2E Testing
- Use Playwright or Cypress for cross-browser flows.
- Test critical user journeys (auth, CRUD, checkout, etc.) with minimal dependencies.
- Seed test data via API or fixtures; avoid brittle UI setup steps.
- Keep assertions user-visible; avoid asserting internal implementation.
- Run E2E in CI with a consistent, disposable environment.

## GitHub Actions
- Use separate workflows for CI (lint, typecheck, unit tests) and E2E.
- Cache dependencies using `actions/setup-node` with `cache: npm`/`pnpm`/`yarn`.
- Use `npm ci` (or equivalent) for reproducible installs.
- Add a `typecheck` job using `tsc --noEmit`.
- Run lint and tests in parallel jobs; fail fast on type errors.
- For E2E, upload artifacts (screenshots/videos) on failure.
