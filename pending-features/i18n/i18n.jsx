// ─────────────────────────────────────────────────────────────────────
// Andes Capital Estates · i18n minimal runtime
// Español (default) + Inglés. Persistencia en localStorage.
// Uso desde un componente React:
//   const t = useT();
//   <h1>{t('nav.inicio')}</h1>
// Para cambiar idioma:
//   setLocale('en');
// El cambio se difunde por un CustomEvent('localechange') al que los
// componentes con useT() están suscritos vía useLocale().
// ─────────────────────────────────────────────────────────────────────

const SUPPORTED_LOCALES = ['es', 'en'];
const DEFAULT_LOCALE = 'es';
const STORAGE_KEY = 'ace.locale';

function getLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  } catch { /* localStorage no disponible */ }
  return DEFAULT_LOCALE;
}

function setLocale(lng) {
  if (!SUPPORTED_LOCALES.includes(lng)) return;
  try { localStorage.setItem(STORAGE_KEY, lng); } catch { }
  document.documentElement.setAttribute('lang', lng);
  window.dispatchEvent(new CustomEvent('localechange', { detail: lng }));
}

// Hook React: re-renderiza cuando cambia el idioma.
function useLocale() {
  const [locale, setLocaleState] = React.useState(getLocale());
  React.useEffect(() => {
    const handler = (e) => setLocaleState(e.detail || getLocale());
    window.addEventListener('localechange', handler);
    return () => window.removeEventListener('localechange', handler);
  }, []);
  return locale;
}

// Hook React: devuelve la función t() correspondiente al idioma actual.
function useT() {
  const locale = useLocale();
  return React.useCallback((key, params) => translate(key, locale, params), [locale]);
}

// Función pura (puede usarse fuera de React).
function translate(key, locale, params) {
  const dict = TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT_LOCALE];
  let val = dict[key];
  if (val === undefined) {
    // Fallback: si la clave existe en ES pero no en el idioma elegido, devolvemos ES.
    val = TRANSLATIONS[DEFAULT_LOCALE][key];
  }
  if (val === undefined) return key; // último fallback: la propia key
  if (params && typeof val === 'string') {
    Object.keys(params).forEach(p => {
      val = val.replace(new RegExp('\\{' + p + '\\}', 'g'), params[p]);
    });
  }
  return val;
}

