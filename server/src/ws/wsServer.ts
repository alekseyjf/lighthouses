import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../configs/jwt';
import { getMarkers, updateMarkers } from '../modules/markers/marker.service';

/**
 * WebSocket on port 4000. Query `?token=<JWT access>` required; invalid/missing token closes the socket.
 * Every 2s: runs mock `updateMarkers()` and sends the full JSON array to the client.
 */
export function createWSServer() {
  const wss = new WebSocketServer({ port: 4000 });

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url!, 'http://localhost');
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close();
      return;
    }

    try {
      jwt.verify(token, JWT_ACCESS_SECRET);
    } catch {
      ws.close();
      return;
    }

    const interval = setInterval(() => {
      updateMarkers();
      ws.send(JSON.stringify(getMarkers()));
    }, 2000);

    ws.on('close', () => clearInterval(interval));
  });

  console.log('WS running with JWT');
}
