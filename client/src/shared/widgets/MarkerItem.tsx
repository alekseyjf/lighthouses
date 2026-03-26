import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Marker, Popup } from 'react-leaflet';
import type { MarkerEntity } from '../../store/markersStore';
import { createRotatedIcon } from './MarkerIcon';
import { markerDisplayHeading } from './markerHeading';

type MarkerItemProps = {
  marker: MarkerEntity;
};

/**
 * Single map marker: observes MobX entity, rounds heading to integer degrees so `L.divIcon` is not recreated every frame.
 */
export const MarkerItem = observer(({ marker }: MarkerItemProps) => {
  const heading = markerDisplayHeading(marker);
  const headingStep = Math.round(heading) % 360;
  const icon = useMemo(
    () => createRotatedIcon(headingStep),
    [headingStep],
  );

  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={icon}
      opacity={marker.isLost ? 0.3 : 1}
    >
      <Popup>
        {marker.id}
        {marker.isLost ? ' (втрачено)' : ''}
      </Popup>
    </Marker>
  );
});
