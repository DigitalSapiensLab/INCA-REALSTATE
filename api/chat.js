// Andes AI · Vercel serverless function
// Espejo en producción de la lógica de web/server.js → handleChat.
// La API key vive solo en variables de entorno de Vercel
// (Settings → Environment Variables · ANTHROPIC_API_KEY).

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
  const ANTHROPIC_MODEL   = process.env.ANTHROPIC_MODEL   || 'claude-sonnet-4-6';

  if (!ANTHROPIC_API_KEY || !ANTHROPIC_API_KEY.startsWith('sk-ant-')) {
    res.status(500).json({
      error: 'ANTHROPIC_API_KEY not configured. Set it in Vercel → Settings → Environment Variables.'
    });
    return;
  }

  // Vercel auto-parsea req.body cuando el Content-Type es application/json.
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const messages = Array.isArray(body.messages) ? body.messages : [];

  if (!messages.length) {
    res.status(400).json({ error: 'messages array required' });
    return;
  }

  const safeMessages = messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }))
    .slice(-20);

  if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== 'user') {
    res.status(400).json({ error: 'last message must be from user' });
    return;
  }

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
      res.status(upstream.status).json({ error: 'upstream', status: upstream.status });
      return;
    }

    const data = await upstream.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ reply: text || 'Cuéntame un poco más.', model: ANTHROPIC_MODEL });
  } catch (e) {
    console.error('[anthropic] fetch failed', e);
    res.status(502).json({ error: 'Could not reach Anthropic API' });
  }
};
