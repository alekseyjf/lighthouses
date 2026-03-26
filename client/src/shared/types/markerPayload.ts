/** One tracked object as sent over the WebSocket (matches the mock server payload). */
export type MarkerServerPayload = {
  id: string;
  lat: number;
  lng: number;
  direction: number;
};

function isMarkerServerPayload(x: unknown): x is MarkerServerPayload {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.lat === 'number' &&
    Number.isFinite(o.lat) &&
    typeof o.lng === 'number' &&
    Number.isFinite(o.lng) &&
    typeof o.direction === 'number' &&
    Number.isFinite(o.direction)
  );
}

/**
 * Parses a WebSocket text frame: `JSON.parse` in try/catch, then validates an array of marker objects.
 * @returns Parsed markers, or `null` if JSON is invalid or shape does not match.
 */
export function parseMarkersPayloadJson(raw: string): MarkerServerPayload[] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed)) return null;

  const out: MarkerServerPayload[] = [];
  for (const item of parsed) {
    if (!isMarkerServerPayload(item)) return null;
    out.push(item);
  }
  return out;
}
