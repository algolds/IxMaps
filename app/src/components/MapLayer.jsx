import {Source, Layer} from 'react-map-gl/maplibre';
import generateStyle  from '../utils/mapStyles';
import mapSources from '../utils/mapSources';

export default function MapLayer({dataID}) {
    const dataSource = mapSources[dataID];
    const layerStyle = generateStyle(dataID);
    return (
    <Source type="geojson" data={dataSource} >
        <Layer {...layerStyle} />
    </Source> )
}