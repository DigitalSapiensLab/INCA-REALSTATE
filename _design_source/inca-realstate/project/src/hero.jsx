// Cinematic split hero with rotating imagery
function Hero({ variant = 'rotating' }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const slide = HERO_SLIDES[idx];

  return (
    <section id="inicio" style={styles.hero}>
      {/* decorative line pattern */}
      <div className="motif-pattern" style={{zIndex: 0}} />

      <div style={styles.heroInner}>
        {/* LEFT — editorial text */}
        <div style={styles.heroLeft}>
          <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:40}}>
            <div className="stepped-divider" />
            <span className="eyebrow">Perú · Desde 2026</span>
          </div>

          <h1 className="h-display" style={styles.heroTitle}>
            No vendemos<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)', fontWeight:300}}>casas.</em><br/>
            Vendemos<br/>
            una vida que<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)', fontWeight:300}}>ya no encuentras</em><br/>
            en Europa.
          </h1>

          <p style={styles.heroLede}>
            Descubre Perú a través de su cultura, gastronomía y paisajes antes
            de ver una sola propiedad. Después, te ayudamos a encontrar
            tu lugar entre costa, sierra o selva.
          </p>

          <div style={{display:'flex', gap:14, flexWrap:'wrap', marginTop:48}}>
            <button className="btn-gold">
              Descubrir Perú <span className="arrow" />
            </button>
            <button className="btn-ghost">
              Ver propiedades
            </button>
          </div>

          <div style={styles.heroStats}>
            <Stat n="25" label="Regiones" />
            <Divider />
            <Stat n="1.480+" label="Propiedades" />
            <Divider />
            <Stat n="9.4%" label="Retorno Cusco" />
          </div>
        </div>

        {/* RIGHT — rotating imagery */}
        <div style={styles.heroRight}
             onMouseEnter={() => setPaused(true)}
             onMouseLeave={() => setPaused(false)}>
          <div style={styles.heroMedia}>
            {HERO_SLIDES.map((s, i) => (
              <div key={i} style={{
                ...styles.heroImage,
                backgroundImage: `url(${s.img})`,
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? 'scale(1)' : 'scale(1.06)',
              }} />
            ))}
            <div style={styles.heroOverlay} />

            {/* caption corners */}
            <div style={styles.heroQuechua}>{slide.quechua}</div>
            <div style={styles.heroCaption}>
              <div className="quechua">{slide.context}</div>
              <div style={{fontFamily:'var(--font-display)', fontSize:32, fontWeight:300, marginTop:6}}>
                {slide.headline}
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--text-on-dark-muted)', marginTop:8, textTransform:'uppercase'}}>
                {slide.caption}
              </div>
            </div>

            {/* slide counter */}
            <div style={styles.heroCounter}>
              <span style={{color:'var(--gold-primary)', fontFamily:'var(--font-display)', fontSize:48, fontWeight:300}}>
                {String(idx+1).padStart(2,'0')}
              </span>
              <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-subtle)', letterSpacing:'0.2em'}}>
                / {String(HERO_SLIDES.length).padStart(2,'0')}
              </span>
            </div>

            {/* dots */}
            <div style={styles.heroDots}>
              {HERO_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 28 : 12, height: 2,
                    background: i === idx ? 'var(--gold-primary)' : 'rgba(255,255,255,0.3)',
                    transition: 'all .3s ease', border: 0, padding: 0, cursor: 'pointer',
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom scroll indicator */}
      <div style={styles.scrollHint}>
        <span className="quechua">Scroll</span>
        <div style={{width:1, height:40, background:'var(--gold-primary)', opacity:0.6}} />
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div style={{fontFamily:'var(--font-display)', fontSize:32, color:'var(--gold-primary)', fontWeight:300, lineHeight:1}}>{n}</div>
      <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', color:'var(--text-on-dark-muted)', marginTop:6, textTransform:'uppercase'}}>{label}</div>
    </div>
  );
}
function Divider() { return <div style={{width:1, height:40, background:'var(--border-dark)'}} />; }

const styles = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    padding: '140px 0 80px',
    overflow: 'hidden',
    background: 'radial-gradient(ellipse at 15% 40%, rgba(201,169,97,0.07), transparent 60%), var(--bg-primary)',
  },
  heroInner: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 72px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center',
  },
  heroLeft: { paddingRight: 20 },
  heroTitle: {
    fontSize: 'clamp(48px, 5.6vw, 92px)',
    letterSpacing: '-0.025em',
    color: 'var(--text-on-dark)',
    marginBottom: 36,
  },
  heroLede: {
    fontSize: 18,
    lineHeight: 1.7,
    color: 'var(--text-on-dark-muted)',
    maxWidth: 480,
    fontWeight: 300,
  },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    marginTop: 72,
    paddingTop: 36,
    borderTop: '1px solid var(--border-dark)',
  },
  heroRight: {
    position: 'relative',
    height: '70vh',
    minHeight: 560,
  },
  heroMedia: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    border: '1px solid var(--border-dark)',
  },
  heroImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1.2s ease, transform 6s ease',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(14,16,20,0.15) 40%, rgba(14,16,20,0.88) 100%)',
  },
  heroQuechua: {
    position: 'absolute', top: 24, left: 24,
    fontFamily: 'var(--font-mono)', fontSize: 11,
    color: 'var(--gold-primary)', letterSpacing: '0.25em',
    padding: '6px 10px', border: '1px solid var(--border-gold)',
  },
  heroCaption: {
    position: 'absolute', bottom: 32, left: 32, right: 32,
    color: 'var(--text-on-dark)',
  },
  heroCounter: {
    position: 'absolute', top: 24, right: 24,
    display: 'flex', alignItems: 'baseline', gap: 6,
  },
  heroDots: {
    position: 'absolute', bottom: 32, right: 32,
    display: 'flex', gap: 8, alignItems: 'center',
  },
  scrollHint: {
    position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    zIndex: 3,
  },
};

window.Hero = Hero;
