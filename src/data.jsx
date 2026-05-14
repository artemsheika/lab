// Hardcoded prototype data

const PARTNER = {
  name: 'John Admin',
  firstName: 'John',
  email: 'admin@ratehub.ca',
  phone: '(416) 555-0100',
  company: 'Ratehub',
  website: 'ratehub.ca',
  visitors: '100,000',
  brand: 'Ratehub',
  affId: '100000',
  slug: 'ratehub',
};

// Earnings — last 30 days, anchored to May 5, 2026
const todayStr = 'May 5, 2026';
const buildSeries = (days, base, vol, trend) => {
  const out = [];
  let v = base;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(2026, 4, 5);
    d.setDate(d.getDate() - i);
    v += (Math.random() - 0.4) * vol + trend;
    v = Math.max(base * 0.4, v);
    out.push({
      date: d.toISOString().slice(5, 10),
      label: d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
      value: Math.round(v * 100) / 100,
    });
  }
  return out;
};

// Seed deterministic-ish numbers
let _r = 1;
const rnd = () => { _r = (_r * 9301 + 49297) % 233280; return _r / 233280; };
Math.random = rnd;

const SERIES_30 = buildSeries(30, 130, 60, 0.8);
const SERIES_7 = SERIES_30.slice(-7);
const SERIES_90 = (() => {
  const s = buildSeries(90, 110, 60, 0.5);
  return s;
})();
const SERIES_YTD = (() => {
  const s = buildSeries(125, 100, 70, 0.6); // Jan 1 → May 5
  return s;
})();

const RANGES = {
  '7d':  { label: 'Last 7 days',  series: SERIES_7 },
  '30d': { label: 'Last 30 days', series: SERIES_30 },
  '90d': { label: 'Last 90 days', series: SERIES_90 },
  'ytd': { label: 'Year to date', series: SERIES_YTD },
};

// Per-BU multipliers for stat cards
const BU_DATA = {
  all:       { earned: 4287.50, leads: 342, conv: 18.4, dEarn: 12.4, dLeads: 8.1, dConv: 2.1, multiplier: 1 },
  mortgage:  { earned: 2914.80, leads: 138, conv: 22.1, dEarn: 14.2, dLeads: 9.4, dConv: 3.0, multiplier: 0.66 },
  cards:     { earned: 1024.20, leads: 162, conv: 14.8, dEarn:  9.7, dLeads: 6.8, dConv: 1.4, multiplier: 0.24 },
  insurance: {  earned: 348.50, leads:  42, conv: 19.6, dEarn: 22.1, dLeads:11.0, dConv: 2.8, multiplier: 0.10 },
};

const formatMoney = (n) => '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatMoneyShort = (n) => '$' + Math.round(n).toLocaleString('en-CA');

const MORTGAGE_WIDGETS = [
  { id: 'rate-table', name: 'Mortgage Rate Table', desc: 'Live rates from 50+ Canadian lenders, sortable and filterable.' },
  { id: 'payment', name: 'Payment Calculator', desc: 'Estimate monthly payments based on price, down payment, and term.' },
  { id: 'renewal', name: 'Renewal Calculator', desc: 'Compare renewal options and find savings before your term ends.' },
  { id: 'affordability', name: 'Affordability Calculator', desc: 'Show readers exactly how much home they can afford.' },
  { id: 'refinance', name: 'Refinance Calculator', desc: 'Model the cost and savings of refinancing an existing mortgage.' },
  { id: 'penalty', name: 'Penalty Calculator', desc: 'Estimate prepayment penalties for breaking a fixed mortgage.' },
  { id: 'down-payment', name: 'Down Payment Calculator', desc: 'Help readers plan their down payment and CMHC insurance.' },
  { id: 'land-transfer', name: 'Land Transfer Tax Calculator', desc: 'Province-aware tax estimates with rebates included.' },
];

const PROVINCES = [
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'QC', label: 'Quebec' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'PE', label: 'Prince Edward Island' },
];

const TRAFFIC_TIERS = ['Less than 10,000', '10,000 – 50,000', '50,000 – 250,000', '250,000 – 1M', '1M+'];

const ACCENT_COLORS = [
  { id: 'blueberry', label: 'Ratehub blue', value: '#2d6e8a' },
  { id: 'midnight',  label: 'Midnight',     value: '#1f2937' },
  { id: 'forest',    label: 'Forest',       value: '#1f5f39' },
  { id: 'plum',      label: 'Plum',         value: '#80209c' },
  { id: 'tangerine', label: 'Tangerine',    value: '#cd5b00' },
];

const CC_REWARD_TYPES = ['All reward types', 'Cash back', 'Store credit', 'Travel', 'Flexible points'];

Object.assign(window, {
  PARTNER, todayStr, RANGES, BU_DATA, MORTGAGE_WIDGETS, PROVINCES, TRAFFIC_TIERS,
  ACCENT_COLORS, CC_REWARD_TYPES, formatMoney, formatMoneyShort,
});
