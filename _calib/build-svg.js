// Convert Peru GeoJSON to SVG paths in the same viewBox (0-100 × 0-140) used by the dots.
// Uses the EXACT same lat/lon projection as the dot calibration, so country outline
// and dots are synchronized by construction.
const fs = require('fs');
const path = require('path');

const geoPath = path.resolve(__dirname, 'peru.geojson');
const gj = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Geographic extents of Peru — exactly the same values used in data.jsx dot calibration.
const LAT_N = -0.0386, LAT_S = -18.3517, LON_W = -81.3267, LON_E = -68.6526;
// The dot projection maps to the silhouette PNG's content bbox (x[28..719] y[12..1018]
// of a 736×1024 image, then scaled to viewBox 0-100 × 0-140). For SVG output we use
// the same mapping so the generated paths align with the dots.
const IMG_W = 736, IMG_H = 1024;
const PX_MIN_X = 28, PX_MAX_X = 719, PX_MIN_Y = 12, PX_MAX_Y = 1018;

function project(lon, lat) {
  const fx = (lon - LON_W) / (LON_E - LON_W);
  const fy = (LAT_N - lat) / (LAT_N - LAT_S);
  const px = PX_MIN_X + fx * (PX_MAX_X - PX_MIN_X);
  const py = PX_MIN_Y + fy * (PX_MAX_Y - PX_MIN_Y);
  const x = (px / IMG_W) * 100;
  const y = (py / IMG_H) * 140;
  return [x, y];
}

// Simplify polyline using Ramer-Douglas-Peucker for lighter SVG paths.
function pointLineDist2(p, a, b) {
  const [px, py] = p, [ax, ay] = a, [bx, by] = b;
  const dx = bx - ax, dy = by - ay;
  if (dx === 0 && dy === 0) return (px - ax) ** 2 + (py - ay) ** 2;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  const x = ax + t * dx, y = ay + t * dy;
  return (px - x) ** 2 + (py - y) ** 2;
}
function rdp(points, epsilon2) {
  if (points.length < 3) return points.slice();
  let maxD2 = 0, idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d2 = pointLineDist2(points[i], points[0], points[points.length - 1]);
    if (d2 > maxD2) { maxD2 = d2; idx = i; }
  }
  if (maxD2 > epsilon2) {
    const left  = rdp(points.slice(0, idx + 1), epsilon2);
    const right = rdp(points.slice(idx), epsilon2);
    return left.slice(0, -1).concat(right);
  }
  return [points[0], points[points.length - 1]];
}

function ringToPath(ring) {
  // ring is an array of [lon, lat] pairs; close it if not already
  const projected = ring.map(([lon, lat]) => project(lon, lat));
  const simplified = rdp(projected, 0.015 * 0.015); // ~0.015 viewBox units
  const parts = simplified.map(([x, y], i) =>
    `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
  );
  return parts.join(' ') + ' Z';
}

function polygonToPath(coords) {
  return coords.map(ringToPath).join(' ');
}

function geometryToPath(geom) {
  if (geom.type === 'Polygon') return polygonToPath(geom.coordinates);
  if (geom.type === 'MultiPolygon') return geom.coordinates.map(polygonToPath).join(' ');
  throw new Error('unexpected geometry type: ' + geom.type);
}

// Normalize department names to our REGIONS ids
const NAME_MAP = {
  'AMAZONAS':       'amazonas',
  'ANCASH':         'ancash',
  'APURIMAC':       'apurimac',
  'AREQUIPA':       'arequipa',
  'AYACUCHO':       'ayacucho',
  'CAJAMARCA':      'cajamarca',
  'CALLAO':         'callao',
  'PROVINCIA CONSTITUCIONAL DEL CALLAO': 'callao',
  'CUSCO':          'cusco',
  'CUZCO':          'cusco',
  'HUANCAVELICA':   'huancavelica',
  'HUANUCO':        'huanuco',
  'ICA':            'ica',
  'JUNIN':          'junin',
  'LA LIBERTAD':    'la-libertad',
  'LAMBAYEQUE':     'lambayeque',
  'LIMA':           'lima',
  'LORETO':         'loreto',
  'MADRE DE DIOS':  'madre-de-dios',
  'MOQUEGUA':       'moquegua',
  'PASCO':          'pasco',
  'PIURA':          'piura',
  'PUNO':           'puno',
  'SAN MARTIN':     'san-martin',
  'TACNA':          'tacna',
  'TUMBES':         'tumbes',
  'UCAYALI':        'ucayali',
};

const shapes = {};
let unknown = [];
for (const feat of gj.features) {
  const raw = (feat.properties.NOMBDEP || feat.properties.name || '').toUpperCase().trim();
  const norm = raw.replace(/Á/g, 'A').replace(/É/g, 'E').replace(/Í/g, 'I').replace(/Ó/g, 'O').replace(/Ú/g, 'U').replace(/Ñ/g, 'N');
  const id = NAME_MAP[norm];
  if (!id) { unknown.push(raw); continue; }
  shapes[id] = geometryToPath(feat.geometry);
}
console.log('Mapped departments:', Object.keys(shapes).length);
if (unknown.length) console.warn('Unknown property names:', unknown);

// Also emit a single "country" outline: collect every polygon ring into one path
// and use fill-rule:evenodd so the stroke naturally draws all borders.
let countryPath = '';
for (const feat of gj.features) {
  countryPath += geometryToPath(feat.geometry) + ' ';
}

// Output JSX file
const outJs = `// AUTO-GENERATED from peru_departamental_simple.geojson.
// Projected with the same lat/lon → viewBox (0-100 × 0-140) mapping used for dots in data.jsx,
// so department outlines and region dots stay in perfect sync.
// Geographic extents: LAT_N=${LAT_N} LAT_S=${LAT_S} LON_W=${LON_W} LON_E=${LON_E}.
const PERU_DEPT_SHAPES = ${JSON.stringify(shapes, null, 2)};

window.PERU_DEPT_SHAPES = PERU_DEPT_SHAPES;
`;
const outPath = path.resolve(__dirname, '..', 'web', 'src', 'peru-geo.jsx');
fs.writeFileSync(outPath, outJs);
console.log(`Wrote ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

// Also emit a debug SVG so we can eyeball the result
const svgParts = [];
svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" width="368" height="512" style="background:#0E1014">`);
for (const [id, d] of Object.entries(shapes)) {
  svgParts.push(`<path d="${d}" fill="rgba(201,169,97,0.05)" stroke="#C9A961" stroke-width="0.25" />`);
}
// overlay dots
const REGIONS_SRC = fs.readFileSync(path.resolve(__dirname, '..', 'web', 'src', 'data.jsx'), 'utf8');
const re = /id:\s*'([^']+)'[^}]*?tipo:\s*'([^']+)'[^}]*?x:\s*([\d.]+),\s*y:\s*([\d.]+)/g;
let m;
while ((m = re.exec(REGIONS_SRC))) {
  const [, id, tipo, x, y] = m;
  const color = tipo === 'costa' ? '#6FA8C9' : tipo === 'sierra' ? '#C9A961' : '#7FB069';
  svgParts.push(`<circle cx="${x}" cy="${y}" r="1.2" fill="${color}" stroke="#0E1014" stroke-width="0.25" />`);
}
svgParts.push('</svg>');
fs.writeFileSync(path.resolve(__dirname, 'debug.svg'), svgParts.join('\n'));
console.log('Wrote debug.svg');
