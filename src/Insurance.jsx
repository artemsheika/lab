// Insurance page — 3 states + launchers

const Ins_LockedView = ({ onApply }) => (
  <div className="fade-in">
    <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Insurance</h1>
    <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 28px', maxWidth: 760 }}>
      Insurance partners earn on funded policies. Quote launchers redirect users to ratehub.ca to complete their quote — partners get full attribution.
    </p>

    <Card padding={28} style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: '0 0 18px' }}>How it works</h3>
      <div className="grid-1-3">
        {[
          { n: 1, title: 'Apply', desc: 'Tell us about your business and audience.' },
          { n: 2, title: 'Get reviewed', desc: "We'll reach out via email within 1–2 business days." },
          { n: 3, title: 'Embed launchers', desc: 'Drop quote launchers into your articles and pages.' },
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
          '25,000+ monthly visitors or equivalent reach',
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

    <Btn variant="primary" size="l" onClick={onApply} iconRight={<I.ArrowRight size={16}/>} full>Apply for access</Btn>
  </div>
);

// Production-style launcher previews
const TEAL = '#1f7a99';

const PostalLauncher = ({ cta, color = TEAL, scale = 1 }) => {
  const mobile = useIsMobile();
  return (
  <div style={{
    background: '#fff', border: '1px solid var(--rh-stone-light)',
    borderRadius: 8, padding: 12 * scale,
    display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 8 * scale, alignItems: 'stretch',
  }}>
    <div style={{
      flex: mobile ? 'none' : '0 0 60%',
      height: 44 * scale,
      border: '1px solid var(--rh-stone-light)', borderRadius: 4,
      padding: '0 14px', display: 'flex', alignItems: 'center',
      fontSize: 14 * scale, color: 'var(--rh-stone-darkest)',
    }}>Enter postal code (A1A 1A1)</div>
    <button style={{
      flex: 1, height: 44 * scale, background: color, color: '#fff',
      border: 'none', borderRadius: 4, fontFamily: 'inherit',
      fontSize: 14 * scale, fontWeight: 500, cursor: 'pointer',
    }}>{cta}</button>
  </div>
  );
};

const TypeProvinceLauncher = ({ cta, color = TEAL, scale = 1 }) => {
  const mobile = useIsMobile();
  const dropdown = (label) => (
    <div style={{
      flex: mobile ? 'none' : '0 0 30%',
      height: 44 * scale,
      border: '1px solid var(--rh-stone-light)', borderRadius: 4,
      padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontSize: 13 * scale, color: 'var(--rh-stone-darkest)', background: '#fff',
    }}>
      {label}
      <I.ChevronDown size={14 * scale}/>
    </div>
  );
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--rh-stone-light)',
      borderRadius: 8, padding: 12 * scale,
      display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 8 * scale, alignItems: 'stretch',
    }}>
      {dropdown('Insurance type')}
      {dropdown('Province')}
      <button style={{
        flex: 1, height: 44 * scale, background: color, color: '#fff',
        border: 'none', borderRadius: 4, fontFamily: 'inherit',
        fontSize: 14 * scale, fontWeight: 500, cursor: 'pointer',
      }}>{cta}</button>
    </div>
  );
};

const LauncherPreview = ({ launcher, cta, color, scale }) => (
  launcher.id === 'auto'
    ? <PostalLauncher cta={cta} color={color} scale={scale}/>
    : <TypeProvinceLauncher cta={cta} color={color} scale={scale}/>
);

