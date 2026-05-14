// Lucide-style inline SVG icons (custom, lightweight)
// All icons inherit currentColor.

const Ico = ({ d, size = 18, stroke = 2, children, style, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'inline-block', flexShrink: 0, ...style }} {...rest}>
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  Dashboard: (p) => <Ico {...p}><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></Ico>,
  Home: (p) => <Ico {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></Ico>,
  CreditCard: (p) => <Ico {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></Ico>,
  Shield: (p) => <Ico {...p}><path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z"/></Ico>,
  Landmark: (p) => <Ico {...p}><path d="M3 22h18"/><path d="M3 10h18"/><path d="M5 22V10"/><path d="M19 22V10"/><path d="M9 22V10"/><path d="M15 22V10"/><path d="M2 10l10-7 10 7"/></Ico>,
  Book: (p) => <Ico {...p}><path d="M4 4v16a2 2 0 002 2h14V4a2 2 0 00-2-2H6a2 2 0 00-2 2z"/><path d="M8 7h8M8 11h8M8 15h5"/></Ico>,
  LogOut: (p) => <Ico {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></Ico>,
  Copy: (p) => <Ico {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></Ico>,
  Check: (p) => <Ico {...p} d="M4 12l5 5 11-12"/>,
  CheckCircle: (p) => <Ico {...p}><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></Ico>,
  X: (p) => <Ico {...p} d="M6 6l12 12M18 6L6 18"/>,
  ChevronDown: (p) => <Ico {...p} d="M6 9l6 6 6-6"/>,
  ChevronRight: (p) => <Ico {...p} d="M9 6l6 6-6 6"/>,
  ChevronLeft: (p) => <Ico {...p} d="M15 6l-6 6 6 6"/>,
  ChevronUp: (p) => <Ico {...p} d="M6 15l6-6 6 6"/>,
  ArrowRight: (p) => <Ico {...p}><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></Ico>,
  ArrowUp: (p) => <Ico {...p}><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></Ico>,
  TrendUp: (p) => <Ico {...p}><path d="M3 17l6-6 4 4 8-9"/><path d="M14 6h7v7"/></Ico>,
  Clock: (p) => <Ico {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></Ico>,
  Hourglass: (p) => <Ico {...p}><path d="M6 2h12M6 22h12"/><path d="M6 2v4l6 6 6-6V2"/><path d="M6 22v-4l6-6 6 6v4"/></Ico>,
  Upload: (p) => <Ico {...p}><path d="M12 16V4"/><path d="M5 11l7-7 7 7"/><path d="M3 20h18"/></Ico>,
  Settings: (p) => <Ico {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.7l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.7-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.7.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.7 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.7l-.1-.1a2 2 0 012.8-2.8l.1.1a1.6 1.6 0 001.7.3h0a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.7-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.7v0a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z"/></Ico>,
  Zap: (p) => <Ico {...p} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  Star: (p) => <Ico {...p}><path d="M12 2l3 7h7l-5.5 4.5 2 7-6.5-4.5-6.5 4.5 2-7L2 9h7l3-7z"/></Ico>,
  Search: (p) => <Ico {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Ico>,
  Loader: (p) => <Ico {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></Ico>,
  Sliders: (p) => <Ico {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></Ico>,
  Calculator: (p) => <Ico {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8"/></Ico>,
  Refresh: (p) => <Ico {...p}><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/><path d="M3 21v-5h5"/></Ico>,
  Wallet: (p) => <Ico {...p}><path d="M20 12V8a2 2 0 00-2-2H5a3 3 0 00-3 3v10a2 2 0 002 2h14a2 2 0 002-2v-4"/><path d="M22 12h-4a2 2 0 100 4h4z"/></Ico>,
  Plane: (p) => <Ico {...p} d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.2.6-.6.5-1.1z"/>,
  Car: (p) => <Ico {...p}><path d="M5 17h14M3 17h2l1.5-7h11L19 17h2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/></Ico>,
  Building: (p) => <Ico {...p}><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></Ico>,
  Heart: (p) => <Ico {...p} d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z"/>,
  Bell: (p) => <Ico {...p}><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></Ico>,
  Sparkle: (p) => <Ico {...p}><path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19"/></Ico>,
  Code: (p) => <Ico {...p}><path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/></Ico>,
  Info: (p) => <Ico {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></Ico>,
  Lock: (p) => <Ico {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></Ico>,
  Globe: (p) => <Ico {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></Ico>,
  Eye: (p) => <Ico {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Ico>,
  RotateCcw: (p) => <Ico {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></Ico>,
  Wand2: (p) => <Ico {...p}><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M15 9h0M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5"/></Ico>,
  FastForward: (p) => <Ico {...p}><path d="M13 19l9-7-9-7v14zM2 19l9-7-9-7v14z"/></Ico>,
  ExternalLink: (p) => <Ico {...p}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></Ico>,
  Image: (p) => <Ico {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></Ico>,
  Menu: (p) => <Ico {...p} d="M3 6h18M3 12h18M3 18h18"/>,
  Link: (p) => <Ico {...p}><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7L12 19"/></Ico>,
  Wrench: (p) => <Ico {...p}><path d="M14.7 6.3a5 5 0 016.6 6.6l-3 3-1.5-1.5 3-3a3 3 0 10-3.6-3.6l-3 3-1.5-1.5 3-3z"/><path d="M3 21l8-8M9.5 10.5l4 4"/></Ico>,
  Handshake: (p) => <Ico {...p}><path d="M11 17l-3-3 4-4 4 4 3-3"/><path d="M3 11l4-4 5 5"/><path d="M21 13l-4 4-5-5"/><path d="M14 22l-3-3M10 22l3-3"/></Ico>,
  Plus: (p) => <Ico {...p} d="M12 5v14M5 12h14"/>,
  Minus: (p) => <Ico {...p} d="M5 12h14"/>,
  Twitter: (p) => <Ico {...p}><path d="M4 4l7.5 9.5L4 20h2l6.5-7 5.5 7h4l-8-10L19 4h-2l-5.5 6L7 4z" fill="currentColor" stroke="none"/></Ico>,
  Facebook: (p) => <Ico {...p}><path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v9h4v-9h3l1-4h-4V8z"/></Ico>,
  Instagram: (p) => <Ico {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></Ico>,
  LinkedIn: (p) => <Ico {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/></Ico>,
  YouTube: (p) => <Ico {...p}><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></Ico>,
  TikTok: (p) => <Ico {...p}><path d="M13 4v10.5a3.5 3.5 0 11-3.5-3.5"/><path d="M13 4c.5 2 2 4 5 4.5"/></Ico>,
};

window.I = I;
