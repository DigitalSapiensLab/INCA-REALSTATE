// Andes Capital Estates · dev server
// Sirve los archivos estáticos del sitio Y actúa como proxy seguro
// para Andes AI hacia la API de Anthropic. La API key vive solo aquí
// (proceso Node), nunca en el frontend.

const http = require('http');
const fs = require('fs');
const path = require('path');

// ─── load .env ──────────────────────────────────────────────────────────
// Parser mínimo, sin dependencias. Lee KEY=VALUE por línea, ignora
// comentarios (#) y líneas vacías. Solo aplica si la variable no está
// ya definida en process.env (variables del shell tienen prioridad).
(function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    });
  } catch (e) {
    console.warn('[.env] Could not read:', e.message);
  }
})();

const ROOT = __dirname;
const PORT = 5173;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const ANTHROPIC_MODEL   = process.env.ANTHROPIC_MODEL   || 'claude-sonnet-4-6';
const ANTHROPIC_URL     = 'https://api.anthropic.com/v1/messages';

// ─── Andes AI · system prompt ───────────────────────────────────────────
// Asesor inmobiliario editorial local. Mantiene el tono editorial del
// BRAND-BRIEF §6 (no hype, no lexicón prohibido) pero actúa como vecino-
// asesor que conoce su ciudad, da datos cuando son útiles, sugiere
// propiedades concretas del inventario y deriva a WhatsApp en intención.
const ANDES_AI_SYSTEM_BASE = `Eres Andes AI, asesor editorial e inmobiliario de Andes Capital Estates (ACE).
ACE vende Perú a compradores e inversores europeos con doble sede en Madrid (C/ Serrano 47)
y Lima (Av. Larco 1301, Miraflores).

═══ TU ROL ═══
Eres simultáneamente dos cosas y nunca solo una:
1) Un editor de revista de viajes que conoce Perú al detalle (referencia Monocle, Condé Nast Traveler).
2) Un asesor inmobiliario local de la ciudad concreta que el usuario está mirando — el vecino
   que conoce los barrios, los caseros, los restaurantes, las calles que valen la pena y las que no.

No eres un broker frío. No eres un AI genérico. Eres "el local culto" que le explica
su ciudad a un europeo curioso y, cuando el usuario lo pide, lo ayuda a encontrar
la propiedad adecuada y a dar el siguiente paso.

═══ TONO ═══
Cálido, culto, sereno, concreto. Sensorial antes que técnico (primero el plato, el
clima, la calle; después el yield). Cero hype, cero urgencia falsa, cero emojis,
cero exclamaciones gratuitas. Hablas como alguien que ha vivido en esa ciudad,
no como alguien que la googleó. Respuestas cortas: 1 a 3 párrafos casi siempre.

═══ LEXICÓN PROHIBIDO (nunca aparecen estas palabras) ═══
"oportunidad única", "increíble", "mágico", "místico", "paradisíaco", "exótico",
"chollo", "ganga", "barato" (di "accesible"), "tercer mundo", "energías ancestrales",
"el místico Perú", "últimas unidades".

═══ DATOS QUE PUEDES USAR (verificados) ═══
• Retornos anuales orientativos: Cusco hasta 9,4%, Arequipa 7,8%, Lima 7,2%, Tarapoto 9,4%, Iquitos 9,0%.
• Visa de inversionista peruana desde 60.000 USD.
• Alcabala 3%. El extranjero compra con los mismos derechos que un peruano.
• Proceso de compra completo: 2 a 3 meses (oferta, minuta, escritura, registro).
• 25 regiones del Perú · 1.480+ propiedades en cartera total.
• Si dudas de una cifra, di "tendría que pedirle el dato exacto a nuestro equipo" — nunca inventes.

═══ CÓMO ATIENDES (flujo) ═══
1. Si el usuario te saluda sin contexto: presenta brevemente y pregunta qué busca o qué ciudad le interesa.
2. Si está viendo una ciudad concreta (el sistema te dirá cuál en el bloque CONTEXTO):
   actúas como asesor LOCAL de ESA ciudad. Hablas de sus barrios reales (San Blas, Miraflores,
   Barranco, Cayma…), de su comida, de su carácter, de qué tipo de persona suele encajar ahí.
   Si te preguntan por inversión, hablas de yield, de demanda de alquiler vacacional, de
   estacionalidad, de regulación local. Cuando viene al caso, sugieres propiedades específicas
   del inventario disponible (ver INVENTARIO).
3. Cuando recomiendes una propiedad concreta del inventario, escribe su id entre corchetes
   con el prefijo "ficha": ejemplo \`[ficha:p-cu-1]\`. El sistema renderizará la tarjeta
   con foto, m², precio y retorno automáticamente debajo de tu mensaje. Menciona como máximo
   2 propiedades por respuesta. NO inventes ids: usa solo los que aparezcan en INVENTARIO.
4. Si detectas intención de compra clara, capacidad de pago real, o el usuario pide hablar
   con alguien: ofrece pasar la conversación a WhatsApp con un asesor humano. Escribe
   exactamente \`[whatsapp]\` al final del mensaje (el sistema lo convertirá en un botón).
   Solo úsalo cuando proceda — no en cada respuesta.
5. Si el usuario quiere ver más opciones, sugiere abrir la ficha de la ciudad o usar
   el filtro Costa/Sierra/Selva en la portada.

═══ FORMATO ═══
Texto corrido. Una pregunta abierta al final cuando sea natural, sin forzar.
Sin listas con viñetas, salvo si el usuario las pide. Sin negritas. Sin markdown
decorativo. Sí puedes usar el formato \`[ficha:id]\` y \`[whatsapp]\` cuando proceda.

═══ IDIOMAS ═══
Responde en el idioma del usuario. Por defecto español de España. Si te escriben en
inglés, contestas en inglés cálido y editorial. Si te escriben en portugués, en portugués.

═══ LO QUE NUNCA HACES ═══
• Inventar propiedades, datos concretos, casos de clientes, números o nombres.
• Prometer rentabilidades garantizadas.
• Usar emojis o lenguaje publicitario.
• Negarte a hablar de precios o de yields cuando el usuario pregunta directamente — eres asesor.
• Cerrar la venta tú mismo. La compra final la coordina un humano.

Recuerda: el usuario está pensando en cambiar de vida o diversificar patrimonio.
Trátalo con la seriedad y la calidez de quien sabe que eso no es una decisión casual.`;

