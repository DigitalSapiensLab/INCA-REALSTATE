# i18n (Español + Inglés) · feature pausada

> Estado: **en espera**. No incluido en `index.html`. La web sigue funcionando
> 100% en español como estaba antes.
> Pausada el 2026-05-14 por decisión del usuario para retomar en otro momento.

## Qué hay aquí

- **`i18n.jsx`** — sistema completo y listo: hooks `useT()` / `useLocale()`,
  función `setLocale('en')`, persistencia en localStorage, diccionario ES + EN
  con ~180 claves traducidas (nav, hero, properties, footer, chat, formulario
  Add Property, success screen, placeholders de selects).

Tono editorial alineado con BRAND-BRIEF.md §6: "We don't sell houses. We sell Peru.",
"A country first, then a home.", etc.

## Cómo se activa cuando se retome (5 pasos)

1. **Mover el archivo a `web/src/`**
   ```bash
   mv pending-features/i18n/i18n.jsx web/src/i18n.jsx
   ```

2. **Incluirlo en `web/index.html`** — debe cargarse ANTES de los demás `.jsx`
   (los componentes lo usan). Justo después de los scripts de React/Babel:
   ```html
   <script type="text/babel" src="src/i18n.jsx"></script>
   <script type="text/babel" src="src/icons.jsx"></script>
   ...
   ```

3. **Banderas en `web/src/nav.jsx`** — reemplazar el bloque `<div className="lang-toggle">`
   por dos botones con SVG inline (ES + UK) que llamen a `window.setLocale('es')`
   o `window.setLocale('en')`. Marcar la activa con `useLocale()`.
   Estilos: añadir `.lang-flags` y `.lang-flag` al `<style>` de `index.html`
   (oro al hover, opacidad 0.5 las inactivas).

4. **Aplicar `t()` en componentes** — cada string visible se reemplaza por
   `t('clave')`. Orden sugerido:
   - `nav.jsx` (los 7 links + el CTA)
   - `app.jsx` → `TypographicHero` y `FullBleedHero` (label, título, subtítulo, CTAs)
   - `properties.jsx` (eyebrow, título, macro chips, "Desde", "% ret.", "hab", "baños")
   - `footer.jsx` (band, columnas, newsletter, copyright, links legales)
   - `chat.jsx` (saludo, header "ASESOR EN LÍNEA", placeholder, chips)
   - `add-property.jsx` (hero, 4 secciones, todos los labels, success screen)

   Patrón:
   ```jsx
   const t = useT();
   // ...
   <h1>{t('hero.t.title1')}</h1>
   ```

5. **Test end-to-end**
   - Recargar con `Ctrl+F5` → ver banderas en nav.
   - Click en bandera UK → todo el chrome cambia a inglés.
   - Recargar la página → el idioma se mantiene (localStorage).
   - Click en bandera ES → vuelve al español.

## Pendiente para una "fase 2" de traducción

Los **textos editoriales largos** (literatura pura) se dejaron en español:
- `web/src/city-landings-data.jsx` — descripciones de cultura, gastronomía, economía,
  gente, turismo, inversión de cada ciudad (~25 ciudades × 6 párrafos).
- `web/src/macro-region-data.jsx` — bloques editoriales por macro región.
- `web/src/regiondata.jsx` — bloques largos por región.

Recomendación: traducir esto en una pasada manual con copywriter (no AI) para
mantener el tono Monocle/Kinfolk del BRAND-BRIEF.

## Notas técnicas

- El sistema usa **CustomEvent('localechange')** + hook `useLocale()` para
  re-renderizar todos los componentes cuando cambia el idioma. No requiere
  React Context ni librerías externas.
- Las claves usan notación punto: `'add.field.email'`, `'hero.t.title1'`, etc.
- Soporta interpolación: `t('prop.cities_of', { macro: 'Costa', count: 8 })`.
- Locale por defecto: `es`. Si el usuario nunca elige idioma, queda en español.
- Las claves que falten en `en` caen automáticamente al ES (fallback seguro).
