// Programmatic verification — does each REGIONS dot fall inside the matching
// PERU_DEPT_SHAPES polygon? Uses a ray-casting point-in-polygon test.
const fs = require('fs');
const path = require('path');

const jsxSrc = fs.readFileSync(path.resolve(__dirname, '..', 'web', 'src', 'peru-geo.jsx'), 'utf8');
const shapes = JSON.parse(jsxSrc.match(/PERU_DEPT_SHAPES = (\{[\s\S]*?\n\});/)[1]);

const dataSrc = fs.readFileSync(path.resolve(__dirname, '..', 'web', 'src', 'data.jsx'), 'utf8');
const dots = {};
const re = /id:\s*'([^']+)'[^}]*?nombre:\s*'([^']+)'[^}]*?tipo:\s*'([^']+)'[^}]*?x:\s*([\d.]+),\s*y:\s*([\d.]+)/g;
let m;
while ((m = re.exec(dataSrc))) {
  dots[m[1]] = { nombre: m[2], tipo: m[3], x: +m[4], y: +m[5] };
}

// Parse SVG path with M/L/Z into an array of rings (array of [x,y])
function pathToRings(d) {
  const tokens = d.match(/[MLZ]|-?[\d.]+/g);
  const rings = [];
  let ring = null;
  for (let i = 0; i < tokens.length; ) {
    const t = tokens[i++];
    if (t === 'M') {
      if (ring && ring.length) rings.push(ring);
      ring = [[+tokens[i++], +tokens[i++]]];
    } else if (t === 'L') {
      ring.push([+tokens[i++], +tokens[i++]]);
    } else if (t === 'Z') {
      // close implicitly
    }
  }
  if (ring && ring.length) rings.push(ring);
  return rings;
}

function pointInRing(px, py, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInShape(px, py, path) {
  // A shape may have multiple rings (Polygon with holes or MultiPolygon).
  // For MultiPolygon we evaluate each ring separately; if the point is in any
  // non-hole ring and not in any hole, it's inside. Our paths don't mark holes,
  // so we just check if any ring contains it.
  const rings = pathToRings(path);
  return rings.some(ring => pointInRing(px, py, ring));
}

const COLORS = { costa: 'celeste', sierra: 'amarillo', selva: 'verde' };
let pass = 0, fail = 0;
const out = [];
for (const [id, dot] of Object.entries(dots)) {
  const shape = shapes[id];
  if (!shape) { out.push(`  ${id.padEnd(16)} NO SHAPE`); fail++; continue; }
  const inside = pointInShape(dot.x, dot.y, shape);
  const mark = inside ? '✓' : '✗';
  if (inside) pass++; else fail++;
  const color = COLORS[dot.tipo] || '?';
  out.push(`  ${mark} ${dot.nombre.padEnd(16)} → (${String(dot.x).padStart(5)}, ${String(dot.y).padStart(6)})  ${color.padEnd(10)} ${inside ? '' : '  OUT OF POLYGON'}`);
}
console.log(out.join('\n'));
console.log(`\n${pass}/${pass + fail} dots inside their own department polygon.`);

// Also verify macro-region color consistency — but this is classification, not geometry.
