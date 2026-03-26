import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { MapContainer, TileLayer } from 'react-leaflet';
import { createSocket } from '../lib/socket';
import { markersStore } from '../../store/markersStore';
import { MarkerItem } from './MarkerItem';

import 'leaflet/dist/leaflet.css';

export const MapView = observer(() => {
  useEffect(() => {
    const socket = createSocket(data => {
      markersStore.updateMarkers(data);
    });

    const interval = setInterval(() => {
      markersStore.checkLostMarkers();
    }, 2000);

    let animationFrame: number;

    const animate = () => {
      markersStore.animateMarkers();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      socket.close();
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <MapContainer
      center={[48.45, 34.98]} // Dnipro 😉
      zoom={13}
      style={{ height: 'calc(97vh - 70px)', width: '100%', marginTop: '70px' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Array.from(markersStore.markers.values()).map(marker => (
        <MarkerItem key={marker.id} marker={marker} />
      ))}
    </MapContainer>
  );
});
