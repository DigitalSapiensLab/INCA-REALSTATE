// Peru 25-department outlines — hand-drawn polygons in the map's 0-100 × 0-140 viewBox.
// Shapes are geographic approximations, tuned so centroids align with REGIONS[].x/y dots.
// Coastline on the west (x≈7-30), Andes spine mid-country, Amazon borders on east.

const PERU_SHAPES = {
  // ══════ NORTH COAST ══════
  tumbes: "M 8,10 L 16,10 L 18,16 L 16,20 L 10,22 L 7,16 Z",
  piura:  "M 7,16 L 10,22 L 16,20 L 22,24 L 24,30 L 18,34 L 10,32 L 6,26 Z",
  lambayeque: "M 18,34 L 24,30 L 28,34 L 24,38 L 18,36 Z",
  "la-libertad": "M 18,36 L 24,38 L 30,42 L 28,48 L 20,50 L 16,44 Z",

  // ══════ NORTH SIERRA ══════
  cajamarca: "M 24,30 L 32,32 L 36,38 L 34,44 L 30,42 L 24,38 L 28,34 Z",
  amazonas:  "M 32,32 L 40,30 L 44,36 L 42,42 L 36,38 Z",

  // ══════ NORTH SELVA ══════
  loreto: "M 40,12 L 78,14 L 82,22 L 76,34 L 68,42 L 58,40 L 50,32 L 44,28 L 40,20 Z",
  "san-martin": "M 38,40 L 46,36 L 50,42 L 48,50 L 42,50 L 38,46 Z",
  ucayali: "M 48,50 L 62,44 L 72,52 L 70,64 L 62,72 L 52,68 L 46,58 Z",

  // ══════ CENTRAL SIERRA ══════
  "ancash": "M 20,50 L 28,48 L 34,52 L 32,60 L 24,62 L 18,56 Z",
  huanuco: "M 34,52 L 42,50 L 46,58 L 44,64 L 36,64 L 32,60 Z",
  pasco:   "M 34,64 L 42,62 L 44,70 L 38,72 L 32,68 Z",
  junin:   "M 32,68 L 42,70 L 44,80 L 36,84 L 28,80 L 28,72 Z",

  // ══════ CENTRAL COAST ══════
  lima:   "M 18,56 L 24,62 L 28,72 L 28,80 L 24,84 L 18,80 L 14,70 L 14,62 Z",
  callao: "M 22,74 L 26,74 L 26,78 L 22,78 Z",

  // ══════ SOUTH COAST ══════
  ica:   "M 24,84 L 32,82 L 38,88 L 34,96 L 28,94 L 22,90 Z",

  // ══════ SOUTH SIERRA ══════
  huancavelica: "M 28,80 L 36,78 L 38,86 L 34,90 L 28,86 Z",
  ayacucho:     "M 36,84 L 44,84 L 46,94 L 40,96 L 34,92 L 36,86 Z",
  apurimac:     "M 44,88 L 52,90 L 52,96 L 46,98 L 42,94 Z",
  cusco:        "M 46,74 L 58,76 L 64,84 L 62,92 L 54,94 L 48,90 L 46,84 Z",

  // ══════ SOUTH SELVA ══════
  "madre-de-dios": "M 58,70 L 74,68 L 80,76 L 78,86 L 72,88 L 62,84 L 58,76 Z",

  // ══════ SOUTH (altiplano + coast) ══════
  puno:     "M 58,92 L 68,90 L 72,98 L 68,108 L 60,108 L 56,102 Z",
  arequipa: "M 38,96 L 52,96 L 58,104 L 54,112 L 46,114 L 38,108 L 34,100 Z",
  moquegua: "M 48,112 L 58,110 L 60,120 L 52,122 L 48,118 Z",
  tacna:    "M 52,122 L 62,120 L 66,128 L 58,130 L 52,128 Z",
};

window.PERU_SHAPES = PERU_SHAPES;
