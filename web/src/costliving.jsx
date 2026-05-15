// Cost of living comparator: Spain → Peru.
// Datos reales de salario neto y gasto mensual urbano (ver comentarios
// de COST_CITIES en data.jsx para fuentes). Direccionalidad inversa
// PE → ES queda preparada estructuralmente; se activará en fase 2 cuando
// se lance la operación Madrid → Lima a través de Andes International.

function CostLiving() {
  const [esCity, setEsCity] = React.useState('madrid');
  const [peCity, setPeCity] = React.useState('lima');
  const [profile, setProfile] = React.useState('profesional');
  const [salary, setSalary] = React.useState(2700);
  // Cuando el usuario ajusta el slider manualmente desactivamos el "auto"
  // del perfil para que su input prevalezca.
  const [manualSalary, setManualSalary] = React.useState(false);

  const es = COST_CITIES.es.find(c => c.id === esCity);
  const pe = COST_CITIES.pe.find(c => c.id === peCity);
  const profiles = window.SALARY_PROFILES || [];

  // Auto-actualiza el sueldo al cambiar perfil o ciudad de origen,
  // salvo que el usuario haya tocado el slider.
  React.useEffect(() => {
    if (manualSalary) return;
    if (es && es.perfiles && es.perfiles[profile]) {
      setSalary(es.perfiles[profile]);
    }
  }, [profile, esCity, manualSalary]);

  function handleSlider(v) {
    setManualSalary(true);
    setSalary(v);
  }
  function selectProfile(p) {
    setManualSalary(false);
    setProfile(p);
  }
  function selectEsCity(id) {
    setManualSalary(false);
    setEsCity(id);
  }

  // ─── Cálculos ──────────────────────────────────────────────────
  // EUR/USD: usamos paridad cercana al promedio 2025-2026 (1 EUR ≈ 1.08 USD).
  // Para el comparador es informativo, no transaccional, por lo que mantenemos
  // todo en EUR para España y convertimos los gastos PE (USD) a EUR.
  const EUR_PER_USD = 0.93;
  const peGastoEUR = {
    alquiler: Math.round(pe.gasto.alquiler * EUR_PER_USD),
    comida:   Math.round(pe.gasto.comida   * EUR_PER_USD),
    transporte: Math.round(pe.gasto.transporte * EUR_PER_USD),
    ocio:     Math.round(pe.gasto.ocio     * EUR_PER_USD),
  };

  const breakdown = [
    { cat: 'Alquiler 2 hab · centro', es: es.gasto.alquiler, pe: peGastoEUR.alquiler },
    { cat: 'Comida mensual',          es: es.gasto.comida,    pe: peGastoEUR.comida },
    { cat: 'Transporte',              es: es.gasto.transporte, pe: peGastoEUR.transporte },
    { cat: 'Ocio y restaurantes',     es: es.gasto.ocio,       pe: peGastoEUR.ocio },
  ];
  const esTotal = breakdown.reduce((a, b) => a + b.es, 0);
  const peTotal = breakdown.reduce((a, b) => a + b.pe, 0);

  // % de coste de vida basado en el gasto real (no en el índice agregado),
  // así el bloque "−42%" refleja literalmente lo que muestra la tabla.
  const pct = Math.round((1 - peTotal / esTotal) * 100);

  // Sueldo equivalente: lo que necesita el europeo en Perú para mantener su
  // estilo de vida actual (gasto PE en EUR + el mismo margen de ahorro relativo).
  const esMargin = salary - esTotal;             // lo que ahorra hoy en ES
  const peSalary = Math.round(peTotal + Math.max(0, esMargin) * (peTotal / esTotal));
  const savings = salary - peSalary;

  return (
    <section style={costStyles.section}>
      <div className="motif-pattern" style={{ opacity: 0.3 }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-head" style={{ textAlign: 'center', alignItems: 'center' }}>
          <div className="label-row" style={{ justifyContent: 'center' }}>
            <div style={{ width: 60, height: 1, background: 'var(--border-gold)' }} />
            <span className="quechua">ꟼ Sección 04 · Kawsay</span>
            <div style={{ width: 60, height: 1, background: 'var(--border-gold)' }} />
          </div>
          <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
            El mismo sueldo, <em style={{ fontStyle: 'italic', color: 'var(--gold-primary)' }}>otra vida.</em>
          </h2>
          <p className="lede" style={{ margin: '0 auto', textAlign: 'center' }}>
            Datos reales 2026. Selecciona tu perfil profesional y dos ciudades —
            la diferencia entre vivir en España y vivir en Perú se mide en
            calidad de día, no solo en euros.
          </p>
        </div>

        {/* ─── PROFILE SELECTOR ─── */}
        <div style={costStyles.profileRow}>
          <span className="quechua" style={{ marginRight: 18, alignSelf: 'center' }}>
            ꟼ Perfil profesional
          </span>
          {profiles.map(p => {
            const isActive = profile === p.id;
            return (
              <button key={p.id} onClick={() => selectProfile(p.id)} style={{
                padding: '12px 18px',
                border: '1px solid ' + (isActive ? 'var(--gold-primary)' : 'var(--border-dark)'),
                background: isActive ? 'var(--gold-bg)' : 'transparent',
                color: isActive ? 'var(--gold-primary)' : 'var(--text-on-dark-muted)',
                cursor: 'pointer', transition: 'all .2s ease',
                textAlign: 'left',
              }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500 }}>
                  {p.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', marginTop: 4, opacity: 0.7, textTransform: 'uppercase' }}>
                  {p.desc}
                </div>
              </button>
            );
          })}
        </div>

        <div style={costStyles.compareBox}>
          {/* ─── ESPAÑA ─── */}
          <div style={costStyles.side}>
            <div className="quechua" style={{ marginBottom: 18 }}>Origen · España</div>
            <select value={esCity} onChange={e => selectEsCity(e.target.value)} style={costStyles.select}>
              {COST_CITIES.es.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>

            <div style={{ marginTop: 36 }}>
              <div className="quechua" style={{ marginBottom: 12 }}>Sueldo neto mensual</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--text-on-dark)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                  €{salary.toLocaleString('es-ES')}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-on-dark-subtle)', textTransform: 'uppercase', marginBottom: 14 }}>
                {manualSalary ? 'Personalizado' : `Media · ${profiles.find(p => p.id === profile)?.label || ''}`}
              </div>
              <input type="range" min="1200" max="10000" step="100" value={salary}
                onChange={e => handleSlider(+e.target.value)} style={{ width: '100%' }} />
            </div>

            <div style={costStyles.breakdown}>
              <div className="quechua" style={{ marginBottom: 12 }}>Gasto mensual típico</div>
              {breakdown.map((b, i) => (
                <div key={i} style={costStyles.row}>
                  <span style={{ color: 'var(--text-on-dark-muted)', fontSize: 14 }}>{b.cat}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-on-dark)' }}>€{b.es.toLocaleString('es-ES')}</span>
                </div>
              ))}
              <div style={{ ...costStyles.row, borderTop: '1px solid var(--border-dark)', paddingTop: 14, marginTop: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-on-dark)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-on-dark)' }}>€{esTotal.toLocaleString('es-ES')}</span>
              </div>
            </div>
          </div>

          {/* ─── CONNECTOR ─── */}
          <div style={costStyles.connector}>
            <div style={costStyles.pctCircle}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--gold-primary)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
                −{pct}%
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-on-dark-muted)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 8 }}>
                coste de vida
              </div>
            </div>
            <div className="stepped-divider" style={{ margin: '32px auto', transform: 'rotate(90deg)' }} />
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>
              Te quedan<br />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-primary)', letterSpacing: 0, textTransform: 'none', marginTop: 6, display: 'inline-block' }}>
                €{Math.max(0, savings).toLocaleString('es-ES')}
              </span>
            </div>
          </div>

          {/* ─── PERÚ ─── */}
          <div style={costStyles.side}>
            <div className="quechua" style={{ marginBottom: 18, color: 'var(--gold-primary)' }}>Destino · Perú</div>
            <select value={peCity} onChange={e => setPeCity(e.target.value)} style={{ ...costStyles.select, borderColor: 'var(--gold-primary)', color: 'var(--gold-primary)' }}>
              {COST_CITIES.pe.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>

            <div style={{ marginTop: 36 }}>
              <div className="quechua" style={{ marginBottom: 12 }}>Equivalente en Perú</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--gold-primary)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                  €{peSalary.toLocaleString('es-ES')}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-on-dark-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  mismo estilo
                </span>
              </div>
              <div style={{ height: 2, background: 'var(--border-dark)', marginTop: 12 }}>
                <div style={{ width: `${Math.min(100, (peTotal / esTotal) * 100)}%`, height: 2, background: 'var(--gold-primary)' }} />
              </div>
            </div>

            <div style={costStyles.breakdown}>
              <div className="quechua" style={{ marginBottom: 12 }}>Gasto mensual típico</div>
              {breakdown.map((b, i) => (
                <div key={i} style={costStyles.row}>
                  <span style={{ color: 'var(--text-on-dark-muted)', fontSize: 14 }}>{b.cat}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold-primary)' }}>€{b.pe.toLocaleString('es-ES')}</span>
                </div>
              ))}
              <div style={{ ...costStyles.row, borderTop: '1px solid var(--border-gold)', paddingTop: 14, marginTop: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-on-dark)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold-primary)' }}>€{peTotal.toLocaleString('es-ES')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── INSIGHT EDITORIAL ─── */}
        <div style={costStyles.insight}>
          Un <strong style={{ color: 'var(--gold-primary)' }}>{profiles.find(p => p.id === profile)?.label?.toLowerCase()}</strong> que en {es.nombre} gana <strong style={{ color: 'var(--text-on-dark)' }}>€{salary.toLocaleString('es-ES')}</strong> al mes
          mantiene el mismo nivel de vida en {pe.nombre} con <strong style={{ color: 'var(--gold-primary)' }}>€{peSalary.toLocaleString('es-ES')}</strong>.
          La diferencia — <strong style={{ color: 'var(--gold-primary)' }}>€{Math.max(0, savings).toLocaleString('es-ES')}</strong> al mes — es lo que dejas de pagarle a una ciudad cara.
        </div>
      </div>
    </section>
  );
}

const costStyles = {
  section: { position: 'relative', padding: 'var(--section-py) 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-dark)' },
  profileRow: {
    display: 'flex', flexWrap: 'wrap', gap: 10,
    justifyContent: 'center',
    marginBottom: 56,
    paddingBottom: 36,
    borderBottom: '1px solid var(--border-dark)',
  },
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
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0' },
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
  insight: {
    marginTop: 56,
    padding: '28px 36px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-gold)',
    textAlign: 'center',
    fontFamily: 'var(--font-serif)',
    fontSize: 19,
    lineHeight: 1.7,
    color: 'var(--text-on-dark-muted)',
    maxWidth: 880,
    margin: '56px auto 0',
  },
};

window.CostLiving = CostLiving;
