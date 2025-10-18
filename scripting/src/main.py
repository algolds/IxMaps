from glob import glob
from pathlib import Path
from utils import get_geom_and_attributes

svgs = glob('/content/*.svg')
has_subgrouped = ('altitude-layers',)
paths = {}

for svg in svgs:
  stem = Path(svg).stem
  is_subgrouped = stem in has_subgrouped
  paths[stem] = get_geom_and_attributes(svg, is_subgrouped)
paths.keys()