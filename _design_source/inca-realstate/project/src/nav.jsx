// Navbar with logo, links, language toggle, phone
function Navbar({ active, onNav }) {
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'peru', label: 'Descubrir Perú' },
    { id: 'regiones', label: 'Regiones' },
    { id: 'propiedades', label: 'Propiedades' },
    { id: 'inversion', label: 'Inversión' },
    { id: 'contacto', label: 'Contacto' },
  ];
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-mark">
          {/* Original geometric Inca-inspired stepped mark */}
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M24 4 L44 14 L44 34 L24 44 L4 34 L4 14 Z" stroke="#C9A961" strokeWidth="1" />
            <path d="M18 20 H30 V24 H26 V28 H22 V32 H18 Z M30 20 V32 H26" stroke="#C9A961" strokeWidth="1.2" fill="none" />
            <circle cx="24" cy="16" r="1.5" fill="#C9A961" />
          </svg>
        </div>
        <div className="brand-text">
          <span className="name">INCA ESTATES</span>
          <span className="sub">Propiedad · Perú</span>
        </div>
      </div>
      <div className="nav-links">
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}
             onClick={(e) => { e.preventDefault(); onNav && onNav(l.id); }}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="nav-right">
        <div className="lang-toggle">
          <span className="active">ES</span>
          <span className="sep">·</span>
          <span>EN</span>
          <span className="sep">·</span>
          <span>PT</span>
        </div>
        <div className="phone-chip">+34 910 555 092</div>
      </div>
    </nav>
  );
}

function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <div className="label">Redes</div>
      <div className="line" />
      <div className="icons">
        <a href="#" aria-label="Instagram">{Icons.ig}</a>
        <a href="#" aria-label="Facebook">{Icons.fb}</a>
        <a href="#" aria-label="YouTube">{Icons.yt}</a>
        <a href="#" aria-label="Twitter">{Icons.tw}</a>
      </div>
    </div>
  );
}

window.Navbar = Navbar;
window.SocialSidebar = SocialSidebar;
