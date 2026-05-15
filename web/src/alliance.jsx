// Alianza Internacional — landing editorial que explica la arquitectura
// estratégica de Andes Capital Estates: una agencia peruana operando en
// Europa con dos socios que la sostienen — Construxor (Madrid, construcción
// y soporte legal-técnico) y LIMA Technology AI (Madrid–Lima, plataforma
// digital y campañas). Pensada para que tanto el comprador europeo como el
// propietario peruano entiendan que detrás de cada operación hay una
// estructura logística, tecnológica, legal y comercial verificable.

const ALLIANCE_HERO = {
  img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=2200&q=85',
  caption: 'Madrid · Lima · Una sola arquitectura',
};

const PARTNERS = [
  {
    id: 'construxor',
    nombre: 'Construxor',
    rol: 'Soporte constructivo, técnico y legal',
    sede: 'C/ Núñez de Balboa 120 · Madrid',
    web: 'https://construxor.es/',
    logo: 'https://construxor.es/wp-content/uploads/2025/07/Sin-titulo-1_Mesa-de-trabajo-1.png',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=85',
    tagline: 'Construimos confianza, transformamos espacios.',
    anos: '40+',
    cifra: '90%',
    cifraLabel: 'Satisfacción del cliente',
    descripcion: 'Constructora madrileña con más de cuatro décadas de obra residencial, comercial, hotelera y de rehabilitación patrimonial. Conoce el suelo español, sus procesos notariales, sus tiempos de registro y la documentación exacta que un comprador extranjero necesita.',
    rolEnACE: 'Construxor es el brazo técnico-legal de la alianza. Acompaña al comprador español a lo largo de toda la operación de compra en Perú — desde la verificación documental de la propiedad y la due diligence, hasta la firma de minuta y escritura — bajo estándares europeos. En la fase siguiente, cuando Andes Capital Estates abra cartera en Madrid y Barcelona, será también el aliado que reciba al propietario peruano que decide invertir en España.',
    servicios: [
      'Verificación documental y due diligence cross-border',
      'Coordinación notarial y registral en España y Perú',
      'Reforma y puesta a punto de propiedad adquirida',
      'Asesoría fiscal binacional al comprador',
    ],
  },
  {
    id: 'lima-tech',
    nombre: 'LIMA Technology AI',
    rol: 'Plataforma digital, marketing e inteligencia comercial',
    sede: 'Madrid · Lima',
    web: 'https://lima-ingenieria.digital/',
    logo: 'http://lima-ingenieria.digital/wp-content/uploads/2024/12/LOGO-LIMA-TECHNO_Mesa-de-trabajo-1-copia-22.png',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=85',
    tagline: 'Servicios de IA e ingeniería digital que transforman empresas.',
    anos: '24/7',
    cifra: '100%',
    cifraLabel: 'Desarrollo propietario',
    descripcion: 'Agencia de ingeniería digital con doble sede en Madrid y Lima. Especializada en automatización, inteligencia artificial aplicada, desarrollo de plataformas y campañas de marketing internacional. Es el equipo que construye la infraestructura tecnológica detrás de Andes Capital Estates.',
    rolEnACE: 'LIMA Technology AI es la arquitectura digital de la operación. Ha desarrollado íntegramente la plataforma andescapitalestates.com — el sistema de fichas editoriales, el asesor Andes AI, la integración de inventario, los flujos de captación. Y es también quien diseña y distribuye las campañas que, en las próximas semanas, llevarán Perú al espacio publicitario madrileño: prensa especializada, medios digitales y formatos premium en barrios objetivo.',
    servicios: [
      'Desarrollo y mantenimiento de la plataforma ACE',
      'Asesor Andes AI · IA aplicada al sector inmobiliario',
      'Campañas de marketing en Madrid y Barcelona',
      'Inteligencia de mercado y analítica cross-border',
    ],
  },
];