const LauncherSideSheet = ({ launcher, open, onClose }) => {
  const [cta, setCta] = React.useState('');
  const [color, setColor] = React.useState(TEAL);
  const [province, setProvince] = React.useState('ON');
  const [insType, setInsType] = React.useState('Home');
  const [tab, setTab] = React.useState('html');

  React.useEffect(() => {
    if (launcher) {
      setCta(launcher.defaultCta);
      setColor(TEAL);
    }
  }, [launcher]);
  if (!launcher) return null;

  const isAuto = launcher.id === 'auto';
  const url = `${launcher.url}?aff_id=${PARTNER.affId}`;

  const html = `<div id="rh-launcher-${launcher.id}"></div>
<script>
  window.rhLauncher = ${JSON.stringify({
    affId: PARTNER.affId, type: launcher.id, cta, color,
    ...(isAuto ? {} : { defaultType: insType, defaultProvince: province }),
  }, null, 2).replace(/\n/g, '\n  ')};
</script>
<script src="https://www.ratehub.ca/embed/quote-launcher.js" async></script>`;

  const js = `// Direct link with tracking attached
const url = "${url}";
window.location.href = url;`;

  return (
    <SideSheet open={open} onClose={onClose} title={launcher.name + ' launcher'} width={580}>
      <div style={{ marginBottom: 22 }}>
        <div style={{
          background: 'var(--rh-stone-lightest)', borderRadius: 10, padding: 20,
        }}>
          <LauncherPreview launcher={launcher} cta={cta} color={color} scale={1.05}/>
        </div>
      </div>

      <h4 style={{ fontSize: 13, fontWeight: 500, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.6 }}>Configure</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 22 }}>
        <Field label="CTA button text"><TextInput value={cta} onChange={(e) => setCta(e.target.value)}/></Field>
        <Field label="Button color">
          <div style={{ display: 'flex', gap: 8, paddingTop: 2 }}>
            {[TEAL, '#2d6e8a', '#003955', '#222', '#0a8259'].map(c => (
              <button key={c} type="button" onClick={() => setColor(c)}
                aria-label={c}
                style={{
                  width: 30, height: 30, borderRadius: '50%', background: c,
                  border: color === c ? '2px solid var(--rh-blackberry)' : '2px solid #fff',
                  boxShadow: '0 0 0 1px var(--rh-stone-light)',
                  cursor: 'pointer', padding: 0,
                }}/>
            ))}
          </div>
        </Field>
        {!isAuto && (
          <>
            <Field label="Default insurance type">
              <SelectEl value={insType} onChange={(e) => setInsType(e.target.value)}
                options={[{ value: 'Home', label: 'Home' }, { value: 'Condo', label: 'Condo' }, { value: 'Tenant', label: 'Tenant' }]}/>
            </Field>
            <Field label="Default province">
              <SelectEl value={province} onChange={(e) => setProvince(e.target.value)} options={PROVINCES}/>
            </Field>
          </>
        )}
      </div>

      <h4 style={{ fontSize: 13, fontWeight: 500, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.6 }}>Embed code</h4>
      <div style={{ marginBottom: 10 }}>
        <Segmented value={tab} onChange={setTab} options={[
          { value: 'html', label: 'JavaScript snippet' },
          { value: 'js', label: 'Direct link' },
        ]}/>
      </div>
      <CopyBox text={tab === 'html' ? html : js}/>

      <div style={{
        marginTop: 20, padding: 14, background: 'var(--rh-blueberry-lightest)',
        borderRadius: 8, fontSize: 12.5, color: 'var(--rh-blueberry-darkest)',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <I.CheckCircle size={16} style={{ color: 'var(--rh-blueberry-dark)', marginTop: 1, flexShrink: 0 }}/>
        We'll attribute every funded policy that originates from this launcher.
      </div>
    </SideSheet>
  );
};

const LauncherCard = ({ launcher, onOpen }) => (
  <Card padding={20} hover onClick={onOpen}
    style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#fff' }}>
    {/* Production-style preview */}
    <div style={{ background: 'var(--rh-stone-lightest)', borderRadius: 8, padding: 14 }}>
      <LauncherPreview launcher={launcher} cta={launcher.defaultCta} color={TEAL} scale={0.85}/>
    </div>

    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--rh-blueberry-lightest)', color: 'var(--rh-blueberry-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {launcher.icon}
        </div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{launcher.name}</div>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--rh-stone-darkest)', lineHeight: 1.5, marginBottom: 14 }}>{launcher.desc}</div>
      <Btn variant="primary" size="s" onClick={(e) => { e.stopPropagation(); onOpen(); }} icon={<I.Code size={13}/>}>Get embed code</Btn>
    </div>
  </Card>
);

