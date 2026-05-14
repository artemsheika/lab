// Sidebar navigation

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',         icon: I.Dashboard },
  { id: 'mortgage',  label: 'Mortgage',         icon: I.Home },
  { id: 'cards',     label: 'Credit Cards',     icon: I.CreditCard, statusKey: 'cards' },
  { id: 'insurance', label: 'Insurance',        icon: I.Shield,     statusKey: 'insurance' },
  { id: 'banking',   label: 'Banking & Loans',  icon: I.Landmark,   pill: { tone: 'stone', label: 'Coming soon' } },
  { id: 'guidelines',label: 'Guidelines',       icon: I.Book },
];

const STATUS_PILL = (status) => {
  if (status === 'approved') return <Pill tone="lime" size="s">Approved</Pill>;
  if (status === 'pending')  return <Pill tone="tangerine" size="s">Pending</Pill>;
  return <Pill tone="stone" size="s">Locked</Pill>;
};

const Sidebar = ({ page, onNavigate, status, onSignOut }) => {
  return (
    <aside style={{
      width: 240, background: '#fff',
      borderRight: '1px solid var(--rh-stone-light)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
    }}>
      {/* Brand block */}
      <div style={{ padding: '20px 20px', borderBottom: '1px solid var(--rh-stone-light)', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60 }}>
        <img src="assets/logos/r_logo_300x300.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }}/>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 14, letterSpacing: '-0.01em' }}>
          <span style={{ fontWeight: 700, color: 'var(--rh-blackberry)' }}>ratehub.ca</span>
          <span style={{ color: 'var(--rh-stone)', fontWeight: 400 }}>/</span>
          <span style={{ color: 'var(--rh-stone-darkest)', fontWeight: 400 }}>partners</span>
        </div>
      </div>

      {/* Nav */}
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
                padding: '8px 10px 8px 13px', background: active ? 'var(--rh-blueberry-lightest)' : 'transparent',
                border: 'none', borderRadius: 7, cursor: 'pointer',
                marginBottom: 2, fontFamily: 'inherit', fontSize: 13.5,
                color: active ? 'var(--rh-blueberry-darkest)' : 'var(--rh-blackberry)',
                fontWeight: active ? 500 : 400,
                position: 'relative', textAlign: 'left',
              }}>
              {active && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: 'var(--rh-blueberry-dark)', borderRadius: 2 }}/>}
              <Icon size={17} stroke={1.8} style={{ color: active ? 'var(--rh-blueberry-dark)' : 'var(--rh-stone-darkest)' }}/>
              <span style={{ flex: 1 }}>{item.label}</span>
              {itemStatus && STATUS_PILL(itemStatus)}
              {item.pill && <Pill tone={item.pill.tone} size="s">{item.pill.label}</Pill>}
            </button>
          );
        })}
      </nav>

      {/* User block */}
      <div style={{
        borderTop: '1px solid var(--rh-stone-light)',
        padding: '14px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Avatar name={PARTNER.name} size={34}/>
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.25 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-blackberry)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{PARTNER.name}</div>
          <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{PARTNER.company}</div>
        </div>
        <button onClick={onSignOut} aria-label="Sign out" title="Sign out"
          style={{
            background: 'transparent', border: 'none', padding: 6, cursor: 'pointer',
            color: 'var(--rh-stone-darkest)', borderRadius: 6,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--rh-blackberry)'; e.currentTarget.style.background = 'var(--rh-stone-lightest)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--rh-stone-darkest)'; e.currentTarget.style.background = 'transparent'; }}
        ><I.LogOut size={16}/></button>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
window.STATUS_PILL = STATUS_PILL;
