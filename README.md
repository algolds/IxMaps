# 🗺️ IxMaps

**An Interactive Mapping Workflow for Worldbuilding**

---

## 🌍 Overview

**IxMaps** is a workflow and web app for turning hand-drawn fantasy worlds created in **Inkscape** into **interactive, georeferenced maps** viewable with GIS tools like **QGIS** and **MapLibre**.

Inkscape is an excellent vector editor, but it lacks built-in georeferencing tools — there’s no standard way to align your drawings to real-world (or fictional world) coordinates.
IxMaps solves that problem by providing a simple, reproducible process to:

* Georeference Inkscape layers,
* Convert them into GIS-friendly formats,
* Generate lightweight **PMTiles** for web visualization.

---

## 🧭 Workflow Summary

### 1. Prepare Your Inkscape File

1. **Open your SVG project in Inkscape.**
   Suppose your main project has 6 layers (e.g., altitude, lakes, countries, rivers, etc.).

2. **Export each layer** into its own standalone Inkscape project.
   You’ll end up with 6 separate SVG files — one for each layer.

---

### 2. Convert Path Coordinates to Absolute

Inkscape stores path coordinates as *relative* by default. To simplify the conversion to GIS data, change them to *absolute* coordinates:

```
Edit → Preferences → Input/Output → SVG Output → Path Data → Path String Format → Absolute
```
More on this: [SVG Vector relative to absolute coordinates](https://alpha.inkscape.org/vectors/www.inkscapeforum.com/viewtopic388d.html#p40984)
---

### 3. Set the Map Aspect Ratio

Ensure your project’s page has a **2:1 width-to-height ratio**, corresponding to a global coordinate extent of **360° × 180°**.

---

### 4. Apply Transformations

Inkscape may store [transformations](https://inkscapetutorial.org/transforms.html) (e.g., scale, rotate, translate) that distort true coordinates.
To apply these transformations and preserve the correct coordinates:

```
Edit → Preferences → Behaviour → Transforms → Store Transformations → Optimised
```

More on transformations: [Remove all transforms whilst keeping in-place](https://alpha.inkscape.org/vectors/www.inkscapeforum.com/viewtopic83ee.html#p88689)

---

### 5. Convert Curves to Straight Segments

GIS formats do not support Bezier curves.
To approximate them with straight lines:

```
Extensions → Modify Paths → Approximate Curves by Straight Line
```

Use the default **10** in the dialog box.
This ensures smooth, accurate geometry while keeping the file lightweight.

More on this: [Convert Bezier Curves to Lines](https://graphicdesign.stackexchange.com/questions/142798/how-to-convert-bezier-to-lines#:~:text=You%20can%20apply%20extension)

---

### 6. Convert to GeoJSON

Use the provided conversion scripts (in `scripting/`) to export your cleaned SVG layers into **GeoJSON** format. See the scripting README for detailed, step-by-step instructions: `scripting/README.md`.
Each layer will become a separate GeoJSON file.

---

## 🧩 Create Vector Tiles

Large GeoJSON files are inefficient for web visualization. Instead, IxMaps uses **PMTiles** — a single-file, highly efficient vector tile format.

### Step 1. Install Tippecanoe

Install the Tippecanoe CLI tool by following the instructions in the [official repository](https://github.com/felt/tippecanoe).

> **Note:**
> Build from source. Installing via your system package manager may yield an outdated version that doesn’t support PMTiles output.

---

### Step 2. Generate PMTiles

Once Tippecanoe is installed, run:

```bash
tippecanoe -zg -o ixmaps.pmtiles /path/to/your/geojson/*.geojson
```

This will create a single file `ixmaps.pmtiles` containing all your layers.

---

### Step 3. Move to Public Directory

Move the generated PMTiles file to the React app’s `public/` folder:

```
/app/public/ixmaps.pmtiles
```

---

### Step 4. Set Environment Variables

Create a `.env` file in the `/app` directory based on the provided `.env.template`, then replace the placeholder:

```
PROD_DOMAIN=https://your-production-domain.com
```

---

### Step 5. Install Dependencies

From the `/app` directory, install dependencies:

```bash
npm install
```

---

### Step 6. Run or Build the App

**To start the development server:**

```bash
npm run dev
```

**To build for production:**

```bash
npm run build
```

---

## 🧠 Notes

* The output can be visualized in **MapLibre**, **Mapbox GL JS**, or any vector-tile compatible viewer.
* QGIS can read PMTiles directly using the **PMTiles plugin**.
* For fantasy worlds, you can treat your coordinate system as a pseudo-geographic projection.

---

## 📂 Project Structure

```
IxMaps/
├── scripting/            # Conversion utilities
├── app/                  # React web app
│   ├── public/           # Static assets (including .pmtiles)
│   ├── src/
|   └── .env.template     # Environment variable example
├── data/                 # Exported GeoJSON layers 
├── .gitignore                        
└── README.md             # Project documentation
```

---

## ✨ Credits

Built by **[SpatialNasir](https://twitter.com/SpatialNasir)**
