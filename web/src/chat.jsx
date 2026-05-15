// Floating Andes AI chat widget.
// Actúa como asesor inmobiliario editorial local: conoce la ciudad que el
// usuario está mirando (cuando aplica), sugiere propiedades reales del
// inventario y deriva a WhatsApp cuando detecta intención.

const ACE_WHATSAPP_URL = 'https://wa.me/34910555092?text=' +
  encodeURIComponent('Hola Andes Capital Estates, vengo del chat de la web y me gustaría seguir la conversación con un asesor.');

// Captura el contexto de la página actual para enviarlo al backend.
// El backend lo usa para que el AI hable como local de la ciudad concreta
// y conozca el inventario visible.
function getPageContext() {
  const hash = window.location.hash || '';
  const cityMatch = hash.match(/^#ciudad\/([\w-]+)/);
  const properties = window.PROPERTIES || [];
  const regions = window.REGIONS || [];
  const cityLandings = window.CITY_LANDINGS || {};

  if (cityMatch) {
    const cityId = cityMatch[1];
    const data = cityLandings[cityId];
    const region = regions.find(r => r.id === cityId);
    const macro = data?.macro || region?.tipo || null;
    // Propiedades de la macro región activa (la ciudad puede no tener stock propio).
    const matches = properties
      .filter(p => p.region === (data?.region || region?.nombre) || p.macro === macro)
      .slice(0, 10);
    return {
      pageType: 'city',
      cityId,
      cityName: data?.nombre || region?.capital || cityId,
      regionName: data?.region || region?.nombre || '',
      macro,
      heroLede: data?.hero_lede || '',
      stats: data?.stats || [],
      properties: matches,
    };
  }
  if (hash === '#agregar-propiedad') {
    return { pageType: 'addProperty', properties: [] };
  }
  if (hash === '#internacional') {
    return { pageType: 'international', properties: [] };
  }
  return {
    pageType: 'home',
    properties: properties.slice(0, 10),
  };
}

// Parsea la respuesta del AI extrayendo [ficha:id] y [whatsapp] de la texto plano.
function parseAssistantMessage(raw) {
  const result = { text: raw, fichas: [], whatsapp: false };
  if (!raw) return result;
  const properties = window.PROPERTIES || [];

  // [ficha:p-cu-1] → tarjeta
  const fichaRe = /\[ficha:([\w-]+)\]/g;
  result.text = raw.replace(fichaRe, (_, id) => {
    const p = properties.find(x => x.id === id);
    if (p && !result.fichas.find(f => f.id === id)) result.fichas.push(p);
    return ''; // se elimina del texto; la tarjeta se renderiza aparte
  });

  // [whatsapp] → botón
  if (/\[whatsapp\]/i.test(result.text)) {
    result.whatsapp = true;
    result.text = result.text.replace(/\[whatsapp\]/gi, '');
  }

  result.text = result.text.replace(/\n{3,}/g, '\n\n').trim();
  return result;
}

function AndesAI() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([
    {
      role: 'ai',
      text: 'Hola, soy Andes AI. Conozco las 25 regiones del Perú al detalle y puedo ayudarte a decidir dónde encajaría mejor tu próxima vida o tu próxima inversión. Si ya estás mirando una ciudad concreta, dímelo y entramos en barrio. ¿Por dónde empezamos?',
      fichas: [],
    },
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  // Sugerencias iniciales: cambian según la página activa.
  const chips = React.useMemo(() => {
    const ctx = getPageContext();
    if (ctx.pageType === 'city') {
      return [
        `Cuéntame de ${ctx.cityName} como si vivieras allí`,
        '¿Qué barrio me recomendarías?',
        '¿Cómo está la rentabilidad por aquí?',
        'Muéstrame opciones reales del inventario',
      ];
    }
    if (ctx.pageType === 'addProperty') {
      return [
        '¿Cómo funciona la verificación?',
        '¿Qué comisión cobran?',
        '¿En qué plazo me contactan?',
        '¿Qué propiedades buscan?',
      ];
    }
    return [
      'Busco vida cerca del mar',
      'Me interesa Cusco para invertir',
      '¿Qué barrio de Lima me recomiendas?',
      '¿Qué trámites necesito siendo español?',
    ];
  }, [msgs.length === 1]);

  // Fallback offline si la API falla.
  function fallbackReply(userText) {
    const t = userText.toLowerCase();
    if (t.includes('mar') || t.includes('playa') || t.includes('costa')) {
      return 'Si te llama el mar, Miraflores y Barranco en Lima son dos mundos pegados al Pacífico: uno urbano y gastronómico, otro bohemio y de bares de pisco. ¿Te imaginas más en una vida de calles tranquilas o de movimiento constante?';
    }
    if (t.includes('cusco')) {
      return 'Cusco es lento, alto y muy vivo. El barrio de San Blas concentra casi todo lo interesante: callejuelas empedradas, talleres, mercados y rentabilidades por encima del 9% en alquiler vacacional. ¿Buscas vivir allí o ponerlo a rentar?';
    }
    return 'En este momento no puedo conectarme bien con mi base. Si me cuentas qué ciudad o qué tipo de vida buscas, te oriento por aquí o te paso con un asesor humano.';
  }

  async function callAndesAI(history) {
    const messages = history.map(m => ({
      role: m.role === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));
    const context = getPageContext();
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context }),
    });
    if (!r.ok) throw new Error('chat-' + r.status);
    const data = await r.json();
    if (!data.reply) throw new Error('empty-reply');
    return data.reply;
  }

  async function send(text) {
    if (!text.trim() || typing) return;
    const userMsg = { role: 'user', text };
    const nextHistory = [...msgs, userMsg];
    setMsgs(nextHistory);
    setInput('');
    setTyping(true);
    try {
      const raw = await callAndesAI(nextHistory);
      const parsed = parseAssistantMessage(raw);
      setMsgs(m => [...m, { role: 'ai', text: parsed.text, fichas: parsed.fichas, whatsapp: parsed.whatsapp }]);
    } catch (e) {
      console.warn('[Andes AI] fallback:', e.message);
      setMsgs(m => [...m, { role: 'ai', text: fallbackReply(text), fichas: [] }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} style={{ ...chatStyles.fab, ...(open ? chatStyles.fabOpen : {}) }}>
        {!open ? (
          <>
            <span style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.spark}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, lineHeight: 1 }}>Andes AI</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(14,16,20,0.7)', marginTop: 4, textTransform: 'uppercase' }}>
                Tu asesor local
              </div>
            </div>
          </>
        ) : (
          <span style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.close}</span>
        )}
      </button>

      {/* Panel */}
      <div style={{ ...chatStyles.panel, ...(open ? chatStyles.panelOpen : {}) }}>
        <div style={chatStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={chatStyles.avatar}>
              <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" stroke="#C9A961" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="#C9A961" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-on-dark)' }}>Andes AI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold-primary)', letterSpacing: '0.18em', marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7FB069' }} />
                ASESOR EN LÍNEA
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ color: 'var(--text-on-dark-muted)', padding: 8 }}>{Icons.close}</button>
        </div>

        <div ref={scrollRef} style={chatStyles.msgs}>
          {msgs.map((m, i) => (
            <MessageBubble key={i} m={m} />
          ))}
          {typing && (
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '16px 20px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-dark)' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span style={chatStyles.dot} />
                  <span style={{ ...chatStyles.dot, animationDelay: '.15s' }} />
                  <span style={{ ...chatStyles.dot, animationDelay: '.3s' }} />
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
            placeholder="Pregúntale a tu asesor local…"
            style={chatStyles.input}
            disabled={typing}
          />
          <button onClick={() => send(input)} style={chatStyles.sendBtn} disabled={typing || !input.trim()}>{Icons.send}</button>
        </div>
      </div>

      <style>{`
        @keyframes chatdot { 0%,80%,100%{opacity:.3;transform:scale(1)} 40%{opacity:1;transform:scale(1.3)} }
      `}</style>
    </>
  );
}

