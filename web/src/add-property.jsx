// Add Property — landing standalone para captación B2C/B2B de inventario.
// Persona objetivo: propietario individual peruano + inmobiliaria local aliada
// (Persona 5 del MARKETING-KB §3). Recolecta datos del propietario, ubicación
// (región + ciudad/distrito), datos de la propiedad y términos de aceptación.
//
// Nota: el envío del formulario imprime los datos por consola y muestra una
// pantalla de agradecimiento. La integración real con CRM (HubSpot) se conecta
// reemplazando el handler `submit()` por un POST al endpoint correspondiente.

const PROPERTY_TYPES = [
  'Departamento',
  'Casa',
  'Casa de playa',
  'Casa colonial',
  'Casa de campo',
  'Loft',
  'Ático',
  'Villa',
  'Hacienda',
  'Eco-lodge',
  'Terreno',
  'Local comercial',
  'Otro',
];

const SALE_MODELS = [
  { id: 'venta',          label: 'Venta directa' },
  { id: 'vacacional',     label: 'Alquiler vacacional' },
  { id: 'largo-plazo',    label: 'Alquiler largo plazo' },
  { id: 'mixto',          label: 'Mixto · Venta + alquiler' },
];

const PROPERTY_STATES = [
  'Habitable · listo para entrar',
  'Habitable · requiere mejoras menores',
  'Requiere reformas mayores',
  'En construcción / obra gruesa',
  'Terreno sin construir',
];

// Distritos / ciudades secundarias por región. Para regiones con varios polos,
// listamos los principales; en cualquier caso el formulario permite "Otra"
// con campo de texto libre.
const CITIES_BY_REGION = {
  'tumbes':        ['Tumbes', 'Zorritos', 'Punta Sal', 'Máncora (frontera)'],
  'piura':         ['Piura', 'Máncora', 'Los Órganos', 'Vichayito', 'Cabo Blanco', 'Catacaos', 'Sullana'],
  'lambayeque':    ['Chiclayo', 'Pimentel', 'Lambayeque', 'Monsefú'],
  'la-libertad':   ['Trujillo', 'Huanchaco', 'Víctor Larco', 'Salaverry', 'Pacasmayo'],
  'cajamarca':     ['Cajamarca', 'Baños del Inca', 'Celendín'],
  'amazonas':      ['Chachapoyas', 'Bagua', 'Leymebamba'],
  'loreto':        ['Iquitos', 'Punchana', 'Belén', 'Nauta'],
  'san-martin':    ['Tarapoto', 'Moyobamba', 'Lamas'],
  'ucayali':       ['Pucallpa', 'Yarinacocha'],
  'ancash':        ['Huaraz', 'Yungay', 'Caraz', 'Chimbote'],
  'huanuco':       ['Huánuco', 'Tingo María'],
  'pasco':         ['Cerro de Pasco', 'Oxapampa'],
  'junin':         ['Huancayo', 'Tarma', 'La Merced', 'Chanchamayo'],
  'lima':          ['Miraflores', 'Barranco', 'San Isidro', 'Surco', 'La Molina', 'San Borja', 'Chorrillos', 'Pueblo Libre', 'Magdalena', 'Lima Centro', 'Asia (sur)', 'Cieneguilla'],
  'callao':        ['La Punta', 'Chucuito', 'Bellavista', 'Callao Centro'],
  'huancavelica':  ['Huancavelica'],
  'ica':           ['Ica', 'Subtanjalla', 'Paracas', 'Chincha', 'Pisco', 'Nazca'],
  'ayacucho':      ['Ayacucho · Centro Histórico', 'Huamanga'],
  'apurimac':      ['Abancay', 'Andahuaylas'],
  'cusco':         ['San Blas', 'Centro Histórico', 'Wanchaq', 'San Sebastián', 'Valle Sagrado · Urubamba', 'Valle Sagrado · Pisac', 'Ollantaytambo', 'Machu Picchu Pueblo'],
  'madre-de-dios': ['Puerto Maldonado', 'Tambopata'],
  'puno':          ['Puno', 'Chucuito', 'Juliaca'],
  'arequipa':      ['Arequipa · Cayma', 'Arequipa · Yanahuara', 'Arequipa · Centro Histórico', 'Arequipa · Sachaca', 'Mollendo', 'Mejía'],
  'moquegua':      ['Moquegua', 'Ilo'],
  'tacna':         ['Tacna', 'Pocollay'],
};

