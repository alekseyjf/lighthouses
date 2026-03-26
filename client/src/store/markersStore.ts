import { makeAutoObservable } from 'mobx';
import type { MarkerServerPayload } from '../shared/types/markerPayload';

/** No server update for this long → marker is shown as lost (e.g. lower opacity). */
const LOST_AFTER_MS = 5000;
/** No server update for this long → marker is removed from the map. */
const REMOVE_AFTER_LOST_MS = 5 * 60 * 1000;

export type MarkerEntity = MarkerServerPayload & {

  targetLat: number;
  targetLng: number;

  lastUpdated: number;
  isLost: boolean;
};

class MarkersStore {
  markers = new Map<string, MarkerEntity>();

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Merges a server snapshot: new markers appear at the given position; existing ones move toward
   * `targetLat`/`targetLng` (animated separately by `animateMarkers`).
   */
  updateMarkers(data: MarkerServerPayload[]) {
    const now = Date.now();
  
    data.forEach(marker => {
      const existing = this.markers.get(marker.id);
  
      if (existing) {
        existing.targetLat = marker.lat;
        existing.targetLng = marker.lng;
        existing.direction = marker.direction;
        existing.lastUpdated = now;
        existing.isLost = false;
      } else {
        this.markers.set(marker.id, {
          ...marker,
          lat: marker.lat,
          lng: marker.lng,
          targetLat: marker.lat,
          targetLng: marker.lng,
          lastUpdated: now,
          isLost: false,
        });
      }
    });
  }
  

  /** Marks stale markers as lost and deletes those absent long enough (see time constants above). */
  checkLostMarkers() {
    const now = Date.now();
    const toRemove: string[] = [];

    this.markers.forEach(marker => {
      const stale = now - marker.lastUpdated;

      if (stale > REMOVE_AFTER_LOST_MS) {
        toRemove.push(marker.id);
        return;
      }

      marker.isLost = stale > LOST_AFTER_MS;
    });

    toRemove.forEach(id => this.markers.delete(id));
  }

  /** Linearly interpolates each marker’s position toward its target (lower `speed` = smoother). */
  animateMarkers() {
    this.markers.forEach(marker => {
      const speed = 0.05;
  
      marker.lat += (marker.targetLat - marker.lat) * speed;
      marker.lng += (marker.targetLng - marker.lng) * speed;
    });
  } 
}

export const markersStore = new MarkersStore();
