// Featured properties — editorial card grid
function Properties() {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? PROPERTIES : PROPERTIES.filter(p => p.region.toLowerCase() === filter);

  return (
    <section id="propiedades" style={propStyles.section}>
      <div className="wrap">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64, flexWrap:'wrap', gap:32}}>
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
          <div style={{display:'flex', gap:8}}>
            {['all','Lima','Cusco','Arequipa'].map(f => (
              <button key={f} onClick={() => setFilter(f === 'all' ? 'all' : f.toLowerCase())}
                style={{
                  padding:'10px 16px', border:'1px solid',
                  borderColor: (filter === (f==='all'?'all':f.toLowerCase())) ? 'var(--gold-primary)' : 'var(--border-dark)',
                  color: (filter === (f==='all'?'all':f.toLowerCase())) ? 'var(--gold-primary)' : 'var(--text-on-dark-muted)',
                  background:'transparent', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', cursor:'pointer',
                }}>
                {f === 'all' ? 'Todas' : f}
              </button>
            ))}
          </div>
        </div>

        <div style={propStyles.grid}>
          {filtered.map((p, i) => (
            <article key={p.id} style={{...propStyles.card, gridColumn: i===0 ? 'span 2' : 'span 1'}}>
              <div style={{...propStyles.media, aspectRatio: i===0 ? '16/9' : '4/5'}}>
                <img src={p.img} alt={p.titulo} style={propStyles.img}
                     onError={(e) => { e.target.style.display='none'; }} />
                <div style={propStyles.imgOverlay} />
                <div style={propStyles.badge}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em'}}>{p.region.toUpperCase()}</span>
                </div>
                <button style={propStyles.heart}>{Icons.heart}</button>
                <div style={propStyles.priceTag}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold-primary)', letterSpacing:'0.2em'}}>DESDE</span>
                  <div style={{fontFamily:'var(--font-display)', fontSize:32, color:'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.02em'}}>
                    ${(p.precio/1000).toFixed(0)}K
                  </div>
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

        <div style={{textAlign:'center', marginTop:64}}>
          <button className="btn-ghost">Ver catálogo completo · 1.480 propiedades →</button>
        </div>
      </div>
    </section>
  );
}

const propStyles = {
  section: { padding:'var(--section-py) 0', background:'var(--bg-primary)', borderTop:'1px solid var(--border-dark)' },
  grid: { display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32 },
  card: { background:'transparent' },
  media: { position:'relative', overflow:'hidden', background:'var(--bg-tertiary)', border:'1px solid var(--border-dark)' },
  img: { width:'100%', height:'100%', objectFit:'cover', display:'block' },
  imgOverlay: { position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(14,16,20,0) 50%, rgba(14,16,20,0.85) 100%)' },
  badge: { position:'absolute', top:16, left:16, padding:'6px 10px', background:'rgba(14,16,20,0.6)', backdropFilter:'blur(6px)', border:'1px solid var(--border-gold)', color:'var(--gold-primary)' },
  heart: { position:'absolute', top:16, right:16, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-on-dark)', background:'rgba(14,16,20,0.5)', backdropFilter:'blur(6px)', border:'1px solid var(--border-dark)', cursor:'pointer' },
  priceTag: { position:'absolute', bottom:20, left:20 },
};

window.Properties = Properties;
