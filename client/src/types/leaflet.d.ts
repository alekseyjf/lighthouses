/**
 * Мінімальні типи для `leaflet`, яких вимагає `react-leaflet` у .d.ts.
 * Пакет `leaflet` не шипить власні типи; офіційна альтернатива — `npm i -D @types/leaflet`
 * (тоді цей файл можна видалити, якщо не буде конфлікту злиття).
 */
declare module 'leaflet' {
  export type LeafletEventHandlerFnMap = Record<
    string,
    (event: unknown) => void
  >;

  export class Evented {
    on(type: string, fn: (event: unknown) => void): this;
    off(type: string, fn?: (event: unknown) => void): this;
  }

  export type LatLngExpression = [number, number] | { lat: number; lng: number };
  export type LatLngBoundsExpression = LatLngExpression | LatLngExpression[];

  export interface FitBoundsOptions {
    padding?: number;
    maxZoom?: number;
  }

  export class Layer extends Evented {}
  export class Icon extends Layer {}
  export class DivIcon extends Icon {}
  export class TileLayer extends Layer {}
  export class Marker extends Layer {}
  export class Map extends Evented {}

  export interface LayerOptions {
    pane?: string;
    attribution?: string;
  }

  export interface InteractiveLayerOptions extends LayerOptions {}

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    layers?: Layer[];
    maxBounds?: LatLngBoundsExpression;
    renderer?: unknown;
  }

  export interface TileLayerOptions extends LayerOptions {
    attribution?: string;
    opacity?: number;
  }

  export interface MarkerOptions extends InteractiveLayerOptions {
    icon?: Icon | DivIcon;
    opacity?: number;
    draggable?: boolean;
  }

  export function divIcon(options: {
    className?: string;
    html?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
  }): DivIcon;

  const L: {
    divIcon: typeof divIcon;
  };

  export default L;
}
