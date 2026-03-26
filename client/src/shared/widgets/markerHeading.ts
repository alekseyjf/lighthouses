import type { MarkerEntity } from '../../store/markersStore';
import { bearingDeg } from '../lib/bearing';

const EPS2 = 1e-16;

/**
 * Heading (degrees) for the marker icon: matches interpolated motion toward `targetLat`/`targetLng`.
 * When already at the target (within epsilon), falls back to server-provided `direction`.
 */
export function markerDisplayHeading(marker: MarkerEntity): number {
  const dLat = marker.targetLat - marker.lat;
  const dLng = marker.targetLng - marker.lng;
  if (dLat * dLat + dLng * dLng < EPS2) {
    return marker.direction;
  }
  return bearingDeg(marker.lat, marker.lng, marker.targetLat, marker.targetLng);
}
