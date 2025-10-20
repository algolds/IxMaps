from glob import glob
from pathlib import Path
from utils import get_geom_and_attributes
from create_features import create_background, create_line, create_polygon

SVG_DIR = Path('/path/to/svg/directory')
GEOJSON_DIR = Path(__file__).parent / 'geojson'
GEOJSON_DIR.mkdir(exist_ok=True)

POLYGONS = ('altitude-layers', 'climate', 'icecaps', 'lakes', 'political')
LINES = ('rivers',)
BACKGROUND = ('background',)

svgs = glob(f'{SVG_DIR}/*.svg')
# SVGs that have subgrouped elements
has_subgrouped = ('altitude-layers',)
paths = {}

for svg in svgs:
  stem = Path(svg).stem
  is_subgrouped = stem in has_subgrouped
  paths[stem] = get_geom_and_attributes(svg, is_subgrouped)
  if stem in POLYGONS:
    gdf = create_polygon(paths[stem])
  elif stem in LINES:
    gdf = create_line(paths[stem])
  elif stem in BACKGROUND:
    gdf = create_background(paths[stem])
  gdf.to_file(f'{GEOJSON_DIR}/{stem}.geojson', driver='GeoJSON')