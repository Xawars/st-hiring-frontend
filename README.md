# Eventim Frontend Test

React UI for the Eventim hiring assessment. It talks to the backend API through the Vite dev-server proxy.

## Tech Stack

- Node 22
- React 18 + TypeScript
- Vite
- MUI (Material UI v5)
- Redux Toolkit
- Formik + Yup

## Requirements

- NVM (run `nvm use` so Node matches `.nvmrc`)
- Yarn (not npm). This repo uses the committed Yarn 3.6.4 binary.
- The backend API must already be running on port 3000 (see the backend README)

## Setup

1. Clone this repository
2. Run `nvm use` to switch to the Node version in `.nvmrc`
3. Run `yarn install` to install dependencies
4. Run `yarn dev` to start Vite

The app is at [http://localhost:5173](http://localhost:5173).

The backend and frontend must run at the same time. Start the backend first (Docker databases, `.env`, migrations, seed, `yarn start`), then this app.

## API proxy

The browser calls relative paths only:

- `/events`
- `/settings`

Vite proxies those requests to Express on port 3000. Do not call `localhost:3000/events` or `localhost:3000/settings` from the browser.

## Current UI

The app has **Events** and **Settings** tabs.

**Events** loads from `GET /events` and keeps the list in Redux. It shows loading and error states.

**Settings** loads from `GET /settings` and saves with `POST /settings`. State is in Redux. The form uses Formik and Yup for validation, and shows save success or error feedback. Saved settings persist after reload.

The TypeScript `Settings` type matches the public API: `siteName` (string), `contactEmail` (string), `maintenanceMode` (boolean). It does not include Mongo `_id`. Yup validates the form in the browser. Backend POST validation is separate (JSON types only; see the backend README).

## Scripts

```bash
yarn dev     # start Vite
yarn lint    # ESLint
yarn build   # type-check and production build
```

## Architecture Decisions

**Server state in Redux.** Events and Settings data, plus loading and error flags, live in Redux Toolkit. Both tabs need the last successful server payload after navigation. Component state would drop that data when the tab unmounts, or force duplicate fetches.

**Form state vs server state.** Redux holds the Settings document from the API. Formik holds the in-progress draft. Yup validates before submit. Keystrokes stay in Formik so unsaved edits are not mixed into the persisted Redux document and do not re-render the rest of the app.

**API proxy.** `fetch('/events')` and `fetch('/settings')` are relative. Vite proxies them to Express on port 3000. The backend origin stays in `vite.config.ts`, not in UI code, so the browser only talks to the Vite origin.

**Errors.** API helpers throw on non-OK responses using the HTTP status, and Redux/UI show that message. They do not parse or display database or driver internals from the backend.
