// Credit Cards page — 4 states

const CC_LockedView = ({ onApply }) => (
  <div className="fade-in">
    <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Credit Cards</h1>
    <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 28px', maxWidth: 760 }}>
      Credit card comparisons must run on a Ratehub-hosted whitelabel page for compliance reasons. We'll spin up <span className="mono" style={{ background: 'var(--rh-stone-lightest)', padding: '1px 6px', borderRadius: 4, fontSize: 13 }}>[your-brand].partners.ratehub.ca/credit-cards</span> for you.
    </p>

    <Card padding={28} style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 18px' }}>How it works</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          { n: 1, title: 'Apply', desc: 'Tell us about your business and audience.' },
          { n: 2, title: 'Get reviewed', desc: "We'll reach out via email within 1–2 business days." },
          { n: 3, title: 'Configure & launch', desc: 'Configure your whitelabel page and go live.' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--rh-blueberry-lightest)', color: 'var(--rh-blueberry-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, flexShrink: 0 }}>{s.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--rh-stone-darkest)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>

    <Card padding={28} style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 14px' }}>Requirements</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          '50,000+ monthly visitors or equivalent reach',
          'Canadian-focused audience',
          "Signed affiliate agreement (we'll send via email)",
          'Compliance with Ratehub brand guidelines',
        ].map((r, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--rh-lime-lightest)', color: 'var(--rh-lime-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><I.Check size={11} stroke={3}/></span>
            {r}
          </li>
        ))}
      </ul>
    </Card>

    <Btn variant="primary" size="l" onClick={onApply} iconRight={<I.ArrowRight size={16}/>}>Apply for credit card affiliate access</Btn>
  </div>
);

const CC_ApplicationForm = ({ onSubmit, onCancel, vertical = 'cards' }) => {
  const insurance = vertical === 'insurance';
  const [form, setForm] = React.useState({
    company: PARTNER.company, website: 'acmemedia.ca',
    traffic: '50,000 – 250,000', audience: 'Canadian personal finance readers, 28–55',
    why: '', agree: false, file: false,
    verticals: { auto: true, home: true, condo: false, life: false },
  });
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e?.preventDefault();
    if (!form.agree) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(), 600);
  };

  return (
    <div className="fade-in">
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{insurance ? 'Insurance' : 'Credit Cards'}</h1>
      <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 28px' }}>
        Apply for {insurance ? 'insurance' : 'credit card'} affiliate access. We'll review and reach out within 1–2 business days.
      </p>

      <form onSubmit={submit}>
        <Card padding={28}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 18 }}>
            <Field label="Company name"><TextInput value={form.company} onChange={(e) => set('company', e.target.value)}/></Field>
            <Field label="Website URL"><TextInput value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="example.com"/></Field>
            <Field label="Monthly traffic">
              <SelectEl value={form.traffic} onChange={(e) => set('traffic', e.target.value)} options={TRAFFIC_TIERS}/>
            </Field>
            <Field label="Primary audience"><TextInput value={form.audience} onChange={(e) => set('audience', e.target.value)}/></Field>
          </div>

          {insurance ? (
            <Field label="Insurance verticals of interest" style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 18, paddingTop: 4 }}>
                {[
                  { k: 'auto',  l: 'Auto' },
                  { k: 'home',  l: 'Home' },
                  { k: 'condo', l: 'Condo' },
                  { k: 'life',  l: 'Life' },
                ].map(o => (
                  <Checkbox key={o.k} checked={form.verticals[o.k]} onChange={(e) => set('verticals', { ...form.verticals, [o.k]: e.target.checked })} label={o.l}/>
                ))}
              </div>
            </Field>
          ) : (
            <Field label="Why credit cards?" style={{ marginBottom: 18 }}>
              <Textarea value={form.why} onChange={(e) => set('why', e.target.value)}
                placeholder="Tell us about your audience and why credit-card content fits your site." rows={4}/>
            </Field>
          )}

          <Field label="Upload signed agreement" style={{ marginBottom: 18 }}>
            {form.file ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--rh-lime-lightest)', borderRadius: 8, fontSize: 13.5, color: 'var(--rh-lime-darkest)' }}>
                <I.CheckCircle size={16}/> agreement.pdf — uploaded ✓
                <button onClick={() => set('file', false)} type="button" style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--rh-stone-darkest)' }}>Remove</button>
              </div>
            ) : (
              <button type="button" onClick={() => set('file', true)}
                style={{
                  border: '1.5px dashed var(--rh-stone)', borderRadius: 8,
                  padding: '18px 14px', background: 'var(--rh-stone-lightest)',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5,
                  color: 'var(--rh-blackberry)',
                  display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
                }}>
                <I.Upload size={16} style={{ color: 'var(--rh-blueberry-dark)' }}/>
                Click to upload signed agreement (PDF)
              </button>
            )}
          </Field>

          <div style={{ paddingTop: 8, borderTop: '1px solid var(--rh-stone-light)' }}>
            <div style={{ marginTop: 16 }}>
              <Checkbox checked={form.agree} onChange={(e) => set('agree', e.target.checked)} label="I agree to the Ratehub partner brand and compliance guidelines."/>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <Btn variant="secondary" type="button" onClick={onCancel}>Cancel</Btn>
          <Btn variant="primary" type="submit" disabled={!form.agree || submitting}
            icon={submitting ? <I.Loader size={14} style={{ animation: 'spin 1s linear infinite' }}/> : null}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </Btn>
        </div>
      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const PendingView = ({ vertical = 'cards', onReset }) => {
  const insurance = vertical === 'insurance';
  return (
    <div className="fade-in">
      <ResetToLockedLink onReset={onReset}/>
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{insurance ? 'Insurance' : 'Credit Cards'}</h1>
      <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 32px' }}>Your application is in review.</p>

      <Card padding={36} style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--rh-tangerine-lightest)', color: 'var(--rh-tangerine-darkest)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <I.Hourglass size={28}/>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 8px' }}>Application under review</h2>
        <div style={{ fontSize: 12.5, color: 'var(--rh-stone-darkest)', marginBottom: 14 }}>Submitted just now</div>
        <p style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', maxWidth: 420, margin: '0 auto 28px' }}>
          We'll email <strong>admin@ratehub.ca</strong> within 1–2 business days with next steps.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {[
            { label: 'Submitted', state: 'done' },
            { label: 'Under review', state: 'active' },
            { label: 'Approved', state: 'pending' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: s.state === 'done' ? 'var(--rh-lime)' : s.state === 'active' ? 'var(--rh-tangerine)' : 'var(--rh-stone-light)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                }}>
                  {s.state === 'done' && <I.Check size={12} stroke={3}/>}
                  {s.state === 'active' && <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}/>}
                </div>
                <span style={{ fontSize: 11.5, color: s.state === 'pending' ? 'var(--rh-stone-darkest)' : 'var(--rh-blackberry)', fontWeight: s.state === 'active' ? 500 : 400 }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: i === 0 ? 'var(--rh-lime)' : 'var(--rh-stone-light)', margin: '0 8px', maxWidth: 80, marginTop: -22 }}/>}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Whitelabel preview component
