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

## Possible extensions

The following improvements were intentionally left out to keep the implementation focused and within the scope of the test task. They reflect how the project could evolve in a production scenario.


| Area | Idea |
|------|------|
| **Auth UX** | Surface **login errors** clearly: wrong password vs network/timeout vs server 500 (map `axios` errors to user-visible messages). |
| **Lost objects** | **Notifications** when a marker becomes lost: MUI `Snackbar` / toast (“Object `id` lost”), optional **event log** or side panel listing recent losses and removals. |
| **Connection** | Banner or icon for **WebSocket state** (connecting / connected / reconnecting / failed) so users know why the map stopped updating. |
| **Config** | Move `localhost` URLs and ports into **`.env`** (`VITE_API_URL`, etc.) for staging and README clarity. |
| **Map scale** | **Marker clustering** or canvas layer when many markers overlap at low zoom; **search/filter** by id. |
| **Server mock** | Per-object `removed` or **tombstone** events instead of only full snapshots (closer to real tracking APIs). |
| **Quality** | Unit tests (e.g. payload parsing, bearing math), basic **E2E** (login → map visible), **a11y** pass on forms and toolbar. |

None of this is required for the test task; treat it as a backlog you can mention in an interview or portfolio write-up.
