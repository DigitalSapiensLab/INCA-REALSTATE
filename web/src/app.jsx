// Main App
function TypographicHero() {
  return (
    <section id="inicio" style={{minHeight:'100vh', padding:'160px 0 100px', position:'relative', overflow:'hidden', display:'flex', alignItems:'center'}}>
      <div className="motif-pattern" />
      <div className="wrap" style={{position:'relative', zIndex:1, textAlign:'center'}}>
        <div className="quechua" style={{marginBottom:40}}>ꟼ Inca Estates · est. 2026</div>
        <h1 style={{fontFamily:'var(--font-display)', fontWeight:300, fontSize:'clamp(72px, 11vw, 200px)', letterSpacing:'-0.035em', lineHeight:0.95}}>
          Un país,<br/>
          <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>luego</em> una casa.
        </h1>
        <p style={{maxWidth:580, margin:'48px auto 0', fontSize:19, lineHeight:1.7, color:'var(--text-on-dark-muted)'}}>
          Descubre Perú — costa, sierra y selva — y encuentra dónde vivir
          la vida que ya no existe en Europa.
        </p>
        <div style={{display:'flex', gap:14, justifyContent:'center', marginTop:56}}>
          <button className="btn-gold">Descubrir Perú <span className="arrow" /></button>
          <button className="btn-ghost">Ver propiedades</button>
        </div>
      </div>
    </section>
  );
}

function FullBleedHero() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 2000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[idx];
  const accent = slide.color || 'var(--gold-primary)';

  return (
    <section id="inicio"
      style={{minHeight:'100vh', position:'relative', overflow:'hidden'}}>

      {/* Stacked background layers — cross-fade on rotation */}
      {HERO_SLIDES.map((s, i) => (
        <div key={i} style={{
          position:'absolute', inset:0,
          backgroundImage:`url(${s.img})`,
          backgroundSize:'cover', backgroundPosition:'center',
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? 'scale(1)' : 'scale(1.18)',
          transition: 'opacity 1s ease, transform 6s linear',
        }} />
      ))}

      {/* Dark gradient overlay for text legibility */}
      <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0.55) 0%, rgba(14,16,20,0.7) 55%, rgba(14,16,20,0.92) 100%)'}} />

      {/* Top-left slide marker */}
      <div style={{
        position:'absolute', top:110, left:'calc(var(--gutter) + 0px)', zIndex:2,
        padding:'8px 14px',
        border:`1px solid ${accent}`,
        background:'rgba(14,16,20,0.5)', backdropFilter:'blur(8px)',
        fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.26em', textTransform:'uppercase',
        color: accent,
        transition:'color .6s ease, border-color .6s ease',
      }}>
        {slide.quechua}
      </div>

      {/* Top-right slide counter */}
      <div style={{
        position:'absolute', top:100, right:'var(--gutter)', zIndex:2,
        display:'flex', alignItems:'baseline', gap:8,
      }}>
        <span style={{fontFamily:'var(--font-display)', fontSize:56, color: accent, fontWeight:300, lineHeight:1, letterSpacing:'-0.02em', transition:'color .6s ease'}}>
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.2em'}}>
          / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      <div className="wrap" style={{position:'relative', zIndex:1, paddingTop:'30vh', paddingBottom:80, minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div>
          <div className="quechua" style={{marginBottom:32}}>ꟼ Patrimonio · Inversión · Vida</div>
          <h1 className="h-display" style={{fontSize:'clamp(56px, 9vw, 160px)', maxWidth:'75%'}}>
            No vendemos casas.<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Vendemos Perú.</em>
          </h1>
          {/* Dynamic caption of current slide */}
          <div style={{marginTop:28, maxWidth:'60%'}}>
            <div style={{fontFamily:'var(--font-display)', fontSize:28, fontWeight:300, color: accent, letterSpacing:'-0.01em', marginBottom:6, transition:'color .6s ease'}}>
              {slide.headline}
            </div>
            <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.22em', textTransform:'uppercase'}}>
              {slide.caption}
            </div>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:32, flexWrap:'wrap'}}>
          <p style={{maxWidth:420, fontSize:17, lineHeight:1.6, color:'var(--text-on-dark-muted)'}}>
            La primera plataforma que te enamora del país antes de enseñarte una propiedad.
          </p>
          <div style={{display:'flex', gap:14, alignItems:'center'}}>
            {/* Dots indicator */}
            <div style={{display:'flex', gap:8, marginRight:14}}>
              {HERO_SLIDES.map((s, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === idx ? 36 : 12, height: 2,
                    background: i === idx ? (s.color || 'var(--gold-primary)') : 'rgba(255,255,255,0.28)',
                    border: 0, padding: 0, cursor: 'pointer',
                    transition: 'all .4s ease',
                  }} />
              ))}
            </div>
            <button className="btn-gold">Empieza aquí <span className="arrow" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const defaults = (() => {
    try { return JSON.parse(document.getElementById('tweak-defaults').textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g,'').trim()); }
    catch { return { heroVariant: 'rotating', motif: 'normal', density: 'normal' }; }
  })();
  const [tweaks, setTweaks] = React.useState(defaults);
  const [active, setActive] = React.useState('inicio');

  React.useEffect(() => {
    document.body.setAttribute('data-motif', tweaks.motif);
    document.body.setAttribute('data-density', tweaks.density);
  }, [tweaks]);

  function nav(id) {
    setActive(id);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  }

  // Scroll spy
  React.useEffect(() => {
    const ids = ['inicio','peru','regiones','propiedades','inversion','contacto'];
    function onScroll() {
      const y = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) { setActive(ids[i]); break; }
      }
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const HeroComp =
    tweaks.heroVariant === 'typographic' ? TypographicHero :
    tweaks.heroVariant === 'fullbleed' ? FullBleedHero :
    Hero;

  return (
    <>
      <Navbar active={active} onNav={nav} />
      <SocialSidebar />
      <main>
        <HeroComp />
        <RegionShowcase />
        <PorquePeru />
        <PeruMap />
        <Calculator />
        <CostLiving />
        <Properties />
      </main>
      <Footer />
      <IncaAI />
      <Tweaks state={tweaks} setState={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
