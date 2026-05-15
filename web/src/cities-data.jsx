// Minimal per-city details for the RegionShowcase carousel card.
// Rich content for Cusco / Lima / Arequipa lives in regiondata.jsx and is consumed
// by their individual city pages. Here we only need what the card displays:
// image, tagline, altitud, clima. Retorno is pulled from REGIONS in data.jsx.
const CITY_DETAILS = {
  // ═════════════ COSTA (11) ═════════════
  tumbes: {
    imagen: 'assets/ciudades-costa/tumbes.jpg',
    tagline: 'Manglares y playas tropicales del norte',
    altitud: '7 m',
    clima: '22 — 32°C',
  },
  piura: {
    imagen: 'assets/ciudades-costa/piura.jpg',
    tagline: 'Plaza colonial bajo el sol eterno',
    altitud: '29 m',
    clima: '22 — 33°C',
  },
  lambayeque: {
    imagen: 'assets/ciudades-costa/lambayeque.png',
    tagline: 'Chiclayo, ciudad de la amistad',
    altitud: '27 m',
    clima: '21 — 30°C',
  },
  'la-libertad': {
    imagen: 'assets/ciudades-costa/la-libertad.png',
    tagline: 'Trujillo, eterna primavera',
    altitud: '34 m',
    clima: '17 — 25°C',
  },
  lima: {
    imagen: 'assets/ciudades-costa/lima.png',
    tagline: 'Capital gastronómica del continente',
    altitud: '154 m',
    clima: '16 — 28°C',
  },
  callao: {
    imagen: 'assets/ciudades-costa/callao.png',
    tagline: 'Real Felipe · primer puerto del Perú',
    altitud: '12 m',
    clima: '16 — 27°C',
  },
  ica: {
    imagen: 'assets/ciudades-costa/ica.png',
    tagline: 'Huacachina · oasis del desierto',
    altitud: '406 m',
    clima: '12 — 30°C',
  },
  moquegua: {
    imagen: 'assets/ciudades-costa/moquegua.png',
    tagline: 'Cerro Baúl · valle del pisco y el sol',
    altitud: '1.410 m',
    clima: '12 — 24°C',
  },
  tacna: {
    imagen: 'assets/ciudades-costa/tacna.png',
    tagline: 'Arco Parabólico · ciudad heroica del sur',
    altitud: '562 m',
    clima: '13 — 25°C',
  },

  // ═════════════ SIERRA (11) ═════════════
  cajamarca: {
    imagen: 'assets/ciudades-sierra/cajamarca.png',
    tagline: 'Herencia colonial andina',
    altitud: '2.750 m',
    clima: '7 — 21°C',
  },
  ancash: {
    imagen: 'assets/ciudades-sierra/ancash.png',
    tagline: 'Huaraz · al pie del Huascarán',
    altitud: '3.052 m',
    clima: '5 — 22°C',
  },
  huanuco: {
    imagen: 'assets/ciudades-sierra/huanuco.png',
    tagline: 'El mejor clima del mundo (Kotosh)',
    altitud: '1.912 m',
    clima: '10 — 26°C',
  },
  pasco: {
    imagen: 'assets/ciudades-sierra/pasco.png',
    tagline: 'Bosque de piedras de Huayllay',
    altitud: '4.380 m',
    clima: '0 — 13°C',
  },
  junin: {
    imagen: 'assets/ciudades-sierra/junin.png',
    tagline: 'Huancayo · Valle del Mantaro',
    altitud: '3.259 m',
    clima: '4 — 21°C',
  },
  huancavelica: {
    imagen: 'assets/ciudades-sierra/huancavelica.png',
    tagline: 'Altura inca y minas coloniales',
    altitud: '3.676 m',
    clima: '2 — 16°C',
  },
  ayacucho: {
    imagen: 'assets/ciudades-sierra/ayacucho.png',
    tagline: '33 iglesias y Semana Santa',
    altitud: '2.761 m',
    clima: '9 — 23°C',
  },
  apurimac: {
    imagen: 'assets/ciudades-sierra/apurimac.png',
    tagline: 'Sayhuite · piedra ceremonial inca',
    altitud: '2.378 m',
    clima: '10 — 22°C',
  },
  cusco: {
    imagen: 'assets/ciudades-sierra/cusco.png',
    tagline: 'Capital del Imperio Inca',
    altitud: '3.399 m',
    clima: '10 — 20°C',
  },
  puno: {
    imagen: 'assets/ciudades-sierra/puno.png',
    tagline: 'Lago Titicaca · capital folklórica',
    altitud: '3.827 m',
    clima: '2 — 17°C',
  },
  arequipa: {
    imagen: 'assets/ciudades-sierra/arequipa.png',
    tagline: 'La Ciudad Blanca al pie del Misti',
    altitud: '2.335 m',
    clima: '8 — 23°C',
  },

  // ═════════════ SELVA (5) ═════════════
  amazonas: {
    imagen: 'assets/ciudades-selva/amazonas.png',
    tagline: 'Kuélap y los sarcófagos de Karajía',
    altitud: '2.334 m',
    clima: '9 — 21°C',
  },
  loreto: {
    imagen: 'assets/ciudades-selva/loreto.png',
    tagline: 'Iquitos, puerta a la Amazonía',
    altitud: '115 m',
    clima: '23 — 32°C',
  },
  'san-martin': {
    imagen: 'assets/ciudades-selva/san-martin.png',
    tagline: 'Moyobamba, ciudad de las orquídeas',
    altitud: '860 m',
    clima: '18 — 29°C',
  },
  ucayali: {
    imagen: 'assets/ciudades-selva/ucayali.png',
    tagline: 'Pucallpa, ribera del río Ucayali',
    altitud: '154 m',
    clima: '22 — 31°C',
  },
  'madre-de-dios': {
    imagen: 'assets/ciudades-selva/madre-de-dios.png',
    tagline: 'Puerto Maldonado, puerta al Manu',
    altitud: '183 m',
    clima: '22 — 32°C',
  },
};

window.CITY_DETAILS = CITY_DETAILS;
