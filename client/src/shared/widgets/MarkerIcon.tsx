import L from 'leaflet';

const ICON = 24;
const HALF = ICON / 2;

/**
 * Leaflet `DivIcon` with an SVG arrow rotated to the given map bearing.
 * @param bearingDeg Geographic bearing: 0° north, 90° east. The SVG points east by default, so CSS uses `bearingDeg - 90`.
 */
export const createRotatedIcon = (bearingDeg: number) => {
  const cssRotate = bearingDeg - 90;
  return L.divIcon({
    className: 'custom-marker',
    iconSize: [ICON, ICON],
    iconAnchor: [HALF, HALF],
    html: `
      <div style="
        width: ${ICON}px;
        height: ${ICON}px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center center;
        transform: rotate(${cssRotate}deg);
      ">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 16l20-4-20-4v3l14 1-14 1v3z"/>
        </svg>
      </div>
    `,
  });
};
