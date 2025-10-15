import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box } from '@mui/material';
import MapLayer from './MapLayer';
import { useRef, useState } from 'react';
import LayerToggle from './LayerToggle';

export default function MapComponent() {

  const mapRef = useRef()
  const [mapLoaded, setMapLoaded] = useState(false);
  const layerIds = ['background', 'climate', 'icecaps', 'lakes', 'political', 'rivers', 'altitudes'];

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Map
        reuseMaps
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1
        }}
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
        onLoad = {() => setMapLoaded(true)}
      >
        {mapLoaded && <LayerToggle mapRef={mapRef} layerIds={layerIds} />}
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {
          layerIds.map((dataId) => <MapLayer key={dataId} dataID={dataId} />)
        }
      </Map>
    </Box>
  );
}