// Compone el system prompt final inyectando contexto de página + inventario filtrado.
function buildSystemPrompt(context) {
  const lines = [ANDES_AI_SYSTEM_BASE];

  if (context && context.cityName) {
    lines.push('\n═══ CONTEXTO ACTUAL DEL USUARIO ═══');
    lines.push(`El usuario está viendo la página de: ${context.cityName}` +
               (context.regionName && context.regionName !== context.cityName ? `, ${context.regionName}` : '') +
               (context.macro ? ` (${context.macro}).` : '.'));
    if (context.heroLede) lines.push(`Resumen editorial de la zona: ${context.heroLede}`);
    if (Array.isArray(context.stats) && context.stats.length) {
      const statsText = context.stats.map(s => `${s.label}: ${s.value}`).join(' · ');
      lines.push(`Datos clave de ${context.cityName}: ${statsText}.`);
    }
    lines.push(`Actúa como asesor local de ${context.cityName}.`);
  } else if (context && context.pageType === 'home') {
    lines.push('\n═══ CONTEXTO ACTUAL DEL USUARIO ═══');
    lines.push('El usuario está en la portada de ACE (vista general de Perú).');
  } else if (context && context.pageType === 'addProperty') {
    lines.push('\n═══ CONTEXTO ACTUAL DEL USUARIO ═══');
    lines.push('El usuario está en la página de "Agregar propiedad" — es un propietario o inmobiliaria que considera listar inventario. Actúa como asesor B2B: explica el proceso de verificación, comisión, fotografía profesional y alcance de la plataforma.');
  }

  if (Array.isArray(context?.properties) && context.properties.length) {
    lines.push('\n═══ INVENTARIO DISPONIBLE (usa solo estos ids en [ficha:id]) ═══');
    context.properties.slice(0, 12).forEach(p => {
      const parts = [
        `id=${p.id}`,
        `"${p.titulo}"`,
        `${p.tipo}`,
        p.barrio ? `barrio=${p.barrio}` : null,
        p.region ? `región=${p.region}` : null,
        p.m2 ? `${p.m2} m²` : null,
        p.hab ? `${p.hab} hab` : null,
        p.ban ? `${p.ban} baños` : null,
        p.precio ? `precio=USD ${Number(p.precio).toLocaleString('en-US')}` : null,
        p.retorno ? `yield=${p.retorno}%` : null,
        Array.isArray(p.tags) && p.tags.length ? `tags=[${p.tags.join(', ')}]` : null,
      ].filter(Boolean);
      lines.push('• ' + parts.join(' · '));
    });
  }

  return lines.join('\n');
}

// ─── helper: read JSON body ────────────────────────────────────────────
function readJsonBody(req, limit = 1024 * 64) {
  return new Promise((resolve, reject) => {
    let buf = '';
    let total = 0;
    req.on('data', chunk => {
      total += chunk.length;
      if (total > limit) { req.destroy(); reject(new Error('Body too large')); return; }
      buf += chunk;
    });
    req.on('end', () => {
      if (!buf) return resolve({});
      try { resolve(JSON.parse(buf)); } catch (e) { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

// ─── /api/chat handler ──────────────────────────────────────────────────
async function handleChat(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  if (!ANTHROPIC_API_KEY || !ANTHROPIC_API_KEY.startsWith('sk-ant-')) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      error: 'ANTHROPIC_API_KEY not configured. Set it in .env at the project root.'
    }));
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ error: e.message }));
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ error: 'messages array required' }));
  }

  // Sanitize: only role + content, only "user" / "assistant" roles, content as string.
  const safeMessages = messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }))
    .slice(-20); // last 20 turns is plenty for this assistant

  if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== 'user') {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ error: 'last message must be from user' }));
  }

  // Contexto de página (opcional). El frontend lo pasa para que el AI sepa
  // qué ciudad / sección está mirando el usuario y qué propiedades tiene a la vista.
  const context = body.context && typeof body.context === 'object' ? body.context : {};
  const systemPrompt = buildSystemPrompt(context);

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 600,
        system: systemPrompt,
        messages: safeMessages,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error('[anthropic] upstream error', upstream.status, errText);
      res.writeHead(upstream.status, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'upstream', status: upstream.status }));
    }

    const data = await upstream.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ reply: text || 'Cuéntame un poco más.', model: ANTHROPIC_MODEL }));
  } catch (e) {
    console.error('[anthropic] fetch failed', e);
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Could not reach Anthropic API' }));
  }
}

// ─── static + router ────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.jsx':  'text/babel; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg':  'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

http.createServer(async (req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  // API routes
  if (urlPath === '/api/chat') {
    return handleChat(req, res);
  }

  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + urlPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  const keyOk = ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.startsWith('sk-ant-');
  console.log(`Andes Capital Estates → http://localhost:${PORT}/`);
  console.log(`Andes AI proxy        → ${keyOk ? 'READY (' + ANTHROPIC_MODEL + ')' : 'DISABLED — set ANTHROPIC_API_KEY in .env'}`);
});
