
# For Line Geometry Only
altitudes = paths['rivers']

valids_alt = []

for alt in altitudes:
  geom = alt['geom']
  if not geom:
    print('Warning: No geom found for', alt['id'])
    continue

  # Multipolygon
  if isinstance(geom[0], list):
    multigeom = []
    for g in geom:
      if len(g) < 1:
        print('Error: Invalid subpolygon', g)
      else:
        multigeom.append(LineString(g))
    valids_alt.append({**alt, 'geom': MultiLineString(multigeom)})
  # Polygon
  else:
    if len(geom) < 1:
      print('Error: Invalid single', geom)
    else:
      valids_alt.append({**alt, 'geom': LineString(geom)})

gpd.GeoDataFrame(valids_alt).set_geometry('geom').set_crs('epsg:4326').plot()