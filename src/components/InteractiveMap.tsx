import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenEntered, setTokenEntered] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    // Coordinates for Mississauga, ON
    const mississaugaCoords: [number, number] = [-79.6441, 43.5890];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: mississaugaCoords,
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add a marker for the business location
    new mapboxgl.Marker({ color: '#0EA5E9' })
      .setLngLat(mississaugaCoords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            '<div style="padding: 8px;"><h3 style="font-weight: bold; margin-bottom: 4px;">Ascent Group Construction</h3><p style="font-size: 14px; color: #666;">123 Construction Way<br/>Mississauga, ON L5B 1M5</p></div>'
          )
      )
      .addTo(map.current);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setTokenEntered(true);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!tokenEntered) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-heading font-bold mb-2">Interactive Map</h3>
          <p className="text-muted-foreground mb-4">
            To view our location on an interactive map, please enter your Mapbox public token.
          </p>
          <p className="text-sm text-muted-foreground">
            Get your free token at{' '}
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
        <form onSubmit={handleTokenSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="h-12"
          />
          <Button type="submit" className="w-full">
            Load Map
          </Button>
        </form>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
