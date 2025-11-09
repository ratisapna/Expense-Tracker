## Copilot / AI agent instructions for this repo

This file gives concise, actionable context so an AI coding agent can be immediately productive.

### Big picture
- Frontend is a React + Vite single-page app (root files: `index.html`, `vite.config.js`).
- State is managed with Redux Toolkit; the store is in `src/app/store.js` and exposes reducers: `auth`, `expenses`, and `ai`.
- API calls go through a single Axios instance at `src/utils/api.js` which sets `baseURL` to `http://localhost:3000/api` and automatically attaches a bearer token from `localStorage`.
- UI pages live in `src/pages/` and are wired by React Router. Reusable UI is in `src/components/` and feature logic in `src/features/`.

### Key files to inspect / modify
- `src/app/store.js` — shows top-level reducers (auth, expenses, ai). Add new feature slice here when needed.
- `src/utils/api.js` — single Axios instance & interceptor (token read from `localStorage`). Keep auth header behavior consistent when adding endpoints.
- `src/features/*/` — convention: each feature has a `service.js` (API calls) and `slice.js` (RTK slice + thunks). Example locations:
  - `src/features/expenses/expenseService.js`
  - `src/features/expenses/expenseSlice.js`
  Note: several `service.js` / `slice.js` files are present but currently empty—follow the established pattern.
- `src/pages/*.jsx` — pages that compose components and connect to Redux selectors / dispatchers (e.g., `src/pages/AddExpense.jsx`).

### Project-specific conventions and patterns
- Redux Toolkit is the canonical state pattern. Use `createSlice` + async thunks (or RTK Query if introduced later).
- Keep API logic in `feature` service files and slice logic in `slice.js`. Do not call `axios` directly from components—use the service layer.
- The single `api` instance attaches Authorization from `localStorage` (key: `token`). Any auth changes must preserve that flow or update `api.js` accordingly.
- Styling uses Tailwind; config is in `tailwind.config.js` and styles are imported in `src/index.css`.

### Build / run / lint commands (from `package.json`)
- Start dev server with: `npm run dev` (uses Vite, HMR enabled).
- Create a production build: `npm run build`.
- Preview a build: `npm run preview`.
- Run ESLint: `npm run lint`.

Notes for agents: these scripts are defined in `package.json` at project root. Use the dev server during iterative UI changes. Backend is expected at `http://localhost:3000/api` by default.

### Typical change workflow examples (concrete)
- Add a new feature `todos`:
  1. Create `src/features/todos/todoService.js` -> implement API calls using `src/utils/api.js`.
  2. Create `src/features/todos/todoSlice.js` -> createSlice + thunks calling `todoService`.
  3. Add the slice reducer to `src/app/store.js` under a new key `todos`.
  4. Add pages/components under `src/pages/` and `src/components/` that dispatch thunks and select state.

### Integration points & external dependencies
- Backend: expected at `http://localhost:3000/api`. Verify endpoints before implementing features.
- Third-party libraries to be aware of: `@reduxjs/toolkit`, `axios`, `react-router-dom@7`, `react-toastify`, `tailwindcss`.

### What not to change without verification
- `src/utils/api.js` baseURL and interceptor behavior — changing this affects all API calls and auth flows.
- `src/app/store.js` reducer keys — changing names requires updates across selectors and connected components.

If anything in this file is unclear or you want more detail (for example: specific slice examples or tests), tell me which area to expand and I will update this doc.
