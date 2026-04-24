// Gastronomía editorial strip (mid-page aesthetic break)
function Gastronomia() {
  const [active, setActive] = React.useState(0);
  const g = GASTRO[active];
  return (
    <section style={gStyles.section}>
      <div className="motif-pattern" style={{opacity:0.5}} />
      <div className="wrap" style={{position:'relative', zIndex:1}}>
        <div style={gStyles.grid}>
          <div>
            <div className="label-row" style={{display:'flex', alignItems:'center', gap:20, marginBottom:20}}>
              <span className="quechua">Intermedio · Mikhuna</span>
              <div style={{width:60, height:1, background:'var(--border-gold)'}} />
            </div>
            <h2 className="h-display" style={{fontSize:'clamp(44px, 5vw, 72px)', marginBottom:24}}>
              Primero el<br/>
              <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>sabor.</em>
            </h2>
            <p style={{fontSize:17, lineHeight:1.7, color:'var(--text-on-dark-muted)', maxWidth:480}}>
              Ningún país del mundo define su identidad por su cocina como lo hace Perú.
              Central y Maido lideran la lista mundial; los mercados, los anticucheros de
              esquina y las picanterías arequipeñas sostienen la misma grandeza.
            </p>
            <div style={{display:'flex', flexDirection:'column', gap:0, marginTop:48, borderTop:'1px solid var(--border-dark)'}}>
              {GASTRO.map((item, i) => (
                <button key={item.nombre} onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'22px 0', borderBottom:'1px solid var(--border-dark)',
                    background:'transparent', border:0, borderBottom:'1px solid var(--border-dark)',
                    textAlign:'left', cursor:'pointer',
                    color: active===i ? 'var(--gold-primary)' : 'var(--text-on-dark)',
                    transition:'color .2s ease',
                  }}>
                  <span style={{display:'flex', alignItems:'baseline', gap:20}}>
                    <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-subtle)', letterSpacing:'0.18em'}}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <span style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:400}}>{item.nombre}</span>
                  </span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.2em', textTransform:'uppercase'}}>
                    {item.region}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={gStyles.plate}>
            <div className="ph-tile" style={{position:'absolute', inset:0}}>
              <div style={{textAlign:'center'}}>
                <div className="quechua" style={{marginBottom:16}}>Placeholder</div>
                <div style={{fontFamily:'var(--font-display)', fontSize:56, fontWeight:300, color:'var(--gold-primary)', letterSpacing:'-0.02em'}}>
                  {g.nombre}
                </div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-subtle)', letterSpacing:'0.22em', textTransform:'uppercase', marginTop:14}}>
                  Fotografía editorial · {g.region}
                </div>
                <p style={{maxWidth:320, margin:'32px auto 0', fontSize:14, color:'var(--text-on-dark-muted)', lineHeight:1.7, fontFamily:'var(--font-sans)', letterSpacing:0, textTransform:'none'}}>
                  {g.desc}
                </p>
              </div>
            </div>
            <div style={gStyles.plateCorner}>ꟼ {String(active+1).padStart(2,'0')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const gStyles = {
  section: { position:'relative', padding:'var(--section-py) 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-dark)' },
  grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' },
  plate: { position:'relative', aspectRatio:'3/4', background:'var(--bg-tertiary)', border:'1px solid var(--border-dark)' },
  plateCorner: { position:'absolute', top:20, right:20, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--gold-primary)', letterSpacing:'0.25em', padding:'6px 10px', border:'1px solid var(--border-gold)' },
};

window.Gastronomia = Gastronomia;