function AddProperty({ onBack }) {
  const [step, setStep] = React.useState('form'); // form | success
  const [submitting, setSubmitting] = React.useState(false);

  const [form, setForm] = React.useState({
    // owner
    nombre: '', apellido: '', email: '', telefono: '', whatsapp: '',
    pais: 'Perú', tipoOwner: 'particular', // particular | inmobiliaria | inversor
    nombreInmobiliaria: '',
    // location
    macro: '', regionId: '', ciudad: '', ciudadOtra: '', direccion: '',
    // property
    tipo: '', m2Construido: '', m2Terreno: '', habitaciones: '', banos: '',
    estacionamientos: '', anio: '',
    estado: '', modelo: '',
    precio: '', moneda: 'USD',
    descripcion: '', urlFotos: '',
    // terms
    aceptaVerificacion: false,
    aceptaContacto: false,
    aceptaPrivacidad: false,
  });

  const REGIONS = window.REGIONS || [];

  const macros = [
    { id: 'costa',  label: 'Costa',  color: '#6FA8C9' },
    { id: 'sierra', label: 'Sierra', color: '#C9A961' },
    { id: 'selva',  label: 'Selva',  color: '#7FB069' },
  ];

  const regionsOfMacro = REGIONS.filter(r => !form.macro || r.tipo === form.macro);
  const cities = form.regionId ? (CITIES_BY_REGION[form.regionId] || []) : [];

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function isValid() {
    return (
      form.nombre.trim() &&
      form.email.trim() &&
      form.telefono.trim() &&
      form.macro &&
      form.regionId &&
      (form.ciudad || form.ciudadOtra) &&
      form.tipo &&
      form.modelo &&
      form.precio &&
      form.aceptaVerificacion &&
      form.aceptaPrivacidad
    );
  }

  function submit(e) {
    e.preventDefault();
    if (!isValid()) return;
    setSubmitting(true);
    // TODO: reemplazar este bloque por POST a CRM (HubSpot) o backend propio.
    const payload = {
      ...form,
      ciudadFinal: form.ciudad === '__otra__' ? form.ciudadOtra : form.ciudad,
      submittedAt: new Date().toISOString(),
      source: 'web · add-property',
    };
    console.log('[ACE · Nueva propiedad recibida]', payload);
    setTimeout(() => {
      setSubmitting(false);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  }

  // ──────────────────────────── SUCCESS SCREEN ────────────────────────────
  if (step === 'success') {
    return (
      <div style={{minHeight:'100vh', background:'var(--bg-primary)', color:'var(--text-on-dark)'}}>
        <div className="wrap" style={{paddingTop:160, paddingBottom:120, maxWidth:760}}>
          <div className="quechua" style={{marginBottom:32}}>ꟼ Wasita yapay · Propiedad recibida</div>
          <h1 className="h-display" style={{fontSize:'clamp(48px, 6vw, 88px)', marginBottom:32}}>
            Gracias.<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Estudiamos tu propiedad.</em>
          </h1>
          <p style={{fontSize:18, lineHeight:1.7, color:'var(--text-on-dark-muted)', marginBottom:24}}>
            Hemos recibido la información. Nuestro equipo de curaduría revisará la documentación y la zona en
            un plazo máximo de <strong style={{color:'var(--text-on-dark)'}}>72 horas hábiles</strong>. Si tu
            propiedad cumple con los criterios editoriales y legales de Andes Capital Estates, te contactaremos
            por correo o WhatsApp para los siguientes pasos: visita técnica, fotografía profesional y
            verificación registral.
          </p>
          <p style={{fontSize:15, lineHeight:1.7, color:'var(--text-on-dark-muted)', marginBottom:48}}>
            No publicamos toda propiedad que recibimos. Curamos. Esa es la promesa que hacemos al comprador
            europeo, y por eso podemos pedirla también al propietario.
          </p>
          <div style={{display:'flex', gap:14, flexWrap:'wrap'}}>
            <button className="btn-gold" onClick={onBack}>Volver a la portada <span className="arrow" /></button>
            <a className="btn-ghost" href="https://wa.me/" target="_blank" rel="noreferrer">Contactar por WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────── FORM ────────────────────────────
  return (
    <div style={{minHeight:'100vh', background:'var(--bg-primary)', color:'var(--text-on-dark)'}}>
      {/* Back nav */}
      <div style={{position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'18px var(--gutter)', background:'linear-gradient(180deg, rgba(14,16,20,0.95), rgba(14,16,20,0.6))', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border-dark)'}}>
        <button onClick={onBack} style={{display:'inline-flex', alignItems:'center', gap:12, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--text-on-dark-muted)', cursor:'pointer'}}>
          <span style={{display:'inline-block', width:18, height:1, background:'currentColor', position:'relative'}}>
            <span style={{position:'absolute', left:0, top:-3, width:6, height:6, borderTop:'1px solid currentColor', borderLeft:'1px solid currentColor', transform:'rotate(-45deg)'}} />
          </span>
          Volver
        </button>
      </div>

      {/* Hero */}
      <section style={{padding:'160px 0 60px', position:'relative'}}>
        <div className="motif-pattern" />
        <div className="wrap" style={{position:'relative', zIndex:1, maxWidth:980}}>
          <div className="quechua" style={{marginBottom:24}}>ꟼ Wasiyki yapay · Suma tu propiedad</div>
          <h1 className="h-display" style={{fontSize:'clamp(48px, 7vw, 104px)', letterSpacing:'-0.02em', marginBottom:32}}>
            Tu propiedad,<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>una audiencia internacional.</em>
          </h1>
          <p style={{fontSize:19, lineHeight:1.65, color:'var(--text-on-dark-muted)', maxWidth:720, marginBottom:24}}>
            Andes Capital Estates es la primera plataforma editorial del Perú orientada al comprador europeo.
            Si tu propiedad tiene historia, ubicación cuidada y documentación en regla, queremos verla.
            Curamos cada inventario uno por uno: por eso nuestros compradores llegan informados, decididos
            y dispuestos a recorrer doce horas de vuelo.
          </p>
          <div style={{display:'flex', gap:32, flexWrap:'wrap', marginTop:40, paddingTop:32, borderTop:'1px solid var(--border-dark)'}}>
            <Bullet num="01" titulo="Verificamos" texto="Documentación registral, partida SUNARP y ubicación validada en campo." />
            <Bullet num="02" titulo="Editamos" texto="Fotografía profesional, ficha editorial bilingüe (ES + EN), data de mercado." />
            <Bullet num="03" titulo="Conectamos" texto="Compradores cualificados desde España, Italia, Francia y Portugal." />
          </div>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={submit} style={{position:'relative'}}>
        <div className="wrap" style={{maxWidth:980, padding:'40px var(--gutter) 120px'}}>

          {/* SECCIÓN 1 — PROPIETARIO */}
          <Section
            num="01"
            quechua="Pi kanki · Quién eres"
            titulo="Datos del propietario"
            lede="La información se mantiene confidencial. Solo se publica lo que tú apruebes en la ficha final."
          >
            <Row>
              <Field label="Tipo de propietario" required>
                <Select value={form.tipoOwner} onChange={v => update('tipoOwner', v)}
                  options={[
                    { v:'particular',    l:'Particular · dueño de la propiedad' },
                    { v:'inmobiliaria',  l:'Inmobiliaria local · agencia aliada' },
                    { v:'inversor',      l:'Inversor con cartera' },
                  ]} />
              </Field>
              {form.tipoOwner === 'inmobiliaria' && (
                <Field label="Nombre de la inmobiliaria">
                  <Input value={form.nombreInmobiliaria} onChange={v => update('nombreInmobiliaria', v)} placeholder="Ej. Cusco Estates SAC" />
                </Field>
              )}
            </Row>

            <Row>
              <Field label="Nombre" required>
                <Input value={form.nombre} onChange={v => update('nombre', v)} placeholder="Nombre" autoComplete="given-name" />
              </Field>
              <Field label="Apellidos">
                <Input value={form.apellido} onChange={v => update('apellido', v)} placeholder="Apellidos" autoComplete="family-name" />
              </Field>
            </Row>

            <Row>
              <Field label="Email" required>
                <Input type="email" value={form.email} onChange={v => update('email', v)} placeholder="tu@email.com" autoComplete="email" />
              </Field>
              <Field label="País de residencia">
                <Input value={form.pais} onChange={v => update('pais', v)} placeholder="Perú · España · …" />
              </Field>
            </Row>

            <Row>
              <Field label="Teléfono" required>
                <Input type="tel" value={form.telefono} onChange={v => update('telefono', v)} placeholder="+51 999 999 999" autoComplete="tel" />
              </Field>
              <Field label="WhatsApp (si es distinto)">
                <Input type="tel" value={form.whatsapp} onChange={v => update('whatsapp', v)} placeholder="+51 999 999 999" />
              </Field>
            </Row>
          </Section>

          {/* SECCIÓN 2 — UBICACIÓN */}
          <Section
            num="02"
            quechua="Maypin kashan · Dónde está"
            titulo="Ubicación de la propiedad"
            lede="Empezamos por el mapa: macro región, departamento y ciudad o distrito. Si tu zona no aparece, la añades."
          >
            <Field label="Macro región" required>
              <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
                {macros.map(m => {
                  const activeM = form.macro === m.id;
                  return (
                    <button key={m.id} type="button"
                      onClick={() => { update('macro', m.id); update('regionId', ''); update('ciudad', ''); }}
                      style={{
                        padding:'14px 22px',
                        border:`1px solid ${activeM ? m.color : 'var(--border-dark)'}`,
                        background: activeM ? `${m.color}14` : 'transparent',
                        color: activeM ? m.color : 'var(--text-on-dark-muted)',
                        fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.24em', textTransform:'uppercase',
                        cursor:'pointer', transition:'all .2s ease',
                      }}>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Row>
              <Field label="Departamento / región" required>
                <Select value={form.regionId} onChange={v => { update('regionId', v); update('ciudad', ''); }}
                  options={[
                    { v:'', l:form.macro ? `— Selecciona una región de ${form.macro} —` : '— Selecciona una macro región primero —' },
                    ...regionsOfMacro.map(r => ({ v:r.id, l:r.nombre })),
                  ]}
                  disabled={!form.macro} />
              </Field>
              <Field label="Ciudad / distrito" required>
                <Select value={form.ciudad} onChange={v => update('ciudad', v)}
                  options={[
                    { v:'', l: form.regionId ? '— Selecciona ciudad / distrito —' : '— Selecciona una región primero —' },
                    ...cities.map(c => ({ v:c, l:c })),
                    { v:'__otra__', l:'Otra (especificar)' },
                  ]}
                  disabled={!form.regionId} />
              </Field>
            </Row>

            {form.ciudad === '__otra__' && (
              <Field label="Especifica la ciudad o distrito" required>
                <Input value={form.ciudadOtra} onChange={v => update('ciudadOtra', v)} placeholder="Ej. Pacasmayo · Salaverry · Chinchero" />
              </Field>
            )}

            <Field label="Dirección o referencia (privada)">
              <Input value={form.direccion} onChange={v => update('direccion', v)} placeholder="Ej. Av. Pardo cuadra 6, frente al parque" />
              <Note>No se publicará. Solo se usa para coordinar la visita técnica.</Note>
            </Field>
          </Section>

          {/* SECCIÓN 3 — PROPIEDAD */}
          <Section
            num="03"
            quechua="Imayna kashan · Cómo es"
            titulo="Datos de la propiedad"
            lede="Información que necesitamos para la ficha editorial y el cálculo de yield potencial."
          >
            <Row>
              <Field label="Tipo de propiedad" required>
                <Select value={form.tipo} onChange={v => update('tipo', v)}
                  options={[{ v:'', l:'— Selecciona un tipo —' }, ...PROPERTY_TYPES.map(t => ({ v:t, l:t }))]} />
              </Field>
              <Field label="Modelo de comercialización" required>
                <Select value={form.modelo} onChange={v => update('modelo', v)}
                  options={[{ v:'', l:'— Selecciona modelo —' }, ...SALE_MODELS.map(s => ({ v:s.id, l:s.label }))]} />
              </Field>
            </Row>

            <Row>
              <Field label="Estado de la propiedad">
                <Select value={form.estado} onChange={v => update('estado', v)}
                  options={[{ v:'', l:'— Selecciona estado —' }, ...PROPERTY_STATES.map(s => ({ v:s, l:s }))]} />
              </Field>
              <Field label="Año de construcción">
                <Input type="number" value={form.anio} onChange={v => update('anio', v)} placeholder="1985 · 2018 · …" />
              </Field>
            </Row>

            <Row>
              <Field label="m² construidos">
                <Input type="number" value={form.m2Construido} onChange={v => update('m2Construido', v)} placeholder="220" />
              </Field>
              <Field label="m² de terreno">
                <Input type="number" value={form.m2Terreno} onChange={v => update('m2Terreno', v)} placeholder="320" />
              </Field>
            </Row>

            <Row>
              <Field label="Habitaciones">
                <Input type="number" value={form.habitaciones} onChange={v => update('habitaciones', v)} placeholder="3" />
              </Field>
              <Field label="Baños">
                <Input type="number" value={form.banos} onChange={v => update('banos', v)} placeholder="2" />
              </Field>
              <Field label="Estacionamientos">
                <Input type="number" value={form.estacionamientos} onChange={v => update('estacionamientos', v)} placeholder="1" />
              </Field>
            </Row>

            <Row>
              <Field label="Precio esperado" required>
                <Input type="number" value={form.precio} onChange={v => update('precio', v)} placeholder="320000" />
              </Field>
              <Field label="Moneda">
                <Select value={form.moneda} onChange={v => update('moneda', v)}
                  options={[
                    { v:'USD', l:'USD · Dólares' },
                    { v:'PEN', l:'PEN · Soles' },
                    { v:'EUR', l:'EUR · Euros' },
                  ]} />
              </Field>
            </Row>

            <Field label="Descripción libre">
              <Textarea value={form.descripcion} onChange={v => update('descripcion', v)} rows={5}
                placeholder="Cuéntanos brevemente la propiedad: historia, materiales, vecindario, lo que la hace especial. (Esto nos ayuda a escribir la ficha editorial.)" />
            </Field>

            <Field label="Enlace a fotos (Drive, Dropbox, WeTransfer)">
              <Input value={form.urlFotos} onChange={v => update('urlFotos', v)} placeholder="https://drive.google.com/…" />
              <Note>Si no tienes fotos profesionales aún, no te preocupes — coordinaremos sesión fotográfica si la propiedad pasa la curaduría.</Note>
            </Field>
          </Section>

          {/* SECCIÓN 4 — TÉRMINOS */}
          <Section
            num="04"
            quechua="Sumaq rimay · Acuerdos"
            titulo="Términos y condiciones"
            lede="Estos puntos son la base de nuestra promesa al comprador. No publicamos sin estas tres confirmaciones."
          >
            <Check
              checked={form.aceptaVerificacion}
              onChange={v => update('aceptaVerificacion', v)}
              required
              label="Acepto la verificación documental y registral"
              help="Antes de publicar, verificamos partida SUNARP, libre de cargas, y vigencia de poderes si aplica. La propiedad solo entra al inventario tras este chequeo."
            />
            <Check
              checked={form.aceptaContacto}
              onChange={v => update('aceptaContacto', v)}
              label="Acepto que un asesor de Andes Capital Estates me contacte"
              help="Por correo o WhatsApp, dentro de 72 horas hábiles, para coordinar visita técnica y fotografía."
            />
            <Check
              checked={form.aceptaPrivacidad}
              onChange={v => update('aceptaPrivacidad', v)}
              required
              label="He leído y acepto la política de privacidad"
              help="Tus datos se almacenan en nuestro CRM, no se ceden a terceros y puedes solicitar su eliminación en cualquier momento escribiendo a privacidad@andescapitalestates.com."
            />
          </Section>

          {/* SUBMIT */}
          <div style={{marginTop:48, padding:'32px 0 0', borderTop:'1px solid var(--border-dark)', display:'flex', gap:18, alignItems:'center', flexWrap:'wrap', justifyContent:'space-between'}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-subtle)', letterSpacing:'0.18em', textTransform:'uppercase'}}>
              {isValid() ? 'Formulario completo · Listo para enviar' : 'Completa los campos obligatorios para enviar'}
            </div>
            <button type="submit" className="btn-gold" disabled={!isValid() || submitting}
              style={{opacity: (!isValid() || submitting) ? 0.5 : 1, cursor: (!isValid() || submitting) ? 'not-allowed' : 'pointer'}}>
              {submitting ? 'Enviando…' : 'Enviar propiedad'} <span className="arrow" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ──────────────────────────── SUBCOMPONENTES UI ────────────────────────────

function Section({ num, quechua, titulo, lede, children }) {
  return (
    <section style={{marginTop:80, paddingTop:48, borderTop:'1px solid var(--border-dark)'}}>
      <div style={{display:'grid', gridTemplateColumns:'minmax(0, 280px) 1fr', gap:48, alignItems:'start'}}>
        <div>
          <div className="section-number" style={{fontSize:80, color:'var(--gold-primary)', lineHeight:0.9, marginBottom:18}}>{num}</div>
          <div className="quechua" style={{marginBottom:14}}>ꟼ {quechua}</div>
          <h2 className="h-display" style={{fontSize:32, fontWeight:300, letterSpacing:'-0.01em', marginBottom:14}}>{titulo}</h2>
          <p style={{fontSize:14, lineHeight:1.65, color:'var(--text-on-dark-muted)'}}>{lede}</p>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:24}}>
          {children}
        </div>
      </div>
    </section>
  );
}

function Row({ children }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${React.Children.count(children)}, 1fr)`, gap:20}}>
      {children}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label style={{display:'flex', flexDirection:'column', gap:8}}>
      <span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--text-on-dark-muted)'}}>
        {label}{required && <span style={{color:'var(--gold-primary)', marginLeft:6}}>*</span>}
      </span>
      {children}
    </label>
  );
}

function Note({ children }) {
  return <span style={{fontFamily:'var(--font-sans)', fontSize:12, color:'var(--text-on-dark-subtle)', fontStyle:'italic'}}>{children}</span>;
}

const inputStyle = {
  width:'100%',
  padding:'14px 16px',
  background:'rgba(255,255,255,0.025)',
  border:'1px solid var(--border-dark)',
  color:'var(--text-on-dark)',
  fontFamily:'var(--font-sans)', fontSize:14, fontWeight:300,
  outline:'none',
  transition:'border-color .2s ease, background .2s ease',
};

function Input({ value, onChange, placeholder, type, autoComplete }) {
  return (
    <input
      type={type || 'text'}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      style={inputStyle}
      onFocus={e => { e.target.style.borderColor = 'var(--gold-primary)'; e.target.style.background = 'rgba(201,169,97,0.04)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.background = 'rgba(255,255,255,0.025)'; }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows || 4}
      style={{ ...inputStyle, resize:'vertical', lineHeight:1.6 }}
      onFocus={e => { e.target.style.borderColor = 'var(--gold-primary)'; e.target.style.background = 'rgba(201,169,97,0.04)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--border-dark)'; e.target.style.background = 'rgba(255,255,255,0.025)'; }}
    />
  );
}

function Select({ value, onChange, options, disabled }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      style={{
        ...inputStyle,
        appearance:'none',
        backgroundImage:'linear-gradient(45deg, transparent 50%, var(--gold-primary) 50%), linear-gradient(135deg, var(--gold-primary) 50%, transparent 50%)',
        backgroundPosition:'calc(100% - 18px) 50%, calc(100% - 13px) 50%',
        backgroundSize:'5px 5px, 5px 5px',
        backgroundRepeat:'no-repeat',
        paddingRight:40,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {options.map((o, i) => <option key={i} value={o.v} style={{background:'#16191F', color:'#F5F1E8'}}>{o.l}</option>)}
    </select>
  );
}

function Check({ checked, onChange, label, help, required }) {
  return (
    <label style={{display:'flex', gap:14, padding:'18px 18px', border:`1px solid ${checked ? 'var(--gold-primary)' : 'var(--border-dark)'}`, background: checked ? 'rgba(201,169,97,0.04)' : 'transparent', cursor:'pointer', transition:'all .2s ease'}}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{
          appearance:'none',
          width:18, height:18, marginTop:2,
          border:'1px solid var(--gold-primary)',
          background: checked ? 'var(--gold-primary)' : 'transparent',
          cursor:'pointer', flexShrink:0,
          position:'relative',
        }}
      />
      <span style={{display:'flex', flexDirection:'column', gap:6}}>
        <span style={{fontFamily:'var(--font-sans)', fontSize:14, color:'var(--text-on-dark)', fontWeight:400}}>
          {label}{required && <span style={{color:'var(--gold-primary)', marginLeft:6}}>*</span>}
        </span>
        {help && <span style={{fontFamily:'var(--font-sans)', fontSize:12, color:'var(--text-on-dark-muted)', lineHeight:1.55}}>{help}</span>}
      </span>
    </label>
  );
}

function Bullet({ num, titulo, texto }) {
  return (
    <div style={{flex:'1 1 220px', minWidth:220}}>
      <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.24em', color:'var(--gold-primary)', marginBottom:10}}>ꟼ {num}</div>
      <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:400, marginBottom:8}}>{titulo}</div>
      <div style={{fontSize:14, lineHeight:1.6, color:'var(--text-on-dark-muted)'}}>{texto}</div>
    </div>
  );
}

window.AddProperty = AddProperty;
