// Sign-in screen — SSO-first design with floating demo controls

const SignInDemoControls = ({ mode, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const mobile = useIsMobile();

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const RadioOption = ({ value, label, desc }) => (
    <button
      onClick={() => { onChange(value); }}
      style={{
        width: '100%', textAlign: 'left', padding: '10px 12px',
        background: mode === value ? 'var(--rh-blueberry-lightest)' : '#fff',
        border: '1.5px solid ' + (mode === value ? 'var(--rh-blueberry)' : 'var(--rh-stone-light)'),
        borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 10,
        transition: 'background 150ms, border-color 150ms',
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
        border: '2px solid ' + (mode === value ? 'var(--rh-blueberry)' : 'var(--rh-stone)'),
        background: mode === value ? 'var(--rh-blueberry)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {mode === value && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }}/>}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-blackberry)' }}>{label}</div>
        <div style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', marginTop: 2 }}>{desc}</div>
      </div>
    </button>
  );

  const content = (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--rh-blackberry)', marginBottom: 12 }}>Demo simulation</div>
      <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', marginBottom: 8, fontWeight: 500 }}>Simulate as</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <RadioOption value="existing" label="Existing partner" desc="Signs in directly to the portal"/>
        <RadioOption value="new" label="New partner" desc="Routes through registration form first"/>
      </div>
      <p style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', margin: '12px 0 0', lineHeight: 1.5 }}>
        This controls what happens when you sign in. Existing partners go straight to the portal; new partners are routed through the registration form.
      </p>
    </div>
  );

  const edgeGap = mobile ? 16 : 24;

  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 899,
          background: mobile ? 'rgba(0,30,42,0.42)' : 'transparent',
        }}/>
      )}

      <div style={{ position: 'fixed', bottom: edgeGap, right: edgeGap, zIndex: 900 }}>
        {open && !mobile && (
          <div className="fade-in" style={{
            position: 'absolute', bottom: '100%', right: 0, marginBottom: 10,
            background: '#fff', border: '1px solid var(--rh-stone-light)',
            borderRadius: 12, padding: 20, width: 300,
            boxShadow: 'var(--rh-shadow-l)',
          }}>
            {content}
          </div>
        )}
        <button onClick={() => setOpen(o => !o)} style={{
          background: 'var(--rh-blackberry)', color: '#fff', border: 'none',
          padding: '10px 16px', borderRadius: 9999, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 8, minHeight: 44,
          boxShadow: 'var(--rh-shadow-m)',
        }}>
          <I.Sliders size={14}/>
          Demo controls
        </button>
      </div>

      {open && mobile && (
        <div className="slide-up" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
          background: '#fff', borderRadius: '16px 16px 0 0',
          padding: '8px 20px 40px',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.14)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, paddingTop: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--rh-stone-light)' }}/>
          </div>
          {content}
        </div>
      )}
    </>
  );
};

const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
    <path fill="#4285F4" d="M44 24c0-1.5-.1-2.9-.4-4.2H24v8h11.2c-.5 2.5-2 4.6-4.2 6v5h6.8C41.6 35 44 30 44 24z"/>
    <path fill="#34A853" d="M24 44c5.7 0 10.4-1.9 13.8-5.1l-6.8-5c-1.9 1.3-4.3 2-7 2-5.4 0-9.9-3.6-11.5-8.5H5.5v5.4C8.9 39.6 16 44 24 44z"/>
    <path fill="#FBBC05" d="M12.5 27.4c-.4-1.3-.6-2.7-.6-4.1s.2-2.8.6-4.1V13.8H5.5C4 16.7 3.2 20.2 3.2 23.3s.8 6.6 2.3 9.5l7-5.4z"/>
    <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 7.9 3.1l5.9-5.9C34.4 3.5 29.7 1.5 24 1.5 16 1.5 8.9 5.9 5.5 13.8l7 5.4C14.1 13.1 18.6 9.5 24 9.5z"/>
  </svg>
);

const MicrosoftIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
    <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
    <rect x="12" y="1"  width="9" height="9" fill="#7FBA00"/>
    <rect x="1"  y="12" width="9" height="9" fill="#00A4EF"/>
    <rect x="12" y="12" width="9" height="9" fill="#FFB900"/>
  </svg>
);

const AppleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#000" style={{ flexShrink: 0 }}>
    <path d="M17.05 12.04c-.03-2.71 2.22-4.02 2.32-4.08-1.27-1.85-3.24-2.11-3.94-2.13-1.68-.17-3.27 1-4.12 1-.87 0-2.17-.98-3.57-.95-1.83.03-3.54 1.07-4.48 2.71-1.93 3.35-.49 8.3 1.36 11.02.91 1.33 1.99 2.83 3.39 2.78 1.36-.05 1.88-.88 3.52-.88 1.64 0 2.11.88 3.55.85 1.46-.03 2.4-1.36 3.3-2.7 1.04-1.55 1.47-3.05 1.49-3.13-.03-.01-2.85-1.1-2.88-4.36zM14.4 4.18c.74-.89 1.24-2.13 1.1-3.37-1.07.05-2.36.71-3.13 1.6-.69.79-1.29 2.05-1.13 3.27 1.2.09 2.42-.6 3.16-1.5z"/>
  </svg>
);

