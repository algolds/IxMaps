import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl/maplibre';
import { addProtocol, removeProtocol } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import LayerToggle from './LayerToggle';
import mapStyle from '../assets/mapStyle.json';
import { Protocol } from "pmtiles";

const DOMAIN = import.meta.env.PROD ? import.meta.env.VITE_PROD_DOMAIN : "http://localhost:5173";

let newStyle = { ...mapStyle };

newStyle['glyphs'] = `${DOMAIN}/map-fonts/{fontstack}/{range}.pbf`;
newStyle.sources["ix-tiles"].url = `pmtiles://${DOMAIN}/pmtiles/ixmaps.pmtiles`;


export default function MapComponent() {

  const mapRef = useRef()
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapStyleState, setMapStyleState] = useState(newStyle)
  const layerIds = ['background',
    'climate', 'icecaps', 'lakes',
    'political', 'rivers',
    'altitudes', 'political-names'];

  useEffect(() => {
    let protocol = new Protocol();
    addProtocol("pmtiles", protocol.tile);
    return () => {
      removeProtocol("pmtiles");
    };
  }, []);



  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Map
        reuseMaps
        renderWorldCopies={false}
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1
        }}
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
        mapStyle={mapStyleState}
        onLoad={() => { setMapLoaded(true) }}
      >
        {mapLoaded && <LayerToggle mapRef={mapRef} layerIds={layerIds} setMapStyleState={setMapStyleState} />}
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
      </Map>
    </Box>
  );
}