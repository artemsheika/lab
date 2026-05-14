// Overview page

const { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } = Recharts;

const Stat = ({ label, value, delta, deltaUnit = '%' }) => (
  <Card padding={22} style={{ flex: 1 }}>
    <div style={{ fontSize: 12.5, color: 'var(--rh-stone-darkest)', fontWeight: 500, marginBottom: 10 }}>{label}</div>
    <div className="serif" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{value}</div>
    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--rh-lime-dark)' }}>
      <I.ArrowUp size={12} stroke={2.5}/>
      <span style={{ fontWeight: 500 }}>+{delta}{deltaUnit}</span>
      <span style={{ color: 'var(--rh-stone-darkest)' }}>vs prior period</span>
    </div>
  </Card>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid var(--rh-stone-light)', borderRadius: 8, padding: '8px 12px', boxShadow: 'var(--rh-shadow-s)' }}>
      <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{formatMoney(payload[0].value)}</div>
    </div>
  );
};

const QuickAccess = null;

// (Quick access section removed; component kept null as a no-op placeholder.)

// Custom BU filter row — locked BUs route to their tab; approved BUs filter the demo data.
const BuFilterRow = ({ value, onChange, onRoute, status }) => {
  const items = [
    { v: 'all',       label: 'All',              gated: false },
    { v: 'mortgage',  label: 'Mortgage',         gated: false },
    { v: 'cards',     label: 'Everyday Banking', gated: status.cards !== 'approved' },
    { v: 'insurance', label: 'Insurance',        gated: status.insurance !== 'approved' },
  ];
  return (
    <div style={{
      display: 'inline-flex', padding: 3, background: 'var(--rh-stone-lightest)',
      border: '1px solid var(--rh-stone-light)', borderRadius: 9,
    }}>
      {items.map(opt => {
        const active = opt.v === value && !opt.gated;
        return (
          <button key={opt.v}
            onClick={() => opt.gated ? onRoute(opt.v) : onChange(opt.v)}
            title={opt.gated ? 'Apply for access' : undefined}
            style={{
              border: 'none', background: active ? '#fff' : 'transparent',
              color: active ? 'var(--rh-blackberry)' : opt.gated ? 'var(--rh-stone)' : 'var(--rh-stone-darkest)',
              padding: '7px 14px',
              fontSize: 13, fontWeight: 500,
              borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: active ? '0 1px 2px rgba(0,79,110,.10), 0 0 0 1px rgba(0,79,110,.06)' : 'none',
              transition: 'all 150ms',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
            {opt.gated && <I.Lock size={12} stroke={2}/>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

const Overview = ({ status, onNavigate }) => {
  const [bu, setBu] = React.useState('all');
  const [range, setRange] = React.useState('30d');

  // If an approved BU drops back to locked/pending, snap the filter back to 'all'
  React.useEffect(() => {
    if ((bu === 'cards' && status.cards !== 'approved') ||
        (bu === 'insurance' && status.insurance !== 'approved')) {
      setBu('all');
    }
  }, [status.cards, status.insurance]);

  const data = BU_DATA[bu];
  const series = RANGES[range].series.map(p => ({ ...p, value: +(p.value * data.multiplier).toFixed(2) }));

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Good afternoon</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 600, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Welcome back, John.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--rh-stone-darkest)', margin: 0 }}>Here's how your Ratehub partner account is performing.</p>
      </div>

      <InfoBanner style={{ marginBottom: 20 }}>
        Demo data shown for illustration. Production analytics will be configured per business unit, with metrics tailored to each product.
      </InfoBanner>

      {/* Filter row */}
      <div className="overview-filter-row" style={{ marginBottom: 18, gap: 12 }}>
        <div className="scrollbar-none" style={{
          overflowX: 'auto', display: 'flex', WebkitOverflowScrolling: 'touch',
          maxWidth: '100%',
        }}>
          <BuFilterRow value={bu} onChange={setBu} onRoute={onNavigate} status={status}/>
        </div>
        <SelectEl value={range} onChange={(e) => setRange(e.target.value)}
          options={Object.entries(RANGES).map(([v, r]) => ({ value: v, label: r.label }))}
          style={{ width: 180 }}/>
      </div>

      {/* Stat cards */}
      <div className="overview-stats" style={{ marginBottom: 20 }}>
        <Stat label="Total earned" value={formatMoney(data.earned) + ' CAD'} delta={data.dEarn}/>
        <Stat label="Total leads" value={data.leads.toLocaleString()} delta={data.dLeads}/>
        <Stat label="Conversion rate (lead → close)" value={data.conv + '%'} delta={data.dConv} deltaUnit="pts"/>
      </div>

      {/* Chart */}
      <Card padding={20} style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>Earnings over time</h3>
          <span style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: 0.5 }}>CAD</span>
        </div>
        <div className="overview-chart" style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 6, right: 8, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00b5d6" stopOpacity={0.28}/>
                  <stop offset="100%" stopColor="#00b5d6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="2 4"/>
              <XAxis dataKey="label" tickLine={false} axisLine={false}
                interval={Math.max(0, Math.floor(series.length / 7) - 1)}/>
              <YAxis tickLine={false} axisLine={false}
                tickFormatter={(v) => '$' + Math.round(v)}/>
              <Tooltip content={<ChartTooltip/>} cursor={{ stroke: 'var(--rh-stone)', strokeDasharray: '3 3' }}/>
              <Area type="monotone" dataKey="value" stroke="#00729e" strokeWidth={2}
                fill="url(#earningsFill)" activeDot={{ r: 4, stroke: '#00729e', strokeWidth: 2, fill: '#fff' }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

window.Overview = Overview;
