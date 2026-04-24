// Compute centroid of the Callao polygon (area-weighted, so it's guaranteed inside)
const fs = require('fs');
const path = require('path');
const jsxSrc = fs.readFileSync(path.resolve(__dirname, '..', 'web', 'src', 'peru-geo.jsx'), 'utf8');
const shapes = JSON.parse(jsxSrc.match(/PERU_DEPT_SHAPES = (\{[\s\S]*?\n\});/)[1]);

function pathToRing(d) {
  const tokens = d.match(/[MLZ]|-?[\d.]+/g);
  const ring = [];
  for (let i = 0; i < tokens.length; ) {
    const t = tokens[i++];
    if (t === 'M' || t === 'L') ring.push([+tokens[i++], +tokens[i++]]);
  }
  return ring;
}

function polygonCentroid(ring) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const f = xi * yj - xj * yi;
    a += f;
    cx += (xi + xj) * f;
    cy += (yi + yj) * f;
  }
  a /= 2;
  return [cx / (6 * a), cy / (6 * a)];
}

const [cx, cy] = polygonCentroid(pathToRing(shapes.callao));
console.log(`Callao centroid: x=${cx.toFixed(2)}, y=${cy.toFixed(2)}`);