const PILARES = [
  {
    n: '01',
    titulo: 'Logística',
    desc: 'Coordinación operativa entre ambos países: documentación, traslados notariales, calendarios de cierre y comunicación con notarías peruanas y españolas en simultáneo.',
  },
  {
    n: '02',
    titulo: 'Tecnología',
    desc: 'Plataforma propietaria desarrollada por LIMA Technology AI: fichas editoriales, asistente Andes AI, panel de inventario y trazabilidad completa de cada operación.',
  },
  {
    n: '03',
    titulo: 'Legal',
    desc: 'Soporte de Construxor en España y red notarial verificada en Perú. Due diligence documental, contratos bilingües y cumplimiento normativo en ambos mercados.',
  },
  {
    n: '04',
    titulo: 'Comercial',
    desc: 'Campañas de marketing distribuidas en Madrid y Barcelona — prensa, digital y formato editorial — y un asesor humano que cierra el círculo cuando hay intención real.',
  },
];

function AllianceLanding({ onBack }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const accentColor = 'var(--gold-primary)';

  return (
    <main style={{background:'var(--bg-primary)', color:'var(--text-on-dark)', minHeight:'100vh'}}>
      {/* ───────────── BACK NAV ───────────── */}
      <div style={{
        position:'sticky', top:0, zIndex:30,
        padding:'18px var(--gutter)',
        background:'rgba(14,16,20,0.92)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid var(--border-dark)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <button onClick={onBack} style={{
          display:'inline-flex', alignItems:'center', gap:12,
          padding:'10px 16px', border:'1px solid rgba(201,169,97,0.4)',
          color: accentColor, background:'transparent', cursor:'pointer',
          fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase',
          transition:'all .25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = 'rgba(201,169,97,0.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,169,97,0.4)'; e.currentTarget.style.background = 'transparent'; }}>
          <span style={{fontSize:14, lineHeight:0}}>←</span>
          <span>Volver a Perú</span>
        </button>
        <div className="quechua" style={{color: accentColor}}>
          ꟼ Alianza Internacional · Madrid · Lima
        </div>
      </div>

      {/* ───────────── HERO ───────────── */}
      <section style={allyStyles.heroWrap}>
        <div style={{
          ...allyStyles.heroImg,
          backgroundImage: `url(${ALLIANCE_HERO.img})`,
        }} />
        <div style={allyStyles.heroOverlay} />
        <div className="motif-pattern" style={{opacity:0.45}} />

        <div className="wrap" style={allyStyles.heroContent}>
          <div style={{display:'flex', alignItems:'center', gap:20, marginBottom:24, flexWrap:'wrap'}}>
            <span className="quechua">ꟼ Sección 07 · Yanapay (alianza)</span>
            <div style={{width:60, height:1, background:'var(--border-gold)'}} />
            <span style={{
              padding:'6px 12px',
              border:'1px solid var(--gold-primary)',
              background:'rgba(201,169,97,0.08)',
              fontFamily:'var(--font-mono)',
              fontSize:10,
              letterSpacing:'0.24em',
              textTransform:'uppercase',
              color:'var(--gold-primary)',
            }}>
              Estructura verificable
            </span>
          </div>

          <div style={{display:'flex', alignItems:'baseline', gap:18, marginBottom:20, flexWrap:'wrap'}}>
            <span style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(48px, 6vw, 88px)',
              fontWeight:300,
              color:'var(--gold-primary)',
              letterSpacing:'-0.03em',
              lineHeight:0.9,
            }}>
              Alianza
            </span>
            <span style={{
              fontFamily:'var(--font-display)',
              fontStyle:'italic',
              fontSize:'clamp(48px, 6vw, 88px)',
              fontWeight:300,
              letterSpacing:'-0.03em',
              lineHeight:0.9,
            }}>
              Internacional
            </span>
          </div>

          <h2 className="h-display" style={{
            fontSize:'clamp(36px, 5vw, 76px)',
            maxWidth:'92%',
            marginBottom:32,
          }}>
            Detrás de cada propiedad,<br/>
            una <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>arquitectura internacional.</em>
          </h2>

          <p style={{
            maxWidth:720,
            fontSize:18,
            lineHeight:1.7,
            color:'var(--text-on-dark-muted)',
            marginBottom:40,
          }}>
            Andes Capital Estates no opera sola. Somos una agencia peruana
            con presencia en Madrid sostenida por dos socios estratégicos
            que dan a cada operación lo que un solo país no puede dar:
            una constructora española con más de cuarenta años de obra y
            una agencia de ingeniería digital con doble sede Madrid–Lima.
            El resultado es una estructura logística, tecnológica, legal y
            comercial diseñada en ambos lados del Atlántico — no improvisada
            sobre la marcha, sino construida antes del primer cliente.
          </p>

          <div style={{display:'flex', gap:14, flexWrap:'wrap'}}>
            <button className="btn-gold" onClick={() => {
              const el = document.getElementById('partners');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}>
              Conocer a los socios <span className="arrow" />
            </button>
            <button className="btn-ghost" onClick={() => {
              const el = document.getElementById('garantias');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}>
              Garantías al cliente
            </button>
          </div>
        </div>
      </section>

      {/* ───────────── MANIFIESTO BIDIRECCIONAL ───────────── */}
      <section className="wrap" style={{paddingTop:120, paddingBottom:80}}>
        <div style={allyStyles.manifestGrid}>
          <div>
            <span className="quechua">ꟼ Modelo cross-border</span>
            <h3 className="h-display" style={{fontSize:'clamp(32px, 3.6vw, 52px)', marginTop:18}}>
              Un puente que se cruza <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>en ambos sentidos.</em>
            </h3>
          </div>
          <div style={{maxWidth:580}}>
            <p style={{fontSize:17, lineHeight:1.75, color:'var(--text-on-dark-muted)', marginBottom:20}}>
              La alianza no está pensada como una vía de un solo carril. En la
              primera etapa, el comprador español que se enamora de Cusco,
              Arequipa o Tarapoto puede adquirir su propiedad en Perú con el
              respaldo legal y técnico de una constructora madrileña que conoce
              su idioma jurídico y sus exigencias documentales.
            </p>
            <p style={{fontSize:17, lineHeight:1.75, color:'var(--text-on-dark-muted)'}}>
              En la siguiente fase — ya en preparación —, el propietario peruano
              que desea diversificar su patrimonio en Europa encontrará en la
              misma alianza la llave para invertir en Madrid o Barcelona con
              acompañamiento local. Dos mercados, una sola firma, una sola
              metodología.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={allyStyles.statsRow}>
          {[
            { num: '02', label: 'Sedes operativas · Madrid y Lima' },
            { num: '40+', label: 'Años de experiencia constructora aliada' },
            { num: '04', label: 'Pilares de estructura · logística, tech, legal, comercial' },
            { num: '2026',label: 'Lanzamiento campaña Madrid' },
          ].map((s, i) => (
            <div key={i} style={allyStyles.statCard}>
              <div style={{fontFamily:'var(--font-display)', fontSize:48, fontWeight:300, color:'var(--gold-primary)', letterSpacing:'-0.02em', lineHeight:1}}>
                {s.num}
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--text-on-dark-muted)', marginTop:14}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── LOS CUATRO PILARES ───────────── */}
      <section className="wrap" style={{paddingTop:60, paddingBottom:120}}>
        <div style={{textAlign:'center', marginBottom:64}}>
          <span className="quechua">ꟼ La estructura</span>
          <h3 className="h-display" style={{fontSize:'clamp(32px, 3.8vw, 56px)', marginTop:14}}>
            Cuatro pilares <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>que sostienen</em> cada operación.
          </h3>
          <p style={{maxWidth:640, margin:'22px auto 0', fontSize:17, color:'var(--text-on-dark-muted)', lineHeight:1.75}}>
            Cuando un cliente firma con Andes Capital Estates, no firma con un
            broker. Firma con una estructura completa diseñada antes de que la
            propiedad se publique.
          </p>
        </div>

        <div style={allyStyles.pillarsGrid}>
          {PILARES.map(p => (
            <div key={p.n} style={allyStyles.pillarCard}>
              <div style={{fontFamily:'var(--font-display)', fontSize:56, fontWeight:300, color:'var(--gold-primary)', letterSpacing:'-0.02em', lineHeight:1, marginBottom:18}}>
                {p.n}
              </div>
              <div style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:400, color:'var(--text-on-dark)', marginBottom:14, letterSpacing:'-0.01em'}}>
                {p.titulo}
              </div>
              <p style={{fontSize:14, lineHeight:1.7, color:'var(--text-on-dark-muted)'}}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── PARTNERS ───────────── */}
      <section id="partners" style={{borderTop:'1px solid var(--border-dark)', paddingTop:120, paddingBottom:120, background:'linear-gradient(180deg, rgba(255,255,255,0.012), transparent 40%)'}}>
        <div className="wrap">
          <div style={{textAlign:'center', marginBottom:80}}>
            <span className="quechua">ꟼ Los socios estratégicos</span>
            <h3 className="h-display" style={{fontSize:'clamp(32px, 3.8vw, 56px)', marginTop:14}}>
              Dos empresas. <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Una misma metodología.</em>
            </h3>
          </div>

          {PARTNERS.map((p, i) => (
            <article key={p.id} style={{
              ...allyStyles.partnerCard,
              gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              direction: i % 2 === 0 ? 'ltr' : 'rtl',
            }}>
              <div style={{...allyStyles.partnerMedia, direction:'ltr'}}>
                <img src={p.img} alt={p.nombre} style={allyStyles.partnerImg}
                     onError={(e) => { e.target.style.display='none'; }} />
                <div style={allyStyles.partnerImgOverlay} />
                <div style={allyStyles.partnerLogoTag}>
                  <img src={p.logo} alt={`${p.nombre} logo`}
                       style={{maxHeight:46, maxWidth:180, objectFit:'contain', filter:'brightness(1.08)'}}
                       onError={(e) => { e.target.style.display='none'; }} />
                </div>
                <div style={allyStyles.partnerCifra}>
                  <div style={{fontFamily:'var(--font-display)', fontSize:64, fontWeight:300, color:'var(--gold-primary)', letterSpacing:'-0.03em', lineHeight:1}}>
                    {p.anos}
                  </div>
                  <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-on-dark-muted)', marginTop:8}}>
                    {p.id === 'construxor' ? 'Años de obra' : 'Operación continua'}
                  </div>
                </div>
              </div>

              <div style={{...allyStyles.partnerBody, direction:'ltr'}}>
                <span className="quechua">ꟼ Socio · {p.sede}</span>
                <h4 style={{fontFamily:'var(--font-display)', fontSize:'clamp(34px, 3.4vw, 48px)', fontWeight:300, letterSpacing:'-0.02em', marginTop:16, marginBottom:8, color:'var(--text-on-dark)'}}>
                  {p.nombre}
                </h4>
                <div style={{fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:18, color:'var(--gold-primary)', marginBottom:24, opacity:0.85}}>
                  {p.tagline}
                </div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--text-on-dark-muted)', marginBottom:22}}>
                  {p.rol}
                </div>
                <p style={{fontSize:16, lineHeight:1.75, color:'var(--text-on-dark-muted)', marginBottom:20}}>
                  {p.descripcion}
                </p>
                <p style={{fontSize:16, lineHeight:1.75, color:'var(--text-on-dark-muted)', marginBottom:28, borderLeft:'2px solid var(--gold-primary)', paddingLeft:18}}>
                  {p.rolEnACE}
                </p>

                <div style={{borderTop:'1px solid var(--border-dark)', paddingTop:22}}>
                  <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold-primary)', marginBottom:14}}>
                    Aporte a la alianza
                  </div>
                  <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10}}>
                    {p.servicios.map(s => (
                      <li key={s} style={{display:'flex', alignItems:'flex-start', gap:12, fontSize:14, color:'var(--text-on-dark)', lineHeight:1.5}}>
                        <span style={{flexShrink:0, marginTop:8, width:6, height:6, background:'var(--gold-primary)', display:'block'}} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <a href={p.web} target="_blank" rel="noopener noreferrer" style={{
                  display:'inline-flex', alignItems:'center', gap:10, marginTop:26,
                  fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em',
                  textTransform:'uppercase', color:'var(--gold-primary)',
                  borderBottom:'1px solid var(--gold-primary)', paddingBottom:4,
                }}>
                  Visitar sitio oficial
                  <span style={{fontSize:12, lineHeight:0}}>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── GARANTÍAS · DOBLE AUDIENCIA ───────────── */}
      <section id="garantias" className="wrap" style={{paddingTop:60, paddingBottom:120}}>
        <div style={{textAlign:'center', marginBottom:64}}>
          <span className="quechua">ꟼ Para ambos lados del Atlántico</span>
          <h3 className="h-display" style={{fontSize:'clamp(32px, 3.8vw, 56px)', marginTop:14}}>
            La misma estructura, <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>dos lecturas distintas.</em>
          </h3>
        </div>

        <div style={allyStyles.audienceGrid}>
          {/* Cliente europeo */}
          <div style={allyStyles.audienceCard}>
            <div style={{position:'relative', height:280, overflow:'hidden', borderBottom:'1px solid var(--border-dark)'}}>
              <img src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1400&q=85"
                   alt="Madrid" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
                   onError={(e) => { e.target.style.display='none'; }} />
              <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0.2) 0%, rgba(14,16,20,0.7) 100%)'}} />
              <div style={{position:'absolute', bottom:18, left:22, right:22}}>
                <div className="quechua">ꟼ Para el comprador europeo</div>
                <div style={{fontFamily:'var(--font-display)', fontSize:30, fontWeight:300, color:'var(--text-on-dark)', marginTop:6, letterSpacing:'-0.01em'}}>
                  Comprar Perú <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>desde Madrid</em>
                </div>
              </div>
            </div>
            <div style={{padding:'34px 32px 36px'}}>
              <p style={{fontSize:15, lineHeight:1.75, color:'var(--text-on-dark-muted)', marginBottom:22}}>
                El cliente español accede a propiedades en Perú con el mismo
                marco de confianza con el que compraría un piso en el Barrio de
                Salamanca. Construxor verifica la documentación, coordina con
                la notaría peruana, traduce el lenguaje legal y acompaña la
                escritura. LIMA Technology AI mantiene la trazabilidad digital
                de la operación.
              </p>
              <div style={{display:'flex', flexDirection:'column', gap:14}}>
                {[
                  'Due diligence documental antes de cualquier seña',
                  'Coordinación notarial Madrid–Lima en simultáneo',
                  'Contratos bilingües con interpretación jurídica española',
                  'Reforma y entrega lista para alquiler vacacional o residencia',
                ].map(item => (
                  <div key={item} style={{display:'flex', alignItems:'flex-start', gap:12}}>
                    <span style={{flexShrink:0, marginTop:7, width:5, height:5, background:'var(--gold-primary)', display:'block'}} />
                    <span style={{fontSize:14, color:'var(--text-on-dark)', lineHeight:1.55}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Propietario peruano */}
          <div style={allyStyles.audienceCard}>
            <div style={{position:'relative', height:280, overflow:'hidden', borderBottom:'1px solid var(--border-dark)'}}>
              <img src="https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1400&q=85"
                   alt="Cusco" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
                   onError={(e) => { e.target.style.display='none'; }} />
              <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0.2) 0%, rgba(14,16,20,0.7) 100%)'}} />
              <div style={{position:'absolute', bottom:18, left:22, right:22}}>
                <div className="quechua">ꟼ Para el propietario peruano</div>
                <div style={{fontFamily:'var(--font-display)', fontSize:30, fontWeight:300, color:'var(--text-on-dark)', marginTop:6, letterSpacing:'-0.01em'}}>
                  Vender Perú <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>al inversor europeo</em>
                </div>
              </div>
            </div>
            <div style={{padding:'34px 32px 36px'}}>
              <p style={{fontSize:15, lineHeight:1.75, color:'var(--text-on-dark-muted)', marginBottom:22}}>
                Para el propietario que confía su casa, su terreno o su
                departamento a Andes Capital Estates, la alianza cambia el
                horizonte de venta. Su propiedad deja de competir solo en el
                mercado peruano: se presenta en Madrid con narrativa editorial,
                fotografía profesional y una campaña distribuida en medios y
                barrios objetivo por LIMA Technology AI.
              </p>
              <div style={{display:'flex', flexDirection:'column', gap:14}}>
                {[
                  'Ficha editorial cuidada en español, inglés y portugués',
                  'Presencia en campañas de prensa y digital en Madrid',
                  'Audiencia cualificada de inversores europeos verificada',
                  'Acompañamiento legal binacional sin coste para el propietario',
                ].map(item => (
                  <div key={item} style={{display:'flex', alignItems:'flex-start', gap:12}}>
                    <span style={{flexShrink:0, marginTop:7, width:5, height:5, background:'var(--gold-primary)', display:'block'}} />
                    <span style={{fontSize:14, color:'var(--text-on-dark)', lineHeight:1.55}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PROCESO ───────────── */}
      <section style={{borderTop:'1px solid var(--border-dark)', paddingTop:120, paddingBottom:120, background:'rgba(255,255,255,0.01)'}}>
        <div className="wrap">
          <div style={{textAlign:'center', marginBottom:80}}>
            <span className="quechua">ꟼ Cómo funciona en la práctica</span>
            <h3 className="h-display" style={{fontSize:'clamp(32px, 3.8vw, 56px)', marginTop:14}}>
              De la intención <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>a la firma.</em>
            </h3>
          </div>

          <div style={allyStyles.timeline}>
            {[
              { n:'01', titulo:'Conversación inicial', actor:'Andes Capital Estates',
                desc:'Andes AI orienta al cliente en la web. Cuando hay intención real, pasa a un asesor humano de la agencia, que define el perfil, el destino y el rango de inversión.' },
              { n:'02', titulo:'Selección de cartera', actor:'Andes Capital Estates · LIMA Technology AI',
                desc:'El equipo presenta opciones desde el inventario propietario, con fichas editoriales, datos de yield, coste de vida y barrio. Toda la trazabilidad queda en la plataforma desarrollada por LIMA.' },
              { n:'03', titulo:'Due diligence cross-border', actor:'Construxor',
                desc:'Construxor verifica títulos, cargas, situación urbanística y documentación notarial. Traduce y certifica los hallazgos al estándar legal español. Sin documentación limpia, la operación no avanza.' },
              { n:'04', titulo:'Minuta, escritura y registro', actor:'Construxor · notaría aliada en Perú',
                desc:'Coordinación simultánea entre notaría peruana y asesoría española. El cliente firma con plena comprensión de cada cláusula. Registro inmediato y entrega de documentación legal en ambos idiomas.' },
              { n:'05', titulo:'Post-venta y gestión',  actor:'Toda la alianza',
                desc:'Si el cliente quiere reformar, alquilar o explotar la propiedad, Construxor coordina la obra; LIMA gestiona la presencia digital y comercial. La relación no termina en la firma — empieza ahí.' },
            ].map(step => (
              <div key={step.n} style={allyStyles.timelineRow}>
                <div style={{minWidth:120, fontFamily:'var(--font-display)', fontSize:64, fontWeight:300, color:'var(--gold-primary)', letterSpacing:'-0.03em', lineHeight:0.9}}>
                  {step.n}
                </div>
                <div style={{flex:1, paddingBottom:32, borderBottom:'1px solid var(--border-dark)'}}>
                  <div style={{display:'flex', alignItems:'baseline', gap:18, flexWrap:'wrap', marginBottom:10}}>
                    <div style={{fontFamily:'var(--font-display)', fontSize:26, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em'}}>
                      {step.titulo}
                    </div>
                    <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold-primary)'}}>
                      {step.actor}
                    </div>
                  </div>
                  <p style={{fontSize:15, lineHeight:1.75, color:'var(--text-on-dark-muted)', maxWidth:720}}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA FINAL ───────────── */}
      <section id="ally-cta" style={allyStyles.ctaBand}>
        <div className="wrap" style={{textAlign:'center', position:'relative', zIndex:1}}>
          <span className="quechua">ꟼ Hablemos</span>
          <h3 className="h-display" style={{fontSize:'clamp(36px, 4.5vw, 64px)', marginTop:18, marginBottom:24, maxWidth:820, marginLeft:'auto', marginRight:'auto'}}>
            Si vas a confiar tu patrimonio o tu inversión,<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>hazlo con estructura.</em>
          </h3>
          <p style={{maxWidth:580, margin:'0 auto 40px', fontSize:16, color:'var(--text-on-dark-muted)', lineHeight:1.75}}>
            Si eres propietario y quieres llevar tu propiedad al mercado europeo,
            o si estás en España y quieres comprar en Perú con respaldo legal real,
            escríbenos. Te responde un asesor humano, no un formulario.
          </p>

          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap'}}>
            <a href="#agregar-propiedad" className="btn-gold"
               onClick={(e) => { e.preventDefault(); window.location.hash = '#agregar-propiedad'; }}>
              Soy propietario en Perú <span className="arrow" />
            </a>
            <button className="btn-ghost" onClick={() => {
              window.location.hash = '#internacional';
            }}>
              Soy comprador en Europa
            </button>
          </div>

          <div style={{marginTop:64, paddingTop:40, borderTop:'1px solid var(--border-dark)', display:'flex', justifyContent:'center', gap:48, flexWrap:'wrap'}}>
            {PARTNERS.map(p => (
              <a key={p.id} href={p.web} target="_blank" rel="noopener noreferrer"
                 style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10, opacity:0.75, transition:'opacity .25s ease'}}
                 onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                 onMouseLeave={e => e.currentTarget.style.opacity = '0.75'}>
                <img src={p.logo} alt={p.nombre}
                     style={{maxHeight:38, maxWidth:160, objectFit:'contain', filter:'brightness(1.1)'}}
                     onError={(e) => { e.target.style.display='none'; }} />
                <span style={{fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--text-on-dark-subtle)'}}>
                  {p.sede}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const allyStyles = {
  heroWrap: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    borderTop: '1px solid var(--border-dark)',
  },
  heroImg: {
    position: 'absolute', inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.04)',
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(110deg, rgba(14,16,20,0.94) 0%, rgba(14,16,20,0.78) 45%, rgba(14,16,20,0.5) 100%)',
  },
  heroContent: {
    position: 'relative', zIndex: 1,
    paddingTop: 110, paddingBottom: 80,
  },
  manifestGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'start',
    paddingBottom: 80,
    borderBottom: '1px solid var(--border-dark)',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    marginTop: 80,
  },
  statCard: {
    padding: '32px 24px',
    border: '1px solid var(--border-dark)',
    background: 'rgba(255,255,255,0.015)',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 22,
  },
  pillarCard: {
    padding: '36px 28px 40px',
    border: '1px solid var(--border-dark)',
    background: 'rgba(255,255,255,0.01)',
    transition: 'all .3s ease',
  },
  partnerCard: {
    display: 'grid',
    gap: 56,
    alignItems: 'center',
    marginBottom: 100,
  },
  partnerMedia: {
    position: 'relative',
    aspectRatio: '4/5',
    overflow: 'hidden',
    border: '1px solid var(--border-dark)',
    background: 'var(--bg-tertiary)',
  },
  partnerImg: {
    width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.9)',
  },
  partnerImgOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(180deg, rgba(14,16,20,0) 40%, rgba(14,16,20,0.85) 100%)',
  },
  partnerLogoTag: {
    position: 'absolute', top: 22, left: 22,
    padding: '14px 18px',
    background: 'rgba(14,16,20,0.78)',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--border-gold)',
    minHeight: 70, minWidth: 180,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  partnerCifra: {
    position: 'absolute',
    bottom: 24, right: 24,
    textAlign: 'right',
  },
  partnerBody: {
    paddingRight: 24,
  },
  audienceGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 28,
  },
  audienceCard: {
    border: '1px solid var(--border-dark)',
    background: 'rgba(255,255,255,0.012)',
    transition: 'border-color .3s ease',
    overflow: 'hidden',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  timelineRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 28,
  },
  ctaBand: {
    padding: '120px 0',
    borderTop: '1px solid var(--border-dark)',
    background: 'linear-gradient(180deg, rgba(201,169,97,0.06), transparent)',
    position: 'relative',
  },
};

// Responsive tweaks via media query at JS level — apply minimal mobile rules
const allyStyle = document.createElement('style');
allyStyle.textContent = `
  @media (max-width: 960px) {
    .ally-partner-card, .ally-audience-grid, .ally-pillars-grid, .ally-stats-row, .ally-manifest-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(allyStyle);

window.AllianceLanding = AllianceLanding;