const Ins_ApprovedView = ({ onReset }) => {
  const [active, setActive] = React.useState(null);
  const launchers = [
    { id: 'auto', name: 'Auto Insurance', defaultCta: "let's get started", desc: 'Drop a CTA into articles. Users land on the auto quote flow with your tracking attached.', url: 'https://www.ratehub.ca/insurance/auto-quote', icon: <I.Car size={15}/> },
    { id: 'home', name: 'Home Insurance', defaultCta: 'start my quote',   desc: 'Five-minute quote flow for homeowners. Earn on every funded policy.', url: 'https://www.ratehub.ca/insurance/home-quote', icon: <I.Home size={15}/> },
  ];

  return (
    <div className="fade-in">
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Insurance</h1>
      <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 24px' }}>Embed quote launchers across your articles and product pages.</p>

      <div style={{ marginBottom: 28 }}>
        <Collapsible title="Quick links" defaultOpen badge={<Pill tone="lime" size="s">Available</Pill>}>
          <p style={{ fontSize: 13.5, color: 'var(--rh-stone-darkest)', margin: '12px 0 16px' }}>
            Direct links to each Ratehub insurance vertical with your tracking attached.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { id: 'auto', label: 'Auto',  icon: <I.Car size={14}/>,    url: `https://www.ratehub.ca/insurance/best-car-insurance-quote?aff_id=${PARTNER.affId}` },
              { id: 'home', label: 'Home',  icon: <I.Home size={14}/>,   url: `https://www.ratehub.ca/insurance/best-home-insurance-quote?aff_id=${PARTNER.affId}` },
              { id: 'life', label: 'Life',  icon: <I.Heart size={14}/>,  url: `https://www.ratehub.ca/insurance/life?aff_id=${PARTNER.affId}` },
            ].map(q => (
              <div key={q.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--rh-blueberry-lightest)', color: 'var(--rh-blueberry-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {q.icon}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--rh-blackberry)' }}>{q.label}</div>
                </div>
                <CopyBox text={q.url}/>
              </div>
            ))}
          </div>
        </Collapsible>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 500, margin: '0 0 4px' }}>Quote launchers</h2>
      <p style={{ fontSize: 13.5, color: 'var(--rh-stone-darkest)', margin: '0 0 16px' }}>Embed a launcher into your site. Users land on the Ratehub quote flow with your tracking attached.</p>

      <div className="grid-1-2">
        {launchers.map(l => (
          <LauncherCard key={l.id} launcher={l} onOpen={() => setActive(l)}/>
        ))}
      </div>

      <LauncherSideSheet launcher={active} open={!!active} onClose={() => setActive(null)}/>
    </div>
  );
};

const Insurance = ({ status, onStatusChange }) => {
  const [applyOpen, setApplyOpen] = React.useState(false);
  const closeAndSubmit = () => { setApplyOpen(false); onStatusChange('pending-auto'); };
  if (status === 'locked')   return (<>
    <Ins_LockedView onApply={() => setApplyOpen(true)}/>
    <ApplyConfirmModal open={applyOpen} vertical="insurance" onClose={() => setApplyOpen(false)} onSubmit={closeAndSubmit}/>
  </>);
  if (status === 'pending')  return <PendingView vertical="insurance" onReset={() => onStatusChange('locked')}/>;
  if (status === 'approved') return <Ins_ApprovedView onReset={() => onStatusChange('locked')}/>;
  return null;
};

window.Insurance = Insurance;
