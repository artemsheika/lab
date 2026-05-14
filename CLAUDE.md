# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

No build step. Serve the directory over HTTP and open the entry point:

```bash
python3 -m http.server 8080
# open http://localhost:8080/Affiliate%20Portal.html
```

Alternatively open `Affiliate Portal.html` directly in a browser (some CDN fetches may be blocked without a server).

## Architecture

This is a **no-bundle prototype**: React 18, Babel (in-browser JSX transpilation), and Recharts are loaded from unpkg CDN. There is no `package.json`, no bundler, and no ES module imports.

### Cross-file communication via `window.*`

JSX files cannot `import` each other. Instead, each file exports to `window` at the end:

```js
// primitives.jsx
Object.assign(window, { Btn, Pill, Card, Field, ... });

// icons.jsx
window.I = { Home, Shield, CreditCard, ... };
```

The HTML loads scripts in dependency order so later files can reference earlier exports:

```
icons.jsx → primitives.jsx → data.jsx → SignIn.jsx → Sidebar.jsx
→ Overview.jsx → Mortgage.jsx → ApplicationForm.jsx
→ CreditCards.jsx → Insurance.jsx → Misc.jsx → App.jsx
```

`App.jsx` mounts to `#root` last.

### State management

All application state lives in `App.jsx` via React hooks and is passed as props:

- `authState` — `'signin' | 'portal' | 'signed-out'`
- `page` — `'overview' | 'mortgage' | 'cards' | 'insurance' | 'banking' | 'guidelines'`
- `status` — `{ cards: BUStatus, insurance: BUStatus }` where `BUStatus = 'locked' | 'form' | 'pending' | 'approved'`
- `published` — `{ cards: boolean }`

Routing is stateful (no URL changes). Switching pages updates `page` state; the canvas scrolls to top.

### Business-unit state machine

Credit Cards and Insurance each progress through four states. `setBu(key, 'pending-auto')` enters pending and schedules a 5-second auto-approve (cancellable via demo controls):

```
locked → form → pending → approved
```

The Demo Controls panel (fixed bottom-right) lets reviewers flip states without filling forms and skip the 5-second wait.

### Toast system

`window.toast(message, { icon, duration })` — callable from anywhere after `primitives.jsx` loads. Rendered by `<ToastHost/>` in `App.jsx`.

## Key files

| File | Purpose |
|---|---|
| `Affiliate Portal.html` | Entry point; CDN deps + ordered script tags |
| `src/App.jsx` | Auth, routing, BU status state, demo controls, auto-approve timer |
| `src/primitives.jsx` | All UI primitives (`Btn`, `Pill`, `Card`, `SideSheet`, `CopyBox`, `Collapsible`, `Avatar`, etc.) |
| `src/icons.jsx` | Inline SVG icons — access as `<I.Home size={18}/>` |
| `src/data.jsx` | Hardcoded partner profile (`PARTNER`), earnings series, `BU_DATA`, `MORTGAGE_WIDGETS`, `PROVINCES`, `ACCENT_COLORS`, `formatMoney` |
| `src/CreditCards.jsx` | 4-state CC page; whitelabel configurator + `WhitelabelPreview` + `PublishedPanel` |
| `src/Insurance.jsx` | 3-state insurance page; `PostalLauncher` / `TypeProvinceLauncher` previews |
| `src/ApplicationForm.jsx` | Shared application form (CC + insurance); `ResetToLockedLink` |
| `colors_and_type.css` | All design tokens as CSS custom properties + Gordita `@font-face` declarations |

## Design system tokens

CSS custom properties from `colors_and_type.css` — always use these, never hardcode colours:

- **Colors:** `--rh-blueberry-*`, `--rh-mint-*`, `--rh-lime-*`, `--rh-yuzu-*`, `--rh-tangerine-*`, `--rh-stone-*`, `--rh-blackberry`, `--rh-coconut`
- **Primary CTA background:** `#2d6e8a` (desaturated blueberry-dark); hover → `--rh-blueberry-dark`; active → `--rh-blueberry-darkest`
- **Spacing:** `--rh-space-*` (eighth through 8, multiples of 16px)
- **Radii:** `--rh-radius-s` (8px buttons/inputs), `--rh-radius-m` (12px cards), `--rh-radius-full` (pills)
- **Shadows:** `--rh-shadow-xs` through `--rh-shadow-l`, `--rh-shadow-focus`
- **Type:** `--rh-font-sans` (Gordita), `--rh-font-mono`; `.rh-title-*` / `.rh-text-*` utility classes

Headlines use `.serif` (Source Serif 4) for display titles only. `.eyebrow` for uppercase small labels. `.showDot` adds the signature blueberry period on hero H1s.
