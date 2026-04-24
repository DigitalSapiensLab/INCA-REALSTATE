// ---- Data for regions, properties, hero imagery ----

// Peru regions — viewBox (0-100 × 0-140). Coords read directly off the silhouette PNG
// (pixel-% positions converted: x = x%, y = y% × 1.4). Calibrated to sit inside the outline.
const REGIONS = [
  // NORTH COAST
  { id: 'tumbes',        nombre: 'Tumbes',        tipo: 'costa',  capital: 'Tumbes',           x: 24, y: 25, precio: 980,  retorno: 7.1 },
  { id: 'piura',         nombre: 'Piura',         tipo: 'costa',  capital: 'Piura',            x: 22, y: 35, precio: 1100, retorno: 7.6 },
  { id: 'lambayeque',    nombre: 'Lambayeque',    tipo: 'costa',  capital: 'Chiclayo',         x: 24, y: 43, precio: 1250, retorno: 7.2 },
  { id: 'la-libertad',   nombre: 'La Libertad',   tipo: 'costa',  capital: 'Trujillo',         x: 28, y: 56, precio: 1380, retorno: 7.4 },

  // NORTH SIERRA
  { id: 'cajamarca',     nombre: 'Cajamarca',     tipo: 'sierra', capital: 'Cajamarca',        x: 33, y: 43, precio: 890,  retorno: 6.8 },
  { id: 'amazonas',      nombre: 'Amazonas',      tipo: 'selva',  capital: 'Chachapoyas',      x: 38, y: 39, precio: 640,  retorno: 8.4 },

  // NORTH SELVA
  { id: 'loreto',        nombre: 'Loreto',        tipo: 'selva',  capital: 'Iquitos',          x: 55, y: 31, precio: 720,  retorno: 9.2 },
  { id: 'san-martin',    nombre: 'San Martín',    tipo: 'selva',  capital: 'Moyobamba',        x: 42, y: 52, precio: 780,  retorno: 8.0 },
  { id: 'ucayali',       nombre: 'Ucayali',       tipo: 'selva',  capital: 'Pucallpa',         x: 56, y: 70, precio: 690,  retorno: 8.6 },

  // CENTRAL SIERRA
  { id: 'ancash',        nombre: 'Áncash',        tipo: 'sierra', capital: 'Huaraz',           x: 30, y: 67, precio: 1050, retorno: 7.9 },
  { id: 'huanuco',       nombre: 'Huánuco',       tipo: 'sierra', capital: 'Huánuco',          x: 40, y: 70, precio: 820,  retorno: 7.3 },
  { id: 'pasco',         nombre: 'Pasco',         tipo: 'sierra', capital: 'Cerro de Pasco',   x: 38, y: 78, precio: 760,  retorno: 6.9 },
  { id: 'junin',         nombre: 'Junín',         tipo: 'sierra', capital: 'Huancayo',         x: 40, y: 88, precio: 980,  retorno: 7.5 },

  // CENTRAL COAST
  { id: 'lima',          nombre: 'Lima',          tipo: 'costa',  capital: 'Lima',             x: 30, y: 87, precio: 2180, retorno: 7.2 },
  { id: 'callao',        nombre: 'Callao',        tipo: 'costa',  capital: 'Callao',           x: 27, y: 88, precio: 1680, retorno: 6.6 },

  // SOUTH SIERRA
  { id: 'huancavelica',  nombre: 'Huancavelica',  tipo: 'sierra', capital: 'Huancavelica',     x: 38, y: 98, precio: 620,  retorno: 6.4 },
  { id: 'ica',           nombre: 'Ica',           tipo: 'costa',  capital: 'Ica',              x: 34, y: 104, precio: 1520, retorno: 8.1 },
  { id: 'ayacucho',      nombre: 'Ayacucho',      tipo: 'sierra', capital: 'Ayacucho',         x: 42, y: 102, precio: 890,  retorno: 7.0 },
  { id: 'apurimac',      nombre: 'Apurímac',      tipo: 'sierra', capital: 'Abancay',          x: 50, y: 106, precio: 720,  retorno: 7.2 },
  { id: 'cusco',         nombre: 'Cusco',         tipo: 'sierra', capital: 'Cusco',            x: 56, y: 95, precio: 1820, retorno: 9.4 },

  // SOUTH SELVA
  { id: 'madre-de-dios', nombre: 'Madre de Dios', tipo: 'selva',  capital: 'Puerto Maldonado', x: 66, y: 77, precio: 680,  retorno: 8.8 },

  // SOUTH
  { id: 'puno',          nombre: 'Puno',          tipo: 'sierra', capital: 'Puno',             x: 62, y: 107, precio: 1120, retorno: 7.4 },
  { id: 'arequipa',      nombre: 'Arequipa',      tipo: 'sierra', capital: 'Arequipa',         x: 46, y: 118, precio: 1540, retorno: 7.8 },
  { id: 'moquegua',      nombre: 'Moquegua',      tipo: 'costa',  capital: 'Moquegua',         x: 54, y: 126, precio: 1280, retorno: 7.6 },
  { id: 'tacna',         nombre: 'Tacna',         tipo: 'costa',  capital: 'Tacna',            x: 58, y: 132, precio: 1150, retorno: 7.0 },
];

// Hero rotating imagery — real Peru photography from Unsplash
const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1400&q=80',
    caption: 'Machu Picchu · Cusco',
    quechua: 'ꟼ 01',
    headline: 'Machu Picchu',
    context: 'Patrimonio UNESCO',
  },
  {
    img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1400&q=80',
    caption: 'Ceviche · Lima',
    quechua: 'ꟼ 02',
    headline: 'Cocina de autor',
    context: 'Capital gastronómica',
  },
  {
    img: 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=1400&q=80',
    caption: 'Costa de Miraflores · Lima',
    quechua: 'ꟼ 03',
    headline: 'Miraflores',
    context: 'Pacífico urbano',
  },
  {
    img: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=1400&q=80',
    caption: 'Valle Sagrado · Cusco',
    quechua: 'ꟼ 04',
    headline: 'Valle Sagrado',
    context: 'Altura inca',
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
