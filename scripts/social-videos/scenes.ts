/**
 * Storyboards for the og:video motion pieces rendered by scripts/generate-social-videos.ts.
 * Each scene is plain HTML on a 1280x672 stage. Animations are CSS animations whose delay is their place on the
 * timeline (seconds), so `at` values below read like an edit decision list. Typed text and counters are driven by
 * data attributes that the renderer resolves for every frame.
 * Rules: the first frame already shows the hook, cuts land every 1-2 s, and every piece ends on a CTA with the URL.
 * Numbers come from siteMetrics and the plugin catalog so the videos never claim more than the site does.
 */
import { capgoMarkSvg } from '../../apps/web/src/config/capgoMark'
import { actions } from '../../apps/web/src/config/plugins'
import { siteMetrics } from '../../apps/web/src/config/siteMetrics'

export type Scene = {
  slug: string
  duration: number
  accent: string
  accent2: string
  html: string
}

/** Turn a display metric such as `1B+` into the number to count up to and the suffix to keep. */
function metricCount(value: string) {
  const match = /^([\d.]+)([KMB]?)(\+?)$/.exec(value)
  if (!match) throw new Error(`Unsupported metric format: ${value}`)
  const scale = { '': 1, K: 1_000, M: 1_000_000, B: 1_000_000_000 }[match[2] as '' | 'K' | 'M' | 'B']
  return { to: Math.round(Number(match[1]) * scale), suffix: match[3] }
}

const updatesPerMonth = metricCount(siteMetrics.updatesPerMonth)

// ---- Timeline helpers -------------------------------------------------------------------------------------------

/** One CSS animation entry: keyframes `name` starting at `at` seconds, held before and after. */
const a = (name: string, at: number, dur = 0.5, ease = 'var(--out)') => `${name} ${dur}s ${ease} ${at}s both`
/** Like `a`, but only holds the end state, so it can follow another animation on the same element. */
const after = (name: string, at: number, dur = 0.5, ease = 'var(--out)') => `${name} ${dur}s ${ease} ${at}s forwards`
const anim = (...entries: string[]) => `style="animation:${entries.join(',')}"`

/** Full-frame shot visible from `from` to `to`; `from < 0` means it is already on screen at frame 0. */
function shot(from: number, to: number | null, body: string, style = '') {
  const entries = [a('shotIn', from, 0.35)]
  if (to !== null) entries.push(after('shotOut', to - 0.28, 0.28, 'ease-in'))
  return `<div class="shot" style="animation:${entries.join(',')};${style}">${body}</div>`
}

/** Word that slams (or uses `name`) onto the screen at `at`. */
const w = (text: string, at: number, cls = '', name = 'slam', dur = 0.55) => `<span class="word ${cls}" ${anim(a(name, at, dur))}>${text}</span>`

/** Text typed at `cps` characters per second starting at `at`. */
const typed = (text: string, at: number, cps = 38) => `<span data-type data-at="${at}" data-cps="${cps}">${text}</span>`

/** Number counting up from 0 to `to` between `at` and `at + dur`. */
const count = (to: number, at: number, dur: number, suffix = '', prefix = '') =>
  `<span data-count="${to}" data-at="${at}" data-dur="${dur}" data-prefix="${prefix}" data-suffix="${suffix}">${prefix}0${suffix}</span>`

/** White flash for hard cuts. */
const flash = (at: number) => `<div class="flash" ${anim(after('flash', at, 0.3, 'ease-out'))}></div>`

const mark = `<svg viewBox="0 0 100 100" aria-hidden="true">${capgoMarkSvg(0, 0, 100, '#ffffff')}</svg>`

function terminal(lines: string, width: number, at: number, name = 'fromBottom') {
  return `<div class="panel terminal" style="width:${width}px;animation:${a(name, at, 0.55)}"><div class="bar"><i></i><i></i><i></i></div>${lines}</div>`
}

/** Terminal line that appears at `at` (use with typed() for commands). */
const ln = (body: string, at: number, cls = '') => `<div class="ln ${cls}" ${anim(a('fadeIn', at, 0.12))}>${body}</div>`

function endCard(at: number, title: string, url: string) {
  return shot(
    at,
    null,
    `<div class="mark" ${anim(a('zoomPunch', at, 0.6))}>${mark}</div>
     <div class="big" style="font-size:${title.length > 30 ? 62 : 84}px;white-space:nowrap;animation:${a('slam', at + 0.15, 0.6)}">${title}</div>
     <div class="cta" style="margin-top:10px;animation:${a('pop', at + 0.4, 0.5, 'var(--snap)')},pulse 1.1s ease-in-out ${at + 1}s infinite">${url} <span>→</span></div>`,
  )
}

function phone(screen: string, at: number, style = '', name = 'fromRight') {
  return `<div class="phone" style="${style};animation:${a(name, at, 0.6)}"><div class="notch"></div><div class="screen">${screen}</div></div>`
}

const toast = (icon: string, title: string, sub: string, at: number, iconBg = 'var(--accent)', name = 'fromTop') =>
  `<div class="toast" ${anim(a(name, at, 0.45, 'var(--snap)'))}><span class="ico" style="background:${iconBg}">${icon}</span><span>${title}<small>${sub}</small></span></div>`

function scene(slug: string, duration: number, accent: string, accent2: string, shots: string): Scene {
  return { slug, duration, accent, accent2, html: shots }
}

// ---- Scenes ----------------------------------------------------------------------------------------------------

const home = scene(
  'home',
  9,
  '#3b82f6',
  '#8b5cf6',
  `
  ${shot(
    -1,
    1.6,
    `<div ${anim(a('shake', 0.75, 0.5, 'linear'))}>
       <div class="huge">${w('Your app', -1)}</div>
       <div class="huge">${w('has a', -1)} ${w('bug.', 0.15, 'bad', 'zoomPunch', 0.45)}</div>
     </div>
     <div class="pill hot" ${anim(a('pop', 0.8, 0.45, 'var(--snap)'))}><span class="dot"></span> Checkout crashes on iOS</div>`,
  )}
  ${shot(
    1.6,
    3.2,
    `<div class="col" style="gap:34px;align-items:flex-start;font-size:78px">
       <div class="row mid" ${anim(a('fromLeft', 1.65))}><span class="dim" style="width:640px;text-align:left;font-size:78px;white-space:nowrap">App Store review</span><span class="strike bad" style="font-size:78px">waiting…<span class="line" ${anim(a('strikeDraw', 2.4, 0.3))}></span></span></div>
       <div class="row mid" ${anim(a('fromLeft', 1.95))}><span style="width:640px;text-align:left;font-size:78px;white-space:nowrap">Capgo live update</span><span class="accent" style="font-size:78px;animation:${a('zoomPunch', 2.55, 0.45)}" >minutes ⚡</span></div>
     </div>`,
  )}
  ${shot(
    3.2,
    5.9,
    `<div class="row" style="gap:46px">
       ${terminal(
         `${ln(`<span class="prompt">$</span> ${typed('npx @capgo/cli bundle upload', 3.45, 42)}`, 3.3)}
          ${ln('<span class="dim">  --channel production</span>', 4.15)}
          ${ln('✔ Bundle 4.8.2 encrypted', 4.4, 'ok-line')}
          ${ln('✔ Uploaded in 3.1s', 4.6, 'ok-line')}
          ${ln('✔ Live on production', 4.8, 'ok-line')}`,
         640,
         3.25,
         'fromLeft',
       )}
       ${phone(
         `<div class="app-card" style="font-size:22px">My Shop</div>
          <div class="app-card bad" style="position:relative;background:rgba(239,68,68,.16);border-color:rgba(239,68,68,.5)">⚠ Checkout failed
            <div style="position:absolute;inset:-1px;border-radius:18px;padding:16px;background:#14532d;border:1px solid #22c55e;color:#bbf7d0;animation:${a('fadeIn', 5.0, 0.25)}">✓ Checkout fixed</div></div>
          <div class="app-card" style="height:120px;opacity:.55"></div>
          <div class="app-card" style="height:80px;opacity:.4"></div>
          <div style="position:absolute;left:12px;right:12px;top:44px">${toast('⬇', 'Updated to 4.8.2', 'Live update · just now', 4.9, 'var(--good)')}</div>`,
         3.35,
       )}
     </div>`,
  )}
  ${shot(
    5.9,
    7.4,
    `<div class="small" ${anim(a('fadeIn', 5.95))}>Capgo ships</div>
     <div class="huge accent" style="font-size:132px">${count(updatesPerMonth.to, 6.0, 0.9, updatesPerMonth.suffix)}</div>
     <div class="mid">${w('updates every month', 6.3, '', 'fromBottom')}</div>
     <div class="row" style="margin-top:8px">
       <span class="pill brand" ${anim(a('pop', 6.6, 0.4, 'var(--snap)'))}>${siteMetrics.devices} devices</span>
       <span class="pill brand" ${anim(a('pop', 6.75, 0.4, 'var(--snap)'))}>${siteMetrics.apps} apps</span>
     </div>`,
  )}
  ${flash(5.9)}
  ${endCard(7.4, 'Fix bugs live. No store wait.', 'capgo.app')}
  `,
)

