from shapely import Polygon, MultiPolygon, LineString, MultiLineString
import geopandas as gpd

# Create background
background = paths['background']
geom = background[0]['geom']
Polygon(geom)
background[0]['geom'] = Polygon(geom)
gpd.GeoDataFrame(background).set_geometry('geom').set_crs('epsg:4326').to_file('background.geojson', driver='GeoJSON')