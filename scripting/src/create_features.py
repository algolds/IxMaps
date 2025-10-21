from shapely.geometry import Polygon, MultiPolygon, LineString, MultiLineString
import geopandas as gpd

def create_polygon(features):
  valid_features = []
  invalid_features = []

  for feature in features:
    geom = feature['geom']
    if not geom:
      print('Warning: No geom found for', feature['id'])
      continue

    # Multipolygon
    if isinstance(geom[0], list):
      multigeom = []
      for g in geom:
        if len(g) < 4:
          invalid_features.append(feature)
        else:
          multigeom.append(Polygon(g))
      valid_features.append({**feature, 'geom': MultiPolygon(multigeom)})
    # Polygon
    else:
      if len(geom) < 4:
        invalid_features.append(feature)
      else:
        valid_features.append({**feature, 'geom': Polygon(geom)})
  print(f'Invalid polygons: {len(invalid_features)}')
  return gpd.GeoDataFrame(valid_features).set_geometry('geom').set_crs('epsg:4326')


def create_line(line_features):
  valid_features = []
  invalid_features = []

  for feature in line_features:
    geom = feature['geom']
    if not geom:
      print('Warning: No geom found for', feature['id'])
      continue

    # Multiline
    if isinstance(geom[0], list):
      multigeom = []
      for g in geom:
        if len(g) < 1:
          invalid_features.append(feature)
        else:
          multigeom.append(LineString(g))
      valid_features.append({**feature, 'geom': MultiLineString(multigeom)})
    # Line
    else:
      if len(geom) < 1:
        invalid_features.append(feature)
      else:
        valid_features.append({**feature, 'geom': LineString(geom)})
  print(f'Invalid lines: {len(invalid_features)}')
  return gpd.GeoDataFrame(valid_features).set_geometry('geom').set_crs('epsg:4326')

def create_background(background):
  background = background[0]
  geom = background['geom']
  if not geom or len(geom) < 4:
    raise Exception('Invalid background geometry')
  background['geom'] = Polygon(geom)
  return gpd.GeoDataFrame([background]).set_geometry('geom').set_crs('epsg:4326')