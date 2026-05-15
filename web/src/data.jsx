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
  { id: 'amazonas',      nombre: 'Amazonas',      tipo: 'selva',  capital: 'Chachapoyas',      x: 29.4, y: 48.1,  precio: 640,  retorno: 8.4 },

  // NORTH SELVA
  { id: 'loreto',        nombre: 'Loreto',        tipo: 'selva',  capital: 'Iquitos',          x: 63.6, y: 29.5,  precio: 720,  retorno: 9.2 },
  { id: 'san-martin',    nombre: 'San Martín',    tipo: 'selva',  capital: 'Moyobamba',        x: 36.1, y: 46.7,  precio: 780,  retorno: 8.0 },
  { id: 'ucayali',       nombre: 'Ucayali',       tipo: 'selva',  capital: 'Pucallpa',         x: 54.0, y: 64.3,  precio: 690,  retorno: 8.6 },

  // CENTRAL SIERRA
  { id: 'ancash',        nombre: 'Áncash',        tipo: 'sierra', capital: 'Huaraz',           x: 31.9, y: 72.9,  precio: 1050, retorno: 7.9 },
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
  { id: 'arequipa',      nombre: 'Arequipa',      tipo: 'sierra', capital: 'Arequipa',         x: 76.3, y: 124.6, precio: 1540, retorno: 7.8 },
  { id: 'moquegua',      nombre: 'Moquegua',      tipo: 'costa',  capital: 'Moquegua',         x: 80.8, y: 130.5, precio: 1280, retorno: 7.6 },
  { id: 'tacna',         nombre: 'Tacna',         tipo: 'costa',  capital: 'Tacna',            x: 85.8, y: 136.6, precio: 1150, retorno: 7.0 },
];

// Hero rotating imagery — 3 escenas: Lima sobre el Pacífico, Machu Picchu, Cordillera Blanca.
// Imágenes locales en web/assets/hero/ (servidas con MIME correctos en server.js).
const HERO_SLIDES = [
  {
    img: 'assets/hero/slide-01.png',
    caption: 'Malecón de Miraflores · Pacífico templado',
    quechua: 'ꟼ 01 · Qucha',
    headline: 'Lima sobre el Pacífico',
    context: 'Costa peruana',
    tipo: 'costa',
    color: '#6FA8C9',
  },
  {
    img: 'assets/hero/slide-02.png',
    caption: 'Machu Picchu · nueva maravilla del mundo',
    quechua: 'ꟼ 02 · Kawsay',
    headline: 'Patrimonio milenario',
    context: 'Sierra inca',
    tipo: 'cultura',
    color: '#C9A961',
  },
  {
    img: 'assets/hero/slide-03.png',
    caption: 'Cordillera Blanca · glaciares tropicales',
    quechua: 'ꟼ 03 · Urqu',
    headline: 'Andes vivos',
    context: 'Naturaleza andina',
    tipo: 'naturaleza',
    color: '#7FB069',
  },
];

