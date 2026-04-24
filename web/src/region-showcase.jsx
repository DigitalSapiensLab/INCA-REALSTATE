// RegionShowcase — macro-region picker (Costa / Sierra / Selva) with:
//   1. 4-column city carousel (per-page pagination with arrows + dots)
//   2. General Culture & Tourism / Gastronomy / Living-in sections for the macro-region
//   Individual cities have their own pages (see "Conocer ciudad" CTA on each card).
function RegionShowcase() {
  const [tipo, setTipo] = React.useState('costa');
  const [page, setPage] = React.useState(0);

  const tipoTabs = [
    { id: 'costa',  label: 'Costa',  color: '#6FA8C9' },
    { id: 'sierra', label: 'Sierra', color: '#C9A961' },
    { id: 'selva',  label: 'Selva',  color: '#7FB069' },
  ];
  const active = tipoTabs.find(t => t.id === tipo);
  const macro = (window.MACRO_REGION_DATA || {})[tipo];

  const benefitIcons = {
    sun:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="5" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="19" y2="12"/><line x1="5" y1="5" x2="7" y2="7"/><line x1="17" y1="17" x2="19" y2="19"/><line x1="5" y1="19" x2="7" y2="17"/><line x1="17" y1="7" x2="19" y2="5"/></svg>,
    med:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="10"/></svg>,
    wifi:   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></svg>,
    edu:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8l10-4 10 4-10 4z"/><path d="M6 10v6a6 3 0 0 0 12 0v-6"/></svg>,
    plane:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M17.8 19.2L16 11l3.5-3.5c.77-.77.77-2.03 0-2.8-.77-.77-2.03-.77-2.8 0L13 8 4.8 6.2c-.5-.1-.9.06-1.2.36L2 8.2l8 3.8-4 4H3l-1 1 4 2 2 4 1-1v-3l4-4 3.8 8 1.64-1.6c.3-.3.44-.7.36-1.2z"/></svg>,
    euro:   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M18 7A8 8 0 1 0 18 17M5 10h9M5 14h9"/></svg>,
    shield: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></svg>,
    heart:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  };

  const cities = REGIONS.filter(r => r.tipo === tipo);
  const perPage = 4;
  const totalPages = Math.max(1, Math.ceil(cities.length / perPage));
  const safePage = Math.min(page, totalPages - 1);
  const pageCities = cities.slice(safePage * perPage, (safePage + 1) * perPage);

  // Reset page when tipo changes
  React.useEffect(() => { setPage(0); }, [tipo]);

  // Keyboard arrow navigation inside the carousel
  const onKey = (e) => {
    if (e.key === 'ArrowLeft')  setPage(p => Math.max(0, p - 1));
    if (e.key === 'ArrowRight') setPage(p => Math.min(totalPages - 1, p + 1));
  };

  return (
    <section id="region" style={rsStyles.wrap}>
      {/* ───────────── TIPO DE REGIÓN SELECTOR ───────────── */}
      <div style={rsStyles.selector}>
        <div className="wrap">
          <div style={{display:'flex', alignItems:'center', gap:32, justifyContent:'space-between', flexWrap:'wrap'}}>
            <div style={{display:'flex', alignItems:'center', gap:20}}>
              <span className="quechua">ꟼ Elige tu región</span>
              <div style={{width:40, height:1, background:'var(--border-gold)'}} />
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {tipoTabs.map(t => {
                const isActive = tipo === t.id;
                return (
                  <button key={t.id} onClick={() => setTipo(t.id)}
                    style={{
                      padding:'12px 28px',
                      border:'1px solid ' + (isActive ? t.color : 'var(--border-dark)'),
                      background: isActive ? 'rgba(255,255,255,0.02)' : 'transparent',
                      color: isActive ? t.color : 'var(--text-on-dark-muted)',
                      fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.24em', textTransform:'uppercase',
                      cursor:'pointer', transition:'all .2s ease',
                      position:'relative',
                    }}>
                    {isActive && (
                      <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', width:6, height:6, borderRadius:'50%', background:t.color, boxShadow:`0 0 8px ${t.color}`}} />
                    )}
                    <span style={{paddingLeft: isActive ? 14 : 0}}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          Contenido general de la macro-región: cultura / turismo,
          gastronomía, vivir en... — para inspirar al usuario antes de
          que entre a una ciudad específica. El carrusel de ciudades va
          al final, después del CTA.
          ═══════════════════════════════════════════════════════════ */}
      {macro && (
        <>
          {/* ───── INTRO PERSUASIVA + SLIDER 4 IMÁGENES ───── */}
          <MacroIntro macro={macro} color={active.color} />

          {/* 01 · CULTURA & TURISMO */}
          <div style={rsStyles.section}>
            <div className="motif-pattern" style={{opacity:0.45}} />
            <div className="wrap" style={{position:'relative', zIndex:1}}>
              <SectionTitle num="01"
                quechua={`${macro.quechua_num} · Kawsay Llaqta`}
                title="Cultura & Turismo"
                subtitle={`Lo que puedes vivir en la ${macro.nombre.toLowerCase()} peruana`}
                color={active.color} />

              {/* 4 culture cards */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, marginBottom:72}}>
                <CultureCard title="Patrimonio"   items={macro.cultura.patrimonio}   color={active.color} />
                <CultureCard title="Festividades" items={macro.cultura.festividades} color={active.color} />
                <CultureCard title="Idiomas"      items={macro.cultura.idiomas}      color={active.color} />
                <CultureCard title="Artesanía"    items={macro.cultura.artesania}    color={active.color} />
              </div>

              {/* Tourism grid */}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:36, flexWrap:'wrap', gap:16}}>
                <h3 style={{fontFamily:'var(--font-display)', fontSize:36, fontWeight:400, color:'var(--text-on-dark)'}}>
                  Destinos imperdibles
                </h3>
                <span className="quechua" style={{color: active.color}}>
                  {macro.turismo.length} lugares · {macro.nombre}
                </span>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
                {macro.turismo.map((t, i) => (
                  <TourCard key={i} t={t} i={i} color={active.color} />
                ))}
              </div>
            </div>
          </div>

          {/* 02 · GASTRONOMÍA */}
          <div style={{...rsStyles.section, background:'var(--bg-primary)'}}>
            <div className="wrap">
              <SectionTitle num="02"
                quechua={macro.quechua_gast}
                title="Gastronomía"
                subtitle={`Los sabores que definen la ${macro.nombre.toLowerCase()}`}
                color={active.color} />
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, border:'1px solid var(--border-dark)'}}>
                {macro.gastronomia.map((g, i) => (
                  <div key={i} style={{
                    borderRight: (i+1)%3 !== 0 ? '1px solid var(--border-dark)' : 'none',
                    borderBottom: i < macro.gastronomia.length - 3 ? '1px solid var(--border-dark)' : 'none',
                    display:'flex', flexDirection:'column',
                  }}>
                    {g.img && (
                      <div style={{position:'relative', aspectRatio:'16/10', overflow:'hidden', background:'var(--bg-primary)'}}>
                        <img src={g.img} alt={g.nombre} loading="lazy"
                          style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'saturate(0.9) brightness(0.92) contrast(1.05)'}}
                          onError={(e)=>{ e.target.style.display='none'; }} />
                        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 50%, rgba(14,16,20,0.55) 100%)'}} />
                        <span style={{
                          position:'absolute', top:14, left:14,
                          fontFamily:'var(--font-mono)', fontSize:10, color:active.color, letterSpacing:'0.22em',
                          background:'rgba(14,16,20,0.7)', padding:'4px 9px', backdropFilter:'blur(6px)',
                          border:`1px solid ${active.color}66`,
                        }}>{String(i+1).padStart(2,'0')}</span>
                      </div>
                    )}
                    <div style={{padding:32, flex:1, display:'flex', flexDirection:'column'}}>
                      <h4 style={{fontFamily:'var(--font-display)', fontSize:26, fontWeight:400, color:'var(--text-on-dark)', marginBottom:14}}>{g.nombre}</h4>
                      <p style={{fontSize:14, lineHeight:1.65, color:'var(--text-on-dark-muted)', marginBottom:18, flex:1}}>{g.desc}</p>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:active.color, textTransform:'uppercase'}}>
                        ◈ {g.donde}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 03 · VIVIR EN [Macro] */}
          <div style={{...rsStyles.section, background:'var(--bg-secondary)'}}>
            <div className="motif-pattern" style={{opacity:0.4}} />
            <div className="wrap" style={{position:'relative', zIndex:1}}>
              <SectionTitle num="03"
                quechua={macro.quechua_viv}
                title={`Vivir en la ${macro.nombre}`}
                subtitle={`Ventajas generales de mudarte a la ${macro.nombre.toLowerCase()} peruana`}
                color={active.color} />
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0}}>
                {macro.beneficios.map((b, i) => (
                  <article key={i} style={{
                    padding: 36,
                    borderTop: '1px solid var(--border-dark)',
                    borderLeft: i%4 !== 0 ? '1px solid var(--border-dark)' : 'none',
                    borderBottom: i >= macro.beneficios.length - 4 ? '1px solid var(--border-dark)' : 'none',
                  }}>
                    <div style={{color: active.color, marginBottom:24}}>{benefitIcons[b.icon]}</div>
                    <h4 style={{fontFamily:'var(--font-display)', fontSize:19, fontWeight:400, color:'var(--text-on-dark)', marginBottom:12, lineHeight:1.2}}>
                      {b.titulo}
                    </h4>
                    <p style={{fontSize:13, lineHeight:1.65, color:'var(--text-on-dark-muted)'}}>{b.desc}</p>
                  </article>
                ))}
              </div>

              {/* CTA band: invite to explore specific cities */}
              <div style={{marginTop:72, padding:48, background:'var(--bg-tertiary)', border:`1px solid ${active.color}66`, display:'grid', gridTemplateColumns:'1fr auto', gap:40, alignItems:'center'}}>
                <div>
                  <div className="quechua" style={{marginBottom:12, color: active.color}}>Próximo paso</div>
                  <h3 style={{fontFamily:'var(--font-display)', fontSize:36, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em'}}>
                    Descubre una de las <em style={{color:active.color, fontStyle:'italic'}}>{cities.length} ciudades</em> de la {macro.nombre.toLowerCase()}
                  </h3>
                  <p style={{fontSize:15, color:'var(--text-on-dark-muted)', marginTop:12, maxWidth:620}}>
                    Cada ciudad tiene su propia alma — clima, cultura, gastronomía y oportunidades de inversión.
                    Haz clic en "Conocer ciudad" en el carrusel para ver la información exclusiva.
                  </p>
                </div>
                <button onClick={() => {
                  const el = document.getElementById('ciudades-carousel');
                  if (el) window.scrollTo({top: el.offsetTop - 120, behavior:'smooth'});
                }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:14,
                  padding:'18px 28px', background: active.color, color:'#0E1014',
                  border:0, cursor:'pointer',
                  fontFamily:'var(--font-sans)', fontSize:12, fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase',
                  whiteSpace:'nowrap',
                }}>
                  Ver ciudades <ArrowIcon dir="right" size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ───────────── CARRUSEL DE CIUDADES (después del CTA) ───────────── */}
          <div id="ciudades-carousel" style={rsStyles.carouselWrap} onKeyDown={onKey} tabIndex={-1}>
            <div className="motif-pattern" style={{opacity:0.35}} />
            <div className="wrap" style={{position:'relative', zIndex:1}}>

              {/* Header: título + controles */}
              <div style={rsStyles.carouselHeader}>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:14}}>
                    <span style={{width:34, height:1, background: active.color}} />
                    <span className="quechua" style={{color: active.color}}>
                      Región · {active.label} · {cities.length} ciudades
                    </span>
                  </div>
                  <h2 style={{fontFamily:'var(--font-display)', fontSize:'clamp(44px, 5vw, 72px)', fontWeight:300, letterSpacing:'-0.025em', lineHeight:1, color:'var(--text-on-dark)'}}>
                    Ciudades de <em style={{fontStyle:'italic', color: active.color}}>{active.label}</em>
                  </h2>
                </div>

                <div style={rsStyles.carouselNav}>
                  <button onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={safePage === 0}
                    style={{...rsStyles.navBtn, opacity: safePage === 0 ? 0.3 : 1, cursor: safePage === 0 ? 'default' : 'pointer'}}
                    aria-label="Anterior">
                    <ArrowIcon dir="left" />
                  </button>
                  <div style={rsStyles.pageIndicator}>
                    <span style={{fontFamily:'var(--font-display)', fontSize:32, color: active.color, fontWeight:300, lineHeight:1}}>
                      {String(safePage + 1).padStart(2, '0')}
                    </span>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-subtle)', letterSpacing:'0.2em'}}>
                      / {String(totalPages).padStart(2, '0')}
                    </span>
                  </div>
                  <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={safePage === totalPages - 1}
                    style={{...rsStyles.navBtn, opacity: safePage === totalPages - 1 ? 0.3 : 1, cursor: safePage === totalPages - 1 ? 'default' : 'pointer'}}
                    aria-label="Siguiente">
                    <ArrowIcon dir="right" />
                  </button>
                </div>
              </div>

              {/* Grid 4 columnas */}
              <div style={rsStyles.grid}>
                {pageCities.map(city => (
                  <CityCard key={city.id} city={city} tipoColor={active.color} />
                ))}
                {/* Fill empty slots with a ghost card to preserve the 4-col layout on the last page */}
                {Array.from({length: perPage - pageCities.length}).map((_, i) => (
                  <div key={`ghost-${i}`} style={rsStyles.ghost} />
                ))}
              </div>

              {/* Dots indicator */}
              {totalPages > 1 && (
                <div style={rsStyles.dots}>
                  {Array.from({length: totalPages}).map((_, i) => (
                    <button key={i} onClick={() => setPage(i)}
                      style={{
                        width: i === safePage ? 32 : 10, height: 2,
                        background: i === safePage ? active.color : 'rgba(255,255,255,0.2)',
                        border: 0, padding: 0, cursor: 'pointer',
                        transition: 'all .3s ease',
                      }}
                      aria-label={`Página ${i + 1}`} />
                  ))}
                </div>
              )}

            </div>
          </div>
        </>
      )}
    </section>
  );
}

