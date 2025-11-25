import React, { useEffect, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const LocationManager = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AMapLoader.load({
      key: '9054e96c6d799794f0757caf5808a2df', // Replace with your actual API Key
      version: '2.0',
      plugins: ['AMap.Geolocation', 'AMap.Geocoder'],
    })
      .then((AMap) => {
        const mapInstance = new AMap.Map('map-container', {
          zoom: 11,
          center: [116.397428, 39.90923], // Default to Beijing
        });

        setMap(mapInstance);
        setLoading(false);

        mapInstance.on('click', (e) => {
          const { lng, lat } = e.lnglat;
          onLocationSelect({ lng, lat });

          // Add a marker
          mapInstance.clearMap();
          new AMap.Marker({
            position: [lng, lat],
            map: mapInstance,
          });
        });
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to load map. Please check your API Key.');
        setLoading(false);
      });

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

  const handleGetCurrentLocation = () => {
    if (!map) return;

    AMapLoader.load({
      key: '9054e96c6d799794f0757caf5808a2df',
      version: '2.0',
      plugins: ['AMap.Geolocation'],
    }).then((AMap) => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        zoomToAccuracy: true,
      });

      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          const { lng, lat } = result.position;
          onLocationSelect({ lng, lat });
          map.setCenter([lng, lat]);
          map.clearMap();
          new AMap.Marker({
            position: [lng, lat],
            map: map,
          });
        } else {
          setError('Failed to get current location.');
        }
      });
    });
  };

  return (
    <div className="location-manager">
      <div className="controls">
        <button onClick={handleGetCurrentLocation} disabled={loading}>
          Get Current Location
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <div id="map-container" style={{ width: '100%', height: '300px', marginTop: '10px' }}></div>
    </div>
  );
};

export default LocationManager;
