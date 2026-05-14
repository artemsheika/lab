// Top-level App — handles auth state, demo controls, page routing, 5s auto-approve

const PAGE_LABELS = {
  overview: 'Overview',
  mortgage: 'Mortgage',
  cards: 'Everyday Banking',
  insurance: 'Insurance',
  guidelines: 'Guidelines',
};

const Crumb = ({ page, onNavigate }) => (
  <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 6 }}>
    <button onClick={() => onNavigate('overview')} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}>Portal</button>
    <I.ChevronRight size={11}/>
    <span style={{ color: 'var(--rh-blackberry)' }}>{PAGE_LABELS[page]}</span>
  </div>
);

const STATUS_PILL_TONE = { locked: 'stone', form: 'blueberry', pending: 'tangerine', approved: 'lime' };
const STATUS_PILL_LABEL = { locked: 'Locked', form: 'Form', pending: 'Pending', approved: 'Approved' };

const DemoBuRow = ({ label, value, onSet, onSkipWait }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blackberry-light)' }}>{label}</div>
      <Pill tone={STATUS_PILL_TONE[value]} size="s">{STATUS_PILL_LABEL[value]}</Pill>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
      {[
        { v: 'locked', l: 'Locked' },
        { v: 'pending', l: 'Pending' },
        { v: 'approved', l: 'Approved' },
      ].map(o => (
        <button key={o.v} onClick={() => onSet(o.v)}
          style={{
            background: value === o.v ? 'var(--rh-blackberry)' : '#fff',
            color: value === o.v ? '#fff' : 'var(--rh-blackberry)',
            border: '1px solid ' + (value === o.v ? 'var(--rh-blackberry)' : 'var(--rh-stone-light)'),
            borderRadius: 6, padding: '6px 8px', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 11.5, fontWeight: 500,
            transition: 'background 200ms, color 200ms',
          }}>{o.l}</button>
      ))}
    </div>
    {value === 'pending' && (
      <button onClick={onSkipWait}
        style={{
          marginTop: 8, width: '100%', background: 'var(--rh-tangerine-lightest)',
          color: 'var(--rh-tangerine-darkest)', border: '1px solid var(--rh-tangerine-light)',
          borderRadius: 6, padding: '6px 10px', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 11.5, fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
        <I.FastForward size={11}/> Skip 5s wait — approve now
      </button>
    )}
  </div>
);

const DemoPanel = ({ status, onSet, onResetAll }) => {
  const [open, setOpen] = React.useState(false);
  const mobile = useIsMobile();

  const panel = (
    <div style={{
      background: '#fff', border: '1px solid var(--rh-stone-light)',
      borderRadius: mobile ? '16px 16px 0 0' : 12,
      padding: 20, width: mobile ? '100%' : 320,
      maxHeight: mobile ? '70vh' : 'none', overflow: 'auto',
      boxShadow: 'var(--rh-shadow-l)',
      marginBottom: mobile ? 0 : 10,
    }}>
      {mobile && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={{ width: 38, height: 4, background: 'var(--rh-stone-light)', borderRadius: 2 }}/>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
          <I.Sliders size={14} style={{ color: 'var(--rh-blueberry-dark)' }}/>
          Demo state
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--rh-stone-darkest)', padding: 10, display: 'flex', borderRadius: 6 }}><I.X size={14}/></button>
      </div>
      <p style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', margin: '0 0 16px' }}>Flip status without filling forms. Reviewers only.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <DemoBuRow label="Everyday Banking" value={status.cards}
          onSet={(v) => onSet('cards', v)}
          onSkipWait={() => onSet('cards', 'approved')}/>
        <DemoBuRow label="Insurance" value={status.insurance}
          onSet={(v) => onSet('insurance', v)}
          onSkipWait={() => onSet('insurance', 'approved')}/>
      </div>

      <div style={{ borderTop: '1px solid var(--rh-stone-light)', marginTop: 18, paddingTop: 14 }}>
        <button onClick={onResetAll}
          style={{
            width: '100%', background: 'transparent', color: 'var(--rh-blackberry)',
            border: '1px solid var(--rh-stone-light)', borderRadius: 6,
            padding: '10px 10px', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 12, fontWeight: 500, minHeight: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
          <I.RotateCcw size={12}/> Reset everything to defaults
        </button>
      </div>
    </div>
  );

  return (
    <>
      {open && mobile && (
        <div onClick={() => setOpen(false)} className="backdrop-fade"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,30,42,0.42)', zIndex: 800 }}/>
      )}
      <div style={{
        position: 'fixed',
        bottom: mobile && open ? 0 : 24,
        right: mobile && open ? 0 : 24,
        left: mobile && open ? 0 : 'auto',
        zIndex: 801,
      }}>
        {open && (
          <div className={mobile ? 'slide-up' : 'fade-in'}>{panel}</div>
        )}
        {!open && (
          <button onClick={() => setOpen(true)}
            style={{
              position: mobile ? 'fixed' : 'static',
              bottom: mobile ? 16 : undefined, right: mobile ? 16 : undefined,
              background: 'var(--rh-blackberry)', color: '#fff', border: 'none',
              padding: '10px 16px', borderRadius: 9999, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 8, minHeight: 44,
              boxShadow: 'var(--rh-shadow-m)',
            }}>
            <I.Sliders size={14}/>
            Demo controls
          </button>
        )}
      </div>
    </>
  );
};

const PrototypeBadge = () => (
  <div style={{
    position: 'absolute', top: 18, right: 28, zIndex: 5,
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', borderRadius: 9999,
    background: 'var(--rh-yuzu-lightest)', color: 'var(--rh-yuzu-darkest)',
    border: '1px solid var(--rh-yuzu-light)',
    fontSize: 11, fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase',
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rh-yuzu-dark)' }}/>
    Prototype
  </div>
);

const DEFAULT_STATUS = { cards: 'locked', insurance: 'locked' };
const DEFAULT_PUBLISHED = { cards: false };

const App = () => {
  const [authState, setAuthState] = React.useState('marketing');
  const [page, setPage] = React.useState('overview');
  const [status, setStatus] = React.useState(DEFAULT_STATUS);
  const [published, setPublished] = React.useState(DEFAULT_PUBLISHED);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Track pending timers per BU so we can cancel cleanly on reset / re-flip.
  const timersRef = React.useRef({ cards: null, insurance: null });

  const clearTimer = (key) => {
    if (timersRef.current[key]) {
      clearTimeout(timersRef.current[key]);
      timersRef.current[key] = null;
    }
  };

  // Set a single BU's status. Handles 'pending-auto' as: enter pending + schedule
  // a 5s approve; clears any prior timer first.
  const setBu = (key, value) => {
    clearTimer(key);
    if (value === 'pending-auto') {
      setStatus(s => ({ ...s, [key]: 'pending' }));
      window.toast('Demo: auto-approving in 5 seconds. In production, an admin reviews and emails you.', { duration: 4500, icon: <I.Sparkle size={14}/> });
      timersRef.current[key] = setTimeout(() => {
        timersRef.current[key] = null;
        // Only auto-approve if the BU is still pending (user hasn't moved it).
        setStatus(s => s[key] === 'pending' ? { ...s, [key]: 'approved' } : s);
      }, 5000);
    } else {
      setStatus(s => ({ ...s, [key]: value }));
    }
  };

  const resetAll = () => {
    clearTimer('cards');
    clearTimer('insurance');
    setStatus(DEFAULT_STATUS);
    setPublished(DEFAULT_PUBLISHED);
    window.toast('Reset to defaults.', { icon: <I.RotateCcw size={13}/>, duration: 1800 });
  };

  // If a BU drops below 'approved', it can't be published anymore.
  React.useEffect(() => {
    if (status.cards !== 'approved' && published.cards) {
      setPublished(p => ({ ...p, cards: false }));
    }
  }, [status.cards]);

  // Cleanup all timers on unmount
  React.useEffect(() => () => {
    clearTimer('cards');
    clearTimer('insurance');
  }, []);

  const navigate = (p) => {
    setPage(p);
    document.getElementById('canvas-scroll')?.scrollTo({ top: 0 });
  };

  if (authState === 'marketing') return (<><Marketing onPortal={() => setAuthState('signin')}/><ToastHost/></>);
  if (authState === 'signin') return (<><SignIn onSignIn={(asNew) => setAuthState(asNew ? 'registration' : 'portal')} onBack={() => setAuthState('marketing')}/><ToastHost/></>);
  if (authState === 'registration') return (<><Registration
    onBack={() => setAuthState('signin')}
    onSubmit={(form) => {
      setAuthState('portal');
      setPage('overview');
      setStatus(DEFAULT_STATUS);
      const first = (form?.name || PARTNER.firstName).trim().split(/\s+/)[0];
      setTimeout(() => window.toast(`Welcome to Ratehub, ${first}. Your portal is ready.`, {
        icon: <I.Sparkle size={14} style={{ color: 'var(--rh-blueberry-dark)' }}/>, duration: 4200,
      }), 50);
    }}/><ToastHost/></>);
  if (authState === 'signed-out') return (<><Marketing onPortal={() => setAuthState('signin')}/><ToastHost/></>);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--rh-stone-lightest)' }}>
      <Sidebar page={page} onNavigate={navigate} status={status} onSignOut={() => setAuthState('marketing')}/>
      <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}
        page={page} onNavigate={navigate} status={status}
        onSignOut={() => setAuthState('marketing')}/>

      <main id="canvas-scroll" className="scroll-y" style={{ flex: 1, height: '100vh', position: 'relative', minWidth: 0 }}>
        <MobilePortalHeader page={page} onOpen={() => setDrawerOpen(true)}/>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 40px) 96px' }}>

          {page === 'overview'   && <Overview status={status} onNavigate={navigate}/>}
          {page === 'mortgage'   && <Mortgage/>}
          {page === 'cards'      && <CreditCards status={status.cards} onStatusChange={(v) => setBu('cards', v)} published={published.cards} onPublishChange={(v) => setPublished(p => ({ ...p, cards: v }))}/>}
          {page === 'insurance'  && <Insurance status={status.insurance} onStatusChange={(v) => setBu('insurance', v)}/>}
          {page === 'guidelines' && <Guidelines/>}
        </div>
      </main>

      <DemoPanel status={status} onSet={setBu} onResetAll={resetAll}/>
      <ToastHost/>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('Render error:', error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'ui-monospace, monospace', color: '#991b1b', background: '#fef2f2', minHeight: '100vh' }}>
          <h2 style={{ marginTop: 0 }}>Render error</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error?.message || this.state.error)}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, opacity: 0.7 }}>{this.state.error?.stack}</pre>
          <button onClick={() => this.setState({ error: null })} style={{ marginTop: 16, padding: '8px 16px' }}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<ErrorBoundary><App/></ErrorBoundary>);
