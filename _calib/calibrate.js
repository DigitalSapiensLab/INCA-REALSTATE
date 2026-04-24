// Analyze Peru silhouette PNG:
// 1) Find content bounding box (non-background pixels).
// 2) Map each capital's (lat, lon) onto the image using that bbox.
// 3) Produce REGIONS coords in the map's viewBox (0-100 x, 0-140 y).
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const pngPath = path.resolve(__dirname, '..', 'web', 'assets', 'peru-silhouette.png');
const buf = fs.readFileSync(pngPath);
const png = PNG.sync.read(buf);
const { width: W, height: H, data } = png;

// A pixel is "content" if it's not near-black. The silhouette is a gold outline over
// a dark background, so the territory interior is also near-black. Instead, find the
// outline pixels (bright gold) and use their bounding box.
let minX = W, minY = H, maxX = -1, maxY = -1;
let goldCount = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    // Gold-ish: reasonably bright, R>G>B, not the red of the compass glyph
    const bright = (r + g + b) / 3;
    const isGold = a > 100 && bright > 80 && r > g && g > b && (r - b) > 30 && r < 255;
    if (isGold) {
      goldCount++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`Image ${W}x${H}, gold pixels: ${goldCount}`);
console.log(`BBox pixels: x[${minX}..${maxX}] y[${minY}..${maxY}]`);

// Strip the compass glyph on bottom-right: re-scan, ignoring a small margin
// around the bottom-right corner. The glyph is very small; find its cluster and mask it.
// Simple fix: redo bbox excluding the right-bottom 8% square.
const cornerX = W * 0.86, cornerY = H * 0.86;
minX = W; minY = H; maxX = -1; maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (x > cornerX && y > cornerY) continue; // ignore compass area
    const i = (y * W + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    const bright = (r + g + b) / 3;
    const isGold = a > 100 && bright > 80 && r > g && g > b && (r - b) > 30 && r < 255;
    if (isGold) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`BBox (no compass): x[${minX}..${maxX}] y[${minY}..${maxY}]`);

// Geographic extents of Peru (degrees) — widely cited
const LAT_N = -0.0386;   // northernmost point (Güeppí, Loreto, near Colombia)
const LAT_S = -18.3517;  // southernmost point (Concordia, Tacna, on Chile border)
const LON_W = -81.3267;  // westernmost (Punta Balcones, Piura coast)
const LON_E = -68.6526;  // easternmost (Heath river, Madre de Dios/Bolivia)

// Department capitals (lat, lon)
const CAPITALS = {
  tumbes:        [-3.5669, -80.4515],
  piura:         [-5.1945, -80.6328],
  lambayeque:    [-6.7713, -79.8410], // Chiclayo
  'la-libertad': [-8.1150, -79.0300], // Trujillo
  cajamarca:     [-7.1611, -78.5127],
  amazonas:      [-6.2299, -77.8699], // Chachapoyas
  loreto:        [-3.7491, -73.2538], // Iquitos
  'san-martin':  [-6.0345, -76.9722], // Moyobamba
  ucayali:       [-8.3791, -74.5539], // Pucallpa
  ancash:        [-9.5267, -77.5281], // Huaraz
  huanuco:       [-9.9306, -76.2423],
  pasco:         [-10.6818, -76.2565], // Cerro de Pasco
  junin:         [-12.0651, -75.2049], // Huancayo
  lima:          [-12.0464, -77.0428],
  callao:        [-12.0565, -77.1181],
  huancavelica:  [-12.7861, -74.9734],
  ica:           [-14.0678, -75.7286],
  ayacucho:      [-13.1588, -74.2232],
  apurimac:      [-13.6354, -72.8814], // Abancay
  cusco:         [-13.5319, -71.9675],
  'madre-de-dios': [-12.5933, -69.1891], // Puerto Maldonado
  puno:          [-15.8402, -70.0219],
  arequipa:      [-16.4090, -71.5375],
  moquegua:      [-17.1954, -70.9344],
  tacna:         [-18.0066, -70.2514],
};

// Map to image pixel coords using bbox
function geoToPixel(lat, lon) {
  const fx = (lon - LON_W) / (LON_E - LON_W);
  const fy = (LAT_N - lat) / (LAT_N - LAT_S);
  return {
    px: minX + fx * (maxX - minX),
    py: minY + fy * (maxY - minY),
  };
}

// Map pixel coords to SVG viewBox (0-100, 0-140) — where viewBox stretches preserveAspectRatio="none"
// over the wrapper which has aspect ratio W:H (image aspect).
function pixelToViewBox(px, py) {
  return {
    x: (px / W) * 100,
    y: (py / H) * 140,
  };
}

const out = [];
for (const [id, [lat, lon]] of Object.entries(CAPITALS)) {
  const { px, py } = geoToPixel(lat, lon);
  const { x, y } = pixelToViewBox(px, py);
  out.push({ id, px: +px.toFixed(1), py: +py.toFixed(1), x: +x.toFixed(1), y: +y.toFixed(1) });
}
console.log('\nCalibrated coordinates (viewBox 0-100 x 0-140):');
for (const r of out) {
  console.log(`  ${r.id.padEnd(16)} → x:${String(r.x).padStart(5)} y:${String(r.y).padStart(6)}   (px ${r.px},${r.py})`);
}

// Emit ready-to-paste coords map
console.log('\n--- PASTE INTO data.jsx (x,y only) ---');
for (const r of out) {
  console.log(`  ${id(r.id)}: x:${r.x}, y:${r.y},`);
}
function id(s) { return `'${s}'`.padEnd(18); }
