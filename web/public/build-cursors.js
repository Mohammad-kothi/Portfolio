/*!
 * build-cursors.js
 * "Multiple cursors building the page" animation.
 *
 * HOW TO USE
 * 1. Put this in your <head> (no "defer", so nothing flashes before it hides):
 *      <script src="build-cursors.js"></script>
 *
 * 2. Add data-build="some label" to every element the cursors should build:
 *      <h1 data-build="hero.title">PORTFOLIO</h1>
 *      <img data-build="hero.photo" src="me.jpg">
 *    Tips: mark small pieces (headings, images, cards, buttons), not whole
 *    sections, and don't put a data-build element inside another one.
 *    The wireframe follows the element's box, so a short heading that is a
 *    full-width block gets a full-width box. Add  width: fit-content  to
 *    text elements if you want the box to hug the text.
 *
 * 3. Optional settings. Put this BEFORE the script tag:
 *      <script>
 *        window.buildCursorsConfig = {
 *          count: 7,                         // number of cursors (up to 8)
 *          names: ['Design', 'Code', ...],   // label next to each cursor
 *          colors: ['#ff2b2b', ...],         // hex colours, one per cursor
 *          frameColor: '#3ea6ff',            // wireframe colour, or 'cursor'
 *          speed: 1,                         // 1.5 = faster, 0.7 = slower
 *          swarm: 1200,                      // ms of swarming at the start (0 = skip)
 *          roam: true                        // keep wandering after the build
 *        };
 *      </script>
 *
 * Elements lower on the page get built when you scroll to them.
 * Visitors who turned on "reduce motion" just see the finished page.
 */
