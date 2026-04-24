// Investment calculator
function Calculator() {
  const [price, setPrice] = React.useState(450000);
  const [yieldPct, setYieldPct] = React.useState(8.2);
  const [years, setYears] = React.useState(10);
  const [city, setCity] = React.useState('cusco');

  const cities = [
    { id: 'cusco', nombre: 'Cusco · San Blas', yieldVal: 9.4, precioM2: 1820 },
    { id: 'lima', nombre: 'Lima · Miraflores', yieldVal: 7.2, precioM2: 2180 },
    { id: 'arequipa', nombre: 'Arequipa · Cayma', yieldVal: 7.8, precioM2: 1540 },
    { id: 'barranco', nombre: 'Lima · Barranco', yieldVal: 7.9, precioM2: 1920 },
  ];

  React.useEffect(() => {
    const c = cities.find(x => x.id === city);
    if (c) setYieldPct(c.yieldVal);
  }, [city]);

  const annualRent = price * (yieldPct / 100);
  const monthly = annualRent / 12;
  // Appreciation estimate — 4% annual compound
  const futureValue = price * Math.pow(1.04, years) + annualRent * years;
  const totalReturn = ((futureValue - price) / price) * 100;

  return (
    <section id="inversion" style={calcStyles.section}>
      <div className="wrap">
        <div style={calcStyles.split}>

          <div>
            <div className="label-row" style={{display:'flex', alignItems:'center', gap:20, marginBottom:16}}>
              <span className="quechua">ꟼ Sección 03 · Qullqi</span>
              <div style={{width:60, height:1, background:'var(--border-gold)'}} />
            </div>
            <h2 className="h-display" style={{fontSize:'clamp(40px, 4.5vw, 64px)', marginBottom:24}}>
              Calcula tu<br/>
              <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>retorno</em> en Perú.
            </h2>
            <p style={{fontSize:17, lineHeight:1.7, color:'var(--text-on-dark-muted)', maxWidth:460, marginBottom:40}}>
              Ajusta el valor, la zona y el horizonte temporal. Los retornos
              están calculados sobre precios medios 2026 y apreciación anual
              histórica del 4%.
            </p>

            <div style={{display:'flex', flexDirection:'column', gap:28}}>
              {/* City selector */}
              <div>
                <div className="quechua" style={{marginBottom:12}}>Zona</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                  {cities.map(c => (
                    <button key={c.id} onClick={() => setCity(c.id)}
                      style={{
                        padding:'14px 16px', textAlign:'left',
                        border: '1px solid ' + (city===c.id ? 'var(--gold-primary)' : 'var(--border-dark)'),
                        background: city===c.id ? 'var(--gold-bg)' : 'transparent',
                        color: city===c.id ? 'var(--gold-primary)' : 'var(--text-on-dark-muted)',
                        cursor:'pointer', transition:'all .2s ease',
                      }}>
                      <div style={{fontSize:13, fontWeight:500}}>{c.nombre}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.15em', marginTop:4, opacity:0.7}}>
                        ${c.precioM2}/m² · {c.yieldVal}%
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <SliderRow label="Inversión" value={`$${price.toLocaleString()}`} unit="USD">
                <input type="range" min="100000" max="2000000" step="10000" value={price}
                       onChange={e => setPrice(+e.target.value)}
                       style={calcStyles.slider} />
              </SliderRow>

              {/* Yield slider */}
              <SliderRow label="Rentabilidad anual" value={yieldPct.toFixed(1) + '%'} unit="alquiler">
                <input type="range" min="4" max="12" step="0.1" value={yieldPct}
                       onChange={e => setYieldPct(+e.target.value)}
                       style={calcStyles.slider} />
              </SliderRow>

              {/* Horizon slider */}
              <SliderRow label="Horizonte" value={years + ' años'} unit="plazo">
                <input type="range" min="3" max="25" step="1" value={years}
                       onChange={e => setYears(+e.target.value)}
                       style={calcStyles.slider} />
              </SliderRow>
            </div>
          </div>

          {/* RESULTS */}
          <div style={calcStyles.results}>
            <div className="motif-pattern" style={{opacity:0.5}} />
            <div style={{position:'relative', zIndex:1}}>
              <div className="quechua" style={{marginBottom:18}}>Proyección · {years} años</div>

              <div style={calcStyles.bigNum}>
                <span style={{fontSize:18, color:'var(--text-on-dark-muted)', marginRight:4}}>$</span>
                {Math.round(futureValue).toLocaleString()}
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-muted)', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:8}}>
                Valor proyectado · rentas + apreciación
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginTop:48, paddingTop:32, borderTop:'1px solid var(--border-dark)'}}>
                <Result label="Retorno total" val={`+${totalReturn.toFixed(1)}%`} />
                <Result label="Renta anual" val={`$${Math.round(annualRent).toLocaleString()}`} />
                <Result label="Renta mensual" val={`$${Math.round(monthly).toLocaleString()}`} />
                <Result label="Recuperación" val={`${(100/yieldPct).toFixed(1)} años`} />
              </div>

              <div style={{marginTop:40, padding:'20px 22px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)'}}>
                <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.22em', color:'var(--gold-primary)', textTransform:'uppercase', marginBottom:8}}>
                  Vs. Madrid · Barrio de Salamanca
                </div>
                <div style={{fontSize:14, color:'var(--text-on-dark)', lineHeight:1.6}}>
                  Misma inversión de <strong style={{color:'var(--gold-primary)'}}>${price.toLocaleString()}</strong> rendiría
                  un {(yieldPct - 3.5).toFixed(1)}% más que en el mejor barrio de Madrid (3.5%).
                </div>
              </div>

              <button className="btn-gold" style={{marginTop:32, width:'100%', justifyContent:'space-between'}}>
                Hablar con un asesor <span className="arrow" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SliderRow({ label, value, unit, children }) {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
        <span className="quechua">{label}</span>
        <div>
          <span style={{fontFamily:'var(--font-display)', fontSize:22, color:'var(--gold-primary)', fontWeight:300}}>{value}</span>
          <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.18em', textTransform:'uppercase', marginLeft:8}}>{unit}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function Result({ label, val }) {
  return (
    <div>
      <div className="quechua" style={{marginBottom:6}}>{label}</div>
      <div style={{fontFamily:'var(--font-display)', fontSize:32, color:'var(--text-on-dark)', fontWeight:300, letterSpacing:'-0.01em'}}>{val}</div>
    </div>
  );
}

const calcStyles = {
  section: {
    position: 'relative',
    padding: 'var(--section-py) 0',
    background: 'var(--bg-primary)',
    borderTop: '1px solid var(--border-dark)',
  },
  split: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start',
  },
  slider: {
    width: '100%',
    appearance: 'none', WebkitAppearance: 'none',
    height: 2,
    background: 'var(--border-dark)',
    outline: 'none',
    cursor: 'pointer',
  },
  results: {
    position: 'relative',
    padding: 56,
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-dark)',
    minHeight: 600,
    overflow: 'hidden',
  },
  bigNum: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(56px, 7vw, 96px)',
    color: 'var(--gold-primary)',
    fontWeight: 300,
    letterSpacing: '-0.03em',
    lineHeight: 1,
    marginTop: 12,
  },
};

// Inject slider thumb styling globally (scoped)
const sliderCSS = document.createElement('style');
sliderCSS.textContent = `
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 16px; height: 16px; border-radius: 50%;
  background: #C9A961; cursor: pointer;
  box-shadow: 0 0 0 4px rgba(201,169,97,0.15);
}
input[type="range"]::-moz-range-thumb {
  width: 16px; height: 16px; border: 0; border-radius: 50%;
  background: #C9A961; cursor: pointer;
}
`;
document.head.appendChild(sliderCSS);

window.Calculator = Calculator;
