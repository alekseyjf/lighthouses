# Lighthouses — map tracking demo

Test-assignment style monorepo: a **React** client shows moving objects on a **Leaflet** map; a **Node** mock server provides JWT auth and a WebSocket stream of marker updates.

## Repository layout

| Folder    | Role |
|-----------|------|
| [`client/`](./client/) | Vite + React + TypeScript + MobX + MUI + Leaflet |
| [`server/`](./server/) | Express (REST auth) + `ws` (marker broadcast) |

Each package has its own `package.json` and README with details.

## Quick start

1. **Start the server** (HTTP + WebSocket):

   ```bash
   cd server
   npm install
   npm run dev
   ```

   - API: `http://localhost:3001`
   - WebSocket: `ws://localhost:4000?token=<access JWT>`

2. **Start the client**:

   ```bash
   cd client
   npm install
   npm run dev
   ```

   Open the URL Vite prints (usually `http://localhost:5173`).

3. **Log in** with the mock credentials from [`server/README.md`](./server/README.md) (default: `admin` / `123456`).

## Production build (client)

```bash
cd client
npm run build
npm run preview   # optional: test dist/ locally
```

The server is intended as a **mock**; run it with `npm run dev` in `server/` while developing.

## Documentation

- [Client README](./client/README.md) — scripts, stack, behaviour
- [Server README](./server/README.md) — routes, WebSocket protocol, demo user

## Tech summary

**Client:** TypeScript, React, MobX, Material UI, Axios, Leaflet, react-leaflet, Vite.

**Server:** TypeScript, Express, `ws`, `jsonwebtoken`, `bcrypt`, CORS.
