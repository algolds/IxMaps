# Scripting: SVG → GeoJSON

This folder contains small Python utilities that convert cleaned Inkscape SVG layer files into GeoJSON files suitable for tiling (see the project README for the full workflow).

Summary of what to run
- Place one SVG per layer into `svg_files/` (this repo already contains example SVGs).
- Run the conversion script `src/main.py`. Output GeoJSON files will be written to `geojson/`.

Requirements
- Python 3.12 or newer (the project `pyproject.toml` sets `requires-python = ">=3.12"`).
- The scripts use geopandas and svgpathtools.

Quick start (Windows / bash)

1) Create and activate a virtual environment (bash):

```bash
python -m venv .venv
source .venv/Scripts/activate
```

2) Install the minimal dependencies:

```bash
pip install --upgrade pip
pip install geopandas svgpathtools
```

Note: On some systems installing `geopandas` will require system packages (GEOS, GDAL, PROJ). On Windows the easiest path is to use prebuilt wheels (pip will usually fetch them) or use conda. If you hit errors, try installing via conda: `conda install -c conda-forge geopandas`.

3) Prepare your SVGs in Inkscape before running the scripts (recommended):

- Set path coordinates to absolute (Edit → Preferences → Input/Output → SVG Output → Path Data → Absolute).
- Apply transforms in-place (Edit → Preferences → Behaviour → Transforms → Store Transformations → Optimised).
- Convert curves to straight segments (Extensions → Modify Paths → Approximate Curves by Straight Line, default 10).
- Ensure the canvas/page aspect ratio is 2:1 (width:height) and the artwork aligns to that extent.

4) Run the conversion script

From the `scripting/` directory run:

```bash
python src/main.py
```

What the script does
- `src/main.py` finds every `*.svg` in `svg_files/`, parses each file, and converts path data into geometries and attributes.
- Polygons (altitude-layers, climate, icecaps, lakes, political) are converted into GeoJSON polygons.
- Lines (rivers) are converted into GeoJSON lines.
- The background layer is converted into a polygon used as the map extent.
- Output files are written to `geojson/<layer>.geojson`.

Where to look
- Input SVGs: `svg_files/`
- Output GeoJSON: `geojson/`
- Main conversion code: `src/main.py`, helpers in `src/utils.py` and `src/create_features.py`.

Troubleshooting
- If features are missing geometry the scripts will print warnings like "Warning: No geom found for <id>".
- If geopandas installation fails on Windows, try installing the binary wheels or use conda as noted above.

Extending or changing behavior
- The script assumes specific layer names for polygons/lines/background. Edit `src/main.py` if you have different layer names.
- Coordinate transform parameters live in `src/utils.py::transform_point` — adjust if your SVG uses a different scale/offset.

License / credits
- See the repository root `README.md` for project credits and licensing notes.

