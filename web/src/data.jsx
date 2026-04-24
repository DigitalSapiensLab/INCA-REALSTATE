// ---- Data for regions, properties, hero imagery ----

// Peru regions — viewBox (0-100 × 0-140). Coords read directly off the silhouette PNG
// (pixel-% positions converted: x = x%, y = y% × 1.4). Calibrated to sit inside the outline.
// Dot coordinates are in the map's SVG viewBox (0-100 x, 0-140 y).
// Calibrated geographically: each capital's (lat, lon) projected onto the actual
// Peru-silhouette.png bounding box (content pixels x[28..719] y[12..1018] of the
// 736×1024 image), using the country's geographic extents
// (LAT_N=-0.039, LAT_S=-18.352, LON_W=-81.327, LON_E=-68.653).
const REGIONS = [
  // NORTH COAST
  { id: 'tumbes',        nombre: 'Tumbes',        tipo: 'costa',  capital: 'Tumbes',           x: 10.3, y: 28.1,  precio: 980,  retorno: 7.1 },
  { id: 'piura',         nombre: 'Piura',         tipo: 'costa',  capital: 'Piura',            x:  8.9, y: 40.4,  precio: 1100, retorno: 7.6 },
  { id: 'lambayeque',    nombre: 'Lambayeque',    tipo: 'costa',  capital: 'Chiclayo',         x: 14.8, y: 52.2,  precio: 1250, retorno: 7.2 },
  { id: 'la-libertad',   nombre: 'La Libertad',   tipo: 'costa',  capital: 'Trujillo',         x: 20.8, y: 62.3,  precio: 1380, retorno: 7.4 },

  // NORTH SIERRA
  { id: 'cajamarca',     nombre: 'Cajamarca',     tipo: 'sierra', capital: 'Cajamarca',        x: 24.6, y: 55.1,  precio: 890,  retorno: 6.8 },
  { id: 'amazonas',      nombre: 'Amazonas',      tipo: 'sierra', capital: 'Chachapoyas',      x: 29.4, y: 48.1,  precio: 640,  retorno: 8.4 },

  // NORTH SELVA
  { id: 'loreto',        nombre: 'Loreto',        tipo: 'selva',  capital: 'Iquitos',          x: 63.6, y: 29.5,  precio: 720,  retorno: 9.2 },
  { id: 'san-martin',    nombre: 'San Martín',    tipo: 'selva',  capital: 'Moyobamba',        x: 36.1, y: 46.7,  precio: 780,  retorno: 8.0 },
  { id: 'ucayali',       nombre: 'Ucayali',       tipo: 'selva',  capital: 'Pucallpa',         x: 54.0, y: 64.3,  precio: 690,  retorno: 8.6 },

  // CENTRAL SIERRA
  { id: 'ancash',        nombre: 'Áncash',        tipo: 'costa',  capital: 'Huaraz',           x: 31.9, y: 72.9,  precio: 1050, retorno: 7.9 },
  { id: 'huanuco',       nombre: 'Huánuco',       tipo: 'sierra', capital: 'Huánuco',          x: 41.5, y: 75.9,  precio: 820,  retorno: 7.3 },
  { id: 'pasco',         nombre: 'Pasco',         tipo: 'sierra', capital: 'Cerro de Pasco',   x: 41.4, y: 81.6,  precio: 760,  retorno: 6.9 },
  { id: 'junin',         nombre: 'Junín',         tipo: 'sierra', capital: 'Huancayo',         x: 49.2, y: 92.0,  precio: 980,  retorno: 7.5 },

  // CENTRAL COAST
  { id: 'lima',          nombre: 'Lima',          tipo: 'costa',  capital: 'Lima',             x: 35.5, y: 91.8,  precio: 2180, retorno: 7.2 },
  { id: 'callao',        nombre: 'Callao',        tipo: 'costa',  capital: 'Callao',           x: 34.9, y: 91.0,  precio: 1680, retorno: 6.6 },

  // SOUTH SIERRA
  { id: 'huancavelica',  nombre: 'Huancavelica',  tipo: 'sierra', capital: 'Huancavelica',     x: 50.9, y: 97.4,  precio: 620,  retorno: 6.4 },
  { id: 'ica',           nombre: 'Ica',           tipo: 'costa',  capital: 'Ica',              x: 45.3, y: 107.0, precio: 1520, retorno: 8.1 },
  { id: 'ayacucho',      nombre: 'Ayacucho',      tipo: 'sierra', capital: 'Ayacucho',         x: 56.4, y: 100.2, precio: 890,  retorno: 7.0 },
  { id: 'apurimac',      nombre: 'Apurímac',      tipo: 'sierra', capital: 'Abancay',          x: 66.4, y: 103.8, precio: 720,  retorno: 7.2 },
  { id: 'cusco',         nombre: 'Cusco',         tipo: 'sierra', capital: 'Cusco',            x: 73.1, y: 103.0, precio: 1820, retorno: 9.4 },

  // SOUTH SELVA
  { id: 'madre-de-dios', nombre: 'Madre de Dios', tipo: 'selva',  capital: 'Puerto Maldonado', x: 93.7, y: 95.9,  precio: 680,  retorno: 8.8 },

  // SOUTH
  { id: 'puno',          nombre: 'Puno',          tipo: 'sierra', capital: 'Puno',             x: 87.5, y: 120.3, precio: 1120, retorno: 7.4 },
  { id: 'arequipa',      nombre: 'Arequipa',      tipo: 'costa',  capital: 'Arequipa',         x: 76.3, y: 124.6, precio: 1540, retorno: 7.8 },
  { id: 'moquegua',      nombre: 'Moquegua',      tipo: 'costa',  capital: 'Moquegua',         x: 80.8, y: 130.5, precio: 1280, retorno: 7.6 },
  { id: 'tacna',         nombre: 'Tacna',         tipo: 'costa',  capital: 'Tacna',            x: 85.8, y: 136.6, precio: 1150, retorno: 7.0 },
];

