// Sign-in view + signed-out teaser

const SignInDemoControls = ({ demoPartnerType, setDemoPartnerType }) => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const RadioOption = ({ value, label, desc }) => (
    <button
      onClick={() => setDemoPartnerType(value)}
      style={{
        width: '100%', textAlign: 'left', padding: '10px 12px',
        background: demoPartnerType === value ? 'var(--rh-blueberry-lightest)' : '#fff',
        border: '1.5px solid ' + (demoPartnerType === value ? 'var(--rh-blueberry)' : 'var(--rh-stone-light)'),
        borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 10,
        transition: 'background 150ms, border-color 150ms',
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
        border: '2px solid ' + (demoPartnerType === value ? 'var(--rh-blueberry)' : 'var(--rh-stone)'),
        background: demoPartnerType === value ? 'var(--rh-blueberry)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {demoPartnerType === value && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }}/>
        )}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-blackberry)' }}>{label}</div>
        <div style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', marginTop: 2 }}>{desc}</div>
      </div>
    </button>
  );

  const popoverContent = (
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

  const edgeGap = isMobile ? 16 : 24;

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 899,
            background: isMobile ? 'rgba(0,0,0,0.3)' : 'transparent',
          }}
        />
      )}

      <div style={{ position: 'fixed', bottom: edgeGap, right: edgeGap, zIndex: 900 }}>
        {/* Desktop popover */}
        {open && !isMobile && (
          <div className="fade-in" style={{
            position: 'absolute', bottom: '100%', right: 0, marginBottom: 10,
            background: '#fff', border: '1px solid var(--rh-stone-light)',
            borderRadius: 12, padding: 20, width: 300,
            boxShadow: 'var(--rh-shadow-l)',
          }}>
            {popoverContent}
          </div>
        )}

        {/* Floating pill button */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'var(--rh-blackberry)', color: '#fff', border: 'none',
            padding: '10px 16px', borderRadius: 9999, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: 'var(--rh-shadow-m)',
          }}
        >
          <I.Sliders size={14}/>
          Demo controls
        </button>
      </div>

      {/* Mobile bottom sheet */}
      {open && isMobile && (
        <div className="slide-up" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
          background: '#fff', borderRadius: '16px 16px 0 0',
          padding: '8px 20px 40px',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.14)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, paddingTop: 4 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--rh-stone-light)' }}/>
          </div>
          {popoverContent}
        </div>
      )}
    </>
  );
};

const SignIn = ({ onSignIn, demoPartnerType, setDemoPartnerType }) => {
  const [email, setEmail] = React.useState(PARTNER.email);
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--rh-blueberry-lightest)',
      position: 'relative', display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 32px',
      }}>
        <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca" style={{ height: 22 }}/>
        <button aria-label="Close" style={{
          background: 'transparent', border: 'none', padding: 8, cursor: 'pointer',
          color: 'var(--rh-blackberry)',
        }}><I.X size={22}/></button>
      </div>

      {/* Centered card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 80px' }}>
        <div style={{
          width: 420, background: '#fff', borderRadius: 12,
          padding: '32px 36px 28px', boxShadow: 'var(--rh-shadow-s)',
          border: '1px solid var(--rh-stone-light)',
        }}>
          <h2 style={{ margin: '0 0 22px', fontSize: 22, fontWeight: 700, textAlign: 'center', letterSpacing: '-0.01em' }}>
            Sign in or create an account
          </h2>

          {/* Google SSO */}
          <button onClick={onSignIn} style={{
            width: '100%', background: 'var(--rh-blackberry)', color: '#fff',
            border: '1px solid var(--rh-blackberry)', borderRadius: 8,
            padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            transition: 'background 200ms',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#222'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--rh-blackberry)'}
          >
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff8a80, #b388ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 13, fontWeight: 600,
            }}>J</div>
            <div style={{ flex: 1, lineHeight: 1.3 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Sign in as John</div>
              <div style={{ fontSize: 11.5, opacity: 0.75 }}>{PARTNER.email}</div>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: 6, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M44 24c0-1.5-.1-2.9-.4-4.2H24v8h11.2c-.5 2.5-2 4.6-4.2 6v5h6.8C41.6 35 44 30 44 24z"/>
                <path fill="#34A853" d="M24 44c5.7 0 10.4-1.9 13.8-5.1l-6.8-5c-1.9 1.3-4.3 2-7 2-5.4 0-9.9-3.6-11.5-8.5H5.5v5.4C8.9 39.6 16 44 24 44z"/>
                <path fill="#FBBC05" d="M12.5 27.4c-.4-1.3-.6-2.7-.6-4.1s.2-2.8.6-4.1V13.8H5.5C4 16.7 3.2 20.2 3.2 23.3s.8 6.6 2.3 9.5l7-5.4z"/>
                <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 7.9 3.1l5.9-5.9C34.4 3.5 29.7 1.5 24 1.5 16 1.5 8.9 5.9 5.5 13.8l7 5.4C14.1 13.1 18.6 9.5 24 9.5z"/>
              </svg>
            </div>
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 16px', color: 'var(--rh-stone-darkest)', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--rh-stone-light)' }}/>
            <span>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--rh-stone-light)' }}/>
          </div>

          {/* Email field */}
          <Field label="Email address" style={{ marginBottom: 12 }}>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Field>

          <Btn variant="primary" full onClick={onSignIn}>Send a sign-in link</Btn>

          <p style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', textAlign: 'center', margin: '14px 0 0', lineHeight: 1.5 }}>
            We'll send you a direct link to securely sign in without a password.
          </p>

          <div style={{ borderTop: '1px solid var(--rh-stone-light)', marginTop: 22, paddingTop: 14, display: 'flex', justifyContent: 'center', gap: 14, fontSize: 12 }}>
            <a href="#" className="link-anchor">Terms of Service</a>
            <span style={{ color: 'var(--rh-stone)' }}>|</span>
            <a href="#" className="link-anchor">Privacy Policy</a>
          </div>
        </div>
      </div>

      <SignInDemoControls demoPartnerType={demoPartnerType} setDemoPartnerType={setDemoPartnerType}/>
    </div>
  );
};

