// Mortgage page + side-sheet

const WidgetSideSheet = ({ widget, open, onClose }) => {
  const [size, setSize] = React.useState('default');
  const [theme, setTheme] = React.useState('light');
  const [province, setProvince] = React.useState('ON');
  const [tab, setTab] = React.useState('iframe');
  if (!widget) return null;

  const slug = widget.id;
  const iframe = `<iframe src="https://www.ratehub.ca/embed/${slug}?aff_id=${PARTNER.affId}&theme=${theme}&province=${province}&size=${size}" width="100%" height="600" frameborder="0"></iframe>`;
  const js = `<div id="rh-${slug}"></div>
<script>
  window.rhConfig = { affId: "${PARTNER.affId}", theme: "${theme}", province: "${province}", size: "${size}" };
</script>
<script src="https://www.ratehub.ca/embed/${slug}.js" async></script>`;

  return (
    <SideSheet open={open} onClose={onClose} title={widget.name} width={560}>
      <div style={{ marginBottom: 22 }}>
        <PreviewBox label={widget.name + ' preview'} ratio="16/8" icon={<I.Sliders size={28} />} />
        <p style={{ fontSize: 13, color: 'var(--rh-stone-darkest)', margin: '12px 0 0' }}>{widget.desc}</p>
      </div>

      <h4 style={{ fontSize: 13, fontWeight: 500, margin: '0 0 12px', color: 'var(--rh-blackberry)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Configure</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 22 }}>
        <Field label="Size">
          <Segmented value={size} onChange={setSize} options={[
          { value: 'default', label: 'Default' },
          { value: 'compact', label: 'Compact' },
          { value: 'full', label: 'Full-width' }]
          } />
        </Field>
        <Field label="Theme">
          <Segmented value={theme} onChange={setTheme} options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' }]
          } />
        </Field>
        <Field label="Default province">
          <SelectEl value={province} onChange={(e) => setProvince(e.target.value)} options={PROVINCES} />
        </Field>
      </div>

      <h4 style={{ fontSize: 13, fontWeight: 500, margin: '0 0 12px', color: 'var(--rh-blackberry)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Embed code</h4>
      <div style={{ marginBottom: 10 }}>
        <Segmented value={tab} onChange={setTab} options={[
        { value: 'iframe', label: 'Iframe' },
        { value: 'js', label: 'JavaScript snippet' }]
        } />
      </div>
      <CopyBox text={tab === 'iframe' ? iframe : js} />

      <div style={{
        marginTop: 20, padding: 14, background: 'var(--rh-blueberry-lightest)',
        borderRadius: 8, fontSize: 12.5, color: 'var(--rh-blueberry-darkest)',
        display: 'flex', gap: 10, alignItems: 'flex-start'
      }}>
        <I.CheckCircle size={16} style={{ color: 'var(--rh-blueberry-dark)', marginTop: 1, flexShrink: 0 }} />
        Tracking is built in. We'll attribute every funded mortgage that originates from this widget to your account.
      </div>
    </SideSheet>);

};

const Mortgage = () => {
  const [active, setActive] = React.useState(null);
  return (
    <div className="fade-in">
      <h1 className="serif" style={{ fontSize: 30, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Mortgage widgets</h1>
      <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 28px', maxWidth: 720 }}>Embed any of our mortgage tools on your site.

      </p>

      <Collapsible title="Quick link" defaultOpen badge={<Pill tone="lime" size="s">Available now</Pill>}>
        <p style={{ fontSize: 13.5, color: 'var(--rh-stone-darkest)', margin: '12px 0 14px' }}>Send traffic to ratehub.ca/mortgages with your tracking attached.

        </p>
        <CopyBox text={`https://www.ratehub.ca/mortgages?aff_id=${PARTNER.affId}`} />
      </Collapsible>

      <h2 style={{ fontSize: 18, fontWeight: 500, margin: '36px 0 16px' }}>Embeddable widgets</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {MORTGAGE_WIDGETS.map((w) =>
        <Card key={w.id} padding={16} hover style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PreviewBox label={w.name} ratio="16/10" icon={<I.Sliders size={22} />} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 4 }}>{w.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--rh-stone-darkest)', lineHeight: 1.5, minHeight: 36 }}>{w.desc}</div>
            </div>
            <Btn variant="secondary" size="s" full onClick={() => setActive(w)} icon={<I.Code size={13} />}>Get embed code</Btn>
          </Card>
        )}
      </div>

      <WidgetSideSheet widget={active} open={!!active} onClose={() => setActive(null)} />
    </div>);

};

window.Mortgage = Mortgage;