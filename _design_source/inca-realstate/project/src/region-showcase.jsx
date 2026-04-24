// Region showcase: selector + Culture/Tourism → Gastronomy → Benefits of living
function RegionShowcase() {
  const [selected, setSelected] = React.useState('cusco');
  const r = REGION_DATA[selected];

  const benefitIcons = {
    sun: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="5" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="19" y2="12"/><line x1="5" y1="5" x2="7" y2="7"/><line x1="17" y1="17" x2="19" y2="19"/><line x1="5" y1="19" x2="7" y2="17"/><line x1="17" y1="7" x2="19" y2="5"/></svg>,
    med: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="10"/></svg>,
    wifi: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></svg>,
    edu: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8l10-4 10 4-10 4z"/><path d="M6 10v6a6 3 0 0 0 12 0v-6"/></svg>,
    plane: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M17.8 19.2L16 11l3.5-3.5c.77-.77.77-2.03 0-2.8-.77-.77-2.03-.77-2.8 0L13 8 4.8 6.2c-.5-.1-.9.06-1.2.36L2 8.2l8 3.8-4 4H3l-1 1 4 2 2 4 1-1v-3l4-4 3.8 8 1.64-1.6c.3-.3.44-.7.36-1.2z"/></svg>,
    euro: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M18 7A8 8 0 1 0 18 17M5 10h9M5 14h9"/></svg>,
    shield: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></svg>,
    heart: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  };

  return (
    <section id="region" style={rsStyles.wrap}>
      {/* REGION SELECTOR */}
      <div style={rsStyles.selector}>
        <div className="wrap">
          <div style={{display:'flex', alignItems:'center', gap:32, justifyContent:'space-between', flexWrap:'wrap'}}>
            <div style={{display:'flex', alignItems:'center', gap:20}}>
              <span className="quechua">ꟼ Elige tu región</span>
              <div style={{width:40, height:1, background:'var(--border-gold)'}} />
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {Object.keys(REGION_DATA).map(k => (
                <button key={k} onClick={() => setSelected(k)}
                  style={{
                    padding:'12px 22px',
                    border:'1px solid ' + (selected===k ? 'var(--gold-primary)' : 'var(--border-dark)'),
                    background: selected===k ? 'var(--gold-bg)' : 'transparent',
                    color: selected===k ? 'var(--gold-primary)' : 'var(--text-on-dark-muted)',
                    fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase',
                    cursor:'pointer', transition:'all .2s ease',
                  }}>
                  {REGION_DATA[k].nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REGION HEADER — editorial layout, no full-bleed background.
          Left: title + tagline + description.
          Right: regional image (top) + stats (bottom). */}
      <div style={{borderTop:'1px solid var(--border-dark)', padding:'var(--section-py) 0'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:72, alignItems:'stretch'}}>

            {/* LEFT column — name + tagline + description */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', gap:32, minHeight:480}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:18}}>
                  <span style={{width:34, height:1, background:'var(--gold-primary)'}} />
                  <span className="quechua">Región · {r.tipo} · {r.altitud}</span>
                </div>
                <h2 style={{fontFamily:'var(--font-display)', fontSize:'clamp(88px, 11vw, 176px)', fontWeight:300, letterSpacing:'-0.04em', lineHeight:0.88, color:'var(--text-on-dark)'}}>
                  {r.nombre}
                </h2>
                <div style={{fontFamily:'var(--font-display)', fontSize:22, fontStyle:'italic', color:'var(--gold-primary)', marginTop:18}}>
                  {r.tagline}
                </div>
              </div>
              <p style={{fontSize:18, lineHeight:1.75, color:'var(--text-on-dark-muted)', maxWidth:540}}>
                {r.descripcion}
              </p>
            </div>

            {/* RIGHT column — regional image (top) + stats (bottom) */}
            <div style={{display:'flex', flexDirection:'column', gap:28, minHeight:480}}>
              <figure style={{
                position:'relative', margin:0, flex:1, minHeight:340,
                border:'1px solid var(--border-gold)', overflow:'hidden', background:'var(--bg-tertiary)',
              }}>
                <img src={r.imagen_side} alt={`Escena de ${r.nombre}`} key={r.imagen_side}
                  loading="lazy"
                  style={{
                    position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'cover',
                    filter:'saturate(0.88) brightness(0.92) contrast(1.03)',
                  }}
                  onError={(e)=>{ e.target.style.display='none'; }} />
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(180deg, transparent 50%, rgba(14,16,20,0.7) 100%)',
                }} />
                <figcaption style={{
                  position:'absolute', top:18, left:18,
                  fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.24em',
                  color:'var(--gold-primary)', textTransform:'uppercase',
                  padding:'6px 12px',
                  background:'rgba(14,16,20,0.7)', backdropFilter:'blur(6px)',
                  border:'1px solid var(--border-gold)',
                }}>
                  ◉ {r.nombre}
                </figcaption>
                <span style={{position:'absolute', top:0, right:0, width:14, height:14, borderTop:'1px solid var(--gold-primary)', borderRight:'1px solid var(--gold-primary)'}} />
                <span style={{position:'absolute', bottom:0, left:0, width:14, height:14, borderBottom:'1px solid var(--gold-primary)', borderLeft:'1px solid var(--gold-primary)'}} />
              </figure>

              {/* stats — right below image */}
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, border:'1px solid var(--border-gold)'}}>
                <MiniStatBox label="Altitud" val={r.altitud} />
                <MiniStatBox label="Clima" val={r.clima} border />
                <MiniStatBox label="Retorno" val={r.inversion.retorno + '%'} border gold />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 01 · CULTURA & TURISMO */}
      <div style={rsStyles.section}>
        <div className="motif-pattern" style={{opacity:0.5}} />
        <div className="wrap" style={{position:'relative', zIndex:1}}>
          <SectionTitle num="01" quechua="Huk · Kawsay" title="Cultura & Turismo" subtitle={`Lo que puedes vivir en ${r.nombre}`} />

          {/* Patrimonio + festivales + idiomas cards */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, marginBottom:72}}>
            <CultureCard title="Patrimonio" items={r.cultura.patrimonio} />
            <CultureCard title="Festividades" items={r.cultura.festivales} />
            <CultureCard title="Idiomas" items={r.cultura.idiomas} />
            <CultureCard title="Artesanía" items={r.cultura.artesania} />
          </div>

          {/* Tourism destinations grid */}
          <div style={{marginTop:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:36}}>
              <h3 style={{fontFamily:'var(--font-display)', fontSize:36, fontWeight:400, color:'var(--text-on-dark)'}}>
                Destinos imperdibles
              </h3>
              <span className="quechua">{r.turismo.length} lugares · {r.nombre}</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
              {r.turismo.map((t, i) => (
                <article key={i} style={rsStyles.tourCard}>
                  {/* Image */}
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
                        color:'var(--gold-primary)', textTransform:'uppercase',
                        padding:'5px 9px', border:'1px solid var(--border-gold)',
                        background:'rgba(14,16,20,0.65)', backdropFilter:'blur(6px)',
                      }}>{t.tipo}</span>
                      <span style={{
                        position:'absolute', bottom:12, right:12,
                        fontFamily:'var(--font-display)', fontSize:36, fontWeight:300,
                        color:'var(--gold-primary)', lineHeight:1,
                      }}>{String(i+1).padStart(2,'0')}</span>
                    </div>
                  )}
                  <h4 style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:400, color:'var(--text-on-dark)', marginBottom:10}}>{t.nombre}</h4>
                  <p style={{fontSize:13, lineHeight:1.6, color:'var(--text-on-dark-muted)', marginBottom:20}}>{t.desc}</p>
                  <div style={{paddingTop:14, borderTop:'1px solid var(--border-dark)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--text-on-dark-subtle)', textTransform:'uppercase'}}>
                    ⟶ {t.tiempo}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 02 · GASTRONOMÍA */}
      <div style={{...rsStyles.section, background:'var(--bg-primary)', borderTop:'1px solid var(--border-dark)'}}>
        <div className="wrap">
          <SectionTitle num="02" quechua="Iskay · Mikhuna" title="Gastronomía" subtitle={`Cocina típica de ${r.nombre}`} />
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, border:'1px solid var(--border-dark)'}}>
            {r.gastronomia.map((g, i) => (
              <div key={i} style={{
                borderRight: (i+1)%3 !== 0 ? '1px solid var(--border-dark)' : 'none',
                borderBottom: i < r.gastronomia.length - 3 ? '1px solid var(--border-dark)' : 'none',
                display:'flex', flexDirection:'column',
              }}>
                {/* Gastronomy image */}
                {g.img && (
                  <div style={{position:'relative', aspectRatio:'16/10', overflow:'hidden', background:'var(--bg-primary)'}}>
                    <img src={g.img} alt={g.nombre} loading="lazy" style={{
                      position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
                      filter:'saturate(0.9) brightness(0.92) contrast(1.05)',
                    }} onError={(e)=>{ e.target.style.display='none'; }} />
                    <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 50%, rgba(14,16,20,0.55) 100%)'}} />
                    <span style={{
                      position:'absolute', top:14, left:14,
                      fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold-primary)', letterSpacing:'0.22em',
                      background:'rgba(14,16,20,0.7)', padding:'4px 9px', backdropFilter:'blur(6px)',
                      border:'1px solid var(--border-gold)',
                    }}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                )}
                <div style={{padding:32, flex:1, display:'flex', flexDirection:'column'}}>
                  <h4 style={{fontFamily:'var(--font-display)', fontSize:26, fontWeight:400, color:'var(--text-on-dark)', marginBottom:14}}>{g.nombre}</h4>
                  <p style={{fontSize:14, lineHeight:1.65, color:'var(--text-on-dark-muted)', marginBottom:18, flex:1}}>{g.desc}</p>
                  <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--gold-primary)', textTransform:'uppercase'}}>
                    ◈ {g.donde}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 03 · BENEFICIOS DE VIVIR */}
      <div style={{...rsStyles.section, background:'var(--bg-secondary)', borderTop:'1px solid var(--border-dark)'}}>
        <div className="motif-pattern" style={{opacity:0.4}} />
        <div className="wrap" style={{position:'relative', zIndex:1}}>
          <SectionTitle num="03" quechua="Kimsa · Allin Kawsay" title={`Vivir en ${r.nombre}`} subtitle="Todos los beneficios de mudarte aquí" />
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0}}>
            {r.beneficios.map((b, i) => (
              <article key={i} style={{
                padding: 36,
                borderTop: '1px solid var(--border-dark)',
                borderLeft: i%4 !== 0 ? '1px solid var(--border-dark)' : 'none',
                borderBottom: i >= r.beneficios.length - 4 ? '1px solid var(--border-dark)' : 'none',
              }}>
                <div style={{color:'var(--gold-primary)', marginBottom:24}}>{benefitIcons[b.icon]}</div>
                <h4 style={{fontFamily:'var(--font-display)', fontSize:19, fontWeight:400, color:'var(--text-on-dark)', marginBottom:12, lineHeight:1.2}}>
                  {b.titulo}
                </h4>
                <p style={{fontSize:13, lineHeight:1.65, color:'var(--text-on-dark-muted)'}}>{b.desc}</p>
              </article>
            ))}
          </div>

          {/* CTA band */}
          <div style={{marginTop:72, padding:48, background:'var(--bg-tertiary)', border:'1px solid var(--border-gold)', display:'grid', gridTemplateColumns:'1fr auto', gap:40, alignItems:'center'}}>
            <div>
              <div className="quechua" style={{marginBottom:12}}>Próximo paso</div>
              <h3 style={{fontFamily:'var(--font-display)', fontSize:36, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em'}}>
                Ver propiedades en <em style={{color:'var(--gold-primary)', fontStyle:'italic'}}>{r.nombre}</em>
              </h3>
              <p style={{fontSize:15, color:'var(--text-on-dark-muted)', marginTop:12, maxWidth:540}}>
                Ahora que conoces la región, explora las {r.nombre === 'Cusco' ? '184' : r.nombre === 'Lima' ? '420' : '96'} propiedades
                disponibles desde ${r.inversion.precio_m2}/m² con retornos de hasta {r.inversion.retorno}%.
              </p>
            </div>
            <button className="btn-gold" style={{whiteSpace:'nowrap'}}>
              Ver catálogo <span className="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, val, gold }) {
  return (
    <div>
      <div className="quechua" style={{marginBottom:6}}>{label}</div>
      <div style={{fontFamily:'var(--font-display)', fontSize:26, color: gold ? 'var(--gold-primary)' : 'var(--text-on-dark)', fontWeight:300}}>{val}</div>
    </div>
  );
}

function MiniStatBox({ label, val, gold, border }) {
  return (
    <div style={{padding:'24px 20px', borderLeft: border ? '1px solid var(--border-gold)' : 'none'}}>
      <div className="quechua" style={{marginBottom:8}}>{label}</div>
      <div style={{fontFamily:'var(--font-display)', fontSize:28, color: gold ? 'var(--gold-primary)' : 'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.01em'}}>{val}</div>
    </div>
  );
}

function CultureCard({ title, items }) {
  return (
    <div style={{padding:28, border:'1px solid var(--border-dark)', background:'var(--bg-tertiary)'}}>
      <div className="quechua" style={{marginBottom:20}}>{title}</div>
      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10}}>
        {items.map((it, i) => (
          <li key={i} style={{fontSize:13, color:'var(--text-on-dark)', lineHeight:1.5, paddingLeft:16, position:'relative'}}>
            <span style={{position:'absolute', left:0, top:8, width:6, height:1, background:'var(--gold-primary)'}} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionTitle({ num, quechua, title, subtitle }) {
  return (
    <div style={{marginBottom:64, display:'grid', gridTemplateColumns:'auto 1fr', gap:48, alignItems:'end'}}>
      <div style={{fontFamily:'var(--font-display)', fontSize:120, fontWeight:300, color:'var(--gold-primary)', lineHeight:0.9, letterSpacing:'-0.04em'}}>
        {num}
      </div>
      <div>
        <div className="quechua" style={{marginBottom:14}}>ꟼ {quechua}</div>
        <h2 style={{fontFamily:'var(--font-display)', fontSize:'clamp(40px, 5vw, 64px)', fontWeight:300, letterSpacing:'-0.02em', color:'var(--text-on-dark)', lineHeight:1}}>
          {title}
        </h2>
        <p style={{fontSize:17, color:'var(--text-on-dark-muted)', marginTop:16}}>{subtitle}</p>
      </div>
    </div>
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
  section: { position:'relative', padding:'var(--section-py) 0', borderTop:'1px solid var(--border-dark)' },
  tourCard: {
    padding: 32,
    border: '1px solid var(--border-dark)',
    background: 'var(--bg-tertiary)',
    transition: 'border-color .25s ease',
  },
};

window.RegionShowcase = RegionShowcase;
