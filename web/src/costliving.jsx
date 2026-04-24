// Cost of living comparator: Spain vs Peru
function CostLiving() {
  const [esCity, setEsCity] = React.useState('madrid');
  const [peCity, setPeCity] = React.useState('lima');
  const [salary, setSalary] = React.useState(2800);

  const es = COST_CITIES.es.find(c => c.id === esCity);
  const pe = COST_CITIES.pe.find(c => c.id === peCity);
  const pct = Math.round((1 - pe.index / es.index) * 100);
  const peSalary = Math.round(salary * (pe.index / es.index));
  const savings = salary - peSalary;

  const breakdown = [
    { cat: 'Alquiler 2hab centro', es: Math.round(salary * 0.38), pe: pe.alquiler },
    { cat: 'Comida mensual', es: Math.round(salary * 0.15), pe: pe.comida },
    { cat: 'Transporte', es: Math.round(salary * 0.06), pe: pe.transporte },
    { cat: 'Ocio y restaurantes', es: Math.round(salary * 0.10), pe: pe.ocio },
  ];
  const esTotal = breakdown.reduce((a,b) => a+b.es, 0);
  const peTotal = breakdown.reduce((a,b) => a+b.pe, 0);

  return (
    <section style={costStyles.section}>
      <div className="motif-pattern" style={{opacity:0.3}} />
      <div className="wrap" style={{position:'relative', zIndex:1}}>
        <div className="section-head" style={{textAlign:'center', alignItems:'center'}}>
          <div className="label-row" style={{justifyContent:'center'}}>
            <div style={{width:60, height:1, background:'var(--border-gold)'}} />
            <span className="quechua">ꟼ Sección 04 · Kawsay</span>
            <div style={{width:60, height:1, background:'var(--border-gold)'}} />
          </div>
          <h2 className="h-display" style={{textAlign:'center', maxWidth:880, margin:'0 auto'}}>
            El mismo sueldo, <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>otra vida.</em>
          </h2>
          <p className="lede" style={{margin:'0 auto', textAlign:'center'}}>
            Descubre cuánto vivirías en Perú con lo que hoy ganas en España.
            Cifras reales de 2026, sin letra pequeña.
          </p>
        </div>

        <div style={costStyles.compareBox}>
          {/* ESPAÑA */}
          <div style={costStyles.side}>
            <div className="quechua" style={{marginBottom:18}}>Origen · España</div>
            <select value={esCity} onChange={e => setEsCity(e.target.value)} style={costStyles.select}>
              {COST_CITIES.es.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>

            <div style={{marginTop:36}}>
              <div className="quechua" style={{marginBottom:12}}>Sueldo neto mensual</div>
              <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:14}}>
                <span style={{fontFamily:'var(--font-display)', fontSize:56, color:'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.02em'}}>
                  €{salary.toLocaleString()}
                </span>
              </div>
              <input type="range" min="1200" max="8000" step="100" value={salary}
                     onChange={e => setSalary(+e.target.value)} style={{width:'100%'}} />
            </div>

            <div style={costStyles.breakdown}>
              <div className="quechua" style={{marginBottom:12}}>Gasto mensual típico</div>
              {breakdown.map((b,i) => (
                <div key={i} style={costStyles.row}>
                  <span style={{color:'var(--text-on-dark-muted)', fontSize:14}}>{b.cat}</span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text-on-dark)'}}>€{b.es}</span>
                </div>
              ))}
              <div style={{...costStyles.row, borderTop:'1px solid var(--border-dark)', paddingTop:14, marginTop:10}}>
                <span style={{fontFamily:'var(--font-display)', fontSize:18, color:'var(--text-on-dark)'}}>Total</span>
                <span style={{fontFamily:'var(--font-display)', fontSize:22, color:'var(--text-on-dark)'}}>€{esTotal}</span>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div style={costStyles.connector}>
            <div style={costStyles.pctCircle}>
              <div style={{fontFamily:'var(--font-display)', fontSize:52, color:'var(--gold-primary)', fontWeight:300, letterSpacing:'-0.02em', lineHeight:1}}>
                −{pct}%
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.22em', textTransform:'uppercase', marginTop:8}}>
                coste de vida
              </div>
            </div>
            <div className="stepped-divider" style={{margin:'32px auto', transform:'rotate(90deg)'}} />
            <div style={{textAlign:'center', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', color:'var(--gold-primary)', textTransform:'uppercase'}}>
              Te quedan<br/>
              <span style={{fontFamily:'var(--font-display)', fontSize:28, color:'var(--gold-primary)', letterSpacing:0, textTransform:'none', marginTop:6, display:'inline-block'}}>€{savings.toLocaleString()}</span>
            </div>
          </div>

          {/* PERÚ */}
          <div style={costStyles.side}>
            <div className="quechua" style={{marginBottom:18, color:'var(--gold-primary)'}}>Destino · Perú</div>
            <select value={peCity} onChange={e => setPeCity(e.target.value)} style={{...costStyles.select, borderColor:'var(--gold-primary)', color:'var(--gold-primary)'}}>
              {COST_CITIES.pe.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>

            <div style={{marginTop:36}}>
              <div className="quechua" style={{marginBottom:12}}>Equivalente en Perú</div>
              <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:14}}>
                <span style={{fontFamily:'var(--font-display)', fontSize:56, color:'var(--gold-primary)', fontWeight:300, letterSpacing:'-0.02em'}}>
                  €{peSalary.toLocaleString()}
                </span>
                <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.2em', textTransform:'uppercase'}}>
                  mismo estilo
                </span>
              </div>
              <div style={{height:2, background:'var(--border-dark)', marginTop:12}}>
                <div style={{width: `${(pe.index/es.index)*100}%`, height:2, background:'var(--gold-primary)'}} />
              </div>
            </div>

            <div style={costStyles.breakdown}>
              <div className="quechua" style={{marginBottom:12}}>Gasto mensual típico</div>
              {breakdown.map((b,i) => (
                <div key={i} style={costStyles.row}>
                  <span style={{color:'var(--text-on-dark-muted)', fontSize:14}}>{b.cat}</span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--gold-primary)'}}>€{b.pe}</span>
                </div>
              ))}
              <div style={{...costStyles.row, borderTop:'1px solid var(--border-gold)', paddingTop:14, marginTop:10}}>
                <span style={{fontFamily:'var(--font-display)', fontSize:18, color:'var(--text-on-dark)'}}>Total</span>
                <span style={{fontFamily:'var(--font-display)', fontSize:22, color:'var(--gold-primary)'}}>€{peTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const costStyles = {
  section: { position:'relative', padding:'var(--section-py) 0', background:'var(--bg-secondary)', borderTop:'1px solid var(--border-dark)' },
  compareBox: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: 32,
    alignItems: 'stretch',
  },
  side: {
    padding: 48,
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-dark)',
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-primary)',
    color: 'var(--text-on-dark)',
    border: '1px solid var(--border-dark)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    cursor: 'pointer',
  },
  breakdown: { marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--border-dark)' },
  row: { display:'flex', justifyContent:'space-between', padding:'10px 0' },
  connector: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    padding: '0 16px',
  },
  pctCircle: {
    width: 180, height: 180, borderRadius: '50%',
    border: '1px solid var(--border-gold)',
    background: 'radial-gradient(circle at center, var(--gold-bg) 0%, transparent 70%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  },
};

window.CostLiving = CostLiving;
