import xml.etree.ElementTree as ET
from typing import List
from svgpathtools import parse_path
from glob import glob
from pathlib import Path
import numpy as np
import re
from shapely.geometry import MultiPolygon, MultiLineString

def flatten_inkscape(inkscape_svg_path: str, subgrouped: bool = False) -> List:
  # returns a list of xm.elemnt.tree objects
  out = []
  l = ET.parse(inkscape_svg_path)
  root_group = l.getroot()[2]
  if not subgrouped:
    for path in root_group:
       out.append(path)
  else:
    for subgroup in root_group:
      subgroup_name = subgroup.get('id')
      for path in subgroup:
        path.set('ixmap-subgroup', subgroup_name)
        out.append(path)
  return out

def build_attribute_dict(xml_path):
  out = {}

  out['id'] = xml_path.get('id')
  out['ixmap-subgroup'] = xml_path.get('ixmap-subgroup')
  style = xml_path.get('style')
  if not style:
    out['fill'] = None
  else:
    styles = style.split(';')
    style_dict = dict([style.split(':') for style in styles])
    out['fill'] = style_dict.get('fill')

  return out

def transform_point(svg_point):
  x_offset, y_offset = -0.02539063, 1457.2676
  scale_ratio = 71.1807

  raw = (svg_point.real, svg_point.imag)
  x, y = float(svg_point.real), float((svg_point.imag))

  x = (x - x_offset) / scale_ratio
  y = (y - y_offset) / scale_ratio
  return x -180, 90-y

def remove_redundant_coords(path):
  try:
    first = path[0].start
    begin = transform_point(first)
    nodes = [begin]
    for p in path:
      nodes.append(transform_point(p.end))
    return nodes
  except Exception as e:
    print(e)

def split_path(xml_path):
  return re.findall(r'M[^M]+', xml_path)

def d_to_coords(d: List, geom_type: str = 'multipolygon'):
  geom_map = { 'multipolygon': MultiPolygon, 'multilinestring': MultiLineString }
  if not d or len(d) < 1:
    raise Exception('empty path')
  shapely_type = geom_map[geom_type]
  wkt = []
  for idx, svg_d in enumerate(d):
    try:
      cleaned = remove_redundant_coords(svg_d)
      wkt.append(cleaned)
    except Exception as e:
      print(cleaned, '\n', e)
  return wkt

def get_geom_and_attributes(inkscape_xml_file, is_subgrouped) -> dict:
  inkscape = flatten_inkscape(inkscape_xml_file, is_subgrouped)
  valid = []
  invalid = []
  for element in inkscape:
    attributes = build_attribute_dict(element)

    geom = element.get('d')
    attributes['geom'] = geom
    try:
      assert geom is not None
      valid.append(attributes)
    except AssertionError as e:
      print(inkscape_xml_file, ' -> ', attributes, 'd is empty')
      invalid.append(attributes)
      continue
    geom = split_path(geom)
    if len(geom) == 1:
      geom = geom[0]
      geom = parse_path(geom)
      geom = remove_redundant_coords(geom)
      attributes['geom'] = geom
    else:
      geom = [parse_path(path) for path in geom]
      geom = [remove_redundant_coords(g) for g in geom]
    attributes['geom'] = geom
  return valid
