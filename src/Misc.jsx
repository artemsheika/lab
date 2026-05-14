// Banking & Loans, Guidelines

const Banking = () => (
  <div className="fade-in" style={{ textAlign: 'center', padding: '80px 24px' }}>
    <div style={{
      width: 96, height: 96, borderRadius: '50%',
      background: 'var(--rh-stone-lightest)', color: 'var(--rh-stone-darkest)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28,
    }}>
      <I.Landmark size={40} stroke={1.5}/>
    </div>
    <h1 className="serif" style={{ fontSize: 36, fontWeight: 600, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Banking & Loans — coming soon</h1>
    <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.6 }}>
      We're working on bringing CardFinder, GIC, savings, TFSA, and loan calculators to the partner portal. Want early access?
    </p>
    <Btn variant="primary" onClick={() => window.toast("We'll let you know when it's available.", { icon: <I.Bell size={14}/> })} icon={<I.Bell size={14}/>}>Notify me when available</Btn>
  </div>
);

const GUIDELINE_SECTIONS = [
  { id: 'overview', title: 'Program overview', body: [
    "Ratehub's affiliate program lets Canadian publishers, brokers, comparison sites, and content creators monetize traffic across mortgage, credit cards, insurance, and (soon) banking and loans. We pay on funded products — never on clicks or unqualified leads.",
    'The program is designed for partners who already have an audience that researches financial products: travel & lifestyle media, personal finance content creators, mortgage and insurance brokers, and editorial sites with strong Canadian readership.',
    "All payouts settle in CAD on net-30 terms. You'll see real-time earnings, leads, and conversion in this portal."
  ]},
  { id: 'mortgage', title: 'Mortgage', body: [
    "Mortgage payouts are funded-only. We don't pay per lead, application, or pre-approval — only on mortgages that close and fund through Ratehub Mortgage Brokerage.",
    "Tracking window is 30 days, last-touch. Prohibited tactics include paid search on Ratehub-branded keywords, misleading creative, and any redirect chain that strips the aff_id parameter."
  ]},
  { id: 'cards', title: 'Credit Cards', body: [
    "Credit card comparisons must run on a Ratehub-hosted whitelabel page on a [your-brand].partners.ratehub.ca subdomain. This is a compliance requirement: card issuers expect their product disclosures to render exactly as Ratehub serves them.",
    "Approval criteria include 50,000+ monthly visitors or equivalent reach, a Canadian-focused audience, and a signed affiliate agreement. Payout is per approved card application — typically $40–$140 CAD depending on the issuer and product."
  ]},
  { id: 'insurance', title: 'Insurance', body: [
    "Insurance quote launchers must redirect to ratehub.ca to complete the quote. Embedding the quote flow inline on your domain is not permitted — provincial regulators require the quoting experience on a licensed brokerage's domain.",
    "Payout is on issued policies. Signed affiliate agreement is required."
  ]},
  { id: 'tracking', title: 'Tracking & attribution', body: [
    "Every link, widget, and launcher includes your aff_id parameter. Clicks set a first-party cookie scoped to the partner.ratehub.ca subdomain that lasts 30 days for mortgage and insurance, and 45 days for credit cards.",
    "Attribution is last-touch: if a user clicks two different partner links before funding, the most recent partner wins. Cross-device attribution is supported for signed-in users on ratehub.ca."
  ]},
  { id: 'brand', title: 'Brand usage', body: [
    "On whitelabel pages, the 'powered by ratehub.ca' line must remain visible in the header. You may not modify the Ratehub wordmark or use it as a primary logo.",
    "Don't use the Ratehub blueberry-blue as your primary brand color on the whitelabel page if it would create confusion with ratehub.ca itself. Pick an accent color that distinguishes your brand."
  ]},
  { id: 'contact', title: 'Contact', body: [
    "Reach out to partners@ratehub.ca for support, technical questions, or to request a custom integration."
  ]},
];

const Guidelines = () => {
  const [active, setActive] = React.useState('overview');

  React.useEffect(() => {
    const onScroll = () => {
      const refs = GUIDELINE_SECTIONS.map(s => ({ id: s.id, top: document.getElementById('g-' + s.id)?.getBoundingClientRect().top ?? Infinity }));
      const passed = refs.filter(r => r.top < 140);
      if (passed.length) setActive(passed[passed.length - 1].id);
    };
    const root = document.getElementById('canvas-scroll');
    if (root) {
      root.addEventListener('scroll', onScroll);
      return () => root.removeEventListener('scroll', onScroll);
    }
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById('g-' + id);
    const root = document.getElementById('canvas-scroll');
    if (el && root) {
      root.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 48, alignItems: 'flex-start' }}>
      <div style={{ maxWidth: 720 }}>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Partner guidelines</h1>
        <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 36px' }}>How the Ratehub partner program works — payouts, tracking, brand, and what's allowed.</p>

        {GUIDELINE_SECTIONS.map((s, i) => (
          <section key={s.id} id={'g-' + s.id} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
              <span style={{ color: 'var(--rh-stone-darkest)', fontWeight: 400, marginRight: 12 }}>{String(i + 1).padStart(2, '0')}</span>{s.title}
            </h2>
            {s.body.map((p, j) => <p key={j} style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--rh-blackberry-light)', margin: '0 0 14px' }}>{p}</p>)}
          </section>
        ))}
      </div>

      <aside style={{ position: 'sticky', top: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Contents</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '1px solid var(--rh-stone-light)' }}>
          {GUIDELINE_SECTIONS.map(s => (
            <li key={s.id}>
              <button onClick={() => scrollTo(s.id)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '6px 12px', fontFamily: 'inherit', fontSize: 13,
                  color: active === s.id ? 'var(--rh-blueberry-dark)' : 'var(--rh-stone-darkest)',
                  fontWeight: active === s.id ? 500 : 400,
                  borderLeft: '2px solid ' + (active === s.id ? 'var(--rh-blueberry-dark)' : 'transparent'),
                  marginLeft: -1, textAlign: 'left', width: '100%',
                  transition: 'color 200ms, border-color 200ms',
                }}>{s.title}</button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

window.Banking = Banking;
window.Guidelines = Guidelines;
