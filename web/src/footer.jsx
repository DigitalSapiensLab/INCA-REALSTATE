// Footer with gold info band + full footer
function Footer() {
  return (
    <footer id="contacto" style={footerStyles.wrap}>
      {/* Gold info band */}
      <div style={footerStyles.goldBand}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:40, padding:'44px 0'}}>
          <BandItem
            label="Oficina España"
            lines={['C/ Serrano 47, 3º', '28001 Madrid · España']}
          />
          <BandItem
            label="Oficina Perú"
            lines={['Av. Larco 1301, Miraflores', 'Lima 15074 · Perú']}
          />
          <BandItem
            label="Atención"
            lines={['Lun-Vie · 09:00 — 19:00 CET', 'hola@andescapitalestates.com']}
          />
        </div>
      </div>

      <div style={footerStyles.main}>
        <div className="wrap">
          <div style={footerStyles.grid}>
            {/* Brand column */}
            <div>
              <div className="brand" style={{marginBottom:28}}>
                <div className="brand-mark">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M24 4 L44 14 L44 34 L24 44 L4 34 L4 14 Z" stroke="#C9A961" strokeWidth="1" />
                    <path d="M18 20 H30 V24 H26 V28 H22 V32 H18 Z M30 20 V32 H26" stroke="#C9A961" strokeWidth="1.2" fill="none" />
                    <circle cx="24" cy="16" r="1.5" fill="#C9A961" />
                  </svg>
                </div>
                <div className="brand-text">
                  <span className="name-top">ANDES CAPITAL</span>
                  <span className="name-bot">ESTATES</span>
                </div>
              </div>
              <p style={{color:'var(--text-on-dark-muted)', fontSize:14, lineHeight:1.7, maxWidth:340}}>
                La primera plataforma inmobiliaria que te enamora del país
                antes de venderte una propiedad. Costa, sierra o selva —
                un lugar para cada vida.
              </p>
              <div style={{display:'flex', gap:14, marginTop:28}}>
                <SocialBtn i="ig" />
                <SocialBtn i="fb" />
                <SocialBtn i="yt" />
                <SocialBtn i="tw" />
              </div>
            </div>

            <FooterCol title="Descubrir Perú" items={['Cultura y patrimonio','Gastronomía','Biodiversidad','Historia inca','Mejor época']} />
            <FooterCol title="Inversión" items={['Calculadora de retorno','Guía del comprador','Trámites y visas','Costo de vida','Financiación']} />
            <FooterCol title="Plataforma" items={['Propiedades','Regiones','Inmobiliarias B2B','Andes AI','Blog editorial']} />

            <div>
              <div className="quechua" style={{marginBottom:18}}>Recibe la revista</div>
              <p style={{color:'var(--text-on-dark-muted)', fontSize:13, lineHeight:1.6, marginBottom:16}}>
                Una pieza editorial mensual sobre vivir en Perú.
              </p>
              <div style={{display:'flex', border:'1px solid var(--border-dark)'}}>
                <input type="email" placeholder="tu@email.com" style={footerStyles.input} />
                <button style={footerStyles.subBtn}>→</button>
              </div>
            </div>
          </div>

          {/* Oversized wordmark */}
          <div style={footerStyles.wordmark}>
            ANDES CAPITAL ESTATES
          </div>

          <div style={footerStyles.bottom}>
            <span style={{color:'var(--text-on-dark-subtle)', fontSize:12}}>© 2026 Andes Capital Estates · Todos los derechos reservados</span>
            <div style={{display:'flex', gap:24, fontSize:12, color:'var(--text-on-dark-subtle)'}}>
              <a href="#">Privacidad</a>
              <a href="#">Aviso legal</a>
              <a href="#">Cookies</a>
              <a href="#">Inmobiliarias</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BandItem({ label, lines }) {
  return (
    <div style={{color:'#0E1014'}}>
      <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(14,16,20,0.7)', marginBottom:10}}>
        {label}
      </div>
      <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:400, color:'#0E1014', marginBottom:4}}>{lines[0]}</div>
      <div style={{fontFamily:'var(--font-sans)', fontSize:13, color:'rgba(14,16,20,0.75)'}}>{lines[1]}</div>
    </div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div className="quechua" style={{marginBottom:18}}>{title}</div>
      <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10}}>
        {items.map(i => (
          <li key={i}><a href="#" style={{fontSize:13, color:'var(--text-on-dark-muted)', transition:'color .2s ease'}} onMouseEnter={e=>e.target.style.color='var(--gold-primary)'} onMouseLeave={e=>e.target.style.color='var(--text-on-dark-muted)'}>{i}</a></li>
        ))}
      </ul>
    </div>
  );
}

function SocialBtn({ i }) {
  return (
    <a href="#" style={{width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid var(--border-dark)', color:'var(--text-on-dark-muted)', transition:'all .2s ease'}}
       onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold-primary)'; e.currentTarget.style.color='var(--gold-primary)';}}
       onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-dark)'; e.currentTarget.style.color='var(--text-on-dark-muted)';}}>
      {Icons[i]}
    </a>
  );
}

const footerStyles = {
  wrap: { background:'var(--bg-primary)', borderTop:'1px solid var(--border-dark)' },
  goldBand: { background:'var(--gold-primary)', position:'relative' },
  main: { padding:'100px 0 40px' },
  grid: { display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1.2fr', gap:48, paddingBottom:80, borderBottom:'1px solid var(--border-dark)' },
  wordmark: { fontFamily:'var(--font-display)', fontSize:'clamp(80px, 16vw, 240px)', fontWeight:300, letterSpacing:'-0.04em', color:'transparent', WebkitTextStroke:'1px rgba(201,169,97,0.18)', textAlign:'center', padding:'60px 0 20px', lineHeight:1 },
  bottom: { display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:30, borderTop:'1px solid var(--border-dark)' },
  input: { flex:1, padding:'12px 14px', background:'transparent', color:'var(--text-on-dark)', border:0, outline:'none', fontSize:13 },
  subBtn: { padding:'12px 16px', background:'var(--gold-primary)', color:'#0E1014', border:0, cursor:'pointer', fontSize:14 },
};

window.Footer = Footer;
