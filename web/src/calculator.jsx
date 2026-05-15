// Investment calculator.
// Apreciación real por ciudad (fuente BCRP + CAPECO 2015-2025).
// Comparativa contra Madrid usa yield NETO Salamanca (Idealista 2025).
// El usuario puede elegir entre 25+ zonas curadas (window.INVEST_LOCATIONS)
// agrupadas por macro región (Costa · Sierra · Selva).
function Calculator() {
  // Fuente única de verdad: INVEST_LOCATIONS en data.jsx.
  const locations = window.INVEST_LOCATIONS || [];

  const [city, setCity] = React.useState('cusco-sanblas');
  const [macro, setMacro] = React.useState('sierra');

  const activeCity = locations.find(x => x.id === city) || locations[0];
  const initialYield = activeCity ? activeCity.yield : 7.5;
  const initialPrice = activeCity ? Math.round(activeCity.precioM2 * 180) : 450000; // ~180 m² de referencia

  const [price, setPrice] = React.useState(initialPrice);
  const [yieldPct, setYieldPct] = React.useState(initialYield);
  const [years, setYears] = React.useState(10);

  const madrid = window.MADRID_BENCHMARK || { yield_neto: 2.8, apreciacion: 4.5, barrio: 'Barrio de Salamanca' };

  // Cuando cambia la zona: actualiza yield y precio sugerido.
  // Si el usuario después toca los sliders, su valor prevalece (no se sobreescribe).
  const [touchedPrice, setTouchedPrice] = React.useState(false);
  const [touchedYield, setTouchedYield] = React.useState(false);
  React.useEffect(() => {
    if (!activeCity) return;
    if (!touchedYield) setYieldPct(activeCity.yield);
    if (!touchedPrice) setPrice(Math.round(activeCity.precioM2 * 180));
  }, [city]);

  // Macros disponibles (deducidas de las zonas).
  const macros = [
    { id: 'costa',  label: 'Costa',  color: '#6FA8C9', count: locations.filter(l => l.macro === 'costa').length },
    { id: 'sierra', label: 'Sierra', color: '#C9A961', count: locations.filter(l => l.macro === 'sierra').length },
    { id: 'selva',  label: 'Selva',  color: '#7FB069', count: locations.filter(l => l.macro === 'selva').length },
  ];
  const activeMacro = macros.find(m => m.id === macro) || macros[1];
  const zonasOfMacro = locations.filter(l => l.macro === macro);

  function selectCity(id) {
    const loc = locations.find(l => l.id === id);
    if (!loc) return;
    setCity(id);
    setMacro(loc.macro);
    setTouchedPrice(false);
    setTouchedYield(false);
  }
  function selectMacro(id) {
    setMacro(id);
    // Si la zona actual no pertenece al macro elegido, saltar a la primera del macro.
    const stillValid = locations.find(l => l.id === city && l.macro === id);
    if (!stillValid) {
      const first = locations.find(l => l.macro === id);
      if (first) {
        setCity(first.id);
        setTouchedPrice(false);
        setTouchedYield(false);
      }
    }
  }

  const annualRent = price * (yieldPct / 100);
  const monthly = annualRent / 12;
  const apreciacion = activeCity.apreciacion / 100;
  // Valor futuro = precio compuesto a apreciación real + suma de rentas históricas
  const futureValue = price * Math.pow(1 + apreciacion, years) + annualRent * years;
  const totalReturn = ((futureValue - price) / price) * 100;

  // Diferencial vs Madrid (yield neto + apreciación)
  const madridTotal = madrid.yield_neto + madrid.apreciacion;       // ~7.3% anual total ciudad
  const peTotal     = yieldPct + activeCity.apreciacion;            // total Perú con esta zona
  const diferencial = (peTotal - madridTotal).toFixed(1);

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
              Ajusta el valor, la zona y el horizonte temporal. Cifras
              orientativas sobre precios medios 2026 y apreciación anual
              histórica real por ciudad. Sin promesas — solo datos.
            </p>

            <div style={{display:'flex', flexDirection:'column', gap:28}}>
              {/* ─── ZONA SELECTOR: macro chips + dropdown agrupado ─── */}
              <div>
                <div className="quechua" style={{marginBottom:12}}>Zona de inversión</div>

                {/* Macro chips */}
                <div style={{display:'flex', gap:8, marginBottom:14}}>
                  {macros.map(m => {
                    const isActive = macro === m.id;
                    return (
                      <button key={m.id} type="button" onClick={() => selectMacro(m.id)}
                        style={{
                          flex:1,
                          padding:'12px 14px',
                          border:'1px solid ' + (isActive ? m.color : 'var(--border-dark)'),
                          background: isActive ? `${m.color}14` : 'transparent',
                          color: isActive ? m.color : 'var(--text-on-dark-muted)',
                          fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase',
                          cursor:'pointer', transition:'all .2s ease',
                        }}>
                        {m.label}
                        <span style={{opacity:0.6, marginLeft:8, fontSize:10}}>· {m.count}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Dropdown de zonas agrupado por región */}
                <select value={city} onChange={e => selectCity(e.target.value)} style={calcStyles.select}>
                  {macros.map(m => (
                    <optgroup key={m.id} label={`— ${m.label.toUpperCase()} —`}>
                      {locations.filter(l => l.macro === m.id).map(l => (
                        <option key={l.id} value={l.id}>
                          {l.nombre}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                {/* Panel editorial de la zona seleccionada */}
                {activeCity && (
                  <div style={calcStyles.zonePanel}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:14, flexWrap:'wrap'}}>
                      <div style={{fontFamily:'var(--font-display)', fontSize:20, color:'var(--text-on-dark)', fontWeight:400, letterSpacing:'-0.01em'}}>
                        {activeCity.nombre}
                      </div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:10, color: activeMacro.color, letterSpacing:'0.22em', textTransform:'uppercase'}}>
                        {activeCity.tag}
                      </div>
                    </div>
                    <div style={calcStyles.zoneStats}>
                      <ZoneStat label="Precio m²" value={`$${activeCity.precioM2.toLocaleString('en-US')}`} />
                      <ZoneStat label="Yield orientativo" value={`${activeCity.yield}%`} accent />
                      <ZoneStat label="Apreciación anual" value={`${activeCity.apreciacion}%`} accent />
                    </div>
                  </div>
                )}
              </div>

              {/* Price slider */}
              <SliderRow label="Inversión" value={`$${price.toLocaleString('en-US')}`} unit="USD">
                <input type="range" min="60000" max="2500000" step="5000" value={price}
                       onChange={e => { setTouchedPrice(true); setPrice(+e.target.value); }}
                       style={calcStyles.slider} />
              </SliderRow>

              {/* Yield slider */}
              <SliderRow label="Rentabilidad anual" value={yieldPct.toFixed(1) + '%'} unit="alquiler">
                <input type="range" min="4" max="12" step="0.1" value={yieldPct}
                       onChange={e => { setTouchedYield(true); setYieldPct(+e.target.value); }}
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
                  Vs. Madrid · {madrid.barrio}
                </div>
                <div style={{fontSize:14, color:'var(--text-on-dark)', lineHeight:1.65}}>
                  En el mejor barrio de Madrid esta misma inversión rinde un yield
                  neto del <strong style={{color:'var(--text-on-dark-muted)'}}>{madrid.yield_neto}%</strong> tras impuestos
                  y comunidad, con apreciación histórica del <strong style={{color:'var(--text-on-dark-muted)'}}>{madrid.apreciacion}%</strong>.
                  En <strong style={{color:'var(--gold-primary)'}}>{activeCity.nombre}</strong> el
                  total entre renta y apreciación supera a Madrid en
                  <strong style={{color:'var(--gold-primary)'}}> +{diferencial} puntos</strong> al año.
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

function ZoneStat({ label, value, accent }) {
  return (
    <div>
      <div style={{fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.22em', color:'var(--text-on-dark-subtle)', textTransform:'uppercase', marginBottom:6}}>
        {label}
      </div>
      <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:400, color: accent ? 'var(--gold-primary)' : 'var(--text-on-dark)', letterSpacing:'-0.01em'}}>
        {value}
      </div>
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
  select: {
    width: '100%',
    padding: '14px 18px',
    background: 'var(--bg-tertiary)',
    color: 'var(--text-on-dark)',
    border: '1px solid var(--border-dark)',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage:'linear-gradient(45deg, transparent 50%, var(--gold-primary) 50%), linear-gradient(135deg, var(--gold-primary) 50%, transparent 50%)',
    backgroundPosition:'calc(100% - 22px) 50%, calc(100% - 17px) 50%',
    backgroundSize:'5px 5px, 5px 5px',
    backgroundRepeat:'no-repeat',
    paddingRight: 44,
  },
  zonePanel: {
    marginTop: 14,
    padding: '18px 20px',
    background: 'rgba(201, 169, 97, 0.04)',
    border: '1px solid var(--border-gold)',
  },
  zoneStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 18,
    marginTop: 18,
    paddingTop: 16,
    borderTop: '1px solid var(--border-dark)',
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