const WhitelabelPreview = ({ brand, slug, accent, footer, reward, logo }) => (
  <div style={{
    background: '#fff', border: '1px solid var(--rh-stone-light)', borderRadius: 10,
    overflow: 'hidden', fontSize: 12.5,
  }}>
    {/* Header */}
    <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--rh-stone-light)', display: 'flex', alignItems: 'center', gap: 14 }}>
      {logo && <div style={{ width: 38, height: 38, borderRadius: 6, background: 'var(--rh-stone-lightest)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rh-stone-darkest)', fontSize: 11, border: '1px solid var(--rh-stone-light)' }}>logo</div>}
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{brand}</div>
        <div style={{ fontSize: 10, color: 'var(--rh-stone-darkest)', marginTop: 2 }}>powered by <span style={{ fontWeight: 500, color: 'var(--rh-blackberry)' }}>ratehub.ca</span></div>
      </div>
    </div>

    <div style={{ padding: '20px 22px' }}>
      <h3 style={{ margin: '0 0 14px', fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>Compare credit cards in Canada</h3>

      {/* Filter row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1fr 1.3fr', gap: 8, padding: 10, background: 'var(--rh-stone-lightest)', borderRadius: 8, marginBottom: 14, fontSize: 11 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: '#fff', borderRadius: 5, border: '1px solid var(--rh-stone-light)' }}>
          <span style={{ width: 12, height: 12, border: '1.5px solid var(--rh-stone)', borderRadius: 2 }}/> Has a gift offer
        </label>
        <div style={{ padding: '4px 8px', background: '#fff', borderRadius: 5, border: '1px solid var(--rh-stone-light)' }}>
          <div style={{ fontSize: 9, color: 'var(--rh-stone-darkest)' }}>Reward type</div>
          <div style={{ fontWeight: 500 }}>{reward}</div>
        </div>
        <div style={{ padding: '4px 8px', background: '#fff', borderRadius: 5, border: '1px solid var(--rh-stone-light)' }}>
          <div style={{ fontSize: 9, color: 'var(--rh-stone-darkest)' }}>Monthly expenses</div>
          <div style={{ fontWeight: 500 }}>$2,200</div>
        </div>
        <div style={{ padding: '4px 8px', background: '#fff', borderRadius: 5, border: '1px solid var(--rh-stone-light)' }}>
          <div style={{ fontSize: 9, color: 'var(--rh-stone-darkest)' }}>Sort by</div>
          <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Subsequent year reward</div>
        </div>
      </div>

      {[
        { name: 'TD® Aeroplan® Visa Infinite* Card', reward: '$877/yr', rate: '1pt – 1.5pts/$', welcome: 'Earn up to 25,000 points (a $500 value)', anniv: 'Earn up to 20,000 points (a $400 value)', fee: <><span style={{ textDecoration: 'line-through', color: 'var(--rh-stone-darkest)' }}>$139</span> <span style={{ color: 'var(--rh-lime-dark)', fontWeight: 500 }}>$0 first year waived</span></>, bg: '#1a1a1a' },
        { name: 'Scotiabank®* Gold American Express® Card', reward: '$736/yr', rate: '1pt – 6pts/$', welcome: 'Earn up to 45,000 points (a $450 value)', fee: '$120', bg: '#3b2a16' },
      ].map((c, i) => (
        <div key={i} style={{ border: '1px solid var(--rh-stone-light)', borderRadius: 8, padding: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 9.5, color: 'var(--rh-stone-darkest)', marginBottom: 4, textTransform: 'lowercase', letterSpacing: 0.3 }}>featured</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{c.name}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 110px', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--rh-yuzu-lightest)', border: '1px solid var(--rh-yuzu-light)', borderRadius: 6, padding: 10 }}>
              <div style={{ fontSize: 9, color: 'var(--rh-yuzu-darkest)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--rh-yuzu-dark)' }}/> Subsequent year reward
              </div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{c.reward}</div>
              <div style={{ fontSize: 9.5, color: 'var(--rh-stone-darkest)', marginTop: 2, lineHeight: 1.4 }}>based on spending $2,200/mo after fee</div>
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.7 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '85px 1fr', rowGap: 2 }}>
                <span style={{ color: 'var(--rh-stone-darkest)' }}>Earn rewards</span><span>{c.rate}</span>
                <span style={{ color: 'var(--rh-stone-darkest)' }}>Welcome bonus</span><span>{c.welcome}</span>
                {c.anniv && <><span style={{ color: 'var(--rh-stone-darkest)' }}>Anniversary</span><span>{c.anniv}</span></>}
                <span style={{ color: 'var(--rh-stone-darkest)' }}>Annual fee</span><span>{c.fee}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button style={{ background: accent, color: '#fff', border: 'none', borderRadius: 5, padding: '7px 10px', fontSize: 11, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>Go to site</button>
              <button style={{ background: 'transparent', color: accent, border: '1.5px solid ' + accent, borderRadius: 5, padding: '6px 10px', fontSize: 11, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>Check eligibility</button>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--rh-stone-light)', marginTop: 10, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--rh-stone-darkest)' }}>
            <span>Perks ▾</span><span>Details ▾</span>
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid var(--rh-stone-light)', paddingTop: 12, marginTop: 14, fontSize: 10.5, color: 'var(--rh-stone-darkest)' }}>{footer}</div>
    </div>
  </div>
);

const PublishedPanel = ({ config, publishedAt, onEdit, onUnpublish }) => {
  const [confirming, setConfirming] = React.useState(false);
  const liveUrl = `https://${config.slug}.partners.ratehub.ca/credit-cards`;
  const accent = ACCENT_COLORS.find(c => c.value === config.accent) || ACCENT_COLORS[0];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Success banner */}
      <Card padding={0} style={{ borderLeft: '3px solid var(--rh-lime)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--rh-lime-lightest)', color: 'var(--rh-lime-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I.CheckCircle size={20}/>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--rh-blackberry)', marginBottom: 2 }}>Your whitelabel page is live</div>
            <div style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>Visitors can now compare credit cards on your hosted page.</div>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="link-anchor"
            style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, boxShadow: 'none' }}>
            View live page <I.ExternalLink size={13}/>
          </a>
        </div>
      </Card>

      {/* URL card */}
      <Card padding={22}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blackberry-light)', marginBottom: 8 }}>Live URL</div>
        <CopyBox text={liveUrl}/>
      </Card>

      {/* Summary card */}
      <Card padding={22}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blackberry-light)', marginBottom: 14 }}>Published configuration</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 14, columnGap: 24 }}>
          <SummaryItem label="Brand name" value={config.brand}/>
          <SummaryItem label="Logo" value={
            config.logo
              ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><I.Image size={13} style={{ color: 'var(--rh-stone-darkest)' }}/> Logo uploaded</span>
              : <span style={{ color: 'var(--rh-stone-darkest)' }}>Not uploaded</span>
          }/>
          <SummaryItem label="Default reward filter" value={config.reward}/>
          <SummaryItem label="Accent color" value={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: config.accent, boxShadow: '0 0 0 1px var(--rh-stone-light)' }}/>
              {accent.label}
            </span>
          }/>
          <SummaryItem label="Published" value={publishedAt}/>
          <SummaryItem label="URL slug" value={<span className="mono" style={{ fontSize: 13 }}>{config.slug}</span>}/>
        </div>
      </Card>

      {/* Action row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, paddingTop: 4 }}>
        {confirming ? (
          <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--rh-blackberry-light)' }}>
            <span>Are you sure? Your live page will go offline.</span>
            <Btn variant="secondary" size="s" onClick={() => setConfirming(false)}>Cancel</Btn>
            <Btn variant="primary" size="s" onClick={onUnpublish}
              style={{ background: 'var(--rh-tangerine-darkest)', borderColor: 'var(--rh-tangerine-darkest)' }}>
              Confirm unpublish
            </Btn>
          </div>
        ) : (
          <>
            <button onClick={() => setConfirming(true)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13, color: 'var(--rh-stone-darkest)',
                padding: '6px 8px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--rh-blackberry)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--rh-stone-darkest)'}>
              Unpublish page
            </button>
            <Btn variant="secondary" onClick={onEdit}>Edit configuration</Btn>
          </>
        )}
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 14, color: 'var(--rh-blackberry)' }}>{value}</div>
  </div>
);

const CC_ApprovedView = ({ onReset, published, onPublish, onUnpublish }) => {
  const [config, setConfig] = React.useState({
    brand: PARTNER.brand,
    slug: PARTNER.slug,
    reward: 'All reward types',
    accent: ACCENT_COLORS[0].value,
    footer: '',
    logo: false,
  });
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const [publishing, setPublishing] = React.useState(false);
  const [publishedAt, setPublishedAt] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const set = (k, v) => setConfig(c => ({ ...c, [k]: v }));

  // If parent flips published flag externally (demo controls), reflect that
  const isPublished = published && !editing;
  const hasEverBeenPublished = published || publishedAt !== '';

  const publish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublishedAt('Just now');
      setEditing(false);
      onPublish();
      window.toast(
        hasEverBeenPublished ? 'Your whitelabel page has been updated.' : 'Your whitelabel page is live.',
        { icon: <I.CheckCircle size={16} style={{ color: 'var(--rh-lime-dark)' }}/>, duration: 3000 }
      );
    }, 600);
  };

  const handleUnpublish = () => {
    setEditing(false);
    onUnpublish();
    window.toast('Whitelabel page unpublished.', { icon: <I.RotateCcw size={14}/>, duration: 2400 });
  };

  return (
    <div className="fade-in">
      <ResetToLockedLink onReset={onReset}/>
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Credit Cards</h1>
      <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 24px' }}>Configure your hosted whitelabel comparison page.</p>

      {bannerOpen && (
        <div className="fade-in" style={{
          background: 'var(--rh-lime-lightest)', border: '1px solid var(--rh-lime-light)',
          borderRadius: 10, padding: '12px 16px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--rh-lime)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><I.Check size={14} stroke={3}/></span>
          <div style={{ flex: 1, fontSize: 13.5, color: 'var(--rh-lime-darkest)' }}>
            <strong>Approved.</strong> Configure your whitelabel page below.
          </div>
          <button onClick={() => setBannerOpen(false)} aria-label="Dismiss" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--rh-lime-darkest)', padding: 4 }}><I.X size={16}/></button>
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <Collapsible title="Quick link" defaultOpen badge={<Pill tone="lime" size="s">Available</Pill>}>
          <p style={{ fontSize: 13.5, color: 'var(--rh-stone-darkest)', margin: '12px 0 14px' }}>
            Send traffic to the general Ratehub credit cards page with tracking attached.
          </p>
          <CopyBox text={`https://www.ratehub.ca/credit-cards?aff_id=${PARTNER.affId}`}/>
        </Collapsible>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 500, margin: '28px 0 12px' }}>Your whitelabel page</h2>

      {isPublished ? (
        <PublishedPanel
          config={config}
          publishedAt={publishedAt || 'Just now'}
          onEdit={() => setEditing(true)}
          onUnpublish={handleUnpublish}
        />
      ) : (
        <>
          <div style={{
            background: 'var(--rh-blueberry-lightest)', border: '1px solid var(--rh-blueberry-light)',
            borderRadius: 10, padding: '12px 16px', marginBottom: 16,
            fontSize: 12.5, fontStyle: 'italic', color: 'var(--rh-blueberry-darkest)',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <I.Sparkle size={14} stroke={2} style={{ color: 'var(--rh-blueberry-dark)', marginTop: 2, flexShrink: 0 }}/>
            Post-MVP this will be a split-screen live preview. For MVP, this would ship as a step-by-step form. Both shown here for review.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: 18, alignItems: 'flex-start' }}>
            {/* Left pane */}
            <Card padding={22} style={{ position: 'sticky', top: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="Brand name"><TextInput value={config.brand} onChange={(e) => set('brand', e.target.value)}/></Field>

                <Field label="Logo">
                  {config.logo ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'var(--rh-lime-lightest)', borderRadius: 8, fontSize: 13, color: 'var(--rh-lime-darkest)' }}>
                      <I.CheckCircle size={14}/> logo.png — uploaded ✓
                      <button type="button" onClick={() => set('logo', false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--rh-stone-darkest)' }}>Remove</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => set('logo', true)}
                      style={{ border: '1.5px dashed var(--rh-stone)', borderRadius: 8, padding: '10px 14px', background: 'var(--rh-stone-lightest)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <I.Upload size={14}/> Upload logo
                    </button>
                  )}
                </Field>

                <Field label="URL slug" hint={`${config.slug}.partners.ratehub.ca/credit-cards`}>
                  <TextInput value={config.slug} onChange={(e) => set('slug', e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())}/>
                </Field>

                <Field label="Default reward type filter" hint="This is the default filter selection on your hosted table; users can still change it.">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                    {CC_REWARD_TYPES.map(r => (
                      <Radio key={r} name="reward" value={r} current={config.reward} onChange={(v) => set('reward', v)} label={r}/>
                    ))}
                  </div>
                </Field>

                <Btn variant="primary" full onClick={publish} disabled={publishing}
                  icon={publishing ? <I.Loader size={14} style={{ animation: 'spin 1s linear infinite' }}/> : null}>
                  {publishing
                    ? (hasEverBeenPublished ? 'Saving…' : 'Publishing…')
                    : (hasEverBeenPublished ? 'Save and republish' : 'Publish whitelabel page')}
                </Btn>
                {editing && (
                  <button onClick={() => setEditing(false)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, color: 'var(--rh-stone-darkest)', padding: 4, marginTop: -4 }}>
                    Cancel edit
                  </button>
                )}
              </div>
            </Card>

            {/* Right pane — live preview */}
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <I.Eye size={13}/>
                <span>Live preview</span>
                <span style={{ color: 'var(--rh-stone)' }}>·</span>
                <span className="mono">{config.slug}.partners.ratehub.ca/credit-cards</span>
              </div>
              <WhitelabelPreview brand={config.brand} slug={config.slug} accent={config.accent} footer={config.footer} reward={config.reward} logo={config.logo}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CreditCards = ({ status, onStatusChange, published, onPublishChange }) => {
  if (status === 'locked')   return <CC_LockedView onApply={() => onStatusChange('form')}/>;
  if (status === 'form')     return <ApplicationForm bu="cards" onSubmit={() => onStatusChange('pending-auto')} onCancel={() => onStatusChange('locked')}/>;
  if (status === 'pending')  return <PendingView vertical="cards" onReset={() => onStatusChange('locked')}/>;
  if (status === 'approved') return <CC_ApprovedView
    onReset={() => onStatusChange('locked')}
    published={published}
    onPublish={() => onPublishChange(true)}
    onUnpublish={() => onPublishChange(false)}/>;
  return null;
};

window.CreditCards = CreditCards;
window.PendingView = PendingView;
