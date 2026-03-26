# Server (Express + WebSocket mock)

Mock API for the test assignment: JWT login/refresh over HTTP and periodic marker broadcasts over WebSocket.

## Requirements

- Node.js 18+

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

This starts:

| Service | URL / port |
|---------|------------|
| HTTP API | `http://localhost:3001` |
| WebSocket | `ws://localhost:4000?token=<access JWT>` |

## HTTP routes

Mounted under `/auth`:

- `POST /auth/login` — body: `{ "username", "password" }` → `{ accessToken, refreshToken }`
- `POST /auth/refresh` — body: `{ "refreshToken" }` → `{ accessToken }`

## Mock user

- Username: `admin`
- Password: `123456`

Defined in `src/modules/auth/auth.service.ts` (bcrypt hash).

## WebSocket protocol

1. Client connects with **access** JWT: `ws://localhost:4000?token=...`
2. Server verifies the token; otherwise the socket is closed.
3. Every **2 seconds**: in-memory markers are updated (`updateMarkers`) and the **full array** is sent as one JSON text frame (array of `{ id, lat, lng, direction }`).

## Security note

JWT secrets in `src/configs/jwt.ts` are hard-coded for local development only. Use environment variables in production.

## Stack

TypeScript, Express, `ws`, `jsonwebtoken`, `bcrypt`, `cors`.