// Featured properties — cartera por macro región (Costa / Sierra / Selva).
// `img` apunta a assets locales en web/assets/ciudades-<macro>/<id>.png
// (imágenes referenciales de cada ciudad). El componente filtra por `macro`.
const PROPERTIES = [
  // ─────────── COSTA ───────────
  {
    id: 'p-li-1',
    macro: 'costa',
    tipo: 'Departamento',
    titulo: 'Ático Miraflores · Malecón',
    barrio: 'Miraflores',
    region: 'Lima',
    precio: 685000,
    m2: 186, hab: 3, ban: 3, retorno: 7.4,
    img: 'assets/ciudades-costa/lima.png',
    tags: ['Vista al mar', 'A pie del Malecón', 'Gastronómico'],
  },
  {
    id: 'p-li-2',
    macro: 'costa',
    tipo: 'Loft',
    titulo: 'Loft Barranco · Bohemio',
    barrio: 'Barranco',
    region: 'Lima',
    precio: 395000,
    m2: 140, hab: 2, ban: 2, retorno: 7.9,
    img: 'assets/ciudades-costa/callao.jpg',
    tags: ['Bohemio', 'Arte', 'A pie del mar'],
  },
  {
    id: 'p-tr-1',
    macro: 'costa',
    tipo: 'Casa de playa',
    titulo: 'Casa Huanchaco · Trujillo',
    barrio: 'Huanchaco',
    region: 'La Libertad',
    precio: 320000,
    m2: 280, hab: 4, ban: 3, retorno: 8.2,
    img: 'assets/ciudades-costa/la-libertad.png',
    tags: ['Frente al mar', 'Surf', 'Patrimonio chimú'],
  },
  {
    id: 'p-pi-1',
    macro: 'costa',
    tipo: 'Terreno',
    titulo: 'Terreno Máncora · Costa Norte',
    barrio: 'Máncora',
    region: 'Piura',
    precio: 145000,
    m2: 1200, hab: 0, ban: 0, retorno: 9.6,
    img: 'assets/ciudades-costa/piura.jpg',
    tags: ['Costa norte', 'Inversión', '1.200 m²'],
  },
  {
    id: 'p-ic-1',
    macro: 'costa',
    tipo: 'Casa de campo',
    titulo: 'Casa Viñedos · Ica',
    barrio: 'Subtanjalla',
    region: 'Ica',
    precio: 285000,
    m2: 420, hab: 3, ban: 3, retorno: 7.8,
    img: 'assets/ciudades-costa/ica.png',
    tags: ['Viñedos', 'Pisco', 'Clima cálido'],
  },
  {
    id: 'p-ar-c',
    macro: 'costa',
    tipo: 'Casa frente al mar',
    titulo: 'Casa Mejía · Arequipa Costa',
    barrio: 'Mollendo',
    region: 'Arequipa',
    precio: 245000,
    m2: 240, hab: 3, ban: 2, retorno: 7.6,
    img: 'assets/ciudades-costa/arequipa.png',
    tags: ['Frente al mar', 'Sur', 'Tranquilo'],
  },

  // ─────────── SIERRA ───────────
  {
    id: 'p-cu-1',
    macro: 'sierra',
    tipo: 'Casa colonial',
    titulo: 'Casa Colonial San Blas',
    barrio: 'San Blas',
    region: 'Cusco',
    precio: 420000,
    m2: 220, hab: 4, ban: 3, retorno: 9.2,
    img: 'assets/ciudades-sierra/cusco.png',
    tags: ['Centro histórico', 'Alquiler vacacional', 'Patrimonio'],
  },
  {
    id: 'p-aq-1',
    macro: 'sierra',
    tipo: 'Villa',
    titulo: 'Villa Cayma · Arequipa',
    barrio: 'Cayma',
    region: 'Arequipa',
    precio: 510000,
    m2: 340, hab: 5, ban: 4, retorno: 8.0,
    img: 'assets/ciudades-sierra/arequipa.png',
    tags: ['Vista al Misti', 'Residencial', 'Piscina'],
  },
  {
    id: 'p-pu-1',
    macro: 'sierra',
    tipo: 'Casa lacustre',
    titulo: 'Casa Lago Titicaca · Puno',
    barrio: 'Chucuito',
    region: 'Puno',
    precio: 195000,
    m2: 180, hab: 3, ban: 2, retorno: 7.3,
    img: 'assets/ciudades-sierra/puno.png',
    tags: ['Vista al lago', 'Altiplano', 'Cultura aymara'],
  },
  {
    id: 'p-ca-1',
    macro: 'sierra',
    tipo: 'Hacienda',
    titulo: 'Hacienda Cajamarca · Baños del Inca',
    barrio: 'Baños del Inca',
    region: 'Cajamarca',
    precio: 380000,
    m2: 720, hab: 5, ban: 4, retorno: 8.4,
    img: 'assets/ciudades-sierra/cajamarca.png',
    tags: ['Aguas termales', 'Hacienda', 'Vista andina'],
  },
  {
    id: 'p-ay-1',
    macro: 'sierra',
    tipo: 'Casa colonial',
    titulo: 'Casa Centro · Ayacucho',
    barrio: 'Centro Histórico',
    region: 'Ayacucho',
    precio: 165000,
    m2: 240, hab: 4, ban: 3, retorno: 7.0,
    img: 'assets/ciudades-sierra/ayacucho.png',
    tags: ['Patrimonio', '33 iglesias', 'Centro'],
  },
  {
    id: 'p-hz-1',
    macro: 'sierra',
    tipo: 'Casa de montaña',
    titulo: 'Casa Huaraz · Cordillera Blanca',
    barrio: 'Huaraz',
    region: 'Áncash',
    precio: 220000,
    m2: 260, hab: 4, ban: 3, retorno: 8.1,
    img: 'assets/ciudades-sierra/ancash.png',
    tags: ['Cordillera Blanca', 'Trekking', 'Vista glaciar'],
  },

  // ─────────── SELVA ───────────
  // Assets locales en assets/ciudades-selva/ (imágenes referenciales temáticas).
  {
    id: 'p-iq-1',
    macro: 'selva',
    tipo: 'Casa ribereña',
    titulo: 'Casa Río Amazonas · Iquitos',
    barrio: 'Punchana',
    region: 'Loreto',
    precio: 175000,
    m2: 320, hab: 4, ban: 3, retorno: 9.0,
    img: 'assets/ciudades-selva/loreto.png',
    tags: ['Frente al río', 'Eco-turismo', 'Amazonas'],
  },
  {
    id: 'p-tp-1',
    macro: 'selva',
    tipo: 'Eco-lodge',
    titulo: 'Eco-Lodge Tarapoto · Cataratas',
    barrio: 'Tarapoto',
    region: 'San Martín',
    precio: 295000,
    m2: 540, hab: 6, ban: 5, retorno: 9.4,
    img: 'assets/ciudades-selva/san-martin.png',
    tags: ['Eco-lodge', 'Cataratas', 'Operación turística'],
  },
  {
    id: 'p-md-1',
    macro: 'selva',
    tipo: 'Terreno',
    titulo: 'Terreno Madre de Dios · Tambopata',
    barrio: 'Puerto Maldonado',
    region: 'Madre de Dios',
    precio: 95000,
    m2: 5000, hab: 0, ban: 0, retorno: 10.2,
    img: 'assets/ciudades-selva/madre-de-dios.png',
    tags: ['Reserva Tambopata', '5.000 m²', 'Conservación'],
  },
];

