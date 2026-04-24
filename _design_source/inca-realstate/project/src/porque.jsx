// "Por qué Perú" — 4 editorial pillars with Quechua numerals
function PorquePeru() {
  const pillars = [
    {
      q: 'ꟼ 01', num: 'HUK',
      titulo: 'Cultura viva',
      desc: 'Once mil años de historia continua. Desde Caral a los Incas, pasando por virreinato y república. Cinco sitios UNESCO. Idiomas que siguen vivos: quechua, aimara, asháninka.',
      datos: [['08', 'Sitios UNESCO'], ['47', 'Culturas vivas'], ['1532', 'Cusco capital Inca']],
      img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1400&q=80',
    },
    {
      q: 'ꟼ 02', num: 'ISKAY',
      titulo: 'Gastronomía de renombre',
      desc: 'La cocina peruana figura entre las tres más reconocidas del mundo. Central y Maido encabezan la lista mundial. Cada región, una carta distinta: ceviche en la costa, pachamanca en la sierra, juane en la selva.',
      datos: [['#1', 'World\'s 50 Best'], ['491', 'Variedades de papa'], ['3000', 'Variedades de quinua']],
      img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&q=80',
    },
    {
      q: 'ꟼ 03', num: 'KIMSA',
      titulo: 'Tres mundos en un país',
      desc: 'Desayuno en el Pacífico, almuerzo a 3.400m entre arquitectura inca, cena rodeado de Amazonía. Perú es el único país del mundo donde puedes vivir tres climas distintos en veinticuatro horas.',
      datos: [['84', 'Zonas de vida'], ['11%', 'Bosques del mundo'], ['3', 'Ecosistemas mayores']],
      img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1400&q=80',
    },
    {
      q: 'ꟼ 04', num: 'TAWA',
      titulo: 'Inversión con retorno',
      desc: 'El extranjero compra con los mismos derechos que un peruano. Rentabilidad anual superior a cualquier capital europea. Visa de inversionista desde 60.000 USD. Proceso de compra completo en 2-3 meses.',
      datos: [['9.4%', 'Retorno Cusco'], ['7.2%', 'Retorno Lima'], ['3%', 'Alcabala única']],
      img: 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=1400&q=80',
    },
  ];

  return (
    <section id="peru" style={porqueStyles.section}>
      <div className="motif-pattern" style={{opacity:0.4}} />
      <div className="wrap" style={{position:'relative', zIndex:1}}>

        <div className="section-head">
          <div className="label-row">
            <span className="quechua">ꟼ Sección 01 · Imanaqtin</span>
            <div style={{flex:1, height:1, background:'var(--border-gold)'}} />
          </div>
          <h2 className="h-display" style={{maxWidth: 860}}>
            Cuatro razones por las que<br/>
            <em style={{fontStyle:'italic', color:'var(--gold-primary)'}}>Perú</em> es el lugar.
          </h2>
          <p className="lede">
            Empieza por enamorarte del país. La propiedad viene después.
            Como nos dicen nuestros clientes: primero el <em>qué</em>, luego el <em>cuánto</em>.
          </p>
        </div>

        <div style={porqueStyles.grid}>
          {pillars.map((p, i) => (
            <article key={i} style={porqueStyles.card}>
              {/* Background image — 60% top, fading to 10% bottom */}
              <div aria-hidden="true" style={{
                position:'absolute', inset:0, pointerEvents:'none',
                backgroundImage:`url("${p.img}")`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                WebkitMaskImage:'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.17) 100%)',
                maskImage:'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.17) 100%)',
                opacity:0.6,
                filter:'saturate(0.75) brightness(0.8) contrast(1.05)',
              }} />
              {/* Legibility overlay — keeps text readable where image is brightest */}
              <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                background:'linear-gradient(180deg, rgba(14,16,20,0.55) 0%, rgba(14,16,20,0.35) 45%, rgba(14,16,20,0.6) 100%)',
              }} />

              {/* Content (above overlay) */}
              <div style={{position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:40, height:'100%'}}>
                <div style={porqueStyles.cardHead}>
                  <div>
                    <div className="quechua" style={{marginBottom:12}}>{p.q}</div>
                    <div className="section-number">{String(i+1).padStart(2,'0')}</div>
                    <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-on-dark-subtle)', letterSpacing:'0.22em', marginTop:8, textTransform:'uppercase'}}>
                      {p.num}
                    </div>
                  </div>
                  <div className="stepped-divider inverse" style={{alignSelf:'flex-start', marginTop:8}} />
                </div>

                <div>
                  <h3 style={porqueStyles.cardTitle}>{p.titulo}</h3>
                  <p style={porqueStyles.cardDesc}>{p.desc}</p>
                </div>

                <div style={porqueStyles.stats}>
                  {p.datos.map((d, j) => (
                    <div key={j} style={porqueStyles.statBlock}>
                      <div style={{fontFamily:'var(--font-display)', fontSize:28, color:'var(--gold-primary)', fontWeight:300}}>{d[0]}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-on-dark-muted)', letterSpacing:'0.18em', marginTop:4, textTransform:'uppercase'}}>{d[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

const porqueStyles = {
  section: {
    position: 'relative',
    padding: 'var(--section-py) 0',
    background: 'var(--bg-primary)',
    borderTop: '1px solid var(--border-dark)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 0,
  },
  card: {
    position: 'relative',
    padding: 56,
    borderTop: '1px solid var(--border-dark)',
    borderLeft: '1px solid var(--border-dark)',
    minHeight: 460,
    overflow: 'hidden',
    transition: 'background .3s ease',
  },
  cardHead: { display:'flex', justifyContent:'space-between', alignItems:'flex-start' },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 36,
    fontWeight: 300,
    color: 'var(--text-on-dark)',
    letterSpacing: '-0.01em',
    marginBottom: 16,
  },
  cardDesc: {
    fontSize: 16,
    lineHeight: 1.7,
    color: 'var(--text-on-dark-muted)',
    fontWeight: 300,
  },
  stats: {
    display: 'flex',
    gap: 32,
    paddingTop: 28,
    borderTop: '1px solid var(--border-dark)',
    marginTop: 'auto',
  },
  statBlock: {},
};

window.PorquePeru = PorquePeru;
