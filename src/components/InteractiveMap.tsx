import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';

const InteractiveMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const lat = 43.5890;
    const lng = -79.6441; // Mississauga, ON

    // Initialize Leaflet map without any API keys
    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 12,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    // OpenStreetMap tiles (no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Use design token for marker color
    const primary = (typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
      : '210 90% 50%') || '210 90% 50%';
    const color = `hsl(${primary})`;

    // Add a circle marker and popup
    const circle = L.circleMarker([lat, lng], {
      radius: 12,
      color,
      fillColor: color,
      fillOpacity: 0.9,
    }).addTo(map);

    circle.bindPopup(
      '<div style="font-weight:600">Ascent Group Construction</div>' +
        '<div>123 Construction Way<br/>Mississauga, ON L5B 1M5</div>'
    );

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <Card className="p-0 overflow-hidden rounded-2xl shadow-lg">
      <div ref={mapContainerRef} className="h-96 w-full" />
    </Card>
  );
};

export default InteractiveMap;