// ─────────────────────────────────────────────────────────────────────
// COST_CITIES · Datos para el comparador "El mismo sueldo, otra vida"
//
// Fuentes consultadas (Q1 2026, no se citan en UI por decisión de marca):
//   • España — INE EPA 2024-2025 · Hays Guía Salarial 2025 · Adecco Monitor
//     Anual de Empleo y Salarios 2025 · OCU canasta familiar 2025.
//   • Perú   — INEI ENAHO 2024 · Bumeran Index Salarial 2025 ·
//     Adecco Perú Reporte de Sueldos 2025 · Numbeo Lima/Cusco Q1 2026.
//   • Cifras cruzadas con Mercer Cost of Living 2025 cuando ha sido
//     posible. Todas en NETO mensual, EUR para España, USD para Perú.
//
// `gasto.*` representa el "estilo de vida medio profesional urbano"
// (alquiler 2 habs zona céntrica + comida + transporte + ocio).
// `perfiles` son sueldos NETOS mensuales de mercado por seniority.
// `apreciacion_anual` es real (% anual histórica 2015-2025) para uso
// del Calculator. Para España son datos del Banco de España + Idealista,
// para Perú son BCRP + CAPECO + datos propios de mercado.
// ─────────────────────────────────────────────────────────────────────
const COST_CITIES = {
  es: [
    {
      id: 'madrid',  nombre: 'Madrid',    index: 100,
      gasto: { alquiler: 1450, comida: 380, transporte: 60, ocio: 290 },
      perfiles: { junior: 1850, profesional: 2700, senior: 3900, director: 6200, empresario: 5500 },
    },
    {
      id: 'barcelona', nombre: 'Barcelona', index: 102,
      gasto: { alquiler: 1380, comida: 370, transporte: 55, ocio: 270 },
      perfiles: { junior: 1800, profesional: 2550, senior: 3700, director: 5900, empresario: 5200 },
    },
    {
      id: 'valencia', nombre: 'Valencia',  index: 82,
      gasto: { alquiler: 980,  comida: 330, transporte: 45, ocio: 210 },
      perfiles: { junior: 1500, profesional: 2100, senior: 3000, director: 4800, empresario: 4300 },
    },
    {
      id: 'sevilla',  nombre: 'Sevilla',   index: 78,
      gasto: { alquiler: 880,  comida: 310, transporte: 42, ocio: 200 },
      perfiles: { junior: 1450, profesional: 2000, senior: 2900, director: 4600, empresario: 4100 },
    },
    {
      id: 'malaga',   nombre: 'Málaga',    index: 81,
      gasto: { alquiler: 1050, comida: 320, transporte: 44, ocio: 220 },
      perfiles: { junior: 1480, profesional: 2050, senior: 2950, director: 4700, empresario: 4200 },
    },
    {
      id: 'bilbao',   nombre: 'Bilbao',    index: 89,
      gasto: { alquiler: 1100, comida: 360, transporte: 50, ocio: 240 },
      perfiles: { junior: 1700, profesional: 2400, senior: 3500, director: 5700, empresario: 5000 },
    },
  ],
  pe: [
    {
      id: 'lima',     nombre: 'Lima',      index: 58,
      // Valores en USD (mantenido para legacy: alquiler, comida, transporte, ocio)
      alquiler: 720,  comida: 340, transporte: 95, ocio: 210,
      gasto: { alquiler: 720, comida: 340, transporte: 95, ocio: 210 },
      perfiles: { junior: 1100, profesional: 2100, senior: 3800, director: 6800, empresario: 5500 },
      apreciacion_anual: 3.8,
    },
    {
      id: 'cusco',    nombre: 'Cusco',     index: 46,
      alquiler: 520,  comida: 280, transporte: 65, ocio: 180,
      gasto: { alquiler: 520, comida: 280, transporte: 65, ocio: 180 },
      perfiles: { junior: 720,  profesional: 1350, senior: 2300, director: 4100, empresario: 3500 },
      apreciacion_anual: 5.2,
    },
    {
      id: 'arequipa', nombre: 'Arequipa',  index: 49,
      alquiler: 560,  comida: 290, transporte: 70, ocio: 175,
      gasto: { alquiler: 560, comida: 290, transporte: 70, ocio: 175 },
      perfiles: { junior: 800,  profesional: 1500, senior: 2700, director: 4900, empresario: 4000 },
      apreciacion_anual: 4.5,
    },
    {
      id: 'trujillo', nombre: 'Trujillo',  index: 47,
      alquiler: 510,  comida: 275, transporte: 68, ocio: 165,
      gasto: { alquiler: 510, comida: 275, transporte: 68, ocio: 165 },
      perfiles: { junior: 760,  profesional: 1420, senior: 2500, director: 4400, empresario: 3700 },
      apreciacion_anual: 4.0,
    },
    {
      id: 'piura',    nombre: 'Piura',     index: 44,
      alquiler: 470,  comida: 260, transporte: 62, ocio: 150,
      gasto: { alquiler: 470, comida: 260, transporte: 62, ocio: 150 },
      perfiles: { junior: 690,  profesional: 1290, senior: 2250, director: 4000, empresario: 3300 },
      apreciacion_anual: 3.6,
    },
  ],
};

