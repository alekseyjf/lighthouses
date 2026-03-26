import { MarkerEntity } from './marker.types';

/** Builds `count` random markers around Dnipro (demo bounding box). */
export function generateMarkers(count = 50): MarkerEntity[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: String(i),
    lat: 48.45 + Math.random() * 0.1,
    lng: 34.98 + Math.random() * 0.1,
    direction: Math.random() * 360,
  }));
}
