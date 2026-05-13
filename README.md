# Career Navigator (MVP)

This repository contains the Career Navigator MVP.

## CareerNavigatorWebFrontend (React)

Location:

- `career-navigator-23819-23865/CareerNavigatorWebFrontend`

### Run (local / preview)

From `career-navigator-23819-23865/CareerNavigatorWebFrontend`:

```bash
npm install
npm run dev
```

### Environment variables

Vite requires variables to be prefixed with `VITE_`.

- `VITE_API_BASE_URL` (default: `http://localhost:3001`)
- `VITE_USE_STUB_API` (default: `true`) — when `true`, the frontend will use deterministic stub endpoints until the backend is implemented.

## Notes

- Step flows are scaffolded per the approved plan and BRD v0.2 (Dashboard + 5 phases).
- Backend container will be implemented next and the frontend can switch from stubbed API to real API by setting `VITE_USE_STUB_API=false`.
