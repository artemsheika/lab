// Reusable primitives — buttons, inputs, pills, cards, side-sheet, toasts

const Btn = ({ variant = 'primary', size = 'm', children, onClick, disabled, style, type = 'button', icon, iconRight, full, ...rest }) => {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    s: { padding: '6px 12px', fontSize: 13, gap: 6, height: 32 },
    m: { padding: '10px 18px', fontSize: 14, gap: 8, height: 40 },
    l: { padding: '13px 24px', fontSize: 15, gap: 10, height: 48 },
  };
  const variants = {
    primary: {
      base: { background: '#2d6e8a', color: '#fff', border: '1px solid transparent' },
      hover: { background: 'var(--rh-blueberry-dark)' },
    },
    secondary: {
      base: { background: '#fff', color: 'var(--rh-blackberry)', border: '1px solid var(--rh-stone)' },
      hover: { background: 'var(--rh-stone-lightest)', borderColor: 'var(--rh-blackberry)' },
    },
    dark: {
      base: { background: 'var(--rh-blackberry)', color: '#fff', border: '1px solid var(--rh-blackberry)' },
      hover: { background: '#222' },
    },
    ghost: {
      base: { background: 'transparent', color: 'var(--rh-blueberry-dark)', border: '1px solid transparent' },
      hover: { background: 'var(--rh-stone-lightest)' },
    },
    danger: {
      base: { background: 'transparent', color: 'var(--rh-error)', border: '1px solid var(--rh-stone)' },
      hover: { background: 'var(--rh-error-bg)', borderColor: 'var(--rh-error)' },
    },
    coconut: {
      base: { background: '#fff', color: 'var(--rh-blueberry-darkest)', border: '1px solid #fff' },
      hover: { background: 'var(--rh-stone-lightest)' },
    },
  };
  const v = variants[variant] ?? variants.primary;
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...sizes[size], ...v.base, ...(hover && !disabled ? v.hover : {}),
        opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit', fontWeight: 500, lineHeight: 1, borderRadius: 8,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background-color 200ms, color 200ms, border-color 200ms',
        width: full ? '100%' : 'auto', whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
};

const Pill = ({ tone = 'stone', children, dot, size = 'm', style }) => {
  const tones = {
    lime: { bg: 'var(--rh-lime-lightest)', fg: 'var(--rh-lime-darkest)', dot: 'var(--rh-lime)' },
    mint: { bg: 'var(--rh-mint-light)', fg: 'var(--rh-mint-darkest)', dot: 'var(--rh-mint-darkest)' },
    yuzu: { bg: 'var(--rh-yuzu-lightest)', fg: 'var(--rh-yuzu-darkest)', dot: 'var(--rh-yuzu-dark)' },
    tangerine: { bg: 'var(--rh-tangerine-lightest)', fg: 'var(--rh-tangerine-darkest)', dot: 'var(--rh-tangerine-dark)' },
    berry: { bg: 'var(--rh-blueberry-lightest)', fg: 'var(--rh-blueberry-darkest)', dot: 'var(--rh-blueberry-dark)' },
    stone: { bg: 'var(--rh-stone-light)', fg: 'var(--rh-stone-darkest)', dot: 'var(--rh-stone-darkest)' },
    error: { bg: 'var(--rh-watermelon-lightest)', fg: 'var(--rh-error)', dot: 'var(--rh-error)' },
    dark: { bg: 'var(--rh-blackberry)', fg: '#fff', dot: '#fff' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 's' ? '2px 8px' : '3px 10px',
      borderRadius: 9999,
      fontSize: size === 's' ? 10.5 : 11.5, fontWeight: 500, lineHeight: 1.4,
      background: t.bg, color: t.fg, whiteSpace: 'nowrap',
      letterSpacing: 0.1,
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot }}/>}
      {children}
    </span>
  );
};

