// CityLanding — landing page per individual city.
// Triggered when window.location.hash === '#ciudad/<id>'. Reads rich content
// from CITY_LANDINGS, falls back to CITY_DETAILS + REGIONS for missing fields.
function CityLanding({ cityId, initialSection, onBack }) {
  const data = (window.CITY_LANDINGS || {})[cityId];
  const fallback = (window.CITY_DETAILS || {})[cityId];
  const region = ((window.REGIONS) || []).find(r => r.id === cityId);
  const macro = data?.macro || region?.tipo || 'costa';
  const macroData = (window.MACRO_REGION_DATA || {})[macro];

  const accentColor =
    macro === 'sierra' ? '#C9A961' :
    macro === 'selva'  ? '#7FB069' : '#6FA8C9';

  // Scroll on mount / city change. If an initialSection is provided (e.g. "cultura"),
  // anchor there; otherwise jump to top.
  React.useEffect(() => {
    if (initialSection) {
      // Defer one tick so the section's DOM node is mounted before measuring.
      setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'instant' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [cityId, initialSection]);

  if (!data && !fallback) {
    return (
      <section style={{minHeight:'80vh', padding:'200px 24px', textAlign:'center'}}>
        <p className="quechua" style={{color:accentColor, marginBottom:16}}>ꟼ Ciudad no encontrada</p>
        <h1 className="h-display" style={{fontSize:48, marginBottom:24}}>Esta ciudad aún no tiene página dedicada.</h1>
        <button className="btn-gold" onClick={onBack}>← Volver a la home</button>
      </section>
    );
  }

  const nombre = data?.nombre || region?.capital || cityId;
  const regionName = data?.region || region?.nombre || '';
  const heroTitle = data?.hero_title || `${nombre} · ${regionName}`;
  const heroLede = data?.hero_lede || fallback?.tagline || '';
  const images = (data?.images && data.images.length > 0) ? data.images : (fallback?.imagen ? [fallback.imagen, fallback.imagen, fallback.imagen, fallback.imagen] : []);
  const stats = data?.stats || [
    region?.retorno && { label: 'Retorno anual', value: `${region.retorno}%` },
    fallback?.altitud && { label: 'Altitud', value: fallback.altitud },
    fallback?.clima   && { label: 'Clima', value: fallback.clima },
  ].filter(Boolean);

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
          padding:'10px 16px', border:`1px solid ${accentColor}66`,
          color: accentColor, background:'transparent', cursor:'pointer',
          fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase',
          transition:'all .25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = `${accentColor}14`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${accentColor}66`; e.currentTarget.style.background = 'transparent'; }}>
          <span style={{fontSize:14, lineHeight:0}}>←</span>
          <span>Volver</span>
        </button>
        <div className="quechua" style={{color: accentColor}}>
          ꟼ {regionName} · {macro.charAt(0).toUpperCase() + macro.slice(1)}
        </div>
      </div>

      {/* ───────────── HERO with image slider ───────────── */}
      <CityHero
        title={heroTitle}
        lede={heroLede}
        images={images}
        accentColor={accentColor}
        nombre={nombre}
        macro={macro}
        stats={stats}
      />

      {/* ───────────── SECTIONS ───────────── */}
      <div style={{padding:'140px 0 80px', borderTop:'1px solid var(--border-dark)', position:'relative'}}>
        <div className="motif-pattern" style={{opacity:0.3}} />
        <div className="wrap" style={{position:'relative', zIndex:1}}>

          <CitySection
            id="cultura"
            num="01"
            quechua="ꟼ Kawsay · Cultura"
            title="Cultura"
            body={data?.cultura}
            color={accentColor} />

          <CitySection
            id="gastronomia"
            num="02"
            quechua="ꟼ Mikhuna · Gastronomía"
            title="Gastronomía"
            body={data?.gastronomia}
            color={accentColor} />

          <CitySection
            id="economia"
            num="03"
            quechua="ꟼ Qullqi · Economía"
            title="Economía"
            body={data?.economia}
            color={accentColor} />

          <CitySection
            id="gente"
            num="04"
            quechua="ꟼ Runa · Gente"
            title="Gente"
            body={data?.gente}
            color={accentColor} />

          <CitySection
            id="turismo"
            num="05"
            quechua="ꟼ Puriy · Turismo"
            title="Turismo"
            body={data?.turismo}
            color={accentColor} />

          <CitySection
            id="inversion"
            num="06"
            quechua="ꟼ Wasi Qullqi · Inversión"
            title="Inversión"
            body={data?.inversion}
            color={accentColor} />

          {/* 07 · Propiedades disponibles */}
          <CityProperties
            num="07"
            cityId={cityId}
            cityName={nombre}
            region={region}
            color={accentColor}
            macro={macro}
          />

        </div>
      </div>

      {/* ───────────── CTA FINAL ───────────── */}
      <div style={{
        padding:'100px var(--gutter)',
        background:'var(--bg-secondary)',
        borderTop:'1px solid var(--border-dark)',
      }}>
        <div className="wrap" style={{textAlign:'center'}}>
          <div className="quechua" style={{color: accentColor, marginBottom:20}}>
            ꟼ ¿Te interesa {nombre}?
          </div>
          <h2 className="h-display" style={{fontSize:'clamp(36px, 4.5vw, 64px)', maxWidth:820, margin:'0 auto 36px'}}>
            Hablemos de tu próxima vida en{' '}
            <em style={{fontStyle:'italic', color: accentColor}}>{nombre}</em>.
          </h2>
          <p style={{maxWidth:580, margin:'0 auto 48px', fontSize:17, lineHeight:1.7, color:'var(--text-on-dark-muted)'}}>
            Te conectamos con un asesor especializado en {regionName} para revisar
            propiedades, trámites y oportunidades reales de inversión.
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap'}}>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); onBack(); setTimeout(() => { const el = document.getElementById('contacto'); if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 80, behavior:'smooth'}); }, 50); }}
               className="btn-gold"
               style={{background: accentColor}}>
              Contactar a un asesor <span className="arrow" />
            </a>
            <button className="btn-ghost" onClick={() => {
              // Pre-select this city's macro region in the Propiedades destacadas section
              // so the user lands looking at chips of the same region (Costa/Sierra/Selva).
              window.dispatchEvent(new CustomEvent('select-macro', { detail: { macro } }));
              onBack();
              setTimeout(() => {
                const el = document.getElementById('propiedades');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
              }, 60);
            }}>
              Ver otras ciudades
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// ───────────── HERO ─────────────
function CityHero({ title, lede, images, accentColor, nombre, macro, stats }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Auto-rotate every 2s
  React.useEffect(() => {
    if (paused || images.length <= 1) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, 2000);
    return () => clearInterval(t);
  }, [paused, images.length]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{position:'relative', minHeight:'100vh', overflow:'hidden'}}>

      {/* Stacked background images */}
      {images.map((src, i) => (
        <div key={i} style={{
          position:'absolute', inset:0,
          backgroundImage:`url(${src})`,
          backgroundSize:'cover', backgroundPosition:'center',
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? 'scale(1)' : 'scale(1.08)',
          transition: 'opacity 1.2s ease, transform 6s linear',
        }} />
      ))}

      {/* Dark gradient overlay */}
      <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0.45) 0%, rgba(14,16,20,0.65) 55%, rgba(14,16,20,0.95) 100%)'}} />

      {/* Top-left accent badge */}
      <div style={{
        position:'absolute', top:90, left:'var(--gutter)',
        padding:'8px 14px',
        border:`1px solid ${accentColor}`,
        background:'rgba(14,16,20,0.55)', backdropFilter:'blur(6px)',
        fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.26em', textTransform:'uppercase',
        color: accentColor, zIndex: 2,
      }}>
        ◉ {nombre}
      </div>

      {/* Top-right slide counter */}
      <div style={{
        position:'absolute', top:80, right:'var(--gutter)',
        display:'flex', alignItems:'baseline', gap:8, zIndex: 2,
      }}>
        <span style={{fontFamily:'var(--font-display)', fontSize:48, color: accentColor, fontWeight:300, lineHeight:1, letterSpacing:'-0.02em'}}>
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.2em'}}>
          / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Hero content */}
      <div className="wrap" style={{position:'relative', zIndex:1, paddingTop:'30vh', paddingBottom:60, minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div style={{maxWidth:'78%'}}>
          <div className="quechua" style={{color: accentColor, marginBottom:24}}>
            ꟼ {macro.charAt(0).toUpperCase() + macro.slice(1)} · Conocer ciudad
          </div>
          <h1 className="h-display" style={{
            fontSize:'clamp(44px, 6.5vw, 108px)',
            letterSpacing:'-0.025em', marginBottom:32, lineHeight:1.0,
          }}>
            {title}
          </h1>
          <p style={{maxWidth:680, fontSize:18, lineHeight:1.7, color:'var(--text-on-dark-muted)', fontWeight:300}}>
            {lede}
          </p>
        </div>

        <div style={{marginTop:60, display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:32, flexWrap:'wrap'}}>
          {/* Stats row */}
          {stats && stats.length > 0 && (
            <div style={{display:'flex', gap:28, flexWrap:'wrap', alignItems:'center'}}>
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{width:1, height:36, background:'var(--border-dark)'}} />}
                  <div>
                    <div style={{fontFamily:'var(--font-display)', fontSize:30, color: accentColor, fontWeight:300, letterSpacing:'-0.01em', lineHeight:1}}>
                      {s.value}
                    </div>
                    <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', color:'var(--text-on-dark-muted)', marginTop:6, textTransform:'uppercase'}}>
                      {s.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Slider dots */}
          <div style={{display:'flex', gap:8}}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Imagen ${i+1}`}
                style={{
                  width: i === idx ? 32 : 12, height: 2,
                  background: i === idx ? accentColor : 'rgba(255,255,255,0.28)',
                  border: 0, padding: 0, cursor: 'pointer',
                  transition: 'all .3s ease',
                }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────── SECTION ─────────────
function CitySection({ id, num, quechua, title, body, color, last }) {
  if (!body) return null;
  return (
    <article id={id} style={{
      display:'grid',
      gridTemplateColumns:'auto 1fr',
      gap:48,
      paddingTop: 56,
      paddingBottom: last ? 0 : 56,
      borderBottom: last ? 'none' : '1px solid var(--border-dark)',
      alignItems:'start',
      scrollMarginTop:80,
    }}>
      <div style={{
        fontFamily:'var(--font-display)',
        fontSize:96,
        fontWeight:300,
        color,
        lineHeight:0.9,
        letterSpacing:'-0.04em',
        minWidth:120,
      }}>
        {num}
      </div>
      <div>
        <div className="quechua" style={{color, marginBottom:14}}>{quechua}</div>
        <h2 style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(32px, 3.6vw, 48px)',
          fontWeight:300, letterSpacing:'-0.02em',
          color:'var(--text-on-dark)', marginBottom:20, lineHeight:1.05,
        }}>
          {title}
        </h2>
        <p style={{fontSize:17, lineHeight:1.8, color:'var(--text-on-dark-muted)', fontWeight:300, maxWidth:820}}>
          {body}
        </p>
      </div>
    </article>
  );
}

// ───────────── PROPIEDADES DISPONIBLES (07) ─────────────
function CityProperties({ num, cityId, cityName, region, color, macro }) {
  // Generate 6 placeholder listings with realistic prices derived from region.precio (USD/m²)
  // and macro-specific features. The IDs and types are deterministic per cityId.
  const baseM2 = region?.precio || 1200;
  const listings = React.useMemo(() => {
    const seed = cityId.charCodeAt(0) + cityId.length;
    const r = (n) => Math.round(n);
    const isCoast = macro === 'costa';
    const isSierra = macro === 'sierra';
    const isJungle = macro === 'selva';
    return [
      {
        id: `${cityId}-dep-1`,
        tipo: 'Departamento', oferta: 'Venta',
        titulo: isCoast ? 'Departamento con vista al mar' : isSierra ? 'Departamento en centro histórico' : 'Departamento sobre el río',
        m2: 92 + (seed % 40),
        hab: 2, ban: 2,
        precio: r(baseM2 * (92 + (seed % 40)) * 0.95 / 1000) * 1000,
        img: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80`,
        tags: ['Listo para entrega', 'Acabados premium'],
      },
      {
        id: `${cityId}-casa-1`,
        tipo: 'Casa', oferta: 'Venta',
        titulo: isCoast ? 'Casa de playa con piscina' : isSierra ? 'Casa colonial restaurada' : 'Lodge amazónico',
        m2: 220 + (seed % 80),
        hab: 4, ban: 3,
        precio: r(baseM2 * (220 + (seed % 80)) * 0.78 / 1000) * 1000,
        img: `https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80`,
        tags: ['Patio amplio', 'Garaje doble'],
      },
      {
        id: `${cityId}-terreno-1`,
        tipo: 'Terreno', oferta: 'Venta',
        titulo: isCoast ? 'Terreno frente al Pacífico' : isSierra ? 'Terreno con vista a los Andes' : 'Terreno con frente fluvial',
        m2: 800 + (seed % 600),
        hab: null, ban: null,
        precio: r(baseM2 * 0.35 * (800 + (seed % 600)) / 1000) * 1000,
        img: `https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80`,
        tags: ['Documentación al día', 'Apto construcción'],
      },
      {
        id: `${cityId}-dep-2`,
        tipo: 'Departamento', oferta: 'Alquiler',
        titulo: isCoast ? 'Loft amoblado en zona premium' : isSierra ? 'Loft en barrio histórico' : 'Suite con vista al bosque',
        m2: 70 + (seed % 30),
        hab: 1, ban: 1,
        precio: r(baseM2 * (70 + (seed % 30)) * 0.0042),
        precioMes: true,
        img: `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80`,
        tags: ['Amoblado', 'Mensual'],
      },
      {
        id: `${cityId}-casa-2`,
        tipo: 'Casa', oferta: 'Alquiler',
        titulo: isCoast ? 'Villa vacacional frente al mar' : isSierra ? 'Casona colonial vacacional' : 'Eco-lodge para visitantes',
        m2: 180 + (seed % 60),
        hab: 3, ban: 3,
        precio: r(baseM2 * (180 + (seed % 60)) * 0.0038),
        precioMes: true,
        img: `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80`,
        tags: ['Vacacional', 'Por temporada'],
      },
      {
        id: `${cityId}-atico-1`,
        tipo: 'Ático', oferta: 'Venta',
        titulo: isCoast ? 'Ático dúplex con terraza' : isSierra ? 'Ático con vista panorámica' : 'Penthouse con balcón al río',
        m2: 160 + (seed % 50),
        hab: 3, ban: 3,
        precio: r(baseM2 * (160 + (seed % 50)) * 1.25 / 1000) * 1000,
        img: `https://images.unsplash.com/photo-1615529182904-14819c35db37?w=900&q=80`,
        tags: ['Terraza privada', 'Vista 360°'],
      },
    ];
  }, [cityId, baseM2, macro]);

  const fmtPrice = (p, mes) => {
    if (mes) return `$${p.toLocaleString('es-ES')}/mes`;
    return `$${p.toLocaleString('es-ES')}`;
  };

  return (
    <article style={{
      paddingTop: 56,
      paddingBottom: 0,
    }}>
      <div style={{
        display:'grid',
        gridTemplateColumns:'auto 1fr',
        gap:48,
        alignItems:'start',
        marginBottom: 48,
      }}>
        <div style={{
          fontFamily:'var(--font-display)',
          fontSize:96, fontWeight:300,
          color, lineHeight:0.9, letterSpacing:'-0.04em', minWidth:120,
        }}>
          {num}
        </div>
        <div>
          <div className="quechua" style={{color, marginBottom:14}}>ꟼ Wasi Rantiy · Propiedades</div>
          <h2 style={{
            fontFamily:'var(--font-display)',
            fontSize:'clamp(32px, 3.6vw, 48px)',
            fontWeight:300, letterSpacing:'-0.02em',
            color:'var(--text-on-dark)', marginBottom:20, lineHeight:1.05,
          }}>
            Propiedades en {cityName}
          </h2>
          <p style={{fontSize:17, lineHeight:1.8, color:'var(--text-on-dark-muted)', fontWeight:300, maxWidth:820}}>
            Una selección de departamentos, casas, áticos y terrenos disponibles para
            <em style={{color, fontStyle:'italic'}}> compra </em>o
            <em style={{color, fontStyle:'italic'}}> alquiler</em> en {cityName}.
            Los precios están calculados sobre el promedio de mercado 2026
            (${region?.precio || 1200}/m² en {cityName}).
          </p>
        </div>
      </div>

      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(3, 1fr)',
        gap:0,
        border:'1px solid var(--border-dark)',
        marginBottom: 56,
      }}>
        {listings.map((l, i) => (
          <article key={l.id} style={{
            position:'relative',
            display:'flex', flexDirection:'column',
            background:'var(--bg-tertiary)',
            borderRight: (i+1)%3 !== 0 ? '1px solid var(--border-dark)' : 'none',
            borderBottom: i < listings.length - 3 ? '1px solid var(--border-dark)' : 'none',
            transition: 'transform .25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'var(--bg-primary)'}}>
              <img src={l.img} alt={l.titulo} loading="lazy"
                style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'saturate(0.88) brightness(0.9)'}}
                onError={e => { e.target.style.display = 'none'; }} />
              <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 50%, rgba(14,16,20,0.85) 100%)'}} />
              <div style={{
                position:'absolute', top:14, left:14, display:'flex', gap:6,
              }}>
                <span style={{
                  fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.22em', color, textTransform:'uppercase',
                  padding:'5px 9px', background:'rgba(14,16,20,0.7)', backdropFilter:'blur(6px)', border:`1px solid ${color}66`,
                }}>{l.tipo}</span>
                <span style={{
                  fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.22em', color:'var(--text-on-dark)', textTransform:'uppercase',
                  padding:'5px 9px', background: l.oferta === 'Venta' ? 'rgba(14,16,20,0.7)' : 'rgba(255,255,255,0.12)',
                  backdropFilter:'blur(6px)', border:'1px solid var(--border-dark)',
                }}>{l.oferta}</span>
              </div>
              <div style={{position:'absolute', bottom:14, left:14}}>
                <span style={{fontFamily:'var(--font-mono)', fontSize:10, color, letterSpacing:'0.22em'}}>DESDE</span>
                <div style={{fontFamily:'var(--font-display)', fontSize:30, color:'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.02em', lineHeight:1.1}}>
                  {fmtPrice(l.precio, l.precioMes)}
                </div>
              </div>
            </div>
            <div style={{padding:24, flex:1, display:'flex', flexDirection:'column'}}>
              <h3 style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:400, color:'var(--text-on-dark)', letterSpacing:'-0.01em', marginBottom:12}}>
                {l.titulo}
              </h3>
              <div style={{display:'flex', gap:18, paddingBottom:16, marginBottom:16, borderBottom:'1px solid var(--border-dark)', color:'var(--text-on-dark-muted)', fontSize:13}}>
                {l.hab !== null && <span>{l.hab} hab</span>}
                {l.ban !== null && <span>{l.ban} baños</span>}
                <span>{l.m2} m²</span>
              </div>
              <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:18}}>
                {l.tags.map(t => (
                  <span key={t} style={{padding:'4px 10px', border:'1px solid var(--border-dark)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.08em'}}>{t}</span>
                ))}
              </div>
              <button style={{
                marginTop:'auto',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'12px 16px',
                border:`1px solid ${color}55`,
                background:'transparent',
                color: color,
                fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase',
                cursor:'pointer', transition:'all .2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}14`; e.currentTarget.style.borderColor = color; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${color}55`; }}>
                <span>Solicitar información</span>
                <span>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        padding:'32px 36px',
        background:'var(--bg-secondary)',
        border:`1px solid ${color}33`,
        display:'flex', justifyContent:'space-between', alignItems:'center',
        flexWrap:'wrap', gap:24,
      }}>
        <div>
          <div className="quechua" style={{color, marginBottom:8}}>Catálogo completo</div>
          <p style={{fontSize:15, color:'var(--text-on-dark-muted)', maxWidth:540}}>
            ¿Buscas algo específico en {cityName}? Tenemos más de 1.480 propiedades y un asesor que las conoce todas.
          </p>
        </div>
        <button style={{
          padding:'14px 24px', background: color, color:'#0E1014',
          border:0, cursor:'pointer',
          fontFamily:'var(--font-sans)', fontSize:11, fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase',
        }}>
          Solicitar catálogo →
        </button>
      </div>
    </article>
  );
}

window.CityLanding = CityLanding;