// Hero rotating imagery — 3 potent scenes: gastronomía, cultura, turismo.
// Ultra-high resolution (w=2400, q=92) for a cinematic, sharp hero.
const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=2400&q=92',
    caption: 'Ceviche del día · plato nacional',
    quechua: 'ꟼ 01 · Mikhuna',
    headline: 'Cocina de autor',
    context: 'Gastronomía peruana',
    tipo: 'gastronomia',
    color: '#6FA8C9',
  },
  {
    img: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=2400&q=92',
    caption: 'Valle Sagrado de los Incas · Cusco',
    quechua: 'ꟼ 02 · Kawsay',
    headline: 'Cinco siglos de historia',
    context: 'Cultura viva',
    tipo: 'cultura',
    color: '#C9A961',
  },
  {
    img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=2400&q=92',
    caption: 'Machu Picchu · patrimonio UNESCO',
    quechua: 'ꟼ 03 · Puriy',
    headline: 'Nueva maravilla del mundo',
    context: 'Turismo de patrimonio',
    tipo: 'turismo',
    color: '#7FB069',
  },
];

// Featured properties
const PROPERTIES = [
  {
    id: 'p1',
    titulo: 'Ático Miraflores · Malecón',
    barrio: 'Miraflores',
    region: 'Lima',
    precio: 685000,
    m2: 186,
    hab: 3, ban: 3,
    retorno: 7.4,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80',
    tags: ['Vista al mar', 'A pie del Malecón', 'Gastronómico'],
  },
  {
    id: 'p2',
    titulo: 'Casa Colonial San Blas',
    barrio: 'San Blas',
    region: 'Cusco',
    precio: 420000,
    m2: 220,
    hab: 4, ban: 3,
    retorno: 9.2,
    img: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=900&q=80',
    tags: ['Centro histórico', 'Alquiler vacacional', 'Patrimonio'],
  },
  {
    id: 'p3',
    titulo: 'Villa en Cayma · Arequipa',
    barrio: 'Cayma',
    region: 'Arequipa',
    precio: 510000,
    m2: 340,
    hab: 5, ban: 4,
    retorno: 8.0,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    tags: ['Vista al Misti', 'Residencial', 'Piscina'],
  },
  {
    id: 'p4',
    titulo: 'Loft Barranco · Bohemio',
    barrio: 'Barranco',
    region: 'Lima',
    precio: 395000,
    m2: 140,
    hab: 2, ban: 2,
    retorno: 7.9,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    tags: ['Bohemio', 'Arte', 'A pie del mar'],
  },
];

const COST_CITIES = {
  es: [
    { id: 'madrid', nombre: 'Madrid', index: 100 },
    { id: 'barcelona', nombre: 'Barcelona', index: 102 },
    { id: 'valencia', nombre: 'Valencia', index: 82 },
    { id: 'sevilla', nombre: 'Sevilla', index: 78 },
    { id: 'malaga', nombre: 'Málaga', index: 81 },
    { id: 'bilbao', nombre: 'Bilbao', index: 89 },
  ],
  pe: [
    { id: 'lima', nombre: 'Lima', index: 58, alquiler: 720, comida: 340, transporte: 95, ocio: 210 },
    { id: 'cusco', nombre: 'Cusco', index: 46, alquiler: 520, comida: 280, transporte: 65, ocio: 180 },
    { id: 'arequipa', nombre: 'Arequipa', index: 49, alquiler: 560, comida: 290, transporte: 70, ocio: 175 },
    { id: 'trujillo', nombre: 'Trujillo', index: 47, alquiler: 510, comida: 275, transporte: 68, ocio: 165 },
    { id: 'piura', nombre: 'Piura', index: 44, alquiler: 470, comida: 260, transporte: 62, ocio: 150 },
  ],
};

const GASTRO = [
  { nombre: 'Ceviche', region: 'Costa', desc: 'Pescado del día, limón, ají, cebolla morada.' },
  { nombre: 'Lomo Saltado', region: 'Nacional', desc: 'Res, cebolla, tomate. Chifa criollo.' },
  { nombre: 'Ají de Gallina', region: 'Lima', desc: 'Crema de ají amarillo, pollo deshilachado.' },
  { nombre: 'Rocoto Relleno', region: 'Arequipa', desc: 'Rocoto picante, carne, queso andino.' },
  { nombre: 'Pisco Sour', region: 'Nacional', desc: 'Pisco, limón, clara de huevo, amargo.' },
  { nombre: 'Juane', region: 'Selva', desc: 'Arroz, gallina, envuelto en hoja de bijao.' },
];

window.REGIONS = REGIONS;
window.HERO_SLIDES = HERO_SLIDES;
window.PROPERTIES = PROPERTIES;
window.COST_CITIES = COST_CITIES;
window.GASTRO = GASTRO;