const Card = ({ children, style, padding = 24, hover = false, onClick }) => {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1px solid ' + (h ? 'var(--rh-stone)' : 'var(--rh-stone-light)'),
        borderRadius: 12,
        padding,
        transition: 'border-color 200ms, box-shadow 200ms',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: h ? 'var(--rh-shadow-s)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Field = ({ label, children, hint, error, style }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
    {label && <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blackberry-light)' }}>{label}</span>}
    {children}
    {hint && !error && <span style={{ fontSize: 11.5, color: 'var(--rh-stone-darkest)' }}>{hint}</span>}
    {error && <span style={{ fontSize: 11.5, color: 'var(--rh-error)' }}>{error}</span>}
  </label>
);

const TextInput = ({ value, onChange, placeholder, type = 'text', style, ...rest }) => {
  const [f, setF] = React.useState(false);
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{
        border: '1px solid ' + (f ? 'var(--rh-blueberry)' : 'var(--rh-stone)'),
        borderRadius: 8, padding: '10px 12px', fontSize: 14,
        outline: 'none', background: '#fff', color: 'var(--rh-blackberry)',
        boxShadow: f ? 'var(--rh-shadow-focus)' : 'none',
        transition: 'border-color 200ms, box-shadow 200ms',
        fontFamily: 'inherit',
        ...style,
      }}
      {...rest}
    />
  );
};

const Textarea = ({ value, onChange, placeholder, rows = 3, style }) => {
  const [f, setF] = React.useState(false);
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{
        border: '1px solid ' + (f ? 'var(--rh-blueberry)' : 'var(--rh-stone)'),
        borderRadius: 8, padding: '10px 12px', fontSize: 14,
        outline: 'none', background: '#fff', resize: 'vertical', minHeight: 80,
        fontFamily: 'inherit', color: 'var(--rh-blackberry)',
        boxShadow: f ? 'var(--rh-shadow-focus)' : 'none',
        ...style,
      }}
    />
  );
};

const SelectEl = ({ value, onChange, options, style }) => (
  <div style={{ position: 'relative', ...style }}>
    <select value={value} onChange={onChange}
      style={{
        width: '100%', border: '1px solid var(--rh-stone)', borderRadius: 8,
        padding: '10px 32px 10px 12px', fontSize: 14, background: '#fff',
        appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
        color: 'var(--rh-blackberry)',
      }}>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
    <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--rh-stone-darkest)', display: 'flex' }}>
      <I.ChevronDown size={16}/>
    </span>
  </div>
);

const Segmented = ({ value, onChange, options, size = 'm' }) => (
  <div style={{
    display: 'inline-flex', padding: 3, background: 'var(--rh-stone-lightest)',
    border: '1px solid var(--rh-stone-light)', borderRadius: 9,
  }}>
    {options.map(opt => {
      const v = opt.value ?? opt;
      const l = opt.label ?? opt;
      const active = v === value;
      return (
        <button key={v} onClick={() => onChange(v)}
          style={{
            border: 'none', background: active ? '#fff' : 'transparent',
            color: active ? 'var(--rh-blackberry)' : 'var(--rh-stone-darkest)',
            padding: size === 's' ? '5px 10px' : '7px 14px',
            fontSize: size === 's' ? 12 : 13, fontWeight: 500,
            borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: active ? '0 1px 2px rgba(0,79,110,.10), 0 0 0 1px rgba(0,79,110,.06)' : 'none',
            transition: 'all 150ms',
          }}>{l}</button>
      );
    })}
  </div>
);

const Checkbox = ({ checked, onChange, label }) => (
  <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13.5 }}>
    <span style={{
      width: 18, height: 18, borderRadius: 4,
      border: '1.5px solid ' + (checked ? '#2d6e8a' : 'var(--rh-stone)'),
      background: checked ? '#2d6e8a' : '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, marginTop: 1, transition: 'all 150ms',
    }}>
      {checked && <I.Check size={12} stroke={3} style={{ color: '#fff' }}/>}
    </span>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}/>
    <span>{label}</span>
  </label>
);

