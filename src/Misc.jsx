// Guidelines page only — Banking & Loans placeholder removed.

const GUIDELINE_SECTIONS = [
  { id: 'overview', title: 'Program overview', body: [
    "Ratehub's affiliate program lets Canadian publishers, brokers, comparison sites, and content creators monetize traffic across mortgage, everyday banking (credit cards, GIC, savings, loans), and insurance. We pay on funded products — never on clicks or unqualified leads.",
    'The program is designed for partners who already have an audience that researches financial products: travel & lifestyle media, personal finance content creators, mortgage and insurance brokers, and editorial sites with strong Canadian readership.',
    "All payouts settle in CAD on net-30 terms. You'll see real-time earnings, leads, and conversion in this portal."
  ]},
  { id: 'mortgage', title: 'Mortgage', body: [
    "Mortgage payouts are funded-only. We don't pay per lead, application, or pre-approval — only on mortgages that close and fund through Ratehub Mortgage Brokerage.",
    "Tracking window is 30 days, last-touch. Prohibited tactics include paid search on Ratehub-branded keywords, misleading creative, and any redirect chain that strips the aff_id parameter."
  ]},
  { id: 'cards', title: 'Everyday Banking', body: [
    "Everyday Banking covers credit cards plus calculators for TFSA, RRSP, compound interest, and credit card debt. One approval unlocks all of it.",
    "Credit card comparisons must run on a Ratehub-hosted whitelabel page on a [your-brand].partners.ratehub.ca subdomain — a compliance requirement, since card issuers expect their product disclosures to render exactly as Ratehub serves them. Calculators are embeddable directly on your site via iframe or JavaScript snippet, no hosting required.",
    "Approval criteria include 50,000+ monthly visitors or equivalent reach, a Canadian-focused audience, and a signed affiliate agreement. Payout on credit cards is per approved application — typically $40–$140 CAD depending on the issuer and product. Calculators earn on funded products that originate through embedded tracking."
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
    <div className="fade-in guidelines-layout" style={{ alignItems: 'flex-start' }}>
      <div style={{ maxWidth: 720, minWidth: 0 }}>
        <h1 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Partner guidelines</h1>
        <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: '0 0 24px' }}>How the Ratehub partner program works — payouts, tracking, brand, and what's allowed.</p>

        {/* Mobile-only collapsible TOC */}
        <div className="show-mobile" style={{ marginBottom: 28 }}>
          <Collapsible title="Table of contents">
            <ul style={{ listStyle: 'none', padding: 0, margin: '6px 0 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {GUIDELINE_SECTIONS.map(s => (
                <li key={s.id}>
                  <button onClick={() => scrollTo(s.id)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      padding: '10px 4px', fontFamily: 'inherit', fontSize: 14,
                      color: 'var(--rh-blackberry)', textAlign: 'left', width: '100%',
                      minHeight: 44,
                    }}>{s.title}</button>
                </li>
              ))}
            </ul>
          </Collapsible>
        </div>

        {GUIDELINE_SECTIONS.map((s, i) => (
          <section key={s.id} id={'g-' + s.id} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
              <span style={{ color: 'var(--rh-stone-darkest)', fontWeight: 400, marginRight: 12 }}>{String(i + 1).padStart(2, '0')}</span>{s.title}
            </h2>
            {s.body.map((p, j) => <p key={j} style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--rh-blackberry-light)', margin: '0 0 14px' }}>{p}</p>)}
          </section>
        ))}
      </div>

      <aside className="hide-mobile" style={{ position: 'sticky', top: 24 }}>
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

window.Guidelines = Guidelines;
