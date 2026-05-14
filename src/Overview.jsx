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

const QuickAccess = ({ name, status, desc, last, onOpen, icon }) => (
  <Card padding={20} hover onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--rh-blueberry-lightest)', color: 'var(--rh-blueberry-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{name}</div>
      </div>
      {STATUS_PILL(status)}
    </div>
    <div style={{ fontSize: 13, color: 'var(--rh-stone-darkest)', lineHeight: 1.5 }}>{desc}</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--rh-stone-light)', paddingTop: 12 }}>
      <span style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)' }}>{last}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--rh-blueberry-dark)', fontSize: 13, fontWeight: 500 }}>Open <I.ArrowRight size={13}/></span>
    </div>
  </Card>
);

const Overview = ({ status, onNavigate }) => {
  const [bu, setBu] = React.useState('all');
  const [range, setRange] = React.useState('30d');
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

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, gap: 12, flexWrap: 'wrap' }}>
        <Segmented value={bu} onChange={setBu} options={[
          { value: 'all', label: 'All' },
          { value: 'mortgage', label: 'Mortgage' },
          { value: 'cards', label: 'Credit Cards' },
          { value: 'insurance', label: 'Insurance' },
        ]}/>
        <SelectEl value={range} onChange={(e) => setRange(e.target.value)}
          options={Object.entries(RANGES).map(([v, r]) => ({ value: v, label: r.label }))}
          style={{ width: 180 }}/>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <Stat label="Total earned" value={formatMoney(data.earned) + ' CAD'} delta={data.dEarn}/>
        <Stat label="Total leads" value={data.leads.toLocaleString()} delta={data.dLeads}/>
        <Stat label="Conversion rate (lead → close)" value={data.conv + '%'} delta={data.dConv} deltaUnit="pts"/>
      </div>

      {/* Chart */}
      <Card padding={24} style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>Earnings over time</h3>
          <span style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: 0.5 }}>CAD</span>
        </div>
        <div style={{ height: 260 }}>
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

      {/* Quick access */}
      <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: 0.7, margin: '8px 0 12px' }}>Quick access</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <QuickAccess name="Mortgage" status="approved" desc="Embed widgets and tracked links across calculators and rate tables." last="Last updated 2 days ago" icon={<I.Home size={17}/>} onOpen={() => onNavigate('mortgage')}/>
        <QuickAccess name="Credit Cards" status={status.cards} desc="Hosted whitelabel comparison page on your subdomain." last={status.cards === 'approved' ? 'Live since Apr 18, 2026' : status.cards === 'pending' ? 'Submitted just now' : 'Apply to get started'} icon={<I.CreditCard size={17}/>} onOpen={() => onNavigate('cards')}/>
        <QuickAccess name="Insurance" status={status.insurance} desc="Quote launchers for auto and home — full attribution." last={status.insurance === 'approved' ? 'Live since Apr 22, 2026' : status.insurance === 'pending' ? 'Under review' : 'Apply to get started'} icon={<I.Shield size={17}/>} onOpen={() => onNavigate('insurance')}/>
      </div>
    </div>
  );
};

window.Overview = Overview;