// ─── Subcomponentes ─────────────────────────────────────────────────────

function MessageBubble({ m }) {
  if (m.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ maxWidth: '85%', padding: '14px 16px', background: 'var(--gold-primary)', color: '#0E1014', fontSize: 14, lineHeight: 1.6 }}>
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', maxWidth: '92%' }}>
      {m.text && (
        <div style={{ padding: '14px 16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-dark)', color: 'var(--text-on-dark)', fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
          {m.text}
        </div>
      )}
      {Array.isArray(m.fichas) && m.fichas.map(p => <PropertyCard key={p.id} p={p} />)}
      {m.whatsapp && (
        <a
          href={ACE_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 18px',
            background: '#25D366',
            color: '#0E1014',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            border: '1px solid #25D366',
            textDecoration: 'none',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0E1014' }} />
          Continuar por WhatsApp
        </a>
      )}
    </div>
  );
}

function PropertyCard({ p }) {
  const goCity = () => {
    const regionsList = window.REGIONS || [];
    const region = regionsList.find(r => r.nombre === p.region);
    if (region) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.location.hash = '#ciudad/' + region.id;
    }
  };
  return (
    <button
      onClick={goCity}
      style={{
        display: 'flex', gap: 12,
        width: '100%',
        padding: 10,
        background: 'rgba(201,169,97,0.04)',
        border: '1px solid var(--border-gold)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background .2s ease, border-color .2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,97,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,169,97,0.04)'; }}
    >
      <div style={{
        width: 88, height: 88, flexShrink: 0,
        backgroundImage: `url(${p.img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        border: '1px solid var(--border-dark)',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>
          {p.tipo} · {p.region}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text-on-dark)', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {p.titulo}
        </div>
        <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-on-dark-muted)', letterSpacing: '0.06em', flexWrap: 'wrap' }}>
          {p.m2 ? <span>{p.m2} m²</span> : null}
          {p.hab ? <span>{p.hab} hab</span> : null}
          {p.ban ? <span>{p.ban} baños</span> : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-on-dark)' }}>
            ${Number(p.precio).toLocaleString('es-ES')}
          </span>
          {p.retorno && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold-primary)', letterSpacing: '0.1em' }}>
              {p.retorno}% ret.
            </span>
          )}
        </div>
      </div>
    </button>
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
    width: 420, maxHeight: 680, height: '78vh',
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
    display: 'flex', flexDirection: 'column', gap: 16,
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

window.AndesAI = AndesAI;
