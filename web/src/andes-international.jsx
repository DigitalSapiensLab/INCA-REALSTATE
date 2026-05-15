// Andes International — landing teaser para expansión a España y otros países.
// Esta es la "fase 1" del proyecto internacional: una landing potente con
// hero de Madrid, propiedades de muestra y mensaje de "próximo lanzamiento".
// En la "fase 2" replicará la misma estructura completa de la página principal.

const INTL_HERO = {
  img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=2000&q=85',
  caption: 'Madrid · Gran Vía y Salamanca',
};

const INTL_PROPERTIES = [
  {
    id: 'es1',
    titulo: 'Ático Salamanca · Velázquez',
    barrio: 'Barrio de Salamanca',
    region: 'Madrid',
    ciudad: 'Madrid · España',
    precio: 1850000,
    m2: 198,
    hab: 4, ban: 3,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    tags: ['Milla de Oro', 'Reformado', 'Terraza'],
  },
  {
    id: 'es2',
    titulo: 'Piso Chamberí · Almagro',
    barrio: 'Chamberí · Almagro',
    region: 'Madrid',
    ciudad: 'Madrid · España',
    precio: 1240000,
    m2: 152,
    hab: 3, ban: 2,
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85',
    tags: ['Finca regia', 'Techos altos', 'Centro'],
  },
  {
    id: 'es3',
    titulo: 'Casa Chamartín · La Castellana',
    barrio: 'Chamartín · La Castellana',
    region: 'Madrid',
    ciudad: 'Madrid · España',
    precio: 3450000,
    m2: 420,
    hab: 5, ban: 5,
    img: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=85',
    tags: ['Residencial', 'Piscina', 'Jardín'],
  },
  {
    id: 'es4',
    titulo: 'Loft Justicia · Chueca',
    barrio: 'Justicia · Chueca',
    region: 'Madrid',
    ciudad: 'Madrid · España',
    precio: 720000,
    m2: 96,
    hab: 2, ban: 2,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85',
    tags: ['Diseño', 'Centro', 'Inversión'],
  },
];

const INTL_COUNTRIES = [
  {
    code: 'ES', nombre: 'España',  estado: 'En lanzamiento', activo: true,
    ciudad: 'Madrid · Barcelona · Málaga',
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=85',
  },
  {
    code: 'PT', nombre: 'Portugal', estado: 'Próximamente', activo: false,
    ciudad: 'Lisboa · Porto',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=85',
  },
  {
    code: 'IT', nombre: 'Italia',   estado: 'Próximamente', activo: false,
    ciudad: 'Roma · Milán · Florencia',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=85',
  },
  {
    code: 'MX', nombre: 'México',   estado: 'En estudio',   activo: false,
    ciudad: 'CDMX · Mérida · Tulum',
    img: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=900&q=85',
  },
  {
    code: 'US', nombre: 'EE. UU.',  estado: 'En estudio',   activo: false,
    ciudad: 'Miami · NYC · Los Ángeles',
    img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=85',
  },
];