const liveUpdate = scene(
  'live-update',
  8.6,
  '#3b82f6',
  '#22d3ee',
  `
  ${shot(
    -1,
    1.5,
    `<div class="huge">${w('Shipped', -1)} ${w('a bug?', 0.12, 'bad')}</div>
     <div class="big accent" style="margin-top:12px">${w('Fix it live.', 0.6, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.5,
    4.6,
    `<div class="row" style="width:1060px;justify-content:space-between" ${anim(a('fadeIn', 1.5))}>
       <span class="pill brand">v4.8.2 → production</span>
       <span class="mid accent">${count(100, 1.9, 1.9, '%')}</span>
     </div>
     <div style="display:grid;grid-template-columns:repeat(24,34px);gap:10px;margin:8px 0">
       ${Array.from({ length: 24 * 7 }, (_, i) => {
         const col = i % 24
         const row = Math.floor(i / 24)
         const at = 1.9 + col * 0.065 + row * 0.04 + ((i * 37) % 7) * 0.02
         return `<div style="height:34px;border-radius:9px;background:#7f1d1d;box-shadow:0 0 10px rgba(239,68,68,.4);animation:${a('pop', 1.55 + ((i * 13) % 10) * 0.02, 0.3)},${after('toGood', at, 0.25)}"></div>`
       }).join('')}
     </div>
     <div class="row">
       <span class="pill ok" ${anim(a('pop', 2.6, 0.4, 'var(--snap)'))}>⚡ No store review</span>
       <span class="pill ok" ${anim(a('pop', 3.0, 0.4, 'var(--snap)'))}>🎯 Staged rollout</span>
       <span class="pill ok" ${anim(a('pop', 3.4, 0.4, 'var(--snap)'))}>🛡 Auto-pause on failures</span>
     </div>`,
  )}
  ${shot(
    4.6,
    6.6,
    `<div class="big">${w('Bad release?', 4.65)}</div>
     <div class="cta" style="font-size:52px;padding:26px 56px;background:var(--bad);color:#fff;animation:${a('pop', 5.0, 0.4, 'var(--snap)')},press .35s ease-in-out 5.6s both">↩ Revert</div>
     <div class="mid accent">${w('One click. Every device.', 5.85, '', 'fromBottom', 0.45)}</div>`,
  )}
  ${flash(4.6)}
  ${endCard(6.6, 'Live updates for Capacitor apps', 'capgo.app/live-update')}
  `,
)

const nativeBuild = scene(
  'native-build',
  8.8,
  '#14b8a6',
  '#0ea5e9',
  `
  ${shot(
    -1,
    1.5,
    `<div class="huge">${w('No Mac?', -1)}</div>
     <div class="huge accent">${w('No problem.', 0.45, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.5,
    5.0,
    `<div class="row" style="gap:40px;align-items:stretch">
       ${terminal(
         `${ln(`<span class="prompt">$</span> ${typed('npx @capgo/cli build ios', 1.75, 40)}`, 1.6)}
          ${ln('✔ Credentials loaded', 2.55, 'ok-line')}
          ${ln('✔ Dependencies installed', 2.95, 'ok-line')}
          ${ln('✔ Signed with your certificate', 3.4, 'ok-line')}
          ${ln('✔ Archive uploaded', 3.85, 'ok-line')}
          ${ln('<span class="dim">→ build 42 ready</span>', 4.2)}`,
         680,
         1.55,
         'fromLeft',
       )}
       <div class="panel col" style="width:330px;padding:30px;justify-content:center;align-items:center;animation:${a('fromRight', 1.7)}">
         <div class="small">Build time</div>
         <div class="huge accent" style="font-size:110px" data-clock data-at="2.2" data-dur="2" data-to="161">0:00</div>
         <div class="small">on M4 Mac runners</div>
       </div>
     </div>`,
  )}
  ${shot(
    5.0,
    6.8,
    `<div class="row" style="gap:36px">
       <div class="panel col" style="width:400px;padding:34px;align-items:flex-start;text-align:left;animation:${a('pop', 5.05, 0.45, 'var(--snap)')}">
         <div class="small">iOS</div><div class="mid">App.ipa</div><span class="pill ok">✓ Signed · TestFlight</span></div>
       <div class="panel col" style="width:400px;padding:34px;align-items:flex-start;text-align:left;animation:${a('pop', 5.3, 0.45, 'var(--snap)')}">
         <div class="small">Android</div><div class="mid">app.aab</div><span class="pill ok">✓ Signed · Play Console</span></div>
     </div>
     <div class="mid">${w('From any machine.', 5.7, '', 'fromBottom', 0.45)}</div>`,
  )}
  ${flash(5.0)}
  ${endCard(6.8, 'Ship without the Mac', 'capgo.app/native-build')}
  `,
)

const chartPath = 'M0 250 L80 240 L160 252 L240 236 L320 246 L400 232 L470 244 L520 230 L560 70 L600 40 L640 60 L700 50 L760 120 L820 210 L900 236 L980 232'
const observe = scene(
  'observe',
  8.8,
  '#f97316',
  '#3b82f6',
  `
  ${shot(
    -1,
    1.6,
    `<div class="huge">${w('You shipped.', -1)}</div>
     <div class="big bad">${w('Then this', 0.5)} ${w('happened.', 0.7)}</div>`,
  )}
  ${shot(
    1.6,
    4.9,
    `<div class="panel" style="position:relative;width:1080px;height:420px;padding:30px;text-align:left;animation:${a('fromBottom', 1.6)}">
       <div class="row" style="justify-content:space-between"><span class="small" style="color:#fff">Crash rate</span><span class="pill" style="font-size:22px">production · last 24h</span></div>
       <svg viewBox="0 0 980 280" style="position:absolute;left:50px;bottom:30px;width:980px;height:280px;overflow:visible">
         <defs><linearGradient id="hot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ef4444" stop-opacity=".55"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/></linearGradient></defs>
         <path d="${chartPath} L980 280 L0 280 Z" fill="url(#hot)" style="animation:${a('fadeIn', 3.0, 0.6)}"/>
         <path d="${chartPath}" fill="none" stroke="#f97316" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" pathLength="1000" style="stroke-dasharray:1000;--len:1000;animation:${a('draw', 1.9, 1.6, 'linear')}"/>
         <line x1="520" y1="0" x2="520" y2="280" stroke="#fff" stroke-dasharray="8 8" stroke-opacity=".6" style="animation:${a('fadeIn', 2.75, 0.2)}"/>
         <text x="532" y="22" fill="#fff" font-size="22" font-weight="800" style="animation:${a('fadeIn', 2.75, 0.2)}">v4.9.0 released</text>
       </svg>
       <div style="position:absolute;right:40px;top:150px">${toast('⚠', 'Crash spike on 4.9.0', 'WebView crash · checkout.js:142', 3.1, 'var(--bad)', 'pop')}</div>
     </div>`,
  )}
  ${shot(
    4.9,
    6.8,
    `<div class="col" style="gap:20px;align-items:flex-start">
       <span class="pill hot" style="font-size:34px" ${anim(a('fromLeft', 4.95))}>⚠ Release 4.9.0 needs attention</span>
       <span class="pill" style="font-size:34px" ${anim(a('fromLeft', 5.25))}>🔎 Logs Insights → checkout.js:142</span>
       <span class="pill ok" style="font-size:34px" ${anim(a('fromLeft', 5.55))}>✓ Found it before support did</span>
     </div>`,
  )}
  ${flash(4.9)}
  ${endCard(6.8, 'See what every release does', 'capgo.app/observe')}
  `,
)

const notifications = scene(
  'notifications',
  8.6,
  '#f59e0b',
  '#ec4899',
  `
  ${shot(
    -1,
    1.5,
    `<div class="huge">${w('Push that', -1)}</div>
     <div class="huge accent">${w('ships updates.', 0.4, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.5,
    5.2,
    `<div class="row" style="gap:70px">
       <div class="col" style="align-items:flex-start;text-align:left;width:520px">
         <div class="big">${w('Every', 1.6, '', 'fromLeft')}</div>
         <div class="big accent">${w('device.', 1.8, '', 'fromLeft')}</div>
         <div class="big">${w('One send.', 2.0, '', 'fromLeft')}</div>
         <span class="pill brand" style="margin-top:14px" ${anim(a('pop', 3.6, 0.4, 'var(--snap)'))}>iOS + Android · native push</span>
       </div>
       ${phone(
         `<div style="text-align:center;margin:18px 0 10px"><div style="font-size:64px;font-weight:800;letter-spacing:-0.03em">9:41</div><div class="dim" style="font-size:16px;font-weight:700">Tuesday, October 22</div></div>
          ${toast('🛍', 'Spring sale is live', 'My Shop · now', 2.0)}
          ${toast('✨', 'New: saved items', 'My Shop · now', 2.5, '#8b5cf6')}
          ${toast('⬇', 'Update ready', 'Applied on next launch', 3.0, 'var(--good)')}
          ${toast('📦', 'Your order shipped', 'My Shop · now', 3.5, '#0ea5e9')}`,
         1.55,
         'height:600px',
       )}
     </div>`,
  )}
  ${shot(
    5.2,
    6.8,
    `<div class="mid">${w('Push + silent update checks', 5.25)}</div>
     <div class="row">
       <span class="pill ok" ${anim(a('pop', 5.55, 0.4, 'var(--snap)'))}>Broadcasts & API</span>
       <span class="pill ok" ${anim(a('pop', 5.7, 0.4, 'var(--snap)'))}>Channel-aware</span>
       <span class="pill ok" ${anim(a('pop', 5.85, 0.4, 'var(--snap)'))}>Measured opens</span>
     </div>`,
  )}
  ${flash(5.2)}
  ${endCard(6.8, 'Push, inside your release loop', 'capgo.app/notifications')}
  `,
)

const cli = scene(
  'cli',
  8.8,
  '#22c55e',
  '#3b82f6',
  `
  ${shot(
    -1,
    1.4,
    `<div class="huge">${w('Your whole', -1)}</div>
     <div class="huge">${w('release.', -1)}</div>
     <div class="big accent">${w('From your terminal.', 0.4, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.4,
    6.6,
    terminal(
      `${ln(`<span class="prompt">$</span> ${typed('npx @capgo/cli init', 1.6, 45)}`, 1.45)}
       ${ln('✔ App com.myshop.app connected', 2.15, 'ok-line')}
       ${ln(`<span class="prompt">$</span> ${typed('npx @capgo/cli bundle upload', 2.45, 45)}`, 2.4)}
       ${ln('✔ Native compatibility checked', 3.15, 'ok-line')}
       ${ln('✔ Bundle 4.8.2 live on production', 3.4, 'ok-line')}
       ${ln(`<span class="prompt">$</span> ${typed('npx @capgo/cli build ios', 3.75, 45)}`, 3.7)}
       ${ln('✔ Signed iOS build ready', 4.5, 'ok-line')}
       ${ln(`<span class="prompt">$</span> ${typed('npx @capgo/cli bundle list', 4.85, 45)}`, 4.8)}
       ${ln('<span class="dim">  4.8.2  production  ●  live</span>', 5.5)}`,
      1080,
      1.4,
    ),
    'gap:0',
  )}
  ${flash(6.6)}
  ${endCard(6.6, 'Release from your terminal, CI, or AI agent', 'capgo.app/capgo-cli')}
  `,
)

const appMobile = scene(
  'app-mobile',
  8.6,
  '#a855f7',
  '#3b82f6',
  `
  ${shot(
    -1,
    1.5,
    `<div class="huge">${w('Test any build', -1)}</div>
     <div class="huge accent">${w('on a real phone.', 0.4, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.5,
    6.4,
    `<div class="row" style="gap:80px">
       <div class="col" style="align-items:flex-start;text-align:left;width:520px">
         <div class="mid">${w('1. Scan', 1.7, '', 'fromLeft')}</div>
         <div class="mid">${w('2. Test', 3.0, '', 'fromLeft')}</div>
         <div class="mid accent">${w('3. Promote', 4.3, '', 'fromLeft')}</div>
       </div>
       ${phone(
         `<div style="position:relative;height:100%">
            <div style="position:absolute;inset:40px 30px auto;height:250px;border-radius:24px;border:4px solid var(--accent);display:grid;place-items:center;animation:${after('fadeOut', 2.9, 0.2)}">
              <div style="width:150px;height:150px;background:repeating-conic-gradient(#fff 0 25%,#000 0 50%) 0 0/30px 30px;border-radius:8px"></div>
              <div style="position:absolute;left:10px;right:10px;top:20px;height:4px;background:var(--accent);box-shadow:0 0 20px var(--accent);animation:scan 1.2s ease-in-out 1.7s infinite"></div>
            </div>
            <div style="position:absolute;inset:0;display:flex;flex-direction:column;gap:12px;animation:${a('fadeIn', 3.0, 0.3)}">
              <div class="app-card" style="font-size:22px">Bundle 4.8.2-beta</div>
              <div class="app-card" style="color:#bbf7d0;background:#14532d;border-color:#22c55e">✓ Loaded on device</div>
              <div class="app-card" style="height:150px;opacity:.5"></div>
              <div class="app-card" style="text-align:center;background:var(--accent);border-color:transparent;font-size:20px;animation:${a('fadeIn', 4.3, 0.2)},press .35s ease-in-out 4.9s both">Promote to production</div>
              <div style="animation:${a('pop', 5.3, 0.4, 'var(--snap)')}" class="app-card">🚀 Live for all users</div>
            </div>
          </div>`,
         1.55,
       )}
     </div>`,
  )}
  ${flash(6.4)}
  ${endCard(6.4, 'Run releases from your phone', 'capgo.app/app_mobile')}
  `,
)

const pluginNames = actions.slice(0, 24).map((plugin) => plugin.title)
const plugins = scene(
  'plugins',
  8.4,
  '#10b981',
  '#3b82f6',
  `
  ${shot(
    -1,
    1.5,
    `<div class="huge">${w('Need native?', -1)}</div>
     <div class="big accent">${w('There’s a plugin.', 0.45, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.5,
    4.6,
    `<div style="display:grid;grid-template-columns:repeat(6,180px);gap:14px">
       ${pluginNames
         .map(
           (name, i) =>
             `<div class="panel" style="padding:18px 12px;border-radius:16px;font-size:19px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:${a('pop', 1.55 + i * 0.05, 0.35, 'var(--snap)')}">${name}</div>`,
         )
         .join('')}
     </div>
     <div class="huge accent" style="font-size:120px;margin-top:10px">${count(actions.length, 1.8, 1.4, '+')}</div>`,
  )}
  ${shot(
    4.6,
    6.6,
    `${terminal(
      `${ln(`<span class="prompt">$</span> ${typed('npm i @capgo/native-purchases', 4.8, 40)}`, 4.65)}
       ${ln('✔ iOS   ✔ Android   ✔ Docs   ✔ Open source', 5.7, 'ok-line')}`,
      900,
      4.6,
    )}`,
  )}
  ${flash(4.6)}
  ${endCard(6.6, 'Native plugins ready for production', 'capgo.app/plugins')}
  `,
)

const ionicSwaps = [
  ['Ionic Identity Vault', 'Native Biometric'],
  ['Ionic Auth Connect', 'Social Login'],
  ['Ionic Secure Storage', 'Fast SQL'],
]
const ionicPlugins = scene(
  'ionic-plugins',
  8.6,
  '#22c55e',
  '#3b82f6',
  `
  ${shot(
    -1,
    1.6,
    `<div class="big">${w('Locked into', -1)}</div>
     <div class="big bad">${w('closed Ionic plugins?', 0.35)}</div>`,
  )}
  ${shot(
    1.6,
    5.0,
    `<div class="col" style="gap:20px">
       ${ionicSwaps
         .map(([from, to], i) => {
           const at = 1.7 + i * 0.25
           const swap = 2.6 + i * 0.45
           return `<div class="row" style="gap:26px;animation:${a('fromLeft', at)}">
             <span class="pill" style="width:420px;justify-content:space-between;font-size:30px"><span>${from}</span><span>🔒</span></span>
             <span class="mid accent" ${anim(a('pop', swap, 0.35, 'var(--snap)'))}>→</span>
             <span class="pill ok" style="width:380px;justify-content:space-between;font-size:30px;animation:${a('fromRight', swap + 0.1, 0.4)}"><span>${to}</span><span>✓ open</span></span>
           </div>`
         })
         .join('')}
     </div>`,
  )}
  ${shot(
    5.0,
    6.8,
    `<div class="big">${w('Open source.', 5.05)}</div>
     <div class="big accent">${w('Auditable.', 5.35)} ${w('Yours.', 5.65)}</div>`,
  )}
  ${flash(5.0)}
  ${endCard(6.8, 'Replace closed plugin contracts', 'capgo.app/ionic-enterprise-plugins')}
  `,
)

const chat = (who: 'you' | 'agent', body: string, at: number) =>
  `<div style="align-self:${who === 'you' ? 'flex-end' : 'flex-start'};max-width:780px;padding:18px 24px;border-radius:22px;font-size:27px;font-weight:700;text-align:left;background:${
    who === 'you' ? 'var(--accent)' : 'rgba(255,255,255,.07)'
  };border:1px solid var(--line);animation:${a(who === 'you' ? 'fromRight' : 'fromLeft', at, 0.4)}">${body}</div>`
const tool = (name: string, at: number) => `<div class="ln" style="align-self:flex-start;padding:0 8px;font-family:var(--mono);font-size:24px;color:#c4b5fd;animation:${a('fadeIn', at, 0.15)}">⚙ ${name}</div>`

const skills = scene(
  'skills',
  9,
  '#a855f7',
  '#3b82f6',
  `
  ${shot(
    -1,
    1.7,
    `<div class="big">${w('Your AI agent', -1)}</div>
     <div class="big">${w('doesn’t know', 0.2)} ${w('Capacitor.', 0.45, 'bad')}</div>`,
  )}
  ${shot(1.7, 2.7, `<div class="huge accent" style="font-size:180px">${w('Now it does.', 1.75, '', 'zoomPunch', 0.45)}</div>`)}
  ${flash(1.7)}
  ${shot(
    2.7,
    6.4,
    `<div class="panel col" style="width:1080px;padding:30px;gap:16px;animation:${a('fromBottom', 2.7)}">
       ${chat('you', typed('Add live updates and ship this fix to production', 2.95, 55), 2.8)}
       ${tool('skill: capgo-live-updates', 4.0)}
       ${tool('skill: capgo-cli-usage', 4.25)}
       ${tool('npx @capgo/cli bundle upload --channel production', 4.5)}
       ${chat('agent', '✓ Shipped 4.8.2 to production. No store review needed.', 5.0)}
     </div>`,
  )}
  ${shot(
    6.4,
    7.6,
    `<div class="small">${w('One command:', 6.45, '', 'fadeIn')}</div>
     ${terminal(`${ln(`<span class="prompt">$</span> ${typed('npx skills add Cap-go/capgo-skills', 6.55, 60)}`, 6.45)}`, 900, 6.4)}`,
  )}
  ${endCard(7.6, 'Capacitor skills for AI agents', 'capgo.app/skills')}
  `,
)

const agentLogos = [
  ['claude', '#d97757'],
  ['openai', '#0f172a'],
  ['cursor', '#111111'],
  ['windsurf', '#0b9f8a'],
  ['gemini', '#4f7cf7'],
  ['github-copilot', '#24292f'],
]
const agents = scene(
  'agents',
  9,
  '#3b82f6',
  '#a855f7',
  `
  ${shot(
    -1,
    1.6,
    `<div class="huge">${w('Prompt.', -1)}</div>
     <div class="huge accent">${w('App Store.', 0.45, '', 'zoomPunch', 0.5)}</div>`,
  )}
  ${shot(
    1.6,
    2.9,
    `<div class="row" style="gap:30px">
       ${agentLogos
         .map(
           ([logo, color], i) =>
             `<div class="panel" style="width:130px;height:130px;border-radius:32px;display:grid;place-items:center;background:${color};animation:${a('pop', 1.65 + i * 0.08, 0.4, 'var(--snap)')}"><img src="../../apps/web/public/agents/${logo}.svg" style="width:72px;height:72px" alt=""></div>`,
         )
         .join('')}
     </div>
     <div class="mid">${w('Works with the agent you already use', 2.1, '', 'fromBottom', 0.45)}</div>`,
  )}
  ${flash(2.9)}
  ${shot(
    2.9,
    6.6,
    `<div class="panel col" style="width:1080px;padding:30px;gap:16px;animation:${a('fromBottom', 2.9)}">
       ${chat('you', typed('Build my iOS app and send it to TestFlight', 3.1, 55), 3.0)}
       ${tool('npx @capgo/cli build ios', 4.1)}
       ${tool('capgo_get_build_status → running', 4.4)}
       ${tool('capgo_get_build_status → succeeded', 4.9)}
       ${chat('agent', '✓ Build 42 is on TestFlight. Signed, uploaded, done.', 5.3)}
     </div>`,
  )}
  ${endCard(6.6, 'Ship mobile apps from your AI agent', 'capgo.app/agents')}
  `,
)

export const scenes: Scene[] = [home, liveUpdate, nativeBuild, observe, notifications, cli, appMobile, plugins, ionicPlugins, skills, agents]
