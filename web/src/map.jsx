// Interactive Peru map — 25 regions as gold dots over a real Peru silhouette image.
// Image fills the wrapper (aspect 100:140). Coordinates are the pixel-% positions of
// each city read off the reference image, expressed in the SVG viewBox (0-100 × 0-140).
const mapX = (x) => x;
const mapY = (y) => y;

function PeruMap() {
  const [selected, setSelected] = React.useState('cusco');
  const [hovered, setHovered] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const region = REGIONS.find(r => r.id === selected);

  const filtered = filter === 'all' ? REGIONS : REGIONS.filter(r => r.tipo === filter);

  return (
    <section id="regiones" style={mapStyles.section}>
      <div className="motif-pattern" style={{opacity:0.5}} />
      <div className="wrap" style={{position:'relative', zIndex:1}}>

        <div className="section-head">
          <div className="label-row">
            <span className="quechua">ꟼ Sección 02 · Llaqtakunapi</span>
            <div style={{flex:1, height:1, background:'var(--border-gold)'}} />
          </div>
          <h2 className="h-display">Veinticinco regiones.<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Una sola</em> tiene tu nombre.</h2>
          <p className="lede">
            Selecciona cualquier región para conocer su carácter, su gastronomía,
            su gente y su potencial inmobiliario. Costa, sierra o selva — el país te espera entero.
          </p>
        </div>

        <div style={mapStyles.layout}>

          {/* Left: filters + region detail */}
          <div style={mapStyles.sidebar}>
            <div style={{display:'flex', gap:8, marginBottom:32}}>
              {['all','costa','sierra','selva'].map(t => (
                <button key={t} onClick={() => setFilter(t)}
                  style={{...mapStyles.filter, ...(filter===t ? mapStyles.filterActive : {})}}>
                  {t === 'all' ? 'Todas' : t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            {region && (
              <div style={mapStyles.detail}>
                <div className="quechua" style={{marginBottom:10}}>Región · {region.tipo}</div>
                <h3 style={mapStyles.regionName}>{region.nombre}</h3>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:28}}>
                  Capital · {region.capital}
                </div>

                <div style={mapStyles.dims}>
                  <Dim label="Precio m²" value={`$${region.precio}`} unit="USD" />
                  <Dim label="Retorno anual" value={`${region.retorno}%`} unit="alquiler" gold />
                </div>

                <div style={{marginTop:32, paddingTop:28, borderTop:'1px solid var(--border-dark)'}}>
                  <div className="quechua" style={{marginBottom:14}}>Dimensiones</div>
                  {[
                    ['Cultura', 88],
                    ['Gastronomía', 94],
                    ['Biodiversidad', 76],
                    ['Calidad de vida', 82],
                    ['Retorno inmobiliario', Math.round(region.retorno * 10)],
                    ['Accesibilidad', 79],
                  ].map(([label, val]) => (
                    <div key={label} style={mapStyles.barRow}>
                      <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                        <span style={{fontSize:13, color:'var(--text-on-dark)'}}>{label}</span>
                        <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--gold-primary)'}}>{val}</span>
                      </div>
                      <div style={{height:2, background:'var(--border-dark)', position:'relative'}}>
                        <div style={{position:'absolute', inset:0, right:'auto', width:`${val}%`, background:'var(--gold-primary)'}} />
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn-ghost" style={{marginTop:32, width:'100%', justifyContent:'space-between'}}>
                  Explorar {region.nombre} <span>→</span>
                </button>
              </div>
            )}
          </div>

          {/* Right: map */}
          <div style={mapStyles.mapBox}>
            <div className="quechua" style={{position:'absolute', top:20, left:20, zIndex:2}}>
              Perú · {filtered.length} regiones
            </div>
            <div style={{position:'absolute', top:20, right:20, zIndex:2, display:'flex', gap:14, fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.18em', textTransform:'uppercase'}}>
              <Legend color="#6FA8C9" label="Costa" />
              <Legend color="#C9A961" label="Sierra" />
              <Legend color="#7FB069" label="Selva" />
            </div>

            {/* Fixed-aspect stage: matches the map's projection aspect (100/140) so SVG fills without distortion */}
            <div style={{
              position:'absolute',
              top:'50%', left:'50%',
              transform:'translate(-50%, -50%)',
              width:'calc(100% - 40px)',
              aspectRatio:'100 / 140',
            }}>
              <svg viewBox="0 0 100 140" style={{position:'absolute', inset:0, width:'100%', height:'100%', zIndex:2, filter:'drop-shadow(0 0 12px rgba(201,169,97,0.12))'}} preserveAspectRatio="xMidYMid meet">
              {/* Soft geographic grid */}
              {[20,40,60,80,100,120].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(201,169,97,0.04)" strokeWidth="0.12" strokeDasharray="0.3 1.2" />
              ))}
              {[20,40,60,80].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="140" stroke="rgba(201,169,97,0.04)" strokeWidth="0.12" strokeDasharray="0.3 1.2" />
              ))}

              {/* 25 department polygons drawn from real GeoJSON.
                  Outlines + fills use the macro-region color (costa / sierra / selva).
                  Each polygon is its own clickable hit-zone that syncs with its dot. */}
              {REGIONS.map(r => {
                const d = window.PERU_DEPT_SHAPES?.[r.id];
                if (!d) return null;
                const dim = filter !== 'all' && r.tipo !== filter;
                const isSel = r.id === selected;
                const isHov = r.id === hovered;
                const color = r.tipo === 'costa' ? '#6FA8C9' : r.tipo === 'sierra' ? '#C9A961' : '#7FB069';
                const baseFill = isSel ? 0.22 : isHov ? 0.12 : 0.04;
                const baseStroke = isSel ? 0.8 : isHov ? 0.55 : 0.28;
                return (
                  <path key={`shape-${r.id}`} d={d}
                    fill={color}
                    fillOpacity={dim ? 0.02 : baseFill}
                    stroke={color}
                    strokeOpacity={dim ? 0.12 : baseStroke}
                    strokeWidth={isSel ? 0.32 : 0.22}
                    strokeLinejoin="round"
                    style={{cursor: dim ? 'default' : 'pointer', transition:'fill-opacity .25s ease, stroke-opacity .25s ease, stroke-width .25s ease'}}
                    onClick={() => !dim && setSelected(r.id)}
                    onMouseEnter={() => !dim && setHovered(r.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}

              {/* Region dots — cities.
                  Each group has an invisible hit-disc (r=3.5) to enlarge the clickable area
                  around the small visible marker, so you can click near a dot without needing pixel precision. */}
              {REGIONS.map(r => {
                const dim = filter !== 'all' && r.tipo !== filter;
                const isSel = r.id === selected;
                const isHov = r.id === hovered;
                const color = r.tipo === 'costa' ? '#6FA8C9' : r.tipo === 'sierra' ? '#C9A961' : '#7FB069';
                const cx = mapX(r.x), cy = mapY(r.y);
                return (
                  <g key={r.id} style={{cursor:'pointer', opacity: dim ? 0.18 : 1, transition:'opacity .3s'}}
                     onClick={() => !dim && setSelected(r.id)}
                     onMouseEnter={() => !dim && setHovered(r.id)}
                     onMouseLeave={() => setHovered(null)}>
                    {/* Glow ring when selected or hovered */}
                    {(isSel || isHov) && (
                      <circle cx={cx} cy={cy} r={isSel ? 3 : 2.2} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.3" strokeOpacity={isSel ? 0.6 : 0.4}>
                        {isSel && <animate attributeName="r" values="3;5.5;3" dur="2.2s" repeatCount="indefinite" />}
                        {isSel && <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />}
                      </circle>
                    )}
                    {/* Invisible hit target — larger than the visible dot for easier clicking */}
                    <circle cx={cx} cy={cy} r="3.5" fill="transparent" />
                    {/* Visible dot */}
                    <circle cx={cx} cy={cy} r={isSel ? 1.6 : isHov ? 1.2 : 0.9} fill={color}
                      stroke={isSel ? '#F5F1E8' : 'rgba(14,16,20,0.8)'} strokeWidth="0.25"
                      style={{transition:'r .2s ease'}} />
                    {isSel && (
                      <g>
                        <rect x={cx + 2} y={cy - 1.6} width={r.nombre.length * 1.2 + 2} height="3.2"
                          fill="rgba(14,16,20,0.85)" stroke="rgba(201,169,97,0.4)" strokeWidth="0.1" />
                        <text x={cx + 3} y={cy + 0.6} fontSize="2" fill="#F5F1E8" fontFamily="Inter" fontWeight="500">
                          {r.nombre}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Cardinal labels */}
              <text x="50" y="4" fontSize="2.2" fill="rgba(201,169,97,0.5)" textAnchor="middle" fontFamily="JetBrains Mono" letterSpacing="0.3">ECUADOR  ·  COLOMBIA</text>
              <text x="95" y="50" fontSize="2.2" fill="rgba(201,169,97,0.5)" textAnchor="middle" fontFamily="JetBrains Mono" transform="rotate(90 95 50)" letterSpacing="0.3">BRASIL</text>
              <text x="45" y="138" fontSize="2.2" fill="rgba(201,169,97,0.5)" textAnchor="middle" fontFamily="JetBrains Mono" letterSpacing="0.3">CHILE</text>
              <text x="3" y="70" fontSize="2.2" fill="rgba(111,168,201,0.4)" textAnchor="middle" fontFamily="JetBrains Mono" transform="rotate(-90 3 70)" letterSpacing="0.3">OCÉANO PACÍFICO</text>
            </svg>
            </div>

            {/* Scale / compass */}
            <div style={mapStyles.compass}>
              <svg viewBox="0 0 40 40" width="50" height="50">
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(201,169,97,0.3)" strokeWidth="0.5" />
                <line x1="20" y1="4" x2="20" y2="36" stroke="rgba(201,169,97,0.5)" strokeWidth="0.5" />
                <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(201,169,97,0.5)" strokeWidth="0.5" />
                <polygon points="20,4 18,10 22,10" fill="#C9A961" />
                <text x="20" y="3" fontSize="4" fill="#C9A961" textAnchor="middle" fontFamily="JetBrains Mono">N</text>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function Dim({ label, value, unit, gold }) {
  return (
    <div style={{flex:1}}>
      <div className="quechua" style={{marginBottom:8}}>{label}</div>
      <div style={{display:'flex', alignItems:'baseline', gap:8}}>
        <span style={{fontFamily:'var(--font-display)', fontSize:38, color: gold ? 'var(--gold-primary)' : 'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.02em'}}>{value}</span>
        <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-subtle)', letterSpacing:'0.2em', textTransform:'uppercase'}}>{unit}</span>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:6}}>
      <span style={{width:8, height:8, borderRadius:'50%', background:color}} />
      <span>{label}</span>
    </div>
  );
}

const mapStyles = {
  section: {
    position: 'relative',
    padding: 'var(--section-py) 0',
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-dark)',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: 56,
    alignItems: 'flex-start',
  },
  sidebar: {},
  filter: {
    padding: '10px 14px',
    border: '1px solid var(--border-dark)',
    background: 'transparent',
    color: 'var(--text-on-dark-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  filterActive: {
    borderColor: 'var(--gold-primary)',
    color: 'var(--gold-primary)',
    background: 'var(--gold-bg)',
  },
  detail: {
    padding: 40,
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-dark)',
  },
  regionName: {
    fontFamily: 'var(--font-display)',
    fontSize: 56,
    fontWeight: 300,
    letterSpacing: '-0.025em',
    color: 'var(--text-on-dark)',
    marginBottom: 10,
    lineHeight: 1,
  },
  dims: {
    display: 'flex',
    gap: 32,
    paddingTop: 28,
    borderTop: '1px solid var(--border-dark)',
  },
  barRow: { marginBottom: 16 },
  mapBox: {
    position: 'relative',
    aspectRatio: '100 / 140',
    width: '100%',
    background: 'radial-gradient(ellipse at 40% 40%, rgba(201,169,97,0.05), transparent 65%), var(--bg-primary)',
    border: '1px solid var(--border-dark)',
    overflow: 'hidden',
  },
  svg: { position:'absolute', inset:0, width:'100%', height:'100%' },
  compass: {
    position: 'absolute', bottom: 20, right: 20,
    opacity: 0.8,
  },
};

window.PeruMap = PeruMap;
