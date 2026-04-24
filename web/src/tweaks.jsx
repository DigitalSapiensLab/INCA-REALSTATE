// Tweaks panel — controls hero variant, motif intensity, density
function Tweaks({ state, setState }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onMsg(e) {
      if (!e.data || !e.data.type) return;
      if (e.data.type === '__activate_edit_mode') setOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setOpen(false);
    }
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  function persist(patch) {
    const next = { ...state, ...patch };
    setState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  }

  return (
    <div className={'tweaks-panel' + (open ? ' open' : '')}>
      <h4>Tweaks</h4>
      <div className="sub">Ajustes de diseño</div>

      <div className="tweaks-row">
        <label>Hero</label>
        <div className="tweaks-options">
          {[['rotating','Rotativa'],['typographic','Tipográfica'],['fullbleed','Full bleed']].map(([k,l]) => (
            <button key={k} className={state.heroVariant===k?'active':''} onClick={() => persist({ heroVariant: k })}>{l}</button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <label>Motivos incaicos</label>
        <div className="tweaks-options">
          {[['low','Sutil'],['normal','Moderado'],['high','Rico']].map(([k,l]) => (
            <button key={k} className={state.motif===k?'active':''} onClick={() => persist({ motif: k })}>{l}</button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <label>Densidad</label>
        <div className="tweaks-options">
          {[['compact','Compacto'],['normal','Normal'],['airy','Aireado']].map(([k,l]) => (
            <button key={k} className={state.density===k?'active':''} onClick={() => persist({ density: k })}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
