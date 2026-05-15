// Featured properties — editorial card grid + macro→cities navigator
function Properties() {
  const [activeMacro, setActiveMacro] = React.useState('costa');

  // Listen for cross-component requests to pre-select a macro region.
  // CityLanding dispatches this when the user clicks "Ver otras ciudades" so the chips
  // already show the same region the user was just exploring.
  React.useEffect(() => {
    const handler = (e) => {
      const macro = e?.detail?.macro;
      if (macro === 'costa' || macro === 'sierra' || macro === 'selva') {
        setActiveMacro(macro);
      }
    };
    window.addEventListener('select-macro', handler);
    return () => window.removeEventListener('select-macro', handler);
  }, []);

  const macros = [
    { id: 'costa',  label: 'Costa',  color: '#6FA8C9' },
    { id: 'sierra', label: 'Sierra', color: '#C9A961' },
    { id: 'selva',  label: 'Selva',  color: '#7FB069' },
  ];
  const active = macros.find(m => m.id === activeMacro);
  const citiesOfMacro = (window.REGIONS || []).filter(r => r.tipo === activeMacro);

  function goToCity(cityId) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.hash = `#ciudad/${cityId}`;
  }

  return (
    <section id="propiedades" style={propStyles.section}>
      <div className="wrap">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:36, flexWrap:'wrap', gap:32}}>
          <div>
            <div className="label-row" style={{display:'flex', alignItems:'center', gap:20, marginBottom:16}}>
              <span className="quechua">ꟼ Sección 05 · Wasikuna</span>
              <div style={{width:60, height:1, background:'var(--border-gold)'}} />
            </div>
            <h2 className="h-display" style={{fontSize:'clamp(40px, 4.5vw, 64px)'}}>
              Propiedades<br/>
              <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>destacadas.</em>
            </h2>
          </div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {macros.map(m => {
              const isActive = activeMacro === m.id;
              return (
                <button key={m.id} onClick={() => setActiveMacro(m.id)}
                  style={{
                    padding:'12px 24px',
                    border:'1px solid ' + (isActive ? m.color : 'var(--border-dark)'),
                    background: isActive ? 'rgba(255,255,255,0.02)' : 'transparent',
                    color: isActive ? m.color : 'var(--text-on-dark-muted)',
                    fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.24em', textTransform:'uppercase',
                    cursor:'pointer', transition:'all .2s ease',
                    position:'relative',
                  }}>
                  {isActive && (
                    <span style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', width:6, height:6, borderRadius:'50%', background:m.color, boxShadow:`0 0 8px ${m.color}`}} />
                  )}
                  <span style={{paddingLeft: isActive ? 14 : 0}}>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* City chips of active macro — click → city landing */}
        <div style={{
          display:'flex',
          flexWrap:'wrap',
          gap:10,
          marginBottom:64,
          paddingBottom:36,
          borderBottom:'1px solid var(--border-dark)',
        }}>
          <span className="quechua" style={{color: active.color, alignSelf:'center', marginRight:14}}>
            ꟼ Ciudades de {active.label} · {citiesOfMacro.length}
          </span>
          {citiesOfMacro.map(c => (
            <button key={c.id} onClick={() => goToCity(c.id)}
              style={{
                display:'inline-flex', alignItems:'center', gap:10,
                padding:'10px 16px',
                border:`1px solid ${active.color}55`,
                background: 'rgba(255,255,255,0.015)',
                color:'var(--text-on-dark)',
                fontFamily:'var(--font-sans)', fontSize:13, fontWeight:400,
                cursor:'pointer', transition:'all .2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${active.color}14`;
                e.currentTarget.style.borderColor = active.color;
                e.currentTarget.style.color = active.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                e.currentTarget.style.borderColor = `${active.color}55`;
                e.currentTarget.style.color = 'var(--text-on-dark)';
              }}>
              {c.capital}
              <span style={{fontFamily:'var(--font-mono)', fontSize:11, opacity:0.7}}>→</span>
            </button>
          ))}
        </div>

        <div style={propStyles.grid}>
          {PROPERTIES.filter(p => p.macro === activeMacro).map((p, i) => {
            const esTerreno = p.tipo === 'Terreno';
            // Buscar la región por nombre para construir la URL de la landing
            const regionMatch = (window.REGIONS || []).find(r => r.nombre === p.region);
            const goToCity = () => {
              if (!regionMatch) return;
              window.scrollTo({ top: 0, behavior: 'instant' });
              window.location.hash = '#ciudad/' + regionMatch.id;
            };
            const handleHeart = (e) => {
              e.stopPropagation();
              // TODO: integrar favoritos
            };
            return (
            <article key={p.id}
              role="button" tabIndex={0}
              onClick={goToCity}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToCity(); } }}
              className="prop-card"
              style={{...propStyles.card, gridColumn: i===0 ? 'span 2' : 'span 1'}}>
              <div style={{...propStyles.media, aspectRatio: i===0 ? '16/9' : '4/5'}}>
                <img src={p.img} alt={p.titulo} style={propStyles.img}
                     onError={(e) => { e.target.style.display='none'; }} />
                <div style={propStyles.imgOverlay} />
                <div style={propStyles.badge}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em'}}>{p.region.toUpperCase()}</span>
                </div>
                {p.tipo && (
                  <div style={{...propStyles.typeBadge, borderColor: active.color, color: active.color}}>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.24em', textTransform:'uppercase'}}>
                      {p.tipo}
                    </span>
                  </div>
                )}
                <button onClick={handleHeart} aria-label="Guardar" style={propStyles.heart}>{Icons.heart}</button>
                <div style={propStyles.priceTag}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold-primary)', letterSpacing:'0.2em'}}>DESDE</span>
                  <div style={{fontFamily:'var(--font-display)', fontSize:32, color:'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.02em'}}>
                    ${p.precio.toLocaleString('es-ES')}
                  </div>
                </div>
                {/* Overlay CTA al hover — invita a entrar a la zona */}
                <div className="prop-card-cta" style={{...propStyles.cta, borderColor: active.color}}>
                  <span style={{color: active.color}}>
                    Ver propiedades en {p.region}
                  </span>
                  <span style={{color: active.color, fontFamily:'var(--font-mono)'}}>→</span>
                </div>
              </div>

              <div style={{padding:'28px 4px 8px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:14}}>
                  <h3 style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em'}}>
                    {p.titulo}
                  </h3>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--gold-primary)', letterSpacing:'0.12em', whiteSpace:'nowrap'}}>
                    {p.retorno}% ret.
                  </span>
                </div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:16}}>
                  {p.barrio}
                </div>
                <div style={{display:'flex', gap:20, paddingTop:16, borderTop:'1px solid var(--border-dark)', color:'var(--text-on-dark-muted)', fontSize:13}}>
                  {!esTerreno && <span style={{display:'flex', alignItems:'center', gap:6}}>{Icons.bed}{p.hab} hab</span>}
                  {!esTerreno && <span style={{display:'flex', alignItems:'center', gap:6}}>{Icons.bath}{p.ban} baños</span>}
                  <span style={{display:'flex', alignItems:'center', gap:6}}>{Icons.m2}{p.m2.toLocaleString()} m²</span>
                </div>
                <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:16}}>
                  {p.tags.map(t => (
                    <span key={t} style={{padding:'4px 10px', border:'1px solid var(--border-dark)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.08em'}}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          );
          })}
        </div>

        {/* Banda inferior — CTA general por macro */}
        <div style={propStyles.macroFooter}>
          <div>
            <div className="quechua" style={{marginBottom:10, color: active.color}}>
              ꟼ ¿Buscas algo específico en {active.label}?
            </div>
            <div style={{fontFamily:'var(--font-display)', fontSize:24, color:'var(--text-on-dark)', maxWidth:560, lineHeight:1.3}}>
              Tenemos 1.480 propiedades curadas. Entra a una ciudad para ver
              todas las opciones de venta y alquiler.
            </div>
          </div>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
            {citiesOfMacro.slice(0, 4).map(c => (
              <button key={c.id} onClick={() => goToCity(c.id)} style={{
                padding:'14px 22px',
                border: `1px solid ${active.color}`,
                background: 'transparent',
                color: active.color,
                fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase',
                cursor:'pointer', transition:'all .2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${active.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                {c.capital}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const propStyles = {
  section: { padding:'var(--section-py) 0', background:'var(--bg-primary)', borderTop:'1px solid var(--border-dark)' },
  grid: { display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32 },
  card: {
    background:'transparent',
    cursor:'pointer',
    transition:'transform .3s ease',
    outline:'none',
  },
  media: {
    position:'relative', overflow:'hidden',
    background:'var(--bg-tertiary)', border:'1px solid var(--border-dark)',
    transition:'border-color .3s ease',
  },
  img: { width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .6s ease' },
  imgOverlay: { position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0) 50%, rgba(14,16,20,0.85) 100%)' },
  badge: { position:'absolute', top:16, left:16, padding:'6px 10px', background:'rgba(14,16,20,0.6)', backdropFilter:'blur(6px)', border:'1px solid var(--border-gold)', color:'var(--gold-primary)' },
  typeBadge: { position:'absolute', top:16, left:16, transform:'translateY(40px)', padding:'5px 10px', background:'rgba(14,16,20,0.6)', backdropFilter:'blur(6px)', border:'1px solid' },
  heart: { position:'absolute', top:16, right:16, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-on-dark)', background:'rgba(14,16,20,0.5)', backdropFilter:'blur(6px)', border:'1px solid var(--border-dark)', cursor:'pointer', zIndex:3 },
  priceTag: { position:'absolute', bottom:20, left:20 },
  cta: {
    position:'absolute', left:0, right:0, bottom:0,
    padding:'18px 20px',
    background:'rgba(14,16,20,0.92)',
    backdropFilter:'blur(8px)',
    borderTop:'1px solid',
    display:'flex', alignItems:'center', justifyContent:'space-between', gap:14,
    fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase',
    transform:'translateY(100%)',
    transition:'transform .35s ease',
    pointerEvents:'none',
  },
  macroFooter: {
    marginTop: 80,
    paddingTop: 56,
    borderTop: '1px solid var(--border-dark)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 40,
    flexWrap: 'wrap',
  },
};

// Inyectar reglas hover una sola vez (necesario porque estamos en inline-styles)
if (!document.getElementById('prop-card-hover-css')) {
  const css = document.createElement('style');
  css.id = 'prop-card-hover-css';
  css.textContent = `
    .prop-card:hover { transform: translateY(-4px); }
    .prop-card:hover > div:first-child { border-color: var(--gold-primary); }
    .prop-card:hover img { transform: scale(1.04); }
    .prop-card:hover .prop-card-cta { transform: translateY(0); }
    .prop-card:focus-visible > div:first-child { border-color: var(--gold-primary); box-shadow: 0 0 0 2px rgba(201,169,97,0.25); }
  `;
  document.head.appendChild(css);
}

window.Properties = Properties;