const Radio = ({ name, value, current, onChange, label }) => (
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
    <span style={{
      width: 18, height: 18, borderRadius: '50%',
      border: '1.5px solid ' + (current === value ? '#2d6e8a' : 'var(--rh-stone)'),
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      transition: 'border-color 150ms',
    }}>
      {current === value && <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2d6e8a' }}/>}
    </span>
    <input type="radio" name={name} checked={current === value} onChange={() => onChange(value)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}/>
    <span>{label}</span>
  </label>
);

// Copy-to-clipboard monospace box
const CopyBox = ({ text, label }) => {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      border: '1px solid var(--rh-stone-light)', borderRadius: 8,
      background: 'var(--rh-stone-lightest)', overflow: 'hidden',
    }}>
      <div style={{
        flex: 1, padding: '10px 14px', fontFamily: 'var(--rh-font-mono)',
        fontSize: 12.5, color: 'var(--rh-blackberry)', overflow: 'auto',
        whiteSpace: 'pre', lineHeight: 1.5,
      }}>{text}</div>
      <button onClick={copy} aria-label="Copy"
        style={{
          background: copied ? 'var(--rh-lime-lightest)' : '#fff',
          border: 'none', borderLeft: '1px solid var(--rh-stone-light)',
          padding: '0 14px', cursor: 'pointer',
          color: copied ? 'var(--rh-lime-dark)' : 'var(--rh-blueberry-dark)',
          fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'background 200ms, color 200ms',
        }}>
        {copied ? <I.Check size={14} stroke={2.5}/> : <I.Copy size={14}/>}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

// Toast system (simple, hooked via window)
const ToastHost = () => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    window.toast = (msg, opts = {}) => {
      const id = Math.random().toString(36).slice(2);
      setList(l => [...l, { id, msg, ...opts }]);
      setTimeout(() => setList(l => l.filter(t => t.id !== id)), opts.duration || 4000);
    };
  }, []);
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {list.map(t => (
        <div key={t.id} className="fade-in" style={{
          background: 'var(--rh-blackberry)', color: '#fff',
          padding: '12px 18px', borderRadius: 8, fontSize: 13.5,
          boxShadow: 'var(--rh-shadow-l)', maxWidth: 480,
          display: 'flex', alignItems: 'center', gap: 10,
          pointerEvents: 'auto',
        }}>
          {t.icon}
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
};

// Side sheet
const SideSheet = ({ open, onClose, title, children, width = 560 }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} className="backdrop-fade" style={{
        position: 'absolute', inset: 0, background: 'rgba(0,30,42,0.42)',
      }}/>
      <div className="slide-in" style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width,
        background: '#fff', boxShadow: 'var(--rh-shadow-l)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--rh-stone-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, color: 'var(--rh-stone-darkest)', borderRadius: 6 }}>
            <I.X size={20}/>
          </button>
        </div>
        <div className="scroll-y" style={{ flex: 1, padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

const PreviewBox = ({ label, ratio = '16/10', icon }) => (
  <div style={{
    aspectRatio: ratio, background: 'var(--rh-stone-lightest)',
    border: '1px dashed var(--rh-stone)', borderRadius: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    color: 'var(--rh-stone-darkest)', fontSize: 12, gap: 8,
  }}>
    {icon}
    <span>{label}</span>
  </div>
);

// Collapsible card section
const Collapsible = ({ title, defaultOpen = false, children, badge }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ background: '#fff', border: '1px solid var(--rh-stone-light)', borderRadius: 12 }}>
      <button onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', background: 'transparent', border: 'none',
          cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
          color: 'var(--rh-blackberry)', textAlign: 'left',
        }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>{title} {badge}</span>
        <I.ChevronDown size={18} style={{ color: 'var(--rh-stone-darkest)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}/>
      </button>
      {open && <div style={{ padding: '4px 20px 20px', borderTop: '1px solid var(--rh-stone-light)' }}>{children}</div>}
    </div>
  );
};

const Avatar = ({ name, size = 32 }) => {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--rh-blueberry-light), var(--rh-mint))',
      color: 'var(--rh-blueberry-darkest)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 500, flexShrink: 0,
    }}>{initials}</div>
  );
};

Object.assign(window, {
  Btn, Pill, Card, Field, TextInput, Textarea, SelectEl, Segmented, Checkbox, Radio,
  CopyBox, ToastHost, SideSheet, PreviewBox, Collapsible, Avatar,
});
