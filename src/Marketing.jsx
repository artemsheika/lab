// Marketing landing page — modeled on ratehub.ca/affiliate-program

// ───── Utility bar (thin black strip at the very top) ──────────────────
const MktUtilityBar = () => (
  <div style={{
    background: 'var(--rh-blackberry)', color: '#fff',
    fontSize: 11, letterSpacing: 0.2,
  }}>
    <div className="hide-mobile" style={{
      maxWidth: 1240, margin: '0 auto', padding: '6px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 22,
    }}>
      {['MoneySense', 'ratehub.ca', 'CanWise', 'rh insurance'].map((s, i) => (
        <a key={s} href="#" onClick={(e) => e.preventDefault()}
          style={{ color: '#fff', textDecoration: 'none', opacity: i === 1 ? 1 : 0.7 }}>{s}</a>
      ))}
    </div>
    <div className="show-mobile" style={{
      padding: '6px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    }}>
      <span style={{ color: '#fff', fontWeight: 500 }}>ratehub.ca</span>
    </div>
  </div>
);

// ───── Sticky header with nav ──────────────────────────────────────────
const MktHeader = ({ onPortal }) => {
  const navLinks = ['Mortgages', 'Credit Cards', 'Banking', 'Loans', 'Investing', 'Insurance', 'Blog'];
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: '#fff', borderBottom: '1px solid var(--rh-stone-light)',
    }}>
      <MktUtilityBar/>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: 'clamp(10px, 2vw, 14px) clamp(16px, 4vw, 32px)',
        display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 32px)', minHeight: 60,
      }}>
        <a href="#" onClick={(e) => e.preventDefault()}
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca" style={{ height: 22 }}/>
        </a>
        <nav className="hide-mobile" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 22, justifyContent: 'center', flexWrap: 'wrap' }}>
          {navLinks.map(l => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 13.5, color: 'var(--rh-blackberry)', textDecoration: 'none',
                fontWeight: 500, padding: '6px 2px', whiteSpace: 'nowrap',
              }}>{l}</a>
          ))}
        </nav>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={(e) => e.preventDefault()}
            style={{
              background: 'transparent', color: 'var(--rh-blackberry)',
              border: '1.5px solid var(--rh-blackberry)', borderRadius: 9999,
              padding: '7px 18px', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
            }}>Sign In</button>
          <button aria-label="Search" onClick={(e) => e.preventDefault()}
            style={{
              background: 'transparent', border: 'none', padding: 8, cursor: 'pointer',
              color: 'var(--rh-blackberry)', display: 'flex',
            }}><I.Search size={18}/></button>
        </div>
        <button className="show-mobile" onClick={() => setMenuOpen(true)} aria-label="Open menu"
          style={{
            background: 'transparent', border: 'none', padding: 12, cursor: 'pointer',
            color: 'var(--rh-blackberry)', borderRadius: 8, marginLeft: 'auto', display: 'flex',
          }}><I.Menu size={22}/></button>
      </div>

      {menuOpen && (
        <div className="fade-in" style={{
          position: 'fixed', inset: 0, zIndex: 200, background: '#fff',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--rh-stone-light)' }}>
            <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca" style={{ height: 20 }}/>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"
              style={{ background: 'transparent', border: 'none', padding: 12, cursor: 'pointer', color: 'var(--rh-blackberry)', display: 'flex' }}>
              <I.X size={22}/>
            </button>
          </div>
          <nav style={{ flex: 1, padding: '20px 18px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            {navLinks.map(l => (
              <a key={l} href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); }}
                style={{
                  fontSize: 17, color: 'var(--rh-blackberry)', textDecoration: 'none',
                  fontWeight: 500, padding: '14px 4px',
                  borderBottom: '1px solid var(--rh-stone-lightest)',
                }}>{l}</a>
            ))}
          </nav>
          <div style={{ padding: 18, borderTop: '1px solid var(--rh-stone-light)' }}>
            <button onClick={() => { setMenuOpen(false); onPortal(); }}
              style={{
                width: '100%', background: 'var(--rh-blueberry-dark)', color: '#fff', border: 'none',
                borderRadius: 9999, padding: '14px 24px', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
              Access the partner portal
              <I.ArrowRight size={16}/>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// ───── Hero ────────────────────────────────────────────────────────────
const MktHero = ({ onPortal }) => (
  <section style={{ background: '#fff', padding: 'clamp(64px, 12vw, 120px) clamp(16px, 4vw, 24px)' }}>
    <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
      <h1 className="serif" style={{
        fontSize: 'clamp(30px, 6.5vw, 56px)', fontWeight: 600, letterSpacing: '-0.025em',
        lineHeight: 1.05, margin: '0 0 22px',
      }}>
        Partner with Canada's most comprehensive financial platform<span style={{ color: 'var(--rh-blueberry-dark)' }}>.</span>
      </h1>
      <p style={{
        fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--rh-blackberry-light)', lineHeight: 1.55,
        margin: '0 auto 32px', maxWidth: 640,
      }}>
        Submit your request to join our affiliate program to gain access to a suite of products and tools. Approved partners have the potential to earn when your audience uses Ratehub.ca to find the right financial solutions.
      </p>
      <button onClick={onPortal}
        style={{
          background: 'var(--rh-blueberry-dark)', color: '#fff', border: 'none',
          borderRadius: 9999, padding: '14px 32px', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: '0 1px 2px rgba(0,79,110,0.18)',
          transition: 'background 200ms',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--rh-blueberry-darkest)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--rh-blueberry-dark)'}>
        Access the partner portal
        <I.ArrowRight size={16}/>
      </button>
    </div>
  </section>
);

// ───── Integration options (3-col) ─────────────────────────────────────
const MktIntegrationOptions = () => {
  const opts = [
    { icon: <I.Link size={18}/>,    title: 'Quick start links',  body: 'Get your unique tracking links instantly. Perfect for bloggers and content creators!' },
    { icon: <I.Wrench size={18}/>,  title: 'Widgetized tools',   body: 'Embed calculators, tables, and tools directly on your site. No coding required!' },
    { icon: <I.Refresh size={18}/>, title: 'Custom solutions',   body: 'Full white-label experience with your branding and our tools!' },
  ];
  return (
    <section style={{ background: 'var(--rh-stone-lightest)', padding: 'clamp(56px, 9vw, 88px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <h2 className="serif" style={{
            fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em',
            margin: '0 0 12px',
          }}>
            Flexible integration options<span style={{ color: 'var(--rh-blueberry-dark)' }}>.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--rh-blackberry-light)', margin: 0 }}>
            Choose what works best for your site.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32,
        }}>
          {opts.map(o => (
            <div key={o.title} style={{ textAlign: 'left' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--rh-blackberry)', color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>{o.icon}</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                {o.title}
              </h3>
              <p style={{ fontSize: 14.5, color: 'var(--rh-blackberry-light)', lineHeight: 1.6, margin: 0 }}>
                {o.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───── Portal mockup collage (styled HTML approximating Overview) ──────
const Sparkline = () => {
  // Generate a smooth-looking, generally upward path
  const pts = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 36, 44];
  const w = 240, h = 56, max = 48;
  const step = w / (pts.length - 1);
  const line = pts.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' L ');
  const area = `M 0,${h} L ${line} L ${w},${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="mkt-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00b5d6" stopOpacity={0.32}/>
          <stop offset="100%" stopColor="#00b5d6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#mkt-spark)"/>
      <path d={`M ${line}`} fill="none" stroke="#00729e" strokeWidth={1.6}/>
    </svg>
  );
};

const MktPortalCollage = () => (
  <div style={{
    position: 'relative', aspectRatio: '16/10',
    background: 'linear-gradient(135deg, var(--rh-blueberry-lightest), var(--rh-mint-light))',
    borderRadius: 16, padding: 28,
    overflow: 'hidden',
  }}>
    {/* Decorative dot grid */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(0,79,110,0.08) 1px, transparent 1px)',
      backgroundSize: '18px 18px',
      pointerEvents: 'none',
    }}/>

    {/* Layer 3 — widget grid card (back-right) */}
    <div style={{
      position: 'absolute', right: -10, top: 36, width: 260,
      transform: 'rotate(4deg)',
      background: '#fff', borderRadius: 10,
      boxShadow: '0 12px 32px rgba(0, 30, 42, 0.16)',
      border: '1px solid var(--rh-stone-light)',
      padding: 14,
    }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
        Embeddable calculators
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            aspectRatio: '16/10', background: 'var(--rh-stone-lightest)',
            border: '1px dashed var(--rh-stone-light)', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--rh-stone-darkest)',
          }}>
            <I.Calculator size={14}/>
          </div>
        ))}
      </div>
    </div>

    {/* Layer 2 — whitelabel comparison preview (back-left) */}
    <div style={{
      position: 'absolute', left: -16, bottom: 28, width: 240,
      transform: 'rotate(-5deg)',
      background: '#fff', borderRadius: 10,
      boxShadow: '0 12px 32px rgba(0, 30, 42, 0.16)',
      border: '1px solid var(--rh-stone-light)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 12px', borderBottom: '1px solid var(--rh-stone-light)',
        fontSize: 11, fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase',
      }}>
        ACME MEDIA
        <span style={{ fontSize: 8, color: 'var(--rh-stone-darkest)', textTransform: 'none', marginLeft: 6, fontWeight: 400 }}>
          powered by <span style={{ color: 'var(--rh-blackberry)', fontWeight: 500 }}>ratehub.ca</span>
        </span>
      </div>
      <div style={{ padding: '10px 12px' }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            border: '1px solid var(--rh-stone-light)', borderRadius: 6,
            padding: 8, marginBottom: 6,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 28, height: 18, background: i === 0 ? '#1a1a1a' : '#3b2a16', borderRadius: 2 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ height: 5, background: 'var(--rh-stone-light)', borderRadius: 2, marginBottom: 4, width: '80%' }}/>
              <div style={{ height: 4, background: 'var(--rh-stone-lightest)', borderRadius: 2, width: '60%' }}/>
            </div>
            <div style={{ width: 32, height: 14, background: 'var(--rh-blueberry-dark)', borderRadius: 3 }}/>
          </div>
        ))}
      </div>
    </div>

    {/* Layer 1 — Overview front card */}
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(360px, 64%)',
      background: '#fff', borderRadius: 12,
      boxShadow: '0 18px 50px rgba(0, 30, 42, 0.22)',
      border: '1px solid var(--rh-stone-light)',
      padding: 18,
    }}>
      <div style={{ fontSize: 10, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>
        Good afternoon
      </div>
      <div className="serif" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 14 }}>
        Welcome back, John.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
        {[
          { l: 'Earned',   v: '$4,287.50', d: '+12.4%' },
          { l: 'Leads',    v: '342',       d: '+8.1%' },
          { l: 'Conv. rate', v: '18.4%',   d: '+2.1pts' },
        ].map(s => (
          <div key={s.l} style={{
            border: '1px solid var(--rh-stone-light)', borderRadius: 7,
            padding: '8px 10px',
          }}>
            <div style={{ fontSize: 9, color: 'var(--rh-stone-darkest)', marginBottom: 4 }}>{s.l}</div>
            <div className="serif" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.v}</div>
            <div style={{ fontSize: 9, color: 'var(--rh-lime-dark)', marginTop: 2 }}>↑ {s.d}</div>
          </div>
        ))}
      </div>
      <div style={{
        border: '1px solid var(--rh-stone-light)', borderRadius: 7,
        padding: 8,
      }}>
        <div style={{ fontSize: 9.5, color: 'var(--rh-stone-darkest)', marginBottom: 4 }}>Earnings over time</div>
        <Sparkline/>
      </div>
    </div>
  </div>
);

// ───── Tools & widgets section ─────────────────────────────────────────
const MktToolsWidgets = ({ onPortal }) => (
  <section style={{ background: '#fff', padding: 'clamp(56px, 10vw, 96px) clamp(16px, 4vw, 24px)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="mkt-two-col" style={{ marginBottom: 'clamp(36px, 5vw, 56px)' }}>
        <div>
          <h2 className="serif" style={{
            fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em',
            margin: '0 0 18px', lineHeight: 1.1,
          }}>
            Available tools & widgets<span style={{ color: 'var(--rh-blueberry-dark)' }}>.</span>
          </h2>
          <p style={{
            fontSize: 15, color: 'var(--rh-blackberry-light)', lineHeight: 1.65,
            margin: '0 0 22px',
          }}>
            Leverage our tools, calculators and tables on your website or app, including the mortgage affordability calculator, CardFinder tool and insurance quoter.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Mortgage Calculators',
              'Mortgage Rate Tables',
              'Credit Card Tools',
              'Savings and Investments',
              'Loan Calculators',
              'Insurance Quoters',
            ].map(t => (
              <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14.5, color: 'var(--rh-blackberry)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--rh-blueberry-dark)', flexShrink: 0 }}/>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <MktPortalCollage/>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={onPortal}
          style={{
            background: 'var(--rh-blueberry-dark)', color: '#fff', border: 'none',
            borderRadius: 9999, padding: '14px 32px', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 1px 2px rgba(0,79,110,0.18)',
            transition: 'background 200ms',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--rh-blueberry-darkest)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--rh-blueberry-dark)'}>
          Access the partner portal
          <I.ArrowRight size={16}/>
        </button>
      </div>
    </div>
  </section>
);

// ───── Trust band ──────────────────────────────────────────────────────
const MktTrustBand = () => (
  <section style={{ background: 'var(--rh-stone-lightest)', padding: 'clamp(56px, 10vw, 96px) clamp(16px, 4vw, 24px)' }}>
    <div className="mkt-two-col" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div>
        <h2 className="serif" style={{
          fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em',
          lineHeight: 1.1, margin: '0 0 18px',
        }}>
          Over 10 million Canadians use Ratehub.ca every year to find financial products<span style={{ color: 'var(--rh-blueberry-dark)' }}>.</span>
        </h2>
        <p style={{
          fontSize: 16, color: 'var(--rh-blackberry-light)', lineHeight: 1.65, margin: 0,
        }}>
          Partner with a trusted brand and help your audience make smarter financial decisions.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 'min(280px, 70vw)', aspectRatio: '1', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, var(--rh-blueberry-light), var(--rh-blueberry-darkest) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', boxShadow: '0 12px 40px rgba(0,79,110,0.22)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.18), transparent 50%)',
          }}/>
          <I.Handshake size={84} stroke={1.4} style={{ position: 'relative' }}/>
        </div>
      </div>
    </div>
  </section>
);

// ───── FAQ ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: 'Who can join?',
    a: "Bloggers, content creators, comparison sites, financial advisors, brokers, and any Canadian-focused publisher with an audience interested in personal finance. We review every application to make sure there's a good fit on both sides." },
  { q: 'How do I apply?',
    a: 'Click "Access the partner portal" above to create your partner account. From there, you can apply for access to each product line — mortgages are open immediately, while credit cards, insurance, and everyday banking require a short review.' },
  { q: 'How do affiliates earn commissions?',
    a: "Commissions are paid on completed actions — funded mortgages, approved credit card applications, issued insurance policies, and opened banking products. We don't pay per click or per lead. You'll see exact rates in your partner agreement." },
  { q: 'What commission structure do you offer?',
    a: "Rates vary by product and partner tier. New partners start on our standard rate card; high-volume partners can negotiate custom terms. Full details are shared once you're approved." },
  { q: 'How are referrals tracked?',
    a: 'Every link and widget you generate in the portal carries a unique tracking ID. We use last-touch attribution with a 30-day cookie window — any conversion that completes within 30 days of your referral is credited to your account.' },
  { q: 'When and how do affiliates get paid?',
    a: "Payouts are issued monthly via direct deposit, with a minimum threshold of $50 CAD. You'll see live earnings in your portal dashboard and a downloadable statement at the start of each month." },
  { q: 'Is there any cost to join?',
    a: 'No. The Ratehub affiliate program is free to join. There are no setup fees, no monthly fees, and no minimum traffic requirements to apply.' },
];

const FaqItem = ({ q, a, open, onToggle }) => (
  <div style={{ borderBottom: '1px solid var(--rh-stone-light)' }}>
    <button onClick={onToggle}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 18,
        padding: '22px 4px', background: 'transparent', border: 'none',
        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      }}>
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: open ? 'var(--rh-blueberry-dark)' : 'transparent',
        color: open ? '#fff' : 'var(--rh-blueberry-dark)',
        border: '1.5px solid var(--rh-blueberry-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        transition: 'background 200ms, color 200ms',
      }}>
        {open ? <I.Minus size={14} stroke={2.5}/> : <I.Plus size={14} stroke={2.5}/>}
      </span>
      <span style={{ flex: 1, fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--rh-blackberry)' }}>
        {q}
      </span>
    </button>
    {open && (
      <div className="fade-in" style={{
        padding: '0 0 22px 46px', fontSize: 14.5, color: 'var(--rh-blackberry-light)',
        lineHeight: 1.65, maxWidth: 640,
      }}>
        {a}
      </div>
    )}
  </div>
);

const MktFaq = () => {
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section style={{ background: '#fff', padding: 'clamp(56px, 10vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 className="serif" style={{
          fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em',
          textAlign: 'center', margin: '0 0 clamp(28px, 4vw, 48px)',
        }}>
          Frequently Asked Questions<span style={{ color: 'var(--rh-blueberry-dark)' }}>.</span>
        </h2>
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}/>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───── Footer ──────────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title: null,
    links: ['About us', 'Refer and earn', 'Become a partner', 'Meet our agents', 'Meet the team', 'Careers'] },
  { title: null,
    links: ['Contact us', 'Press Centre', 'Terms of use', 'Privacy Policy', 'Disclaimer'] },
];

const MktFooter = () => (
  <footer style={{ background: 'var(--rh-blackberry)', color: '#fff' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(40px, 8vw, 64px) clamp(16px, 4vw, 32px) 32px' }}>
      <div className="mkt-footer-cols" style={{ marginBottom: 48 }}>
        {/* Brand column */}
        <div>
          <div style={{ marginBottom: 22 }}>
            <img src="assets/logos/ratehub_full_dark.svg" alt="ratehub.ca"
              style={{ height: 22, filter: 'invert(1)' }}/>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FOOTER_COLS[0].links.map(l => (
              <li key={l}><a href="#" onClick={(e) => e.preventDefault()}
                style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 13.5 }}>{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 2 */}
        <div style={{ paddingTop: 44 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FOOTER_COLS[1].links.map(l => (
              <li key={l}><a href="#" onClick={(e) => e.preventDefault()}
                style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 13.5 }}>{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 3 — language + extras */}
        <div style={{ paddingTop: 44 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: 13.5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rh-blueberry)' }}/>
            English
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 13.5 }}>Broker login</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 13.5 }}>Popular content</a></li>
          </ul>
        </div>

        {/* Col 4 — empty for spacing balance on desktop */}
        <div className="hide-mobile"></div>
      </div>

      {/* Contact row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20, paddingBottom: 22,
      }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>
          100 University Ave, 5th Floor, Toronto ON M5J 1V6
          <span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>
          1.866.988.6324
        </div>
        <div style={{ display: 'flex', gap: 12, color: 'rgba(255,255,255,0.78)' }}>
          {[I.Twitter, I.Facebook, I.Instagram, I.LinkedIn, I.YouTube, I.TikTok].map((Icon, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'inherit',
              }}>
              <Icon size={14}/>
            </a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 24 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 980, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ margin: 0 }}>
            Financial institutions pay us for connecting them with customers, including by paying for advertising placements on our website and by paying us commissions when users complete a product application, purchase a product or transfer their existing product to the financial institution. Terms, conditions, and rates vary by product and provider and are listed on the website of the financial institution.
          </p>
          <p style={{ margin: 0 }}>
            All content on the Ratehub.ca website is provided for informational purposes only and should not be considered professional advice. Always consult a licensed advisor before making financial decisions. We make no representations regarding the accuracy or completeness of any content.
          </p>
          <p style={{ margin: 0 }}>
            Ratehub.ca o/a Ratehub Inc. and CanWise Financial are licensed mortgage brokerages. Ontario Mortgage Brokerage #XXXXX, Quebec Ratehub.ca Mortgage Brokerage Firm #XXXXXXX — Ratehub Inc.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// ───── Top-level ──────────────────────────────────────────────────────
const Marketing = ({ onPortal }) => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <MktHeader onPortal={onPortal}/>
      <MktHero onPortal={onPortal}/>
      <MktIntegrationOptions/>
      <MktToolsWidgets onPortal={onPortal}/>
      <MktTrustBand/>
      <MktFaq/>
      <MktFooter/>
    </div>
  );
};

window.Marketing = Marketing;