// Perfiles profesionales con labels para el selector de UI.
// Las cifras de cada ciudad están en COST_CITIES[..].perfiles[<id>].
const SALARY_PROFILES = [
  { id: 'junior',      label: 'Junior',       desc: '0-3 años exp.' },
  { id: 'profesional', label: 'Profesional',  desc: '5-10 años exp.' },
  { id: 'senior',      label: 'Senior',       desc: 'Mando intermedio' },
  { id: 'director',    label: 'Director',     desc: 'C-level' },
  { id: 'empresario',  label: 'Empresario',   desc: 'Autónomo / PyME' },
];

// Comparativa Madrid para la Calculadora (rentabilidad inmobiliaria neta).
// Fuente: Idealista Informe Anual 2025 · Banco de España boletín 2025-Q4.
// Yield bruto medio Madrid Salamanca: 3.4% · Neto tras IBI/comunidad/IRPF: ~2.8%.
const MADRID_BENCHMARK = {
  yield_bruto:  3.4,
  yield_neto:   2.8,
  apreciacion:  4.5,
  barrio:       'Barrio de Salamanca',
};

// ─────────────────────────────────────────────────────────────────────
// INVEST_LOCATIONS · zonas curadas para la Calculadora de retorno.
//
// Cada zona lleva su precio medio del m² (USD), yield orientativo de
// alquiler vacacional/largo plazo y apreciación anual histórica real.
// Las cifras vienen de BCRP + CAPECO + Knight Frank LatAm + Bumeran +
// datos de mercado propios cruzados con Adondevivir y Urbania 2025.
// Para regiones con varios polos relevantes, listamos sus distritos
// premium. Para regiones secundarias, una sola entrada por capital.
//
// Cada entrada:
//   id          — único, kebab-case
//   nombre      — "Región · Distrito" o "Región · Capital"
//   regionId    — id de REGIONS para el cross-link a la landing de ciudad
//   macro       — 'costa' | 'sierra' | 'selva'
//   precioM2    — USD por m² (precio medio mercado primario + secundario)
//   yield       — % anual orientativo
//   apreciacion — % anual histórica 2015-2025
//   tag         — etiqueta corta editorial ("urbano premium", "playa", etc.)
// ─────────────────────────────────────────────────────────────────────
const INVEST_LOCATIONS = [
  // ──────────────────── COSTA ────────────────────
  // Norte
  { id: 'tumbes',         nombre: 'Tumbes · Punta Sal',     regionId: 'tumbes',      macro: 'costa', precioM2: 1180, yield: 7.6, apreciacion: 4.0, tag: 'Playa premium' },
  { id: 'piura-ciudad',   nombre: 'Piura · Ciudad',         regionId: 'piura',       macro: 'costa', precioM2: 1100, yield: 7.6, apreciacion: 3.8, tag: 'Urbano norte' },
  { id: 'mancora',        nombre: 'Piura · Máncora',        regionId: 'piura',       macro: 'costa', precioM2: 1850, yield: 9.6, apreciacion: 5.0, tag: 'Playa internacional' },
  { id: 'chiclayo',       nombre: 'Lambayeque · Chiclayo',  regionId: 'lambayeque',  macro: 'costa', precioM2: 1250, yield: 7.2, apreciacion: 3.5, tag: 'Universitario' },
  { id: 'trujillo',       nombre: 'La Libertad · Trujillo', regionId: 'la-libertad', macro: 'costa', precioM2: 1380, yield: 7.4, apreciacion: 4.0, tag: 'Patrimonio chimú' },
  { id: 'huanchaco',      nombre: 'La Libertad · Huanchaco',regionId: 'la-libertad', macro: 'costa', precioM2: 1250, yield: 8.2, apreciacion: 4.5, tag: 'Surf + playa' },

  // Centro
  { id: 'lima-miraflores', nombre: 'Lima · Miraflores',     regionId: 'lima',        macro: 'costa', precioM2: 2180, yield: 7.2, apreciacion: 3.8, tag: 'Urbano premium' },
  { id: 'lima-barranco',   nombre: 'Lima · Barranco',       regionId: 'lima',        macro: 'costa', precioM2: 1920, yield: 7.9, apreciacion: 4.2, tag: 'Bohemio cultural' },
  { id: 'lima-sanisidro',  nombre: 'Lima · San Isidro',     regionId: 'lima',        macro: 'costa', precioM2: 2450, yield: 6.5, apreciacion: 3.5, tag: 'Financiero' },
  { id: 'lima-surco',      nombre: 'Lima · Surco',          regionId: 'lima',        macro: 'costa', precioM2: 1680, yield: 6.8, apreciacion: 3.6, tag: 'Residencial' },
  { id: 'lima-chorrillos', nombre: 'Lima · Chorrillos',     regionId: 'lima',        macro: 'costa', precioM2: 1450, yield: 7.4, apreciacion: 3.7, tag: 'Frente al mar' },
  { id: 'callao-punta',    nombre: 'Callao · La Punta',     regionId: 'callao',      macro: 'costa', precioM2: 1680, yield: 6.6, apreciacion: 3.5, tag: 'Renovación urbana' },

  // Sur costa
  { id: 'ica-paracas',     nombre: 'Ica · Paracas',         regionId: 'ica',         macro: 'costa', precioM2: 1620, yield: 8.5, apreciacion: 4.2, tag: 'Bahía + vino' },
  { id: 'ica-ciudad',      nombre: 'Ica · Ciudad',          regionId: 'ica',         macro: 'costa', precioM2: 1320, yield: 7.6, apreciacion: 3.8, tag: 'Vitivinícola' },
  { id: 'moquegua',        nombre: 'Moquegua · Ilo',        regionId: 'moquegua',    macro: 'costa', precioM2: 1280, yield: 7.6, apreciacion: 3.6, tag: 'Puerto sur' },
  { id: 'tacna',           nombre: 'Tacna · Ciudad',        regionId: 'tacna',       macro: 'costa', precioM2: 1150, yield: 7.0, apreciacion: 3.4, tag: 'Frontera Chile' },

  // ──────────────────── SIERRA ────────────────────
  { id: 'cajamarca',       nombre: 'Cajamarca · Ciudad',    regionId: 'cajamarca',   macro: 'sierra', precioM2: 890,  yield: 6.8, apreciacion: 3.7, tag: 'Carnaval + termales' },
  { id: 'huaraz',          nombre: 'Áncash · Huaraz',       regionId: 'ancash',      macro: 'sierra', precioM2: 1050, yield: 7.9, apreciacion: 4.5, tag: 'Trekking mundial' },
  { id: 'huanuco',         nombre: 'Huánuco · Ciudad',      regionId: 'huanuco',     macro: 'sierra', precioM2: 820,  yield: 7.3, apreciacion: 3.4, tag: 'Valle templado' },
  { id: 'huancayo',        nombre: 'Junín · Huancayo',      regionId: 'junin',       macro: 'sierra', precioM2: 980,  yield: 7.5, apreciacion: 3.6, tag: 'Sierra central' },
  { id: 'ayacucho',        nombre: 'Ayacucho · Centro',     regionId: 'ayacucho',    macro: 'sierra', precioM2: 890,  yield: 7.0, apreciacion: 3.5, tag: '33 iglesias' },
  { id: 'cusco-sanblas',   nombre: 'Cusco · San Blas',      regionId: 'cusco',       macro: 'sierra', precioM2: 1820, yield: 9.4, apreciacion: 5.2, tag: 'Patrimonio UNESCO' },
  { id: 'cusco-centro',    nombre: 'Cusco · Centro Histórico', regionId: 'cusco',    macro: 'sierra', precioM2: 1950, yield: 9.1, apreciacion: 5.0, tag: 'Plaza de Armas' },
  { id: 'cusco-valle',     nombre: 'Cusco · Valle Sagrado', regionId: 'cusco',       macro: 'sierra', precioM2: 980,  yield: 8.2, apreciacion: 5.5, tag: 'Urubamba · Pisac' },
  { id: 'arequipa-cayma',  nombre: 'Arequipa · Cayma',      regionId: 'arequipa',    macro: 'sierra', precioM2: 1540, yield: 7.8, apreciacion: 4.5, tag: 'Vista al Misti' },
  { id: 'arequipa-yana',   nombre: 'Arequipa · Yanahuara',  regionId: 'arequipa',    macro: 'sierra', precioM2: 1480, yield: 7.6, apreciacion: 4.4, tag: 'Tradicional' },
  { id: 'arequipa-centro', nombre: 'Arequipa · Centro Histórico', regionId: 'arequipa', macro: 'sierra', precioM2: 1320, yield: 7.2, apreciacion: 4.3, tag: 'Sillar UNESCO' },
  { id: 'puno',            nombre: 'Puno · Chucuito',       regionId: 'puno',        macro: 'sierra', precioM2: 1120, yield: 7.4, apreciacion: 3.8, tag: 'Lago Titicaca' },
  { id: 'apurimac',        nombre: 'Apurímac · Abancay',    regionId: 'apurimac',    macro: 'sierra', precioM2: 720,  yield: 7.2, apreciacion: 3.4, tag: 'Cañón del Apurímac' },
  { id: 'huancavelica',    nombre: 'Huancavelica · Ciudad', regionId: 'huancavelica',macro: 'sierra', precioM2: 620,  yield: 6.4, apreciacion: 3.0, tag: 'Sierra profunda' },
  { id: 'pasco',           nombre: 'Pasco · Oxapampa',      regionId: 'pasco',       macro: 'sierra', precioM2: 760,  yield: 6.9, apreciacion: 3.4, tag: 'Selva alta austríaca' },

  // ──────────────────── SELVA ────────────────────
  { id: 'chachapoyas',     nombre: 'Amazonas · Chachapoyas',regionId: 'amazonas',    macro: 'selva',  precioM2: 640,  yield: 8.4, apreciacion: 4.2, tag: 'Kuélap + nubes' },
  { id: 'tarapoto',        nombre: 'San Martín · Tarapoto', regionId: 'san-martin',  macro: 'selva',  precioM2: 780,  yield: 8.0, apreciacion: 4.0, tag: 'Selva alta' },
  { id: 'iquitos',         nombre: 'Loreto · Iquitos',      regionId: 'loreto',      macro: 'selva',  precioM2: 720,  yield: 9.2, apreciacion: 4.5, tag: 'Amazonas ribereño' },
  { id: 'pucallpa',        nombre: 'Ucayali · Pucallpa',    regionId: 'ucayali',     macro: 'selva',  precioM2: 690,  yield: 8.6, apreciacion: 4.0, tag: 'Río Ucayali' },
  { id: 'maldonado',       nombre: 'Madre de Dios · Tambopata', regionId: 'madre-de-dios', macro: 'selva', precioM2: 680, yield: 8.8, apreciacion: 4.8, tag: 'Reserva natural' },
];

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
window.SALARY_PROFILES = SALARY_PROFILES;
window.MADRID_BENCHMARK = MADRID_BENCHMARK;
window.INVEST_LOCATIONS = INVEST_LOCATIONS;
window.GASTRO = GASTRO;
