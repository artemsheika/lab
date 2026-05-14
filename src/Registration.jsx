// Registration screen — full-page form for new partners after sign-in toggle

const INTEGRATION_METHODS = [
  { value: 'simple-link', label: 'Simple Link', desc: 'Send traffic to ratehub.ca with your tracking attached.' },
  { value: 'widgets',     label: 'Widgets',     desc: 'Embed calculators or quote launchers on your site.' },
  { value: 'co-branded',  label: 'Co-branded',  desc: 'A Ratehub-hosted whitelabel page on your subdomain.' },
];

const Registration = ({ onSubmit, onBack }) => {
  const empty = {
    name: '', email: '', phone: '', company: '', url: '', visitors: '',
    methods: [],
  };
  const [form, setForm] = React.useState(empty);
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleMethod = (val) => setForm(f => ({
    ...f,
    methods: f.methods.includes(val) ? f.methods.filter(m => m !== val) : [...f.methods, val],
  }));

  const autofill = () => {
    setForm({
      name: PARTNER.name,
      email: PARTNER.email,
      phone: PARTNER.phone,
      company: PARTNER.company,
      url: PARTNER.website,
      visitors: PARTNER.visitors,
      methods: ['widgets'],
    });
    window.toast('Form autofilled with demo data.', { icon: <I.Wand2 size={14} style={{ color: 'var(--rh-blueberry-dark)' }}/>, duration: 2400 });
  };

  const submit = (e) => {
    e?.preventDefault();
    setSubmitting(true);
    setTimeout(() => onSubmit(form), 600);
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--rh-blueberry-lightest)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar — matches sign-in screen */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 32px',
      }}>
        <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca" style={{ height: 22 }}/>
        <button onClick={onBack} aria-label="Close" style={{
          background: 'transparent', border: 'none', padding: 8, cursor: 'pointer',
          color: 'var(--rh-blackberry)',
        }}><I.X size={22}/></button>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 16px 60px' }}>
        <div className="fade-in" style={{
          width: '100%', maxWidth: 640,
          background: '#fff', borderRadius: 12,
          padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px) clamp(24px, 3vw, 32px)',
          boxShadow: 'var(--rh-shadow-s)',
          border: '1px solid var(--rh-stone-light)',
        }}>
          <div className="reg-head" style={{ marginBottom: 12 }}>
            <h1 className="serif" style={{
              margin: 0, fontSize: 'clamp(22px, 3.4vw, 26px)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2,
            }}>
              Ratehub Affiliate Program Application
            </h1>
            <Btn variant="secondary" size="s" type="button" onClick={autofill} icon={<I.Wand2 size={13}/>}
              style={{ marginTop: 8 }}>
              Autofill demo data
            </Btn>
          </div>

          <p style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', margin: '0 0 18px', lineHeight: 1.6 }}>
            Ready to earn with Canada's most trusted financial platform? Complete this form to become a Ratehub partner. Over 10 million Canadians rely on Ratehub annually — join us in helping them make smarter financial decisions while earning commissions.
          </p>

          <div style={{
            fontSize: 12, color: 'var(--rh-stone-darkest)',
            paddingBottom: 18, marginBottom: 22,
            borderBottom: '1px solid var(--rh-stone-light)',
          }}>
            * Indicates required question
          </div>

          <form onSubmit={submit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Field label="Name *">
                <TextInput value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your full name"/>
              </Field>
              <Field label="Email *">
                <TextInput value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" type="email"/>
              </Field>
              <Field label="Phone Number">
                <TextInput value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(416) 555-0100"/>
              </Field>
              <Field label="Company / Website / Social Channel *">
                <TextInput value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Your business or channel name"/>
              </Field>
              <Field label="URL *">
                <TextInput value={form.url} onChange={(e) => set('url', e.target.value)} placeholder="example.com"/>
              </Field>
              <Field label="Monthly website visitors OR social media followers">
                <TextInput value={form.visitors} onChange={(e) => set('visitors', e.target.value)} placeholder="e.g. 100,000"/>
              </Field>

              <Field label="Preferred Integration Method" hint="Select one or more.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
                  {INTEGRATION_METHODS.map(m => {
                    const active = form.methods.includes(m.value);
                    return (
                      <label key={m.value}
                        onClick={(e) => { e.preventDefault(); toggleMethod(m.value); }}
                        style={{
                          display: 'flex', gap: 12, alignItems: 'flex-start',
                          padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                          border: '1px solid ' + (active ? '#2d6e8a' : 'var(--rh-stone-light)'),
                          background: active ? 'var(--rh-blueberry-lightest)' : '#fff',
                          transition: 'border-color 150ms, background 150ms',
                        }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: 4,
                          border: '1.5px solid ' + (active ? '#2d6e8a' : 'var(--rh-stone)'),
                          background: active ? '#2d6e8a' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 2, transition: 'all 150ms',
                        }}>
                          {active && <I.Check size={12} stroke={3} style={{ color: '#fff' }}/>}
                        </span>
                        <input type="checkbox" name="methods"
                          checked={active} onChange={() => toggleMethod(m.value)}
                          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}/>
                        <div style={{ flex: 1, lineHeight: 1.5 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--rh-blackberry)', marginBottom: 2 }}>{m.label}</div>
                          <div style={{ fontSize: 12.5, color: 'var(--rh-stone-darkest)' }}>{m.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </Field>
            </div>

            <div className="reg-actions" style={{
              marginTop: 28, paddingTop: 22,
              borderTop: '1px solid var(--rh-stone-light)',
            }}>
              <Btn variant="primary" type="submit" disabled={submitting} full
                icon={submitting ? <I.Loader size={14} style={{ animation: 'spin 1s linear infinite' }}/> : null}>
                {submitting ? 'Submitting…' : 'Submit application'}
              </Btn>
              <button type="button" onClick={onBack}
                className="link-anchor"
                style={{
                  display: 'block', margin: '14px auto 0',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 13, padding: '6px 0',
                }}>
                ← Back to sign-in
              </button>
            </div>
          </form>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </div>
  );
};

// Inline reset-to-locked link, top-right of page header (kept from old ApplicationForm.jsx)
const ResetToLockedLink = ({ onReset }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -32, marginBottom: 18 }}>
    <button onClick={onReset}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 12, color: 'var(--rh-stone-darkest)',
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6,
        transition: 'color 200ms, background 200ms',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--rh-blackberry)'; e.currentTarget.style.background = 'var(--rh-stone-lightest)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--rh-stone-darkest)'; e.currentTarget.style.background = 'transparent'; }}
    >
      <I.RotateCcw size={12}/>
      Reset to locked (demo)
    </button>
  </div>
);

// Shared confirmation modal used by CC and Insurance "Apply for access" CTAs
const ApplyConfirmModal = ({ open, vertical, onClose, onSubmit }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const mobile = useIsMobile();
  React.useEffect(() => { if (!open) setSubmitting(false); }, [open]);

  const title = vertical === 'insurance'
    ? 'Apply for insurance affiliate access?'
    : 'Apply for everyday banking access?';

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => onSubmit(), 600);
  };

  return (
    <Modal open={open} onClose={submitting ? undefined : onClose} title={title} width={460}
      actions={
        <>
          <Btn variant="secondary" onClick={onClose} disabled={submitting} full={mobile}>Cancel</Btn>
          <Btn variant="primary" onClick={submit} disabled={submitting} full={mobile}
            icon={submitting ? <I.Loader size={14} style={{ animation: 'spin 1s linear infinite' }}/> : null}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </Btn>
        </>
      }>
      <p style={{ margin: 0 }}>
        We'll review your account and reach out via email at <strong>{PARTNER.email}</strong> within 1–2 business days with next steps and partnership details.
      </p>
    </Modal>
  );
};

window.Registration = Registration;
window.ResetToLockedLink = ResetToLockedLink;
window.ApplyConfirmModal = ApplyConfirmModal;
