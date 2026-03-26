import { MarkerEntity } from './marker.types';
import { generateMarkers } from './marker.generator';

let markers: MarkerEntity[] = generateMarkers(200);

export function getMarkers() {
  return markers;
}

/**
 * Mock tick: jitters positions/directions and occasionally removes one marker (simulates “lost” markers).
 */
export function updateMarkers() {
  markers = markers.map(marker => ({
    ...marker,
    lat: marker.lat + (Math.random() - 0.5) * 0.05,
    lng: marker.lng + (Math.random() - 0.5) * 0.05,
    direction: Math.random() * 360,
  }));

  // lose marker
  if (Math.random() > 0.7 && markers.length > 20) {
    markers.splice(Math.floor(Math.random() * markers.length), 1);
  }
}