// ───────────── INTRO PERSUASIVA + SLIDER 4 IMÁGENES ─────────────
function MacroIntro({ macro, color }) {
  const slides = macro.intro_slides || [];
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Reset the slider when the macro-region changes
  React.useEffect(() => { setIdx(0); }, [macro.nombre]);

  // Auto-rotate every 5.5s unless paused (hover)
  React.useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [paused, slides.length, macro.nombre]);

  // Titular with *word* → italic colored accent
  const titular = (macro.intro.titular || '').split(/(\*[^*]+\*)/g).map((chunk, i) =>
    chunk.startsWith('*') && chunk.endsWith('*')
      ? <em key={i} style={{fontStyle:'italic', color, fontWeight:300}}>{chunk.slice(1, -1)}</em>
      : <React.Fragment key={i}>{chunk}</React.Fragment>
  );

  return (
    <div style={{
      position:'relative',
      padding:'var(--section-py) 0',
      borderTop:'1px solid var(--border-dark)',
      background: 'radial-gradient(ellipse at 15% 40%, ' + color + '14, transparent 60%), var(--bg-primary)',
      overflow:'hidden',
    }}>
      <div className="motif-pattern" style={{opacity:0.35}} />
      <div className="wrap" style={{position:'relative', zIndex:1}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center'}}>

          {/* LEFT — copy persuasiva */}
          <div>
            <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:32}}>
              <div className="stepped-divider" />
              <span className="quechua" style={{color}}>{macro.intro.eyebrow}</span>
            </div>

            <h2 className="h-display" style={{
              fontFamily:'var(--font-display)', fontWeight:300,
              fontSize:'clamp(44px, 5.2vw, 80px)',
              letterSpacing:'-0.025em', lineHeight:0.98,
              color:'var(--text-on-dark)', marginBottom:32,
            }}>
              {titular}
            </h2>

            <p style={{fontSize:17, lineHeight:1.75, color:'var(--text-on-dark-muted)', maxWidth:520, marginBottom:22, fontWeight:300}}>
              {macro.intro.parrafo}
            </p>
            <p style={{fontSize:17, lineHeight:1.75, color:'var(--text-on-dark-muted)', maxWidth:520, marginBottom:36, fontWeight:300}}>
              {macro.intro.cierre}
            </p>

            {/* Pilares */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14, maxWidth:520}}>
              {(macro.intro.pilares || []).map((p, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'12px 14px',
                  border:'1px solid var(--border-dark)',
                  background:'var(--bg-tertiary)',
                }}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:color, flexShrink:0, boxShadow:`0 0 8px ${color}`}} />
                  <span style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', color:'var(--text-on-dark)'}}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — slider de 4 imágenes */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{position:'relative', height:'70vh', minHeight:540}}
          >
            <div style={{position:'absolute', inset:0, overflow:'hidden', border:`1px solid ${color}66`}}>
              {slides.map((s, i) => (
                <div key={i} style={{
                  position:'absolute', inset:0,
                  backgroundImage: `url(${s.img})`,
                  backgroundSize:'cover', backgroundPosition:'center',
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? 'scale(1)' : 'scale(1.06)',
                  transition: 'opacity 1.2s ease, transform 6s ease',
                  filter:'saturate(0.9) brightness(0.85)',
                }} />
              ))}
              <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0.15) 40%, rgba(14,16,20,0.88) 100%)'}} />

              {/* Top-left badge: current label */}
              <div style={{
                position:'absolute', top:20, left:20,
                padding:'8px 14px',
                border:`1px solid ${color}`,
                background:'rgba(14,16,20,0.7)', backdropFilter:'blur(6px)',
                fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.26em', textTransform:'uppercase',
                color,
              }}>
                ◉ {slides[idx]?.label}
              </div>

              {/* Top-right: slide counter */}
              <div style={{
                position:'absolute', top:20, right:20,
                display:'flex', alignItems:'baseline', gap:6,
              }}>
                <span style={{fontFamily:'var(--font-display)', fontSize:40, color, fontWeight:300, lineHeight:1}}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-subtle)', letterSpacing:'0.2em'}}>
                  / {String(slides.length).padStart(2, '0')}
                </span>
              </div>

              {/* Bottom caption */}
              <div style={{position:'absolute', bottom:30, left:30, right:30}}>
                <div className="quechua" style={{color, marginBottom:8}}>{slides[idx]?.label}</div>
                <div style={{fontFamily:'var(--font-display)', fontSize:26, fontWeight:400, color:'var(--text-on-dark)', lineHeight:1.2, maxWidth:'90%'}}>
                  {slides[idx]?.caption}
                </div>
              </div>

              {/* Corner decorations */}
              <span style={{position:'absolute', top:0, right:0, width:16, height:16, borderTop:`1px solid ${color}`, borderRight:`1px solid ${color}`}} />
              <span style={{position:'absolute', bottom:0, left:0, width:16, height:16, borderBottom:`1px solid ${color}`, borderLeft:`1px solid ${color}`}} />
            </div>

            {/* Labeled dots below the image */}
            <div style={{
              position:'absolute', left:0, right:0, bottom:-48,
              display:'grid', gridTemplateColumns:`repeat(${slides.length}, 1fr)`, gap:8,
            }}>
              {slides.map((s, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  style={{
                    padding:'12px 6px', cursor:'pointer',
                    background:'transparent',
                    borderTop: `2px solid ${i === idx ? color : 'rgba(255,255,255,0.1)'}`,
                    borderLeft:0, borderRight:0, borderBottom:0,
                    color: i === idx ? color : 'var(--text-on-dark-subtle)',
                    fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase',
                    textAlign:'center',
                    transition:'all .25s ease',
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ───────────── SUB-COMPONENTES DE CONTENIDO ─────────────
function SectionTitle({ num, quechua, title, subtitle, color }) {
  return (
    <div style={{marginBottom:64, display:'grid', gridTemplateColumns:'auto 1fr', gap:48, alignItems:'end'}}>
      <div style={{fontFamily:'var(--font-display)', fontSize:120, fontWeight:300, color: color || 'var(--gold-primary)', lineHeight:0.9, letterSpacing:'-0.04em'}}>
        {num}
      </div>
      <div>
        <div className="quechua" style={{marginBottom:14, color: color || 'var(--gold-primary)'}}>{quechua}</div>
        <h2 style={{fontFamily:'var(--font-display)', fontSize:'clamp(40px, 5vw, 64px)', fontWeight:300, letterSpacing:'-0.02em', color:'var(--text-on-dark)', lineHeight:1}}>
          {title}
        </h2>
        <p style={{fontSize:17, color:'var(--text-on-dark-muted)', marginTop:16}}>{subtitle}</p>
      </div>
    </div>
  );
}

function CultureCard({ title, items, color }) {
  return (
    <div style={{padding:28, border:'1px solid var(--border-dark)', background:'var(--bg-tertiary)'}}>
      <div className="quechua" style={{marginBottom:20, color: color || 'var(--gold-primary)'}}>{title}</div>
      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10}}>
        {items.map((it, i) => (
          <li key={i} style={{fontSize:13, color:'var(--text-on-dark)', lineHeight:1.5, paddingLeft:16, position:'relative'}}>
            <span style={{position:'absolute', left:0, top:8, width:6, height:1, background: color || 'var(--gold-primary)'}} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TourCard({ t, i, color }) {
  return (
    <article style={{padding:32, border:'1px solid var(--border-dark)', background:'var(--bg-tertiary)', transition:'border-color .25s ease'}}>
      {t.img && (
        <div style={{position:'relative', aspectRatio:'4/3', overflow:'hidden', marginBottom:22, background:'var(--bg-primary)'}}>
          <img src={t.img} alt={t.nombre} loading="lazy" style={{
            position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
            filter:'saturate(0.85) brightness(0.9)',
          }} onError={(e)=>{ e.target.style.display='none'; }} />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 40%, rgba(14,16,20,0.7) 100%)'}} />
          <span style={{
            position:'absolute', top:12, left:12,
            fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.22em',
            color: color, textTransform:'uppercase',
            padding:'5px 9px', border: `1px solid ${color}66`,
            background:'rgba(14,16,20,0.65)', backdropFilter:'blur(6px)',
          }}>{t.tipo}</span>
          <span style={{
            position:'absolute', bottom:12, right:12,
            fontFamily:'var(--font-display)', fontSize:36, fontWeight:300,
            color: color, lineHeight:1,
          }}>{String(i+1).padStart(2,'0')}</span>
        </div>
      )}
      <h4 style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:400, color:'var(--text-on-dark)', marginBottom:10}}>{t.nombre}</h4>
      <p style={{fontSize:13, lineHeight:1.6, color:'var(--text-on-dark-muted)', marginBottom:20}}>{t.desc}</p>
      <div style={{paddingTop:14, borderTop:'1px solid var(--border-dark)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--text-on-dark-subtle)', textTransform:'uppercase'}}>
        ⟶ {t.tiempo}
      </div>
    </article>
  );
}

// ───────────── CARD DE CIUDAD ─────────────
function CityCard({ city, tipoColor }) {
  const details = (window.CITY_DETAILS || {})[city.id] || {
    imagen: '',
    tagline: '',
    altitud: '—',
    clima: '—',
  };
  const [hover, setHover] = React.useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-tertiary)',
        border: `1px solid ${hover ? tipoColor : 'var(--border-dark)'}`,
        transition: 'border-color .25s ease, transform .25s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column',
      }}>
      {/* Image */}
      <figure style={{margin:0, position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'var(--bg-primary)'}}>
        {details.imagen && (
          <img src={details.imagen} alt={city.nombre} loading="lazy"
            style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
                    filter:'saturate(0.85) brightness(0.88) contrast(1.05)',
                    transform: hover ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform .6s ease'}}
            onError={(e)=>{ e.target.style.display='none'; }} />
        )}
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 40%, rgba(14,16,20,0.7) 100%)'}} />
        <figcaption style={{
          position:'absolute', top:12, left:12,
          fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.22em',
          color: tipoColor, textTransform:'uppercase',
          padding:'5px 10px',
          background:'rgba(14,16,20,0.7)', backdropFilter:'blur(6px)',
          border:`1px solid ${tipoColor}66`,
        }}>
          ◉ {city.nombre}
        </figcaption>
        {/* Corner decorations */}
        <span style={{position:'absolute', top:0, right:0, width:12, height:12, borderTop:`1px solid ${tipoColor}`, borderRight:`1px solid ${tipoColor}`, opacity: hover ? 1 : 0.5, transition:'opacity .25s ease'}} />
        <span style={{position:'absolute', bottom:0, left:0, width:12, height:12, borderBottom:`1px solid ${tipoColor}`, borderLeft:`1px solid ${tipoColor}`, opacity: hover ? 1 : 0.5, transition:'opacity .25s ease'}} />
      </figure>

      {/* Body */}
      <div style={{padding: 24, display:'flex', flexDirection:'column', gap:16, flex:1}}>
        <div>
          <h3 style={{fontFamily:'var(--font-display)', fontSize:28, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em', lineHeight:1.05, marginBottom:8}}>
            {city.nombre}
          </h3>
          {details.tagline && (
            <p style={{fontFamily:'var(--font-display)', fontSize:13, fontStyle:'italic', color: tipoColor, lineHeight:1.5, minHeight:40}}>
              {details.tagline}
            </p>
          )}
        </div>

        {/* Stats bar */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', border:'1px solid var(--border-dark)', marginTop:'auto'}}>
          <StatCell label="Altitud" value={details.altitud} />
          <StatCell label="Clima"   value={details.clima}   border />
          <StatCell label="Retorno" value={`${city.retorno}%`} border gold />
        </div>

        {/* CTA */}
        <a
          href={`#ciudad/${city.id}`}
          onClick={(e) => { /* Placeholder — city pages will be wired later */ }}
          style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'14px 18px',
            border: `1px solid ${hover ? tipoColor : 'var(--border-dark)'}`,
            background: hover ? `${tipoColor}14` : 'transparent',
            color: hover ? tipoColor : 'var(--text-on-dark-muted)',
            fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.24em', textTransform:'uppercase',
            transition:'all .25s ease',
          }}>
          <span>Conocer ciudad</span>
          <ArrowIcon dir="right" size={14} />
        </a>
      </div>
    </article>
  );
}

function StatCell({ label, value, border, gold }) {
  return (
    <div style={{
      padding:'14px 12px',
      borderLeft: border ? '1px solid var(--border-dark)' : 'none',
    }}>
      <div className="quechua" style={{fontSize:9, marginBottom:6}}>{label}</div>
      <div style={{fontFamily:'var(--font-display)', fontSize:18, color: gold ? 'var(--gold-primary)' : 'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.01em', whiteSpace:'nowrap'}}>
        {value}
      </div>
    </div>
  );
}

function ArrowIcon({ dir = 'right', size = 18 }) {
  const rotate = dir === 'left' ? 'rotate(180deg)' : 'none';
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{transform: rotate}}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const rsStyles = {
  wrap: { position:'relative' },
  selector: {
    position:'sticky', top:84, zIndex:20,
    padding:'20px 0',
    background:'rgba(14,16,20,0.92)',
    backdropFilter:'blur(12px)',
    borderBottom:'1px solid var(--border-dark)',
    borderTop:'1px solid var(--border-dark)',
  },
  carouselWrap: {
    position:'relative',
    padding:'var(--section-py) 0',
    borderTop:'1px solid var(--border-dark)',
    outline:'none',
  },
  section: {
    position:'relative',
    padding:'var(--section-py) 0',
    borderTop:'1px solid var(--border-dark)',
  },
  carouselHeader: {
    display:'flex', justifyContent:'space-between', alignItems:'flex-end',
    gap:32, marginBottom:56, flexWrap:'wrap',
  },
  carouselNav: {
    display:'flex', alignItems:'center', gap:20,
  },
  navBtn: {
    width:54, height:54, display:'flex', alignItems:'center', justifyContent:'center',
    border:'1px solid var(--border-dark)', color:'var(--text-on-dark)',
    background:'transparent', transition:'all .2s ease',
  },
  pageIndicator: {
    display:'flex', alignItems:'baseline', gap:6,
    padding:'0 20px',
  },
  grid: {
    display:'grid',
    gridTemplateColumns:'repeat(4, 1fr)',
    gap:24,
    alignItems:'stretch',
  },
  ghost: {
    border:'1px dashed var(--border-dark)',
    opacity:0.2,
  },
  dots: {
    display:'flex', gap:10, justifyContent:'center', marginTop:48,
  },
};

// Responsive tweaks via a mounted <style>
const rsCSS = document.createElement('style');
rsCSS.textContent = `
@media (max-width: 1100px) {
  #region [style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 640px) {
  #region [style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
}
`;
document.head.appendChild(rsCSS);

window.RegionShowcase = RegionShowcase;
