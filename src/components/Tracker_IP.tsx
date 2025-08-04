import 'leaflet/dist/leaflet.css';
import L, { Map, Marker } from 'leaflet';
import { useState, useEffect, useRef } from 'react';

interface Location {
  country: string;
  region: string;
  city: string;
  postalCode?: string;
  timezone?: string;
  lat?: number;
  lng?: number;
}

interface AsInfo {
  name?: string;
  domain?: string;
}

interface SearchIp {
  ip: string;
  location: Location;
  asInfo: AsInfo;
  isp?: string;
}

interface InputProps {
  ipValue: string;
  onChange: (ip: string) => void;
}

const API_KEY_IPIFY = import.meta.env.VITE_IPIFY_API_KEY;

const Tracker_IP: React.FC<InputProps> = ({ ipValue }) => {
  const [ipData, setIpData] = useState<SearchIp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    const fetchFromAPI = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_IPIFY}&ipAddress=${ipValue}`
        );
        const data = await response.json();

        if (!data.ip || !data.location || !data.as) {
          throw new Error('Invalid API Response');
        }

        const parsedData: SearchIp = {
          ip: data.ip,
          isp: data.isp,
          location: {
            country: data.location.country,
            region: data.location.region,
            city: data.location.city,
            postalCode: data.location.postalCode,
            timezone: data.location.timezone,
            lat: data.location.lat,
            lng: data.location.lng,
          },
          asInfo: {
            name: data.as.name,
            domain: data.as.domain,
          },
        };

        setIpData(parsedData);
        setError(null);

        const { lat, lng } = parsedData.location;

        if (lat !== undefined && lng !== undefined) {
          if (!mapRef.current) {
            mapRef.current = L.map('map').setView([lat, lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors',
            }).addTo(mapRef.current);
          } else {
            mapRef.current.setView([lat, lng], 13);
          }

          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
          }

          markerRef.current
            .bindPopup(`
              <b>IP:</b> ${parsedData.ip}<br/>
              <b>City:</b> ${parsedData.location.city}<br/>
              <b>Country:</b> ${parsedData.location.country}<br/>
              <b>ISP:</b> ${parsedData.isp || 'N/A'}
            `)
            .openPopup();
        }
      } catch (e) {
        console.error('Failed to fetch IP data:', e);
        setError('Error getting info from API!');
        setIpData(null);
      } finally {
        setLoading(false);
      }
    };

    if (ipValue) {
      fetchFromAPI();
    }
  }, [ipValue]);

  return (
    <>
      <div className="w-full">
        {error && <div className="text-red-500">{error}</div>}
        <div id="map" className="w-full h-screen rounded-md shadow" />
      </div>
    </>
  );
};

export default Tracker_IP;
