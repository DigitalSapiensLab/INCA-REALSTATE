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
  return (
    <section id="inicio" style={{minHeight:'100vh', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', inset:0, backgroundImage:`url(${HERO_SLIDES[0].img})`, backgroundSize:'cover', backgroundPosition:'center'}} />
      <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0.6), rgba(14,16,20,0.9))'}} />
      <div className="wrap" style={{position:'relative', zIndex:1, paddingTop:'30vh', paddingBottom:80, minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div>
          <div className="quechua" style={{marginBottom:32}}>ꟼ Patrimonio · Inversión · Vida</div>
          <h1 className="h-display" style={{fontSize:'clamp(56px, 9vw, 160px)', maxWidth:'75%'}}>
            No vendemos casas.<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Vendemos Perú.</em>
          </h1>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:32, flexWrap:'wrap'}}>
          <p style={{maxWidth:420, fontSize:17, lineHeight:1.6, color:'var(--text-on-dark-muted)'}}>
            La primera plataforma que te enamora del país antes de enseñarte una propiedad.
          </p>
          <div style={{display:'flex', gap:14}}>
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
