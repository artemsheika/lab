// Sidebar navigation
const SIDEBAR_WIDTH = 240;

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',         icon: I.Dashboard, phase: 2 },
  { id: 'mortgage',  label: 'Mortgage',         icon: I.Home,      phase: 1 },
  { id: 'cards',     label: 'Everyday Banking', icon: I.Wallet,    phase: 2, statusKey: 'cards' },
  { id: 'insurance', label: 'Insurance',        icon: I.Shield,    phase: 2, statusKey: 'insurance' },
  { id: 'guidelines',label: 'Guidelines',       icon: I.Book,      phase: 1 },
];

const STATUS_PILL = (status) => {
  if (status === 'approved') return <Pill tone="lime" size="s">Approved</Pill>;
  if (status === 'pending')  return <Pill tone="tangerine" size="s">Pending</Pill>;
  return <Pill tone="stone" size="s">Locked</Pill>;
};

// Inline nav list — used by both the desktop sidebar AND the mobile drawer.
const SidebarBody = ({ page, onNavigate, status, onSignOut, dense = false }) => (
  <>
    {/* Brand block */}
    <div style={{ padding: '20px 20px', borderBottom: '1px solid var(--rh-stone-light)', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60 }}>
      <img src="assets/logos/r_logo_300x300.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }}/>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 14, letterSpacing: '-0.01em' }}>
        <span style={{ fontWeight: 700, color: 'var(--rh-blackberry)' }}>ratehub.ca</span>
        <span style={{ color: 'var(--rh-stone)', fontWeight: 400 }}>/</span>
        <span style={{ color: 'var(--rh-stone-darkest)', fontWeight: 400 }}>partners</span>
      </div>
    </div>

    <nav style={{ padding: 12, flex: 1, overflow: 'auto' }}>
      {NAV_ITEMS.map(item => {
        const active = page === item.id;
        const Icon = item.icon;
        const itemStatus = item.statusKey ? status[item.statusKey] : null;
        return (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className="nav-item"
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: dense ? '8px 10px 8px 13px' : '12px 10px 12px 13px',
              minHeight: 44,
              background: active ? 'var(--rh-blueberry-lightest)' : 'transparent',
              border: 'none', borderRadius: 7, cursor: 'pointer',
              marginBottom: 2, fontFamily: 'inherit', fontSize: 14,
              color: active ? 'var(--rh-blueberry-darkest)' : 'var(--rh-blackberry)',
              fontWeight: active ? 500 : 400,
              position: 'relative', textAlign: 'left',
            }}>
            {active && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: 'var(--rh-blueberry-dark)', borderRadius: 2 }}/>}
            <Icon size={17} stroke={1.8} style={{ color: active ? 'var(--rh-blueberry-dark)' : 'var(--rh-stone-darkest)' }}/>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
              {item.phase && (
                <Pill tone={item.phase === 1 ? 'berry' : 'stone'} size="s">Phase {item.phase}</Pill>
              )}
              {itemStatus && STATUS_PILL(itemStatus)}
            </span>
          </button>
        );
      })}
    </nav>

    <div style={{
      borderTop: '1px solid var(--rh-stone-light)',
      padding: '14px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <Avatar name={PARTNER.name} size={34}/>
      <div style={{ flex: 1, minWidth: 0, lineHeight: 1.25 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-blackberry)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{PARTNER.name}</div>
        <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{PARTNER.email}</div>
      </div>
      <button onClick={onSignOut} aria-label="Sign out" title="Sign out"
        style={{
          background: 'transparent', border: 'none', padding: 10, cursor: 'pointer',
          color: 'var(--rh-stone-darkest)', borderRadius: 6, display: 'flex',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--rh-blackberry)'; e.currentTarget.style.background = 'var(--rh-stone-lightest)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--rh-stone-darkest)'; e.currentTarget.style.background = 'transparent'; }}
      ><I.LogOut size={16}/></button>
    </div>
  </>
);

const Sidebar = ({ page, onNavigate, status, onSignOut }) => (
  <aside className="hide-mobile" style={{
    width: SIDEBAR_WIDTH, background: '#fff',
    borderRight: '1px solid var(--rh-stone-light)',
    display: 'flex', flexDirection: 'column',
    flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
  }}>
    <SidebarBody page={page} onNavigate={onNavigate} status={status} onSignOut={onSignOut} dense/>
  </aside>
);

// Mobile drawer — slides in from the left covering the viewport.
const SidebarDrawer = ({ open, onClose, page, onNavigate, status, onSignOut }) => {
  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} className="backdrop-fade" style={{ position: 'absolute', inset: 0, background: 'rgba(0,30,42,0.42)' }}/>
      <aside style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 'min(320px, 88vw)',
        background: '#fff', boxShadow: 'var(--rh-shadow-l)',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInLeft 280ms cubic-bezier(.2,.8,.2,1)',
      }}>
        <SidebarBody
          page={page}
          onNavigate={(p) => { onNavigate(p); onClose(); }}
          status={status}
          onSignOut={() => { onClose(); onSignOut(); }}
        />
      </aside>
      <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
};

const PAGE_TITLE_FOR_HEADER = {
  overview: 'Overview', mortgage: 'Mortgage', cards: 'Everyday Banking',
  insurance: 'Insurance', guidelines: 'Guidelines',
};

// Mobile-only top bar inside the portal canvas.
const MobilePortalHeader = ({ page, onOpen }) => (
  <div className="show-mobile" style={{
    position: 'sticky', top: 0, zIndex: 30,
    background: '#fff', borderBottom: '1px solid var(--rh-stone-light)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 10px', minHeight: 56,
  }}>
    <button onClick={onOpen} aria-label="Open menu"
      style={{
        background: 'transparent', border: 'none', padding: 12, cursor: 'pointer',
        color: 'var(--rh-blackberry)', borderRadius: 8, display: 'flex',
      }}><I.Menu size={20}/></button>
    <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>
      {PAGE_TITLE_FOR_HEADER[page] || ''}
    </div>
    <div style={{ width: 44, padding: 6, display: 'flex', justifyContent: 'flex-end' }}>
      <Avatar name={PARTNER.name} size={30}/>
    </div>
  </div>
);

window.Sidebar = Sidebar;
window.SidebarDrawer = SidebarDrawer;
window.MobilePortalHeader = MobilePortalHeader;
window.STATUS_PILL = STATUS_PILL;
