# Client (React + Vite)

Browser app: Material UI login, MobX state, Leaflet map, WebSocket marker stream from the mock server.

## Requirements

- Node.js 18+
- Backend running: HTTP `http://localhost:3001` and WebSocket `ws://localhost:4000` (see `../server/README.md`)

## Setup

```bash
npm install
```

## Scripts

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `npm run dev`  | Vite dev server (default `http://localhost:5173`) |
| `npm run build`| `tsc -b` then production bundle to `dist/`      |
| `npm run preview` | Serve `dist/` locally                        |
| `npm run lint` | ESLint                                           |

## Demo login

Use credentials from the mock server (default: **admin** / **123456**).

## Stack

TypeScript, React 19, MobX, MUI, Axios, Leaflet, react-leaflet, Vite.

## Project notes

- Authenticated WebSocket URL: `ws://localhost:4000?token=<access JWT>`.
- Map view is lazy-loaded after login to keep the initial chunk smaller (`App.tsx`).
- Vendor chunks are split in `vite.config.ts` (`manualChunks`).
