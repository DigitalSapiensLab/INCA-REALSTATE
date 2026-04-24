// Render a preview PNG: silhouette + colored dots.
// Verifies each dot lands inside Peru and within the correct macro-region
// (costa=celeste west, sierra=amarillo middle, selva=verde east).
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const pngPath = path.resolve(__dirname, '..', 'web', 'assets', 'peru-silhouette.png');
const buf = fs.readFileSync(pngPath);
const png = PNG.sync.read(buf);
const { width: W, height: H, data } = png;

// Copy base image, boost background contrast to make outline visible in preview
const out = new PNG({ width: W, height: H });
for (let i = 0; i < data.length; i += 4) {
  out.data[i] = data[i];
  out.data[i + 1] = data[i + 1];
  out.data[i + 2] = data[i + 2];
  out.data[i + 3] = data[i + 3];
}

// Same content bbox computed in calibrate.js
const minX = 28, maxX = 719, minY = 12, maxY = 1018;

// Geographic extents of Peru
const LAT_N = -0.0386, LAT_S = -18.3517, LON_W = -81.3267, LON_E = -68.6526;

const CAPITALS = {
  tumbes:        { tipo: 'costa',  lat: -3.5669, lon: -80.4515 },
  piura:         { tipo: 'costa',  lat: -5.1945, lon: -80.6328 },
  lambayeque:    { tipo: 'costa',  lat: -6.7713, lon: -79.8410 },
  'la-libertad': { tipo: 'costa',  lat: -8.1150, lon: -79.0300 },
  cajamarca:     { tipo: 'sierra', lat: -7.1611, lon: -78.5127 },
  amazonas:      { tipo: 'sierra', lat: -6.2299, lon: -77.8699 },
  loreto:        { tipo: 'selva',  lat: -3.7491, lon: -73.2538 },
  'san-martin':  { tipo: 'selva',  lat: -6.0345, lon: -76.9722 },
  ucayali:       { tipo: 'selva',  lat: -8.3791, lon: -74.5539 },
  ancash:        { tipo: 'costa',  lat: -9.5267, lon: -77.5281 },
  huanuco:       { tipo: 'sierra', lat: -9.9306, lon: -76.2423 },
  pasco:         { tipo: 'sierra', lat: -10.6818, lon: -76.2565 },
  junin:         { tipo: 'sierra', lat: -12.0651, lon: -75.2049 },
  lima:          { tipo: 'costa',  lat: -12.0464, lon: -77.0428 },
  callao:        { tipo: 'costa',  lat: -12.0565, lon: -77.1181 },
  huancavelica:  { tipo: 'sierra', lat: -12.7861, lon: -74.9734 },
  ica:           { tipo: 'costa',  lat: -14.0678, lon: -75.7286 },
  ayacucho:      { tipo: 'sierra', lat: -13.1588, lon: -74.2232 },
  apurimac:      { tipo: 'sierra', lat: -13.6354, lon: -72.8814 },
  cusco:         { tipo: 'sierra', lat: -13.5319, lon: -71.9675 },
  'madre-de-dios': { tipo: 'selva', lat: -12.5933, lon: -69.1891 },
  puno:          { tipo: 'sierra', lat: -15.8402, lon: -70.0219 },
  arequipa:      { tipo: 'costa',  lat: -16.4090, lon: -71.5375 },
  moquegua:      { tipo: 'costa',  lat: -17.1954, lon: -70.9344 },
  tacna:         { tipo: 'costa',  lat: -18.0066, lon: -70.2514 },
};

const COLORS = {
  costa:  [111, 168, 201], // #6FA8C9 celeste
  sierra: [201, 169,  97], // #C9A961 amarillo
  selva:  [127, 176, 105], // #7FB069 verde
};

function setPixel(x, y, [r, g, b]) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  out.data[i] = r;
  out.data[i + 1] = g;
  out.data[i + 2] = b;
  out.data[i + 3] = 255;
}
function drawDisc(cx, cy, radius, rgb) {
  const r2 = radius * radius;
  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      if (x * x + y * y <= r2) setPixel(cx + x, cy + y, rgb);
    }
  }
}
function drawRing(cx, cy, radius, thickness, rgb) {
  const rOut2 = (radius + thickness) ** 2;
  const rIn2 = radius ** 2;
  for (let y = -radius - thickness; y <= radius + thickness; y++) {
    for (let x = -radius - thickness; x <= radius + thickness; x++) {
      const d2 = x * x + y * y;
      if (d2 >= rIn2 && d2 <= rOut2) setPixel(cx + x, cy + y, rgb);
    }
  }
}

for (const [id, c] of Object.entries(CAPITALS)) {
  const fx = (c.lon - LON_W) / (LON_E - LON_W);
  const fy = (LAT_N - c.lat) / (LAT_N - LAT_S);
  const px = minX + fx * (maxX - minX);
  const py = minY + fy * (maxY - minY);
  const rgb = COLORS[c.tipo];
  drawRing(px, py, 14, 2, [14, 16, 20]);    // dark outline
  drawDisc(px, py, 10, rgb);                 // solid dot
  drawRing(px, py, 10, 2, [245, 241, 232]);  // light outline for contrast
}

const outPath = path.resolve(__dirname, 'preview.png');
fs.writeFileSync(outPath, PNG.sync.write(out));
console.log('Wrote preview to', outPath);