const Registration = ({ onComplete }) => (
  <div style={{
    minHeight: '100vh', background: 'var(--rh-blueberry-lightest)',
    display: 'flex', flexDirection: 'column',
  }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '24px 32px',
    }}>
      <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca" style={{ height: 22 }}/>
    </div>

    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 80px' }}>
      <div style={{
        width: 460, background: '#fff', borderRadius: 12,
        padding: '32px 36px 28px', boxShadow: 'var(--rh-shadow-s)',
        border: '1px solid var(--rh-stone-light)',
      }}>
        <div style={{ marginBottom: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>New partner</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>Set up your account</h2>
          <p style={{ fontSize: 13, color: 'var(--rh-stone-darkest)', margin: '8px 0 0' }}>
            Tell us a bit about your business to get started.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Business / company name">
            <TextInput placeholder="e.g. Maple Financial Group"/>
          </Field>
          <Field label="Website">
            <TextInput placeholder="https://"/>
          </Field>
          <Field label="Primary contact name">
            <TextInput defaultValue="John Smith"/>
          </Field>
        </div>

        <div style={{ marginTop: 24 }}>
          <Btn variant="primary" full onClick={onComplete} iconRight={<I.ArrowRight size={15}/>}>
            Continue to portal
          </Btn>
        </div>

        <p style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', textAlign: 'center', margin: '14px 0 0', lineHeight: 1.5 }}>
          By continuing you agree to our <a href="#" className="link-anchor">Terms of Service</a> and <a href="#" className="link-anchor">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
);

const SignedOut = ({ onSignInAgain }) => (
  <div style={{ minHeight: '100vh', background: 'var(--rh-stone-lightest)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
    <div style={{ textAlign: 'center', maxWidth: 480 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff', border: '1px solid var(--rh-stone-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--rh-blueberry-dark)' }}>
        <I.LogOut size={28}/>
      </div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 12px', fontWeight: 600 }}>You've been signed out.</h1>
      <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 8px' }}>
        Visit <a href="#" className="link-anchor">ratehub.ca/affiliate-program</a> to learn more about our partner program.
      </p>
      <div style={{ marginTop: 28 }}>
        <Btn variant="primary" size="l" onClick={onSignInAgain} iconRight={<I.ArrowRight size={16}/>}>Sign in again</Btn>
      </div>
    </div>
  </div>
);

window.SignIn = SignIn;
window.Registration = Registration;
window.SignedOut = SignedOut;
