import Background from '../assets/background.geojson?raw';
import altitudes from '../assets/altitudes.geojson?raw';
import climate from '../assets/climate.geojson?raw';
import icecaps from '../assets/icecaps.geojson?raw';
import lakes from '../assets/lakes.geojson?raw';
import political from '../assets/political.geojson?raw';
import rivers from '../assets/rivers.geojson?raw';

const mapSources = {
    'background': JSON.parse(Background),
    'altitudes': JSON.parse(altitudes),
    'climate': JSON.parse(climate),
    'icecaps': JSON.parse(icecaps),
    'lakes': JSON.parse(lakes),
    'political': JSON.parse(political),
    'rivers': JSON.parse(rivers)
};

export default mapSources;