// Navbar with logo, links, language toggle, phone
function Navbar({ active, onNav }) {
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'peru', label: 'Descubrir Perú' },
    { id: 'regiones', label: 'Regiones' },
    { id: 'propiedades', label: 'Propiedades' },
    { id: 'internacional', label: 'Andes International' },
    { id: 'alianza', label: 'Alianza Internacional' },
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
          <span className="name-top">ANDES CAPITAL</span>
          <span className="name-bot">ESTATES</span>
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
        <a
          href="#agregar-propiedad"
          className="nav-cta"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'instant' });
            window.location.hash = '#agregar-propiedad';
          }}
        >
          <span className="nav-cta-dot" />
          Agregar propiedad
        </a>
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
