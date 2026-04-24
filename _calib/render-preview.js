// Render debug.svg to preview2.png to visually verify alignment.
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// Simple SVG path rasterizer — only handles M/L/Z commands (which is what our paths use).
// Much faster/simpler than a full SVG renderer. Output matches viewBox 0-100 × 0-140.
const W = 736, H = 1024; // match silhouette size for fair comparison
const VB_W = 100, VB_H = 140;
const SX = W / VB_W, SY = H / VB_H;

const png = new PNG({ width: W, height: H });
// black background
for (let i = 0; i < png.data.length; i += 4) {
  png.data[i] = 14; png.data[i + 1] = 16; png.data[i + 2] = 20; png.data[i + 3] = 255;
}

function setPx(x, y, [r, g, b], a = 255) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  if (a === 255) {
    png.data[i] = r; png.data[i + 1] = g; png.data[i + 2] = b; png.data[i + 3] = 255;
  } else {
    const af = a / 255;
    png.data[i]     = png.data[i]     * (1 - af) + r * af;
    png.data[i + 1] = png.data[i + 1] * (1 - af) + g * af;
    png.data[i + 2] = png.data[i + 2] * (1 - af) + b * af;
    png.data[i + 3] = 255;
  }
}

function drawLine(x0, y0, x1, y1, rgb) {
  // Bresenham with anti-aliasing skipped for simplicity
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy, x = Math.round(x0), y = Math.round(y0);
  while (true) {
    setPx(x, y, rgb);
    setPx(x + 1, y, rgb, 140);
    setPx(x, y + 1, rgb, 140);
    if (x === Math.round(x1) && y === Math.round(y1)) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 <  dx) { err += dx; y += sy; }
  }
}

function drawPath(d, rgb) {
  const tokens = d.match(/[MLZ]|-?[\d.]+/g);
  let i = 0;
  let startX = 0, startY = 0, curX = 0, curY = 0;
  while (i < tokens.length) {
    const t = tokens[i++];
    if (t === 'M') {
      curX = parseFloat(tokens[i++]) * SX;
      curY = parseFloat(tokens[i++]) * SY;
      startX = curX; startY = curY;
    } else if (t === 'L') {
      const x = parseFloat(tokens[i++]) * SX;
      const y = parseFloat(tokens[i++]) * SY;
      drawLine(curX, curY, x, y, rgb);
      curX = x; curY = y;
    } else if (t === 'Z') {
      drawLine(curX, curY, startX, startY, rgb);
      curX = startX; curY = startY;
    }
  }
}

function drawDisc(cx, cy, r, rgb) {
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x*x + y*y <= r*r) setPx(cx + x, cy + y, rgb);
    }
  }
}

// Load shapes
const jsxSrc = fs.readFileSync(path.resolve(__dirname, '..', 'web', 'src', 'peru-geo.jsx'), 'utf8');
const jsonMatch = jsxSrc.match(/PERU_DEPT_SHAPES = (\{[\s\S]*?\n\});/);
const shapes = JSON.parse(jsonMatch[1]);

// Draw departments in gold
for (const d of Object.values(shapes)) {
  drawPath(d, [201, 169, 97]);
}

// Draw dots
const COLORS = { costa: [111, 168, 201], sierra: [201, 169, 97], selva: [127, 176, 105] };
const dataSrc = fs.readFileSync(path.resolve(__dirname, '..', 'web', 'src', 'data.jsx'), 'utf8');
const re = /id:\s*'([^']+)'[^}]*?tipo:\s*'([^']+)'[^}]*?x:\s*([\d.]+),\s*y:\s*([\d.]+)/g;
let m;
while ((m = re.exec(dataSrc))) {
  const [, , tipo, x, y] = m;
  const rgb = COLORS[tipo];
  const cx = parseFloat(x) * SX, cy = parseFloat(y) * SY;
  drawDisc(cx, cy, 12, [14, 16, 20]);
  drawDisc(cx, cy, 10, rgb);
}

fs.writeFileSync(path.resolve(__dirname, 'preview2.png'), PNG.sync.write(png));
console.log('Wrote preview2.png');