function AndesInternational({ onBack }) {
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
          ꟼ Andes International · Global
        </div>
      </div>

    <section style={intlStyles.section}>
      {/* Hero band — full-bleed Madrid imagery con overlay editorial */}
      <div style={intlStyles.heroWrap}>
        <div style={{
          ...intlStyles.heroImg,
          backgroundImage: `url(${INTL_HERO.img})`,
        }} />
        <div style={intlStyles.heroOverlay} />

        {/* Decorative grid motif */}
        <div className="motif-pattern" style={{opacity:0.5}} />

        <div className="wrap" style={intlStyles.heroContent}>
          <div style={{display:'flex', alignItems:'center', gap:20, marginBottom:24}}>
            <span className="quechua">ꟼ Sección 06 · Hawa Llaqta</span>
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
              Próximo lanzamiento
            </span>
          </div>

          <div style={{display:'flex', alignItems:'baseline', gap:24, marginBottom:18, flexWrap:'wrap'}}>
            <span style={{
              fontFamily:'var(--font-display)',
              fontSize:'clamp(48px, 6vw, 88px)',
              fontWeight:300,
              color:'var(--gold-primary)',
              letterSpacing:'-0.03em',
              lineHeight:0.9,
            }}>
              Andes
            </span>
            <span style={{
              fontFamily:'var(--font-display)',
              fontStyle:'italic',
              fontSize:'clamp(48px, 6vw, 88px)',
              fontWeight:300,
              letterSpacing:'-0.03em',
              lineHeight:0.9,
            }}>
              International
            </span>
          </div>

          <h2 className="h-display" style={{
            fontSize:'clamp(40px, 5.5vw, 88px)',
            maxWidth:'90%',
            marginBottom:32,
          }}>
            De los Andes al <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Mediterráneo.</em><br/>
            Del Pacífico a <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Madrid.</em>
          </h2>

          <p style={{
            maxWidth:680,
            fontSize:18,
            lineHeight:1.7,
            color:'var(--text-on-dark-muted)',
            marginBottom:40,
          }}>
            Estamos preparando el lanzamiento de <strong style={{color:'var(--text-on-dark)', fontWeight:500}}>Andes International</strong> —
            nuestra división global para la compra y venta de departamentos, casas y terrenos en España, comenzando por Madrid,
            Barcelona y la Costa del Sol. Una puerta abierta en ambas direcciones: para que el peruano que vive en España invierta de vuelta
            en su tierra, y para que el europeo descubra Perú con la misma confianza con la que compra en su propio barrio.
          </p>

          <div style={{display:'flex', gap:14, flexWrap:'wrap'}}>
            <button className="btn-gold" onClick={() => {
              const el = document.getElementById('intl-cta');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}>
              Notificarme del lanzamiento <span className="arrow" />
            </button>
            <button className="btn-ghost" onClick={() => {
              const el = document.getElementById('intl-properties');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}>
              Ver propiedades de muestra
            </button>
          </div>
        </div>
      </div>

      {/* Manifiesto / por qué España */}
      <div className="wrap" style={{paddingTop:120, paddingBottom:80}}>
        <div style={intlStyles.manifestGrid}>
          <div>
            <span className="quechua">ꟼ El siguiente capítulo</span>
            <h3 className="h-display" style={{fontSize:'clamp(32px, 3.6vw, 52px)', marginTop:18}}>
              Una visión <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>panorámica</em> del mercado.
            </h3>
          </div>
          <div style={{maxWidth:560}}>
            <p style={{fontSize:17, lineHeight:1.75, color:'var(--text-on-dark-muted)', marginBottom:20}}>
              Más de <strong style={{color:'var(--gold-primary)', fontWeight:500}}>400 mil peruanos</strong> viven hoy en España.
              Muchos sueñan con un retorno digno; otros, con dejar capital trabajando en su país de origen mientras construyen
              su vida en Europa. Hasta hoy, esa conversación no la tenía nadie.
            </p>
            <p style={{fontSize:17, lineHeight:1.75, color:'var(--text-on-dark-muted)'}}>
              Andes International cierra ese círculo: un solo equipo, dos mercados, una misma metodología.
              España y Perú dejan de ser destinos separados — se vuelven una sola estrategia patrimonial.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={intlStyles.statsRow}>
          {[
            { num: '400K+', label: 'Peruanos residentes en España' },
            { num: '02',    label: 'Mercados conectados, una sola gestión' },
            { num: '05',    label: 'Países en hoja de ruta' },
            { num: '2026',  label: 'Año de lanzamiento oficial' },
          ].map((s, i) => (
            <div key={i} style={intlStyles.statCard}>
              <div style={{fontFamily:'var(--font-display)', fontSize:48, fontWeight:300, color:'var(--gold-primary)', letterSpacing:'-0.02em', lineHeight:1}}>
                {s.num}
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--text-on-dark-muted)', marginTop:14}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Properties teaser grid */}
      <div id="intl-properties" className="wrap" style={{paddingBottom:120}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20, marginBottom:48}}>
          <div>
            <span className="quechua">ꟼ Cartera Madrid · Sujeto a disponibilidad</span>
            <h3 className="h-display" style={{fontSize:'clamp(32px, 3.6vw, 52px)', marginTop:14}}>
              Propiedades en <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>negociación.</em>
            </h3>
          </div>
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:11,
            letterSpacing:'0.2em', textTransform:'uppercase',
            color:'var(--text-on-dark-subtle)',
            maxWidth:280, textAlign:'right',
          }}>
            Cartera Madrid · Imágenes referenciales
          </div>
        </div>

        <div style={intlStyles.propGrid}>
          {INTL_PROPERTIES.map((p, i) => (
            <article key={p.id} style={{...intlStyles.propCard, gridColumn: i===0 ? 'span 2' : 'span 1'}}>
              <div style={{...intlStyles.propMedia, aspectRatio: i===0 ? '16/9' : '4/5'}}>
                <img src={p.img} alt={p.titulo} style={intlStyles.propImg}
                     onError={(e) => { e.target.style.display='none'; }} />
                <div style={intlStyles.propImgOverlay} />

                <div style={intlStyles.propBadge}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em'}}>
                    {(p.ciudad || `${p.region} · España`).toUpperCase()}
                  </span>
                </div>

                <div style={intlStyles.comingBadge}>
                  <span style={{
                    width:6, height:6, borderRadius:'50%',
                    background:'var(--gold-primary)',
                    boxShadow:'0 0 8px var(--gold-primary)',
                  }} />
                  En negociación
                </div>

                {/* City caption — refuerza Madrid sobre la imagen */}
                <div style={intlStyles.cityCaption}>
                  <span style={{fontFamily:'var(--font-display)', fontSize:18, fontStyle:'italic', color:'var(--gold-primary)'}}>
                    {p.region}
                  </span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.28em', color:'var(--text-on-dark-muted)', marginLeft:10, textTransform:'uppercase'}}>
                    España
                  </span>
                </div>

                <div style={intlStyles.propPriceTag}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold-primary)', letterSpacing:'0.2em'}}>DESDE</span>
                  <div style={{fontFamily:'var(--font-display)', fontSize:32, color:'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.02em'}}>
                    €{p.precio.toLocaleString('es-ES')}
                  </div>
                </div>
              </div>

              <div style={{padding:'28px 4px 8px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:14}}>
                  <h4 style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em'}}>
                    {p.titulo}
                  </h4>
                </div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:16}}>
                  {p.barrio}
                </div>
                <div style={{display:'flex', gap:20, paddingTop:16, borderTop:'1px solid var(--border-dark)', color:'var(--text-on-dark-muted)', fontSize:13}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}>{Icons.bed}{p.hab} hab</span>
                  <span style={{display:'flex', alignItems:'center', gap:6}}>{Icons.bath}{p.ban} baños</span>
                  <span style={{display:'flex', alignItems:'center', gap:6}}>{Icons.m2}{p.m2} m²</span>
                </div>
                <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:16}}>
                  {p.tags.map(t => (
                    <span key={t} style={{padding:'4px 10px', border:'1px solid var(--border-dark)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.08em'}}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Roadmap de países */}
      <div className="wrap" style={{paddingBottom:120}}>
        <div style={{textAlign:'center', marginBottom:64}}>
          <span className="quechua">ꟼ Hoja de ruta global · 2026 — 2028</span>
          <h3 className="h-display" style={{fontSize:'clamp(32px, 3.8vw, 56px)', marginTop:14}}>
            España es solo <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>el comienzo.</em>
          </h3>
          <p style={{maxWidth:640, margin:'22px auto 0', fontSize:17, color:'var(--text-on-dark-muted)', lineHeight:1.75}}>
            Madrid abre la puerta a un mapa mucho más amplio. Cada nuevo país que sumemos
            traerá la misma profundidad editorial que ya conoces de Perú —
            fichas detalladas, mapas, calculadoras de inversión y especialistas locales.
            Una sola firma, mercados conectados, oportunidades que antes no estaban en el mismo radar.
          </p>
        </div>

        <div style={intlStyles.countryGrid}>
          {INTL_COUNTRIES.map(c => (
            <div key={c.code} style={{
              ...intlStyles.countryCard,
              borderColor: c.activo ? 'var(--gold-primary)' : 'var(--border-dark)',
            }}>
              <div style={{
                position:'relative',
                aspectRatio:'4/3',
                overflow:'hidden',
                background:'var(--bg-tertiary)',
              }}>
                <img src={c.img} alt={c.nombre}
                     style={{width:'100%', height:'100%', objectFit:'cover', display:'block', filter: c.activo ? 'saturate(1)' : 'saturate(0.55) brightness(0.7)'}}
                     onError={(e) => { e.target.style.display='none'; }} />
                <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0) 40%, rgba(14,16,20,0.85) 100%)'}} />
                <div style={{
                  position:'absolute', top:12, left:12,
                  padding:'4px 10px',
                  background:'rgba(14,16,20,0.7)',
                  backdropFilter:'blur(6px)',
                  border:`1px solid ${c.activo ? 'var(--gold-primary)' : 'var(--border-dark)'}`,
                  fontFamily:'var(--font-mono)',
                  fontSize:10,
                  letterSpacing:'0.24em',
                  color: c.activo ? 'var(--gold-primary)' : 'var(--text-on-dark-muted)',
                }}>
                  {c.code}
                </div>
                <div style={{
                  position:'absolute', bottom:10, left:12, right:12,
                  fontFamily:'var(--font-mono)',
                  fontSize:10,
                  letterSpacing:'0.18em',
                  textTransform:'uppercase',
                  color:'var(--text-on-dark-muted)',
                }}>
                  {c.ciudad}
                </div>
              </div>

              <div style={{padding:'20px 18px 22px', background: c.activo ? 'rgba(201,169,97,0.04)' : 'transparent'}}>
                <div style={{
                  fontFamily:'var(--font-display)',
                  fontSize:26,
                  fontWeight:300,
                  color: c.activo ? 'var(--text-on-dark)' : 'var(--text-on-dark-muted)',
                  letterSpacing:'-0.01em',
                  marginBottom:8,
                }}>
                  {c.nombre}
                </div>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  fontFamily:'var(--font-mono)',
                  fontSize:10,
                  letterSpacing:'0.16em',
                  textTransform:'uppercase',
                  color: c.activo ? 'var(--gold-primary)' : 'var(--text-on-dark-subtle)',
                }}>
                  {c.activo && (
                    <span style={{
                      width:6, height:6, borderRadius:'50%',
                      background:'var(--gold-primary)',
                      boxShadow:'0 0 8px var(--gold-primary)',
                    }} />
                  )}
                  {c.estado}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div id="intl-cta" style={intlStyles.ctaBand}>
        <div className="wrap" style={{textAlign:'center', position:'relative', zIndex:1}}>
          <span className="quechua">ꟼ Lista de espera prioritaria</span>
          <h3 className="h-display" style={{fontSize:'clamp(36px, 4.5vw, 64px)', marginTop:18, marginBottom:24, maxWidth:780, marginLeft:'auto', marginRight:'auto'}}>
            Sé el primero en conocer la cartera<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Andes International.</em>
          </h3>
          <p style={{maxWidth:520, margin:'0 auto 40px', fontSize:16, color:'var(--text-on-dark-muted)', lineHeight:1.7}}>
            Sin spam, sin formularios eternos. Cuando abramos en España, te contactamos antes de que la cartera salga al público.
          </p>

          <form style={intlStyles.form} onSubmit={(e) => { e.preventDefault(); alert('Te contactaremos cuando abramos Andes International. Gracias.'); }}>
            <input type="email" required placeholder="tu@correo.com" style={intlStyles.input} />
            <button type="submit" className="btn-gold">
              Anotarme <span className="arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
    </main>
  );
}

const intlStyles = {
  section: {
    background: 'var(--bg-primary)',
    borderTop: '1px solid var(--border-dark)',
    position: 'relative',
  },
  heroWrap: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroImg: {
    position: 'absolute', inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.04)',
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(110deg, rgba(14,16,20,0.92) 0%, rgba(14,16,20,0.78) 45%, rgba(14,16,20,0.55) 100%)',
  },
  heroContent: {
    position: 'relative', zIndex: 1,
    paddingTop: 120, paddingBottom: 80,
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
  propGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
  },
  propCard: { background: 'transparent' },
  propMedia: {
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-dark)',
  },
  propImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.92)' },
  propImgOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(180deg, rgba(14,16,20,0) 50%, rgba(14,16,20,0.85) 100%)',
  },
  propBadge: {
    position: 'absolute', top: 16, left: 16,
    padding: '6px 10px',
    background: 'rgba(14,16,20,0.6)',
    backdropFilter: 'blur(6px)',
    border: '1px solid var(--border-gold)',
    color: 'var(--gold-primary)',
  },
  comingBadge: {
    position: 'absolute', top: 16, right: 16,
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 12px',
    background: 'rgba(14,16,20,0.7)',
    backdropFilter: 'blur(6px)',
    border: '1px solid var(--gold-primary)',
    color: 'var(--gold-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  propPriceTag: { position: 'absolute', bottom: 20, left: 20 },
  cityCaption: {
    position: 'absolute',
    bottom: 20, right: 20,
    display: 'flex', alignItems: 'baseline',
    padding: '8px 14px',
    background: 'rgba(14,16,20,0.55)',
    backdropFilter: 'blur(8px)',
    border: '1px solid var(--border-dark)',
  },
  countryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 18,
  },
  countryCard: {
    border: '1px solid var(--border-dark)',
    transition: 'all .25s ease',
    overflow: 'hidden',
  },
  ctaBand: {
    padding: '120px 0',
    borderTop: '1px solid var(--border-dark)',
    background: 'linear-gradient(180deg, rgba(201,169,97,0.04), transparent)',
    position: 'relative',
  },
  form: {
    display: 'flex',
    gap: 12,
    maxWidth: 520,
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    flex: '1 1 280px',
    padding: '18px 22px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-dark)',
    color: 'var(--text-on-dark)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    letterSpacing: '0.04em',
    outline: 'none',
  },
};

window.AndesInternational = AndesInternational;
