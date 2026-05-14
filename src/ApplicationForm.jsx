// Shared application form for Credit Cards + Insurance

const BU_META = {
  cards:     { label: 'Credit Cards', defaultMethod: 'co-branded', methodHelp: 'Credit cards are offered as a co-branded whitelabel page only.' },
  insurance: { label: 'Insurance',    defaultMethod: 'widgets',    methodHelp: 'Insurance partners use embeddable quote launchers.' },
};

const INTEGRATION_OPTIONS = [
  { value: 'simple-link', label: 'Simple Link', desc: 'Send traffic to ratehub.ca with your tracking attached.' },
  { value: 'widgets',     label: 'Widgets',     desc: 'Embed calculators or quote launchers on your site.' },
  { value: 'co-branded',  label: 'Co-branded',  desc: 'A Ratehub-hosted whitelabel page on your subdomain.' },
];

const ApplicationForm = ({ bu, onSubmit, onCancel }) => {
  const meta = BU_META[bu];
  const empty = {
    name: '', email: '', phone: '', company: '', url: '', visitors: '',
    method: meta.defaultMethod,
  };
  const [form, setForm] = React.useState(empty);
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const autofill = () => {
    setForm({
      name: PARTNER.name,
      email: PARTNER.email,
      phone: PARTNER.phone,
      company: PARTNER.company,
      url: PARTNER.website,
      visitors: PARTNER.visitors,
      method: meta.defaultMethod,
    });
    window.toast('Form autofilled with demo data.', { icon: <I.Wand2 size={14} style={{ color: 'var(--rh-blueberry-dark)' }}/>, duration: 2400 });
  };

  const submit = (e) => {
    e?.preventDefault();
    setSubmitting(true);
    setTimeout(() => onSubmit(), 600);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
        Ratehub Affiliate Program Application
      </h1>
      <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', margin: '0 0 12px', lineHeight: 1.6 }}>
        Ready to earn with Canada's most trusted financial platform? Complete this form to apply for Ratehub's Affiliate Program for <strong>{meta.label}</strong>. We'll review your application and contact you with partnership details, commission structures, and next steps.
      </p>
      <p style={{ fontSize: 13, color: 'var(--rh-stone-darkest)', margin: '0 0 24px', lineHeight: 1.6, fontStyle: 'italic' }}>
        Over 10 million Canadians rely on Ratehub annually — join us in helping them make smarter financial decisions while earning commissions.
      </p>

      <form onSubmit={submit}>
        <Card padding={28} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 22 }}>
            <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)' }}>* Indicates required question</div>
            <Btn variant="secondary" size="s" type="button" onClick={autofill} icon={<I.Wand2 size={13}/>}>Autofill demo data</Btn>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Field label="Name *">
              <TextInput value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your full name"/>
            </Field>
            <Field label="Email *">
              <TextInput value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" type="email"/>
            </Field>
            <Field label="Phone Number *">
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
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Btn variant="secondary" type="button" onClick={onCancel}>Cancel</Btn>
          <Btn variant="primary" type="submit" disabled={submitting}
            icon={submitting ? <I.Loader size={14} style={{ animation: 'spin 1s linear infinite' }}/> : null}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </Btn>
        </div>
      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// Inline reset-to-locked link, top-right of page header
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

window.ApplicationForm = ApplicationForm;
window.ResetToLockedLink = ResetToLockedLink;