const SsoBtn = ({ icon, label, onClick, badge }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          width: '100%', minHeight: 48,
          background: hover ? 'var(--rh-stone-lightest)' : '#fff',
          color: 'var(--rh-blackberry)',
          border: '1px solid ' + (hover ? 'var(--rh-stone-darkest)' : 'var(--rh-stone)'),
          borderRadius: 8,
          padding: '0 16px', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 14, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 12,
          transition: 'background 150ms, border-color 150ms',
        }}>
        {icon}
        <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      </button>
      {badge && (
        <span style={{
          position: 'absolute', top: -8, right: -6,
          background: '#fff',
          border: '1px solid var(--rh-stone-light)',
          borderRadius: 9999,
          padding: '3px 9px', fontSize: 10.5, fontWeight: 500,
          color: 'var(--rh-stone-darkest)',
          boxShadow: '0 1px 3px rgba(0, 30, 42, 0.08)',
          letterSpacing: 0.1,
          whiteSpace: 'nowrap',
        }}>{badge}</span>
      )}
    </div>
  );
};

const SignIn = ({ onSignIn, onBack }) => {
  const [email, setEmail] = React.useState('');
  const [mode, setMode] = React.useState('existing'); // 'existing' | 'new'
  const handle = () => onSignIn(mode === 'new');
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--rh-blueberry-lightest)',
      position: 'relative', display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'clamp(14px, 2.5vw, 24px) clamp(16px, 4vw, 32px)',
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack?.(); }}
          style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca" style={{ height: 22 }}/>
        </a>
        <button onClick={() => onBack?.()} aria-label="Close"
          style={{
            background: 'transparent', border: 'none', padding: 12, cursor: 'pointer',
            color: 'var(--rh-blackberry)', display: 'flex', borderRadius: 8,
          }}>
          <I.X size={22}/>
        </button>
      </div>

      {/* Centered column */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 16px 60px',
      }}>
        {/* Logo mark */}
        <div style={{
          width: 'clamp(48px, 7vw, 60px)', aspectRatio: '1',
          background: 'var(--rh-blackberry)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22, flexShrink: 0,
          boxShadow: '0 2px 6px rgba(0, 30, 42, 0.08)',
        }}>
          <img src="assets/logos/r_logo_300x300.png" alt=""
            style={{ width: '64%', height: '64%', borderRadius: '50%' }}/>
        </div>

        {/* Heading */}
        <h1 className="serif" style={{
          margin: '0 0 28px',
          fontSize: 'clamp(28px, 4.5vw, 36px)',
          fontWeight: 600, letterSpacing: '-0.02em', textAlign: 'center',
          width: '100%', maxWidth: 480, whiteSpace: 'nowrap',
        }}>
          Sign in
        </h1>

        {/* Card */}
        <div style={{
          width: '100%', maxWidth: 480, background: '#fff', borderRadius: 12,
          padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px)',
          boxShadow: 'var(--rh-shadow-s)',
          border: '1px solid var(--rh-stone-light)',
        }}>
          {/* Email */}
          <Field label="Email" style={{ marginBottom: 14 }}>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              type="email"
              style={{ minHeight: 48, fontSize: 14.5 }}
            />
          </Field>

          {/* Continue */}
          <Btn variant="primary" full onClick={handle}
            style={{ minHeight: 48, fontSize: 14.5 }}>
            Continue
          </Btn>

          {/* OR divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '22px 0', color: 'var(--rh-stone-darkest)', fontSize: 11.5,
            letterSpacing: 0.6,
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--rh-stone-light)' }}/>
            <span>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rh-stone-light)' }}/>
          </div>

          {/* SSO buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SsoBtn icon={<GoogleIcon size={18}/>}    label="Continue with Google"    onClick={handle} badge="Last used"/>
            <SsoBtn icon={<MicrosoftIcon size={16}/>} label="Continue with Microsoft" onClick={handle}/>
            <SsoBtn icon={<AppleIcon size={20}/>}     label="Continue with Apple"     onClick={handle}/>
          </div>
        </div>

        {/* Terms / Privacy */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 14,
          fontSize: 12, marginTop: 22,
        }}>
          <a href="#" className="link-anchor">Terms of Service</a>
          <span style={{ color: 'var(--rh-stone)' }}>|</span>
          <a href="#" className="link-anchor">Privacy Policy</a>
        </div>
      </div>

      <SignInDemoControls mode={mode} onChange={setMode}/>
    </div>
  );
};

window.SignIn = SignIn;
window.SignInDemoControls = SignInDemoControls;
