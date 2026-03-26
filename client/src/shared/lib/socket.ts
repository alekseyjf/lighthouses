import { authStore } from '../../store/authStore';
import {
  parseMarkersPayloadJson,
  type MarkerServerPayload,
} from '../types/markerPayload';

/**
 * Opens an authenticated WebSocket to the mock server, delivers parsed marker arrays via `onMessage`.
 * On unexpected close: refreshes the access token and reconnects (up to `MAX_ATTEMPTS`), then logs out.
 * Call `close()` on cleanup to avoid refresh/reconnect (e.g. logout).
 */
export function createSocket(onMessage: (data: MarkerServerPayload[]) => void) {
  let socket: WebSocket | null = null;
  /** Browser `setTimeout` id (`number`); avoids clashing with Node’s `Timeout` typing. */
  let reconnectTimeout: number | undefined;
  let attempts = 0;
  const MAX_ATTEMPTS = 5;
  let manualClose = false;

  const connect = () => {
    if (!authStore.accessToken) return;

    socket = new WebSocket(
      `ws://localhost:4000?token=${authStore.accessToken}`
    );

    socket.onopen = () => {
      console.log("✅ Connected");
      attempts = 0;
    };

    socket.onmessage = (event) => {
      const raw =
        typeof event.data === 'string'
          ? event.data
          : event.data instanceof ArrayBuffer
            ? new TextDecoder().decode(event.data)
            : String(event.data);

      const data = parseMarkersPayloadJson(raw);
      if (data === null) {
        console.warn('WebSocket: skipped message (invalid JSON or marker array shape)');
        return;
      }
      onMessage(data);
    };

    socket.onclose = () => {
      if (manualClose) {
        manualClose = false;
        return;
      }

      console.log("🔄 WebSocket closed, refresh token and reconnect...");

      void (async () => {
        try {
          await authStore.refresh();
        } catch {
          authStore.logout();
          return;
        }

        if (attempts < MAX_ATTEMPTS) {
          attempts++;
          reconnectTimeout = window.setTimeout(connect, 2000);
        } else {
          console.log("❌ Too many reconnect attempts");
          authStore.logout();
        }
      })();
    };

    socket.onerror = () => {
      socket?.close();
    };
  };

  connect();

  return {
    close: () => {
      manualClose = true;
      socket?.close();
      if (reconnectTimeout !== undefined) clearTimeout(reconnectTimeout);
    },
  };
}