(() => {
  'use strict';

  const cfg = Object.assign({
    count: 5,
    mobileCount: 3,
    names: ['Design', 'Layout', 'Code', 'Content', 'Motion', 'Deploy', 'Debug', 'Review'],
    colors: ['#ff2b2b', '#3ea6ff', '#ffd23e', '#3ef0a0', '#c38bff', '#f5f5f5', '#ff8a3d', '#ff5fb8'],
    frameColor: '#3ea6ff',
    speed: 1,
    swarm: 1200,
    roam: true
  }, window.buildCursorsConfig || {});

  /* ---------- styles (injected right away so content starts hidden) ---------- */
  const MONO = "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
  const css = `
[data-build]{opacity:0;translate:0 10px;transition:opacity .6s ease,translate .6s ease}
[data-build].bc-built,html.bc-off [data-build]{opacity:1;translate:none}
.bc-layer{position:fixed;inset:0;pointer-events:none;z-index:2147483000;overflow:hidden}
.bc-cursor{position:absolute;left:0;top:0;z-index:2;will-change:transform;opacity:0;transition:opacity .4s ease}
.bc-cursor svg{display:block;transform-origin:2px 2px;transition:transform .12s ease;filter:drop-shadow(0 2px 3px rgba(0,0,0,.55))}
.bc-cursor.bc-down svg{transform:scale(.8)}
.bc-cursor.bc-flip .bc-name{left:auto;right:12px}
.bc-name{position:absolute;left:15px;top:19px;padding:3px 7px;border-radius:4px;font:600 10px/1.1 ${MONO};letter-spacing:.02em;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.35)}
.bc-ripple{position:absolute;left:-12px;top:-12px;width:28px;height:28px;border-radius:50%;border:2px solid;animation:bc-ripple .55s ease-out forwards}
@keyframes bc-ripple{from{transform:scale(.2);opacity:1}to{transform:scale(1.5);opacity:0}}
.bc-frame{position:absolute;left:0;top:0;z-index:1;box-sizing:border-box;border:1px solid;transition:opacity .45s ease}
.bc-frame.bc-hover{border-style:dashed;opacity:.6}
.bc-frame i{position:absolute;width:6px;height:6px;background:#0b0b0f;border:1px solid;box-sizing:border-box}
.bc-frame i:nth-child(1){left:-3px;top:-3px}.bc-frame i:nth-child(2){right:-3px;top:-3px}
.bc-frame i:nth-child(3){left:-3px;bottom:-3px}.bc-frame i:nth-child(4){right:-3px;bottom:-3px}
.bc-tag,.bc-dim{position:absolute;padding:0 5px;border-radius:2px;font:600 9px/15px ${MONO};white-space:nowrap}
.bc-tag{left:-1px;bottom:100%;margin-bottom:3px}
.bc-dim{left:50%;top:100%;margin-top:4px;transform:translateX(-50%)}
`;
  const style = document.createElement('style');
  style.id = 'build-cursors-css';
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  const showAll = () => document.documentElement.classList.add('bc-off');
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) { showAll(); return; }

  /* ---------- helpers ---------- */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const inView = (r, pad = 0) =>
    r.bottom > -pad && r.top < innerHeight + pad && r.right > 0 && r.left < innerWidth;

  function rgb(hex) {
    let h = String(hex).trim().replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    if (h.length !== 6 || isNaN(n)) return [62, 166, 255];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgba = (hex, a) => `rgba(${rgb(hex).join(',')},${a})`;
  const textOn = hex => {
    const [r, g, b] = rgb(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? '#0b0b0f' : '#ffffff';
  };

  /* ---------- state ---------- */
  let layer;
  const cursors = [];
  const frames = new Set();
  const queue = [];   // elements waiting to be built
  const built = [];   // elements already built (used for roaming)

  function reveal(el) {
    if (el.classList.contains('bc-built')) return;
    el.classList.add('bc-built');
    built.push(el);
  }

  /* ---------- a cursor ---------- */
  class Cursor {
    constructor(i) {
      this.color = cfg.colors[i % cfg.colors.length];
      this.name = cfg.names[i % cfg.names.length];
      this.x = innerWidth / 2 + rand(-30, 30);
      this.y = innerHeight / 2 + rand(-30, 30);
      this.tw = null;
      this.dim = false;

      const el = (this.el = document.createElement('div'));
      el.className = 'bc-cursor';
      el.innerHTML =
        `<svg width="20" height="24" viewBox="0 0 20 24" aria-hidden="true">` +
        `<path d="M2 1.5v18.2l4.9-4.6 3.3 7.1 3-1.4-3.2-6.9h6.8z" fill="${this.color}" ` +
        `stroke="#0b0b0f" stroke-width="1.3" stroke-linejoin="round"/></svg>` +
        `<span class="bc-name"></span>`;
      const tag = el.querySelector('.bc-name');
      tag.textContent = this.name;
      tag.style.background = this.color;
      tag.style.color = textOn(this.color);
      layer.appendChild(el);
    }
    tween(dur, fn, interruptible = false) {
      return new Promise(res => {
        this.tw = { t0: performance.now(), dur: Math.max(1, dur), fn, res, interruptible };
      });
    }
    // glide to a (possibly moving) target along a slight curve
    moveTo(target, dur, bend, interruptible = false) {
      const sx = this.x, sy = this.y;
      const b = bend == null ? rand(-0.22, 0.22) : bend;
      return this.tween(dur, t => {
        const p = ease(t), g = target();
        const dx = g.x - sx, dy = g.y - sy, k = Math.sin(Math.PI * t) * b;
        return { x: sx + dx * p - dy * k, y: sy + dy * p + dx * k };
      }, interruptible);
    }
    travel(target) {
      const g = target();
      const d = Math.hypot(g.x - this.x, g.y - this.y);
      return clamp(250 + d * 0.9, 380, 1200) / cfg.speed;
    }
    down(on) { this.el.classList.toggle('bc-down', on); }
    click() {
      const r = document.createElement('div');
      r.className = 'bc-ripple';
      r.style.borderColor = this.color;
      this.el.appendChild(r);
      setTimeout(() => r.remove(), 600);
    }
    show(on) { this.el.style.opacity = on ? (this.dim ? '0.85' : '1') : '0'; }
    step(now) {
      if (this.tw && this.tw.interruptible && queue.length) {
        // new work appeared while wandering: stop and go build it
        const done = this.tw.res; this.tw = null; done();
      } else if (this.tw) {
        const t = Math.min(1, (now - this.tw.t0) / this.tw.dur);
        const p = this.tw.fn(t);
        this.x = p.x; this.y = p.y;
        if (t >= 1) { const done = this.tw.res; this.tw = null; done(); }
      }
      this.el.style.transform = `translate3d(${this.x - 2}px,${this.y - 2}px,0)`;
      const flip = this.x > innerWidth - 100;   // keep the name tag on screen
      if (flip !== this.flipped) { this.flipped = flip; this.el.classList.toggle('bc-flip', flip); }
    }
  }

  /* ---------- a wireframe box ---------- */
  class Frame {
    constructor(el, label, color, hover = false) {
      this.el = el;
      this.follow = null;
      this.hover = hover;
      this.w = 0;
      this.h = 0;

      const f = (this.node = document.createElement('div'));
      f.className = 'bc-frame' + (hover ? ' bc-hover' : '');
      f.style.color = color;
      f.style.background = hover ? 'transparent' : rgba(color, 0.08);
      f.innerHTML = '<i></i><i></i><i></i><i></i>' + (label ? '<b class="bc-tag"></b><b class="bc-dim"></b>' : '');
      if (label) {
        this.tag = f.querySelector('.bc-tag');
        this.dimLabel = f.querySelector('.bc-dim');
        this.tag.textContent = label;
        for (const b of [this.tag, this.dimLabel]) {
          b.style.background = color;
          b.style.color = textOn(color);
        }
      }
      layer.appendChild(f);
      frames.add(this);
      this.update();
    }
    update() {
      const r = this.el.getBoundingClientRect();
      let tw = r.width, th = r.height;
      if (this.follow) {
        tw = clamp(this.follow.x - r.left, 0, r.width);
        th = clamp(this.follow.y - r.top, 0, r.height);
      }
      if (this.hover) { this.w = tw; this.h = th; }
      else { this.w += (tw - this.w) * 0.35; this.h += (th - this.h) * 0.35; }
      const s = this.node.style;
      s.transform = `translate(${r.left}px,${r.top}px)`;
      s.width = this.w + 'px';
      s.height = this.h + 'px';
      if (this.dimLabel) this.dimLabel.textContent = Math.round(this.w) + ' × ' + Math.round(this.h);
    }
    remove(delay = 0) {
      setTimeout(() => {
        this.node.style.opacity = '0';
        setTimeout(() => { this.node.remove(); frames.delete(this); }, 460);
      }, delay);
    }
  }

  /* ---------- what cursors do ---------- */
  function take(c) {
    // anything that was scrolled far away before its turn just appears
    for (let i = queue.length - 1; i >= 0; i--) {
      if (!inView(queue[i].getBoundingClientRect(), 150)) { reveal(queue[i]); queue.splice(i, 1); }
    }
    if (!queue.length) return null;
    // build top-to-bottom, in page order
    queue.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    return queue.shift();
  }

  function waitForWork(ms) {
    return new Promise(res => {
      const t0 = performance.now();
      (function check() {
        if (queue.length || performance.now() - t0 >= ms) res();
        else setTimeout(check, 120);
      })();
    });
  }

  async function build(c, el) {
    const R = () => el.getBoundingClientRect();
    const r = R();
    if (!r.width || !r.height || !inView(r, 40)) { reveal(el); return; }

    // 1. fly to the top-left corner
    const corner = () => {
      const r = R();
      return { x: clamp(r.left, 4, innerWidth - 4), y: clamp(r.top, 4, innerHeight - 4) };
    };
    await c.moveTo(corner, c.travel(corner));

    // 2. press and drag out a wireframe to the bottom-right corner
    c.down(true);
    const color = cfg.frameColor === 'cursor' ? c.color : cfg.frameColor;
    const frame = new Frame(el, el.getAttribute('data-build') || el.tagName.toLowerCase(), color);
    frame.follow = c;
    const end = () => {
      const r = R();
      return { x: clamp(r.right, 4, innerWidth - 6), y: clamp(r.bottom, 4, innerHeight - 6) };
    };
    const dragTime = clamp(300 + Math.hypot(r.width, r.height) * 0.6, 380, 950) / cfg.speed;
    await c.moveTo(end, dragTime, rand(-0.06, 0.06));

    // 3. release: the real element appears, the wireframe fades
    frame.follow = null;
    c.down(false);
    c.click();
    reveal(el);
    frame.remove(650);
    await sleep(rand(80, 220) / cfg.speed);
  }

  async function roam(c) {
    const pool = built.filter(el => inView(el.getBoundingClientRect(), -20));
    let x, y, el = null;
    if (pool.length) {
      el = pool[Math.floor(Math.random() * pool.length)];
      const r = el.getBoundingClientRect();
      x = clamp(rand(r.left + r.width * 0.15, r.left + r.width * 0.85), 20, innerWidth - 70);
      y = clamp(rand(r.top + r.height * 0.2, r.top + r.height * 0.8), 20, innerHeight - 40);
    } else {
      x = rand(innerWidth * 0.1, innerWidth * 0.85);
      y = rand(innerHeight * 0.15, innerHeight * 0.85);
    }
    const target = () => ({ x, y });
    await c.moveTo(target, c.travel(target) * 1.4, undefined, true);
    if (queue.length) return;

    let hover = null;
    if (el && Math.random() < 0.25) hover = new Frame(el, '', c.color, true);
    if (Math.random() < 0.3) { c.down(true); await sleep(90); c.down(false); c.click(); }
    await waitForWork(rand(700, 2200));
    if (hover) hover.remove(0);
  }

  function swarm(c, i, n) {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    const a0 = (i / n) * Math.PI * 2;
    const spin = rand(0.8, 1.2) * (Math.random() < 0.5 ? 1 : -1);
    const sx = c.x, sy = c.y;
    return c.tween(cfg.swarm, t => {
      const radius = 10 + 36 * Math.sin(Math.min(1, t * 1.4) * Math.PI / 2);
      const a = a0 + spin * t * Math.PI * 2;
      const ox = cx + Math.cos(a) * radius + Math.sin(t * 9 + i) * 4;
      const oy = cy + Math.sin(a) * radius * 0.8 + Math.cos(t * 7 + i) * 4;
      const k = Math.min(1, t * 4);
      return { x: sx + (ox - sx) * k, y: sy + (oy - sy) * k };
    });
  }

  async function life(c, i) {
    try {
      await sleep(i * 90);
      for (;;) {
        const el = take(c);
        if (el) { c.dim = false; c.show(true); await build(c, el); continue; }
        if (cfg.roam) { c.dim = true; c.show(true); await roam(c); }
        else { c.show(false); await waitForWork(1e9); }
      }
    } catch (err) {
      console.error('[build-cursors]', err);
      showAll();
    }
  }

  /* ---------- start ---------- */
  function start() {
    try {
      layer = document.createElement('div');
      layer.className = 'bc-layer';
      layer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(layer);

      const n = clamp(Math.round(innerWidth < 640 ? cfg.mobileCount : cfg.count), 1, 8);
      for (let i = 0; i < n; i++) cursors.push(new Cursor(i));

      const els = document.querySelectorAll('[data-build]');
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          for (const e of entries) {
            if (e.isIntersecting) { queue.push(e.target); io.unobserve(e.target); }
          }
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
        els.forEach(el => io.observe(el));
      } else {
        els.forEach(reveal);
      }

      requestAnimationFrame(function loop(now) {
        for (const c of cursors) c.step(now);
        frames.forEach(f => f.update());
        requestAnimationFrame(loop);
      });
      requestAnimationFrame(() => cursors.forEach(c => c.show(true)));

      cursors.forEach((c, i) => {
        (cfg.swarm > 0 ? swarm(c, i, n) : Promise.resolve()).then(() => life(c, i));
      });
    } catch (err) {
      console.error('[build-cursors]', err);
      showAll();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
