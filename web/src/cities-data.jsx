// Minimal per-city details for the RegionShowcase carousel card.
// Rich content for Cusco / Lima / Arequipa lives in regiondata.jsx and is consumed
// by their individual city pages. Here we only need what the card displays:
// image, tagline, altitud, clima. Retorno is pulled from REGIONS in data.jsx.
const CITY_DETAILS = {
  // ═════════════ COSTA (11) ═════════════
  tumbes: {
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
    tagline: 'Manglares y playas tropicales del norte',
    altitud: '7 m',
    clima: '22 — 32°C',
  },
  piura: {
    imagen: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=900&q=80',
    tagline: 'Desierto de Sechura y sol eterno',
    altitud: '29 m',
    clima: '22 — 33°C',
  },
  lambayeque: {
    imagen: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?w=900&q=80',
    tagline: 'Chiclayo, ciudad de la amistad',
    altitud: '27 m',
    clima: '21 — 30°C',
  },
  'la-libertad': {
    imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80',
    tagline: 'Trujillo, eterna primavera',
    altitud: '34 m',
    clima: '17 — 25°C',
  },
  ancash: {
    imagen: 'https://images.unsplash.com/photo-1526712318848-5f38e2740d77?w=900&q=80',
    tagline: 'Cordillera Blanca y Huascarán',
    altitud: '3.052 m',
    clima: '5 — 22°C',
  },
  lima: {
    imagen: 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=900&q=80',
    tagline: 'Capital gastronómica del continente',
    altitud: '154 m',
    clima: '16 — 28°C',
  },
  callao: {
    imagen: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80',
    tagline: 'Primer puerto del Perú',
    altitud: '12 m',
    clima: '16 — 27°C',
  },
  ica: {
    imagen: 'https://images.unsplash.com/photo-1604909053522-f6bae95b1c82?w=900&q=80',
    tagline: 'Dunas, vino y pisco',
    altitud: '406 m',
    clima: '12 — 30°C',
  },
  arequipa: {
    imagen: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=900&q=80',
    tagline: 'La Ciudad Blanca al pie del Misti',
    altitud: '2.335 m',
    clima: '8 — 23°C',
  },
  moquegua: {
    imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80',
    tagline: 'Valle del pisco y el sol',
    altitud: '1.410 m',
    clima: '12 — 24°C',
  },
  tacna: {
    imagen: 'https://images.unsplash.com/photo-1516836018717-6dd258aebd57?w=900&q=80',
    tagline: 'Ciudad heroica del sur',
    altitud: '562 m',
    clima: '13 — 25°C',
  },

  // ═════════════ SIERRA (10) ═════════════
  cajamarca: {
    imagen: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
    tagline: 'Herencia colonial andina',
    altitud: '2.750 m',
    clima: '7 — 21°C',
  },
  amazonas: {
    imagen: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
    tagline: 'Kuélap y los sarcófagos de Karajía',
    altitud: '2.334 m',
    clima: '9 — 21°C',
  },
  huanuco: {
    imagen: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=900&q=80',
    tagline: 'El mejor clima del mundo',
    altitud: '1.912 m',
    clima: '10 — 26°C',
  },
  pasco: {
    imagen: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=900&q=80',
    tagline: 'Ciudad minera de altura',
    altitud: '4.380 m',
    clima: '0 — 13°C',
  },
  junin: {
    imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80',
    tagline: 'Corazón del Valle del Mantaro',
    altitud: '3.259 m',
    clima: '4 — 21°C',
  },
  huancavelica: {
    imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80',
    tagline: 'Altura inca y minas coloniales',
    altitud: '3.676 m',
    clima: '2 — 16°C',
  },
  ayacucho: {
    imagen: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=900&q=80',
    tagline: '33 iglesias y Semana Santa',
    altitud: '2.761 m',
    clima: '9 — 23°C',
  },
  apurimac: {
    imagen: 'https://images.unsplash.com/photo-1526712318848-5f38e2740d77?w=900&q=80',
    tagline: 'Valle entre montañas',
    altitud: '2.378 m',
    clima: '10 — 22°C',
  },
  cusco: {
    imagen: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=900&q=80',
    tagline: 'Capital del Imperio Inca',
    altitud: '3.399 m',
    clima: '10 — 20°C',
  },
  puno: {
    imagen: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=900&q=80',
    tagline: 'Lago Titicaca, capital folklórica',
    altitud: '3.827 m',
    clima: '2 — 17°C',
  },

  // ═════════════ SELVA (4) ═════════════
  loreto: {
    imagen: 'https://images.unsplash.com/photo-1523867904473-6da7ce7ed00c?w=900&q=80',
    tagline: 'Iquitos, puerta a la Amazonía',
    altitud: '115 m',
    clima: '23 — 32°C',
  },
  'san-martin': {
    imagen: 'https://images.unsplash.com/photo-1516036438522-1ae2c66c8d9e?w=900&q=80',
    tagline: 'Moyobamba, ciudad de las orquídeas',
    altitud: '860 m',
    clima: '18 — 29°C',
  },
  ucayali: {
    imagen: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=900&q=80',
    tagline: 'Pucallpa, ribera del río Ucayali',
    altitud: '154 m',
    clima: '22 — 31°C',
  },
  'madre-de-dios': {
    imagen: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
    tagline: 'Puerto Maldonado, puerta al Manu',
    altitud: '183 m',
    clima: '22 — 32°C',
  },
};

window.CITY_DETAILS = CITY_DETAILS;