// ─────────────────────────────────────────────────────────────────────
// DICCIONARIO DE TRADUCCIONES
// Mantener una clave única por concepto, agrupadas por sección.
// Si añades una nueva clave, añádela también al bloque `en` con su traducción
// — si la dejas vacía, el sistema cae al ES (es preferible eso a tener
// strings mezclados en pantalla).
// ─────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    // ─── Nav ─────────────────────────────────────────────
    'nav.inicio':           'Inicio',
    'nav.peru':             'Descubrir Perú',
    'nav.regiones':         'Regiones',
    'nav.propiedades':      'Propiedades',
    'nav.internacional':    'Andes International',
    'nav.inversion':        'Inversión',
    'nav.contacto':         'Contacto',
    'nav.cta_agregar':      'Agregar propiedad',
    'nav.lang_es':          'Español',
    'nav.lang_en':          'English',

    // ─── Hero typográfico ────────────────────────────────
    'hero.t.label':         'ꟼ Andes Capital Estates · est. 2026',
    'hero.t.title1':        'Un país,',
    'hero.t.title2':        'luego',
    'hero.t.title3':        'una casa.',
    'hero.t.subtitle':      'Descubre Perú — costa, sierra y selva — y encuentra dónde vivir la vida que ya no existe en Europa.',
    'hero.t.cta_primary':   'Descubrir Perú',
    'hero.t.cta_secondary': 'Ver propiedades',

    // ─── Hero full-bleed ─────────────────────────────────
    'hero.fb.eyebrow':      'ꟼ Patrimonio · Inversión · Vida',
    'hero.fb.title_a':      'Descubre por qué',
    'hero.fb.title_peru':   'Perú',
    'hero.fb.title_b':      'se está convirtiendo en una de las',
    'hero.fb.title_smart':  'decisiones más inteligentes',
    'hero.fb.title_c':      'para vivir e invertir.',
    'hero.fb.slide1.headline': 'Lima sobre el Pacífico',
    'hero.fb.slide1.caption':  'Malecón de Miraflores · Pacífico templado',
    'hero.fb.slide2.headline': 'Patrimonio milenario',
    'hero.fb.slide2.caption':  'Machu Picchu · nueva maravilla del mundo',
    'hero.fb.slide3.headline': 'Andes vivos',
    'hero.fb.slide3.caption':  'Cordillera Blanca · glaciares tropicales',

    // ─── Properties section ──────────────────────────────
    'prop.section_label':   'ꟼ Sección 05 · Wasikuna',
    'prop.title_line1':     'Propiedades',
    'prop.title_line2':     'destacadas.',
    'prop.macro_costa':     'Costa',
    'prop.macro_sierra':    'Sierra',
    'prop.macro_selva':     'Selva',
    'prop.cities_of':       'Ciudades de {macro} · {count}',
    'prop.desde':           'Desde',
    'prop.return_short':    'ret.',
    'prop.hab':             'hab',
    'prop.banos':           'baños',
    'prop.ver_ficha':       'Ver ficha',
    'prop.ver_mas':         'Ver más',

    // ─── Footer ──────────────────────────────────────────
    'footer.office_es':     'Oficina España',
    'footer.office_pe':     'Oficina Perú',
    'footer.attention':     'Atención',
    'footer.attention_hours':'Lun-Vie · 09:00 — 19:00 CET',
    'footer.brand_desc':    'La primera plataforma inmobiliaria que te enamora del país antes de venderte una propiedad. Costa, sierra o selva — un lugar para cada vida.',
    'footer.col_discover':  'Descubrir Perú',
    'footer.col_invest':    'Inversión',
    'footer.col_platform':  'Plataforma',
    'footer.col_d.1':       'Cultura y patrimonio',
    'footer.col_d.2':       'Gastronomía',
    'footer.col_d.3':       'Biodiversidad',
    'footer.col_d.4':       'Historia inca',
    'footer.col_d.5':       'Mejor época',
    'footer.col_i.1':       'Calculadora de retorno',
    'footer.col_i.2':       'Guía del comprador',
    'footer.col_i.3':       'Trámites y visas',
    'footer.col_i.4':       'Costo de vida',
    'footer.col_i.5':       'Financiación',
    'footer.col_p.1':       'Propiedades',
    'footer.col_p.2':       'Regiones',
    'footer.col_p.3':       'Inmobiliarias B2B',
    'footer.col_p.4':       'Andes AI',
    'footer.col_p.5':       'Blog editorial',
    'footer.news_eyebrow':  'Recibe la revista',
    'footer.news_desc':     'Una pieza editorial mensual sobre vivir en Perú.',
    'footer.news_placeholder':'tu@email.com',
    'footer.copyright':     '© 2026 Andes Capital Estates · Todos los derechos reservados',
    'footer.legal.privacy': 'Privacidad',
    'footer.legal.terms':   'Aviso legal',
    'footer.legal.cookies': 'Cookies',
    'footer.legal.agents':  'Inmobiliarias',

    // ─── Chat Andes AI ───────────────────────────────────
    'chat.fab_subtitle':    'Tu asesor local',
    'chat.online':          'ASESOR EN LÍNEA',
    'chat.placeholder':     'Pregúntale a tu asesor local…',
    'chat.welcome':         'Hola, soy Andes AI. Conozco las 25 regiones del Perú al detalle y puedo ayudarte a decidir dónde encajaría mejor tu próxima vida o tu próxima inversión. Si ya estás mirando una ciudad concreta, dímelo y entramos en barrio. ¿Por dónde empezamos?',
    'chat.chip.home.1':     'Busco vida cerca del mar',
    'chat.chip.home.2':     'Me interesa Cusco para invertir',
    'chat.chip.home.3':     '¿Qué barrio de Lima me recomiendas?',
    'chat.chip.home.4':     '¿Qué trámites necesito siendo español?',
    'chat.chip.city.1':     'Cuéntame de {city} como si vivieras allí',
    'chat.chip.city.2':     '¿Qué barrio me recomendarías?',
    'chat.chip.city.3':     '¿Cómo está la rentabilidad por aquí?',
    'chat.chip.city.4':     'Muéstrame opciones reales del inventario',
    'chat.chip.add.1':      '¿Cómo funciona la verificación?',
    'chat.chip.add.2':      '¿Qué comisión cobran?',
    'chat.chip.add.3':      '¿En qué plazo me contactan?',
    'chat.chip.add.4':      '¿Qué propiedades buscan?',
    'chat.whatsapp':        'Continuar por WhatsApp',
    'chat.whatsapp_msg':    'Hola Andes Capital Estates, vengo del chat de la web y me gustaría seguir la conversación con un asesor.',

    // ─── Add property ────────────────────────────────────
    'add.back':                 'Volver',
    'add.hero_quechua':         'ꟼ Wasiyki yapay · Suma tu propiedad',
    'add.hero_title_a':         'Tu propiedad,',
    'add.hero_title_b':         'una audiencia internacional.',
    'add.hero_lede':            'Andes Capital Estates es la primera plataforma editorial del Perú orientada al comprador europeo. Si tu propiedad tiene historia, ubicación cuidada y documentación en regla, queremos verla. Curamos cada inventario uno por uno: por eso nuestros compradores llegan informados, decididos y dispuestos a recorrer doce horas de vuelo.',
    'add.bullet1_title':        'Verificamos',
    'add.bullet1_text':         'Documentación registral, partida SUNARP y ubicación validada en campo.',
    'add.bullet2_title':        'Editamos',
    'add.bullet2_text':         'Fotografía profesional, ficha editorial bilingüe (ES + EN), data de mercado.',
    'add.bullet3_title':        'Conectamos',
    'add.bullet3_text':         'Compradores cualificados desde España, Italia, Francia y Portugal.',
    'add.sec1.quechua':         'Pi kanki · Quién eres',
    'add.sec1.title':           'Datos del propietario',
    'add.sec1.lede':            'La información se mantiene confidencial. Solo se publica lo que tú apruebes en la ficha final.',
    'add.sec2.quechua':         'Maypin kashan · Dónde está',
    'add.sec2.title':           'Ubicación de la propiedad',
    'add.sec2.lede':            'Empezamos por el mapa: macro región, departamento y ciudad o distrito. Si tu zona no aparece, la añades.',
    'add.sec3.quechua':         'Imayna kashan · Cómo es',
    'add.sec3.title':           'Datos de la propiedad',
    'add.sec3.lede':            'Información que necesitamos para la ficha editorial y el cálculo de yield potencial.',
    'add.sec4.quechua':         'Sumaq rimay · Acuerdos',
    'add.sec4.title':           'Términos y condiciones',
    'add.sec4.lede':            'Estos puntos son la base de nuestra promesa al comprador. No publicamos sin estas tres confirmaciones.',
    'add.field.tipo_owner':     'Tipo de propietario',
    'add.opt.particular':       'Particular · dueño de la propiedad',
    'add.opt.inmobiliaria':     'Inmobiliaria local · agencia aliada',
    'add.opt.inversor':         'Inversor con cartera',
    'add.field.nombre_inm':     'Nombre de la inmobiliaria',
    'add.field.nombre':         'Nombre',
    'add.field.apellido':       'Apellidos',
    'add.field.email':          'Email',
    'add.field.pais':           'País de residencia',
    'add.field.tel':            'Teléfono',
    'add.field.whatsapp':       'WhatsApp (si es distinto)',
    'add.field.macro':          'Macro región',
    'add.field.departamento':   'Departamento / región',
    'add.field.ciudad':         'Ciudad / distrito',
    'add.field.ciudad_otra':    'Especifica la ciudad o distrito',
    'add.field.direccion':      'Dirección o referencia (privada)',
    'add.note.direccion':       'No se publicará. Solo se usa para coordinar la visita técnica.',
    'add.field.tipo':           'Tipo de propiedad',
    'add.field.modelo':         'Modelo de comercialización',
    'add.field.estado':         'Estado de la propiedad',
    'add.field.anio':           'Año de construcción',
    'add.field.m2_const':       'm² construidos',
    'add.field.m2_terreno':     'm² de terreno',
    'add.field.hab':            'Habitaciones',
    'add.field.banos':          'Baños',
    'add.field.estacio':        'Estacionamientos',
    'add.field.precio':         'Precio esperado',
    'add.field.moneda':         'Moneda',
    'add.field.desc':           'Descripción libre',
    'add.field.desc_ph':        'Cuéntanos brevemente la propiedad: historia, materiales, vecindario, lo que la hace especial. (Esto nos ayuda a escribir la ficha editorial.)',
    'add.field.fotos':          'Enlace a fotos (Drive, Dropbox, WeTransfer)',
    'add.note.fotos':           'Si no tienes fotos profesionales aún, no te preocupes — coordinaremos sesión fotográfica si la propiedad pasa la curaduría.',
    'add.check.verif':          'Acepto la verificación documental y registral',
    'add.check.verif_help':     'Antes de publicar, verificamos partida SUNARP, libre de cargas, y vigencia de poderes si aplica. La propiedad solo entra al inventario tras este chequeo.',
    'add.check.contact':        'Acepto que un asesor de Andes Capital Estates me contacte',
    'add.check.contact_help':   'Por correo o WhatsApp, dentro de 72 horas hábiles, para coordinar visita técnica y fotografía.',
    'add.check.privacy':        'He leído y acepto la política de privacidad',
    'add.check.privacy_help':   'Tus datos se almacenan en nuestro CRM, no se ceden a terceros y puedes solicitar su eliminación en cualquier momento escribiendo a privacidad@andescapitalestates.com.',
    'add.status.complete':      'Formulario completo · Listo para enviar',
    'add.status.incomplete':    'Completa los campos obligatorios para enviar',
    'add.btn.submit':           'Enviar propiedad',
    'add.btn.sending':          'Enviando…',
    'add.success.quechua':      'ꟼ Wasita yapay · Propiedad recibida',
    'add.success.title_a':      'Gracias.',
    'add.success.title_b':      'Estudiamos tu propiedad.',
    'add.success.p1':           'Hemos recibido la información. Nuestro equipo de curaduría revisará la documentación y la zona en un plazo máximo de 72 horas hábiles. Si tu propiedad cumple con los criterios editoriales y legales de Andes Capital Estates, te contactaremos por correo o WhatsApp para los siguientes pasos: visita técnica, fotografía profesional y verificación registral.',
    'add.success.p2':           'No publicamos toda propiedad que recibimos. Curamos. Esa es la promesa que hacemos al comprador europeo, y por eso podemos pedirla también al propietario.',
    'add.success.back':         'Volver a la portada',
    'add.success.wa':           'Contactar por WhatsApp',
    'add.opt.placeholder_macro_first':'— Selecciona una macro región primero —',
    'add.opt.placeholder_select_region':'— Selecciona una región de {macro} —',
    'add.opt.placeholder_region_first':'— Selecciona una región primero —',
    'add.opt.placeholder_select_city':'— Selecciona ciudad / distrito —',
    'add.opt.other':            'Otra (especificar)',
    'add.opt.select_type':      '— Selecciona un tipo —',
    'add.opt.select_model':     '— Selecciona modelo —',
    'add.opt.select_state':     '— Selecciona estado —',
  },

  // ════════════════════════════════════════════════════════
  //                       INGLÉS
  // ════════════════════════════════════════════════════════
  en: {
    // ─── Nav ─────────────────────────────────────────────
    'nav.inicio':           'Home',
    'nav.peru':             'Discover Peru',
    'nav.regiones':         'Regions',
    'nav.propiedades':      'Properties',
    'nav.internacional':    'Andes International',
    'nav.inversion':        'Invest',
    'nav.contacto':         'Contact',
    'nav.cta_agregar':      'List your property',
    'nav.lang_es':          'Spanish',
    'nav.lang_en':          'English',

    // ─── Hero typográfico ────────────────────────────────
    'hero.t.label':         'ꟼ Andes Capital Estates · est. 2026',
    'hero.t.title1':        'A country',
    'hero.t.title2':        'first,',
    'hero.t.title3':        'then a home.',
    'hero.t.subtitle':      'Discover Peru — coast, highlands and Amazon — and find where the life Europe no longer offers still exists.',
    'hero.t.cta_primary':   'Discover Peru',
    'hero.t.cta_secondary': 'View properties',

    // ─── Hero full-bleed ─────────────────────────────────
    'hero.fb.eyebrow':      'ꟼ Patrimony · Investment · Life',
    'hero.fb.title_a':      'Discover why',
    'hero.fb.title_peru':   'Peru',
    'hero.fb.title_b':      'is becoming one of the',
    'hero.fb.title_smart':  'smartest decisions',
    'hero.fb.title_c':      'to live and invest.',
    'hero.fb.slide1.headline': 'Lima on the Pacific',
    'hero.fb.slide1.caption':  'Miraflores boardwalk · temperate Pacific',
    'hero.fb.slide2.headline': 'Millennial heritage',
    'hero.fb.slide2.caption':  'Machu Picchu · new wonder of the world',
    'hero.fb.slide3.headline': 'Living Andes',
    'hero.fb.slide3.caption':  'Cordillera Blanca · tropical glaciers',

    // ─── Properties section ──────────────────────────────
    'prop.section_label':   'ꟼ Section 05 · Wasikuna',
    'prop.title_line1':     'Featured',
    'prop.title_line2':     'properties.',
    'prop.macro_costa':     'Coast',
    'prop.macro_sierra':    'Highlands',
    'prop.macro_selva':     'Amazon',
    'prop.cities_of':       'Cities in {macro} · {count}',
    'prop.desde':           'From',
    'prop.return_short':    'yield',
    'prop.hab':             'bed',
    'prop.banos':           'bath',
    'prop.ver_ficha':       'View details',
    'prop.ver_mas':         'See more',

    // ─── Footer ──────────────────────────────────────────
    'footer.office_es':     'Madrid office',
    'footer.office_pe':     'Lima office',
    'footer.attention':     'Concierge',
    'footer.attention_hours':'Mon-Fri · 09:00 — 19:00 CET',
    'footer.brand_desc':    'The first real estate platform that makes you fall in love with the country before selling you a property. Coast, highlands or Amazon — a place for every life.',
    'footer.col_discover':  'Discover Peru',
    'footer.col_invest':    'Invest',
    'footer.col_platform':  'Platform',
    'footer.col_d.1':       'Culture and heritage',
    'footer.col_d.2':       'Gastronomy',
    'footer.col_d.3':       'Biodiversity',
    'footer.col_d.4':       'Inca history',
    'footer.col_d.5':       'When to visit',
    'footer.col_i.1':       'Return calculator',
    'footer.col_i.2':       'Buyer’s guide',
    'footer.col_i.3':       'Visas and paperwork',
    'footer.col_i.4':       'Cost of living',
    'footer.col_i.5':       'Financing',
    'footer.col_p.1':       'Properties',
    'footer.col_p.2':       'Regions',
    'footer.col_p.3':       'Local agencies (B2B)',
    'footer.col_p.4':       'Andes AI',
    'footer.col_p.5':       'Editorial blog',
    'footer.news_eyebrow':  'Subscribe to the magazine',
    'footer.news_desc':     'A monthly editorial piece on living in Peru.',
    'footer.news_placeholder':'your@email.com',
    'footer.copyright':     '© 2026 Andes Capital Estates · All rights reserved',
    'footer.legal.privacy': 'Privacy',
    'footer.legal.terms':   'Legal notice',
    'footer.legal.cookies': 'Cookies',
    'footer.legal.agents':  'Agencies',

    // ─── Chat Andes AI ───────────────────────────────────
    'chat.fab_subtitle':    'Your local advisor',
    'chat.online':          'ADVISOR ONLINE',
    'chat.placeholder':     'Ask your local advisor…',
    'chat.welcome':         'Hi, I’m Andes AI. I know all 25 regions of Peru in detail and I can help you figure out where your next life — or your next investment — would fit best. If you’re already looking at a specific city, tell me and we’ll go neighborhood by neighborhood. Where shall we start?',
    'chat.chip.home.1':     'I’m looking for a life by the sea',
    'chat.chip.home.2':     'I’m interested in Cusco as an investment',
    'chat.chip.home.3':     'Which neighborhood in Lima would you recommend?',
    'chat.chip.home.4':     'What paperwork do I need as a European?',
    'chat.chip.city.1':     'Tell me about {city} as if you lived there',
    'chat.chip.city.2':     'Which neighborhood would you recommend?',
    'chat.chip.city.3':     'How are the returns around here?',
    'chat.chip.city.4':     'Show me real options from the inventory',
    'chat.chip.add.1':      'How does verification work?',
    'chat.chip.add.2':      'What’s your commission?',
    'chat.chip.add.3':      'How long until you contact me?',
    'chat.chip.add.4':      'What kind of properties are you looking for?',
    'chat.whatsapp':        'Continue on WhatsApp',
    'chat.whatsapp_msg':    'Hi Andes Capital Estates, I’m coming from the website chat and would like to continue the conversation with an advisor.',

    // ─── Add property ────────────────────────────────────
    'add.back':                 'Back',
    'add.hero_quechua':         'ꟼ Wasiyki yapay · List your property',
    'add.hero_title_a':         'Your property,',
    'add.hero_title_b':         'an international audience.',
    'add.hero_lede':            'Andes Capital Estates is the first editorial real estate platform in Peru aimed at the European buyer. If your property has a story, a thoughtful location and clean paperwork, we want to see it. We curate every listing one by one — that’s why our buyers arrive informed, decided and willing to fly twelve hours.',
    'add.bullet1_title':        'We verify',
    'add.bullet1_text':         'Title deed, SUNARP records and location validated in person.',
    'add.bullet2_title':        'We edit',
    'add.bullet2_text':         'Professional photography, bilingual editorial listing (ES + EN), market data.',
    'add.bullet3_title':        'We connect',
    'add.bullet3_text':         'Qualified buyers from Spain, Italy, France and Portugal.',
    'add.sec1.quechua':         'Pi kanki · Who you are',
    'add.sec1.title':           'Owner details',
    'add.sec1.lede':            'Your information stays confidential. Only what you approve gets published in the final listing.',
    'add.sec2.quechua':         'Maypin kashan · Where it is',
    'add.sec2.title':           'Property location',
    'add.sec2.lede':            'We start with the map: macro region, department and city or district. If your area isn’t listed, you can add it.',
    'add.sec3.quechua':         'Imayna kashan · What it’s like',
    'add.sec3.title':           'Property details',
    'add.sec3.lede':            'Information we need for the editorial listing and the potential yield calculation.',
    'add.sec4.quechua':         'Sumaq rimay · Agreements',
    'add.sec4.title':           'Terms and conditions',
    'add.sec4.lede':            'These three points are the foundation of our promise to the buyer. We don’t publish without them.',
    'add.field.tipo_owner':     'Owner type',
    'add.opt.particular':       'Individual · owner of the property',
    'add.opt.inmobiliaria':     'Local agency · partner agency',
    'add.opt.inversor':         'Investor with portfolio',
    'add.field.nombre_inm':     'Agency name',
    'add.field.nombre':         'First name',
    'add.field.apellido':       'Last name',
    'add.field.email':          'Email',
    'add.field.pais':           'Country of residence',
    'add.field.tel':            'Phone',
    'add.field.whatsapp':       'WhatsApp (if different)',
    'add.field.macro':          'Macro region',
    'add.field.departamento':   'Department / region',
    'add.field.ciudad':         'City / district',
    'add.field.ciudad_otra':    'Specify the city or district',
    'add.field.direccion':      'Address or reference (private)',
    'add.note.direccion':       'Not published. Used only to coordinate the on-site visit.',
    'add.field.tipo':           'Property type',
    'add.field.modelo':         'Commercialization model',
    'add.field.estado':         'Property condition',
    'add.field.anio':           'Year built',
    'add.field.m2_const':       'Built m²',
    'add.field.m2_terreno':     'Land m²',
    'add.field.hab':            'Bedrooms',
    'add.field.banos':          'Bathrooms',
    'add.field.estacio':        'Parking spaces',
    'add.field.precio':         'Asking price',
    'add.field.moneda':         'Currency',
    'add.field.desc':           'Free description',
    'add.field.desc_ph':        'Tell us briefly about the property: history, materials, neighborhood, what makes it special. (This helps us write the editorial listing.)',
    'add.field.fotos':          'Link to photos (Drive, Dropbox, WeTransfer)',
    'add.note.fotos':           'If you don’t have professional photos yet, don’t worry — we’ll arrange a shoot if the property passes curation.',
    'add.check.verif':          'I accept document and registry verification',
    'add.check.verif_help':     'Before publishing, we verify the SUNARP record, encumbrance clearance and current powers of attorney if applicable. The property only enters the inventory after this check.',
    'add.check.contact':        'I accept that an Andes Capital Estates advisor contacts me',
    'add.check.contact_help':   'By email or WhatsApp, within 72 working hours, to coordinate the on-site visit and photography.',
    'add.check.privacy':        'I have read and accept the privacy policy',
    'add.check.privacy_help':   'Your data is stored in our CRM, never shared with third parties, and you can request its deletion at any time by writing to privacy@andescapitalestates.com.',
    'add.status.complete':      'Form complete · Ready to submit',
    'add.status.incomplete':    'Complete the required fields to submit',
    'add.btn.submit':           'Submit property',
    'add.btn.sending':          'Sending…',
    'add.success.quechua':      'ꟼ Wasita yapay · Property received',
    'add.success.title_a':      'Thank you.',
    'add.success.title_b':      'We’re reviewing your property.',
    'add.success.p1':           'We have received the information. Our curation team will review the documentation and the area within a maximum of 72 working hours. If your property meets the editorial and legal criteria of Andes Capital Estates, we will contact you by email or WhatsApp for the next steps: on-site visit, professional photography and registry verification.',
    'add.success.p2':           'We don’t publish every property we receive. We curate. That’s the promise we make to the European buyer — and the reason we can ask the same of the owner.',
    'add.success.back':         'Back to homepage',
    'add.success.wa':           'Contact via WhatsApp',
    'add.opt.placeholder_macro_first':'— Select a macro region first —',
    'add.opt.placeholder_select_region':'— Select a region from {macro} —',
    'add.opt.placeholder_region_first':'— Select a region first —',
    'add.opt.placeholder_select_city':'— Select city / district —',
    'add.opt.other':            'Other (specify)',
    'add.opt.select_type':      '— Select a type —',
    'add.opt.select_model':     '— Select model —',
    'add.opt.select_state':     '— Select condition —',
  },
};

// Setea el atributo lang inicial al cargar.
try { document.documentElement.setAttribute('lang', getLocale()); } catch { }

window.useT = useT;
window.useLocale = useLocale;
window.setLocale = setLocale;
window.getLocale = getLocale;
window.translate = translate;
