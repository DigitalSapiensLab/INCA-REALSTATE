// Floating Inca AI chat widget
function IncaAI() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([
    { role: 'ai', text: 'Hola, soy Inca AI. Antes de hablarte de propiedades, cuéntame: ¿has visitado Perú alguna vez? ¿Qué te atrajo del país?' }
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  const chips = [
    'Busco vida cerca del mar',
    'Me interesa la inversión en Cusco',
    '¿Qué trámites necesito siendo español?',
    'Quiero algo gastronómico y bohemio',
  ];

  function mockReply(userText) {
    const t = userText.toLowerCase();
    if (t.includes('mar') || t.includes('costa') || t.includes('playa')) {
      return 'Si buscas mar, Miraflores y Barranco en Lima son dos mundos distintos pero pegados al Pacífico. Barranco es bohemio, con bares de autor; Miraflores es más urbano y gastronómico. ¿Prefieres despertarte en callejuelas con arte callejero, o en un edificio moderno con vista al Malecón?';
    }
    if (t.includes('cusco') || t.includes('inversión') || t.includes('inversion')) {
      return 'Cusco es la joya de rentabilidad. El alquiler vacacional en San Blas ronda 9,4% anual — casi el triple que el centro de Madrid. Si buscas rendimiento y patrimonio UNESCO al mismo tiempo, hay casas coloniales restauradas desde $350K. ¿Compra para residir o puramente como inversión?';
    }
    if (t.includes('trámite') || t.includes('tramite') || t.includes('visa') || t.includes('legal')) {
      return 'Siendo español tienes los mismos derechos de compra que un peruano. Con una inversión desde $60.000 obtienes visa de inversionista. El proceso completo — oferta, minuta, escritura y registro — se cierra en 2-3 meses. Te paso después con nuestro asesor legal. ¿En qué región te imaginas viviendo?';
    }
    if (t.includes('gastronómico') || t.includes('gastronomico') || t.includes('bohemio') || t.includes('comida')) {
      return 'Entonces Barranco en Lima o San Blas en Cusco son tu casa. Barranco es el "Brooklyn peruano": galerías, bares de pisco, música en vivo. San Blas es colonial con el mercado de San Pedro a 10 minutos andando. ¿Vida urbana o algo más tranquilo al final del día?';
    }
    return 'Cuéntame más. ¿Te imaginas despertando junto al Pacífico en Lima, perdido entre callejuelas coloniales de Cusco, o rodeado de selva amazónica? Cada zona tiene su propia alma — y su propia rentabilidad.';
  }

  function send(text) {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role:'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { role:'ai', text: mockReply(text) }]);
      setTyping(false);
    }, 900 + Math.random()*600);
  }

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} style={{...chatStyles.fab, ...(open ? chatStyles.fabOpen : {})}}>
        {!open ? (
          <>
            <span style={{width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icons.spark}</span>
            <div style={{textAlign:'left'}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:400, lineHeight:1}}>Inca AI</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', color:'rgba(14,16,20,0.7)', marginTop:4, textTransform:'uppercase'}}>
                Pregunta lo que sea
              </div>
            </div>
          </>
        ) : (
          <span style={{width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center'}}>{Icons.close}</span>
        )}
      </button>

      {/* Panel */}
      <div style={{...chatStyles.panel, ...(open ? chatStyles.panelOpen : {})}}>
        <div style={chatStyles.header}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={chatStyles.avatar}>
              <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" stroke="#C9A961" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="#C9A961" />
              </svg>
            </div>
            <div>
              <div style={{fontFamily:'var(--font-display)', fontSize:18, color:'var(--text-on-dark)'}}>Inca AI</div>
              <div style={{display:'flex', alignItems:'center', gap:6, fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold-primary)', letterSpacing:'0.18em', marginTop:2}}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'#7FB069'}} />
                EN LÍNEA
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{color:'var(--text-on-dark-muted)', padding:8}}>{Icons.close}</button>
        </div>

        <div ref={scrollRef} style={chatStyles.msgs}>
          {msgs.map((m, i) => (
            <div key={i} style={{display:'flex', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start'}}>
              <div style={{
                maxWidth: '85%',
                padding: '14px 16px',
                background: m.role === 'user' ? 'var(--gold-primary)' : 'var(--bg-tertiary)',
                color: m.role === 'user' ? '#0E1014' : 'var(--text-on-dark)',
                border: m.role === 'user' ? '0' : '1px solid var(--border-dark)',
                fontSize: 14, lineHeight: 1.6,
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{display:'flex'}}>
              <div style={{padding:'16px 20px', background:'var(--bg-tertiary)', border:'1px solid var(--border-dark)'}}>
                <div style={{display:'flex', gap:4}}>
                  <span style={chatStyles.dot} />
                  <span style={{...chatStyles.dot, animationDelay:'.15s'}} />
                  <span style={{...chatStyles.dot, animationDelay:'.3s'}} />
                </div>
              </div>
            </div>
          )}
        </div>

        {msgs.length <= 1 && (
          <div style={chatStyles.chips}>
            {chips.map(c => (
              <button key={c} onClick={() => send(c)} style={chatStyles.chip}>{c}</button>
            ))}
          </div>
        )}

        <div style={chatStyles.inputRow}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Escribe tu mensaje..."
            style={chatStyles.input}
          />
          <button onClick={() => send(input)} style={chatStyles.sendBtn}>{Icons.send}</button>
        </div>
      </div>

      <style>{`
        @keyframes chatdot { 0%,80%,100%{opacity:.3;transform:scale(1)} 40%{opacity:1;transform:scale(1.3)} }
      `}</style>
    </>
  );
}

const chatStyles = {
  fab: {
    position: 'fixed', bottom: 32, right: 32, zIndex: 60,
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 22px 14px 18px',
    background: 'var(--gold-primary)',
    color: '#0E1014',
    cursor: 'pointer', border: 0,
    boxShadow: '0 20px 50px rgba(201,169,97,0.35), 0 0 0 1px rgba(201,169,97,0.3)',
    transition: 'all .3s ease',
  },
  fabOpen: {
    padding: 14, width: 52, height: 52, justifyContent: 'center',
    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
  },
  panel: {
    position: 'fixed', bottom: 100, right: 32, zIndex: 59,
    width: 400, maxHeight: 620, height: '70vh',
    background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
    display: 'flex', flexDirection: 'column',
    opacity: 0, transform: 'translateY(20px) scale(0.96)', pointerEvents: 'none',
    transition: 'all .3s ease',
  },
  panelOpen: { opacity: 1, transform: 'translateY(0) scale(1)', pointerEvents: 'auto' },
  header: {
    padding: '20px 22px',
    borderBottom: '1px solid var(--border-dark)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  avatar: {
    width: 44, height: 44,
    background: 'var(--bg-tertiary)', border: '1px solid var(--border-gold)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  msgs: {
    flex: 1, overflowY: 'auto', padding: '24px 22px',
    display: 'flex', flexDirection: 'column', gap: 14,
  },
  dot: {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-primary)',
    animation: 'chatdot 1.2s infinite ease-in-out',
  },
  chips: { padding: '0 22px 16px', display: 'flex', flexDirection: 'column', gap: 8 },
  chip: {
    textAlign: 'left', padding: '10px 14px',
    background: 'transparent', color: 'var(--text-on-dark-muted)',
    border: '1px solid var(--border-dark)',
    fontSize: 12, cursor: 'pointer', transition: 'all .2s ease',
  },
  inputRow: {
    display: 'flex', borderTop: '1px solid var(--border-dark)', padding: 8, gap: 8,
  },
  input: {
    flex: 1, padding: '12px 14px', background: 'transparent',
    border: 0, outline: 'none', color: 'var(--text-on-dark)', fontSize: 14,
  },
  sendBtn: {
    padding: '0 16px', background: 'var(--gold-primary)', color: '#0E1014',
    border: 0, cursor: 'pointer',
  },
};

window.IncaAI = IncaAI;
