/**
 * Hero FX Engine — Thimira Portfolio
 *
 * 1. Binary Rain : 010101 glyph columns living in a 3D world, projected through
 *                  a pinhole camera so they fall AND drift toward the viewer.
 * 2. Face Mesh   : Face-ID style structured-light dot projection. A depth field
 *                  is sampled over the face region, rotated in 3D, and revealed
 *                  by a sweeping scan band.
 * 3. Tilt Rig    : Pointer/gyro driven parallax on the hero portrait frame.
 *
 * All three respect prefers-reduced-motion, pause when offscreen or when the
 * tab is hidden, and scale their workload down on small/low-power devices.
 */

(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
  const COARSE = window.matchMedia('(pointer: coarse)');

  const prefersReduced = () => REDUCED.matches;
  const isTouch = () => COARSE.matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

  /** Size a canvas to its CSS box at capped DPR. Returns CSS pixel dims. */
  function fitCanvas(canvas, ctx) {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const ratio = dpr();
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { w, h };
  }

  /**
   * Drives a rAF loop that only runs while the element is on screen and the
   * document is visible. Returns a stop() handle.
   */
  function makeLoop(el, frame) {
    let raf = 0;
    let visible = true;
    let onScreen = true;
    let last = performance.now();

    function tick(now) {
      raf = requestAnimationFrame(tick);
      // Clamp delta so a backgrounded tab doesn't teleport the animation.
      const dt = Math.min((now - last) / 16.6667, 3);
      last = now;
      frame(dt, now);
    }

    function sync() {
      const shouldRun = visible && onScreen;
      if (shouldRun && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      sync();
    });

    if (el && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        onScreen = entries[0].isIntersecting;
        sync();
      }, { rootMargin: '120px' }).observe(el);
    }

    sync();
    return () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
  }

  /* ===========================================================================
   * 1. 3D BINARY RAIN
   * =========================================================================*/
  function initBinaryRain() {
    const canvas = document.getElementById('binary-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const hero = document.getElementById('hero');
    let { w, h } = fitCanvas(canvas, ctx);

    const GLYPHS = '01';
    const RARE = '01ABCDEF';
    const FOCAL = 340;        // camera focal length in world units
    const NEAR = 0.55;        // recycle a column once it passes this depth
    const FAR = 9.0;

    let columns = [];
    let parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    function columnBudget() {
      const area = w * h;
      const base = Math.round(area / 9000);
      const cap = isTouch() ? 55 : 130;
      return Math.max(18, Math.min(base, cap));
    }

    function spawn(column, initial) {
      // World space: x/y are units at depth 1, z is distance from camera.
      column.z = initial ? NEAR + Math.random() * (FAR - NEAR) : FAR - Math.random() * 1.6;
      column.x = (Math.random() - 0.5) * w * 2.4;
      column.y = (initial ? Math.random() * 2 - 1 : -1.25) * h * 1.15;
      column.vy = 1.6 + Math.random() * 3.4;             // world units / frame
      column.vz = 0.004 + Math.random() * 0.012;         // approach speed
      column.len = 6 + Math.floor(Math.random() * 16);
      column.flip = 0.04 + Math.random() * 0.1;
      column.hue = Math.random();
      column.chars = [];
      for (let i = 0; i < column.len; i++) {
        column.chars.push(Math.random() < 0.08
          ? RARE[(Math.random() * RARE.length) | 0]
          : GLYPHS[(Math.random() * 2) | 0]);
      }
      return column;
    }

    function build() {
      const n = columnBudget();
      columns = [];
      for (let i = 0; i < n; i++) columns.push(spawn({}, true));
      // Far columns render first so nearer ones overlap them correctly.
      columns.sort((a, b) => b.z - a.z);
    }

    build();

    // Pointer parallax shifts the camera, which makes the depth read as real 3D.
    if (!isTouch()) {
      window.addEventListener('pointermove', (e) => {
        parallax.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        parallax.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dims = fitCanvas(canvas, ctx);
        w = dims.w; h = dims.h;
        build();
      }, 180);
    });

    // Static, near-invisible state for reduced-motion users.
    if (prefersReduced()) {
      ctx.clearRect(0, 0, w, h);
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(0, 245, 160, 0.10)';
      for (let i = 0; i < 90; i++) {
        ctx.fillText(GLYPHS[(Math.random() * 2) | 0], Math.random() * w, Math.random() * h);
      }
      return;
    }

    makeLoop(hero, (dt) => {
      // Trail fade instead of a hard clear — gives the glyphs phosphor decay.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      parallax.x += (parallax.tx - parallax.x) * 0.045 * dt;
      parallax.y += (parallax.ty - parallax.y) * 0.045 * dt;

      const cx = w / 2;
      const cy = h / 2;
      let needsSort = false;

      for (let i = 0; i < columns.length; i++) {
        const c = columns[i];
        c.y += c.vy * dt;
        c.z -= c.vz * dt;

        if (c.z <= NEAR) {
          spawn(c, false);
          needsSort = true;
          continue;
        }

        const scale = FOCAL / (c.z * FOCAL);          // = 1 / z
        const sx = cx + (c.x + parallax.x * 260 * c.z) * scale;
        const sy = cy + (c.y + parallax.y * 160 * c.z) * scale;

        const size = Math.max(4, 26 * scale);
        const lineH = size * 1.12;

        // Recycle once the whole trail has cleared the bottom edge.
        if (sy - c.len * lineH > h + 40) {
          spawn(c, false);
          needsSort = true;
          continue;
        }
        if (sx < -120 || sx > w + 120) continue;

        // Depth haze: near columns are bright, distant ones dissolve.
        const depthFade = Math.min(1, (FAR - c.z) / (FAR - NEAR));
        const nearFade = Math.min(1, (c.z - NEAR) / 0.9);
        const baseAlpha = 0.16 + depthFade * 0.7 * nearFade;
        if (baseAlpha < 0.02) continue;

        ctx.font = `600 ${size.toFixed(1)}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';

        for (let k = 0; k < c.len; k++) {
          const y = sy - k * lineH;
          if (y < -lineH || y > h + lineH) continue;

          if (Math.random() < c.flip * 0.25) {
            c.chars[k] = GLYPHS[(Math.random() * 2) | 0];
          }

          const tail = 1 - k / c.len;
          const alpha = baseAlpha * tail * tail;

          if (k === 0) {
            // Leading glyph: hot white head. The bloom is the most expensive
            // op per frame, so only near columns (where it reads) pay for it.
            if (size > 9) {
              ctx.shadowBlur = Math.min(18, size * 0.8);
              ctx.shadowColor = 'rgba(0, 245, 160, 0.9)';
            }
            ctx.fillStyle = `rgba(226, 255, 244, ${Math.min(1, baseAlpha * 1.5)})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = c.hue > 0.78
              ? `rgba(0, 210, 255, ${alpha})`
              : `rgba(0, 245, 160, ${alpha})`;
          }
          ctx.fillText(c.chars[k], sx, y);
        }
        ctx.shadowBlur = 0;
      }

      ctx.globalCompositeOperation = 'source-over';
      if (needsSort) columns.sort((a, b) => b.z - a.z);
    });
  }

  /* ===========================================================================
   * 2. FACE ID DEPTH MESH
   * =========================================================================*/
  function initFaceMesh() {
    const canvas = document.getElementById('face-mesh');
    const img = document.querySelector('.frame-image');
    const frame = document.querySelector('.cyber-frame');
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let { w, h } = fitCanvas(canvas, ctx);

    // Face bounds expressed in the SOURCE IMAGE's normalised space, so the
    // mesh stays locked to the face through any object-fit: cover crop.
    const FACE = { cx: 0.478, cy: 0.492, rx: 0.196, ry: 0.250 };

    /** Map image-normalised coords into canvas pixels (object-fit: cover, top). */
    function mapFace() {
      const iw = img.naturalWidth || 800;
      const ih = img.naturalHeight || 800;
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const offX = (w - dw) / 2;        // center
      const offY = 0;                   // object-position: center top
      return {
        cx: offX + FACE.cx * dw,
        cy: offY + FACE.cy * dh,
        rx: FACE.rx * dw,
        ry: FACE.ry * dh
      };
    }

    // Build a lattice over the unit disc. Depth comes from an ellipsoid base
    // plus feature bumps (brow ridge, nose, cheeks), which is what makes the
    // projected dots read as a real 3D surface rather than a flat grid.
    const COLS = isTouch() ? 20 : 26;
    const ROWS = isTouch() ? 24 : 32;
    const points = [];
    const bump = (u, v, u0, v0, su, sv, amp) => {
      const du = (u - u0) / su;
      const dv = (v - v0) / sv;
      return amp * Math.exp(-(du * du + dv * dv));
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const u = (c / (COLS - 1)) * 2 - 1;   // -1 .. 1 (horizontal)
        const v = (r / (ROWS - 1)) * 2 - 1;   // -1 .. 1 (vertical)
        const rad = Math.hypot(u * 0.95, v * 0.85);
        if (rad > 1) continue;

        // Ellipsoid shell.
        let z = Math.sqrt(Math.max(0, 1 - rad * rad)) * 0.72;
        // Three-quarter profile facing left: volume biased to the near side.
        z += bump(u, v, -0.18, 0.02, 0.30, 0.42, 0.34);   // nose / near cheek
        z += bump(u, v, 0.05, -0.55, 0.55, 0.30, 0.12);   // brow ridge
        z -= bump(u, v, 0.15, 0.45, 0.45, 0.35, 0.10);    // jaw recess

        points.push({ u, v, z, row: r, col: c, idx: points.length });
      }
    }

    // Index lookup so we can stitch neighbouring lattice points into a wireframe.
    const grid = new Map();
    points.forEach(p => grid.set(p.row * COLS + p.col, p));

    const edges = [];
    points.forEach(p => {
      const right = grid.get(p.row * COLS + p.col + 1);
      const down = grid.get((p.row + 1) * COLS + p.col);
      if (right && right.col === p.col + 1) edges.push([p, right]);
      if (down) edges.push([p, down]);
    });

    let yaw = 0;
    let targetYaw = 0;
    let pitch = 0;
    let targetPitch = 0;

    // Scan cycle: sweep down -> hold the locked mesh -> fade -> idle -> repeat.
    // Timed off the wall clock, not the frame count, so the scan takes the same
    // real duration whether the device renders at 120fps or 10fps.
    const SWEEP = 2200, HOLD = 2600, FADE = 900, IDLE = 1800;
    const CYCLE = SWEEP + HOLD + FADE + IDLE;
    let origin = 0;
    let clock = 0;
    let locked = false;

    const readout = document.getElementById('face-readout');
    const statusEl = readout && readout.querySelector('.fr-status');
    const matchEl = readout && readout.querySelector('.fr-match');

    if (!isTouch() && frame) {
      frame.addEventListener('pointermove', (e) => {
        const rect = frame.getBoundingClientRect();
        targetYaw = ((e.clientX - rect.left) / rect.width - 0.5) * 0.9;
        targetPitch = ((e.clientY - rect.top) / rect.height - 0.5) * -0.5;
      }, { passive: true });
      frame.addEventListener('pointerleave', () => { targetYaw = 0; targetPitch = 0; });
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dims = fitCanvas(canvas, ctx);
        w = dims.w; h = dims.h;
      }, 180);
    });

    function setStatus(text, match) {
      if (statusEl && statusEl.textContent !== text) statusEl.textContent = text;
      if (matchEl && matchEl.textContent !== match) matchEl.textContent = match;
    }

    if (prefersReduced()) {
      // Draw the locked mesh once, no sweep.
      drawFrame(1, 1, 0);
      setStatus('FACE ID · LOCKED', '99.98%');
      return;
    }

    makeLoop(frame || canvas, (dt, now) => {
      if (!origin) origin = now;
      clock = (now - origin) % CYCLE;

      let sweep, meshAlpha;
      if (clock < SWEEP) {
        sweep = clock / SWEEP;
        meshAlpha = Math.min(1, sweep * 1.6);
        locked = false;
        setStatus('FACE ID · SCANNING', (80 + sweep * 19.9).toFixed(2) + '%');
      } else if (clock < SWEEP + HOLD) {
        sweep = 1;
        meshAlpha = 1;
        if (!locked) locked = true;
        setStatus('FACE ID · GEOMETRY LOCKED', '99.98%');
      } else if (clock < SWEEP + HOLD + FADE) {
        sweep = 1;
        meshAlpha = 1 - (clock - SWEEP - HOLD) / FADE;
        setStatus('FACE ID · MATCH VERIFIED', '99.98%');
      } else {
        sweep = 0;
        meshAlpha = 0;
        setStatus('FACE ID · STANDBY', '--.--%');
      }

      yaw += (targetYaw - yaw) * 0.06 * dt;
      pitch += (targetPitch - pitch) * 0.06 * dt;

      drawFrame(sweep, meshAlpha, clock);
    });

    function drawFrame(sweep, meshAlpha, clock) {
      ctx.clearRect(0, 0, w, h);
      if (meshAlpha <= 0.01) return;

      const f = mapFace();
      // Idle drift keeps the geometry alive even without pointer input.
      const driftYaw = yaw + Math.sin(clock / 1400) * 0.14;
      const driftPitch = pitch + Math.cos(clock / 1900) * 0.06;

      const cosY = Math.cos(driftYaw), sinY = Math.sin(driftYaw);
      const cosP = Math.cos(driftPitch), sinP = Math.sin(driftPitch);
      const CAM = 3.2;

      // Project every lattice point through yaw/pitch + weak perspective.
      const proj = new Array(points.length);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let x = p.u, y = p.v, z = p.z;

        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosP - z1 * sinP;
        const z2 = y * sinP + z1 * cosP;

        const persp = CAM / (CAM - z2);
        proj[i] = {
          x: f.cx + x1 * f.rx * persp,
          y: f.cy + y2 * f.ry * persp,
          depth: z2,
          v: p.v
        };
      }

      // The scan band travels top -> bottom; points above it are "captured".
      const bandY = f.cy - f.ry + sweep * (f.ry * 2.25);
      const BAND = f.ry * 0.30;

      // --- wireframe ---
      ctx.lineWidth = 0.7;
      for (let i = 0; i < edges.length; i++) {
        const a = proj[edges[i][0].idx];
        const b = proj[edges[i][1].idx];
        const midY = (a.y + b.y) / 2;
        if (sweep < 1 && midY > bandY) continue;

        const d = (a.depth + b.depth) * 0.5;
        const alpha = (0.06 + Math.max(0, d) * 0.22) * meshAlpha;
        if (alpha < 0.012) continue;
        ctx.strokeStyle = `rgba(0, 245, 160, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // --- projected depth dots ---
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i];
        if (sweep < 1 && p.y > bandY) continue;

        const d = Math.max(0, p.depth);
        const inBand = sweep < 1 && Math.abs(p.y - bandY) < BAND;
        const radius = (0.7 + d * 1.5) * (inBand ? 2.1 : 1);
        const alpha = (0.18 + d * 0.62) * meshAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        if (inBand) {
          ctx.fillStyle = `rgba(226, 255, 244, ${Math.min(1, alpha * 1.8)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 245, 160, 0.95)';
        } else {
          ctx.fillStyle = d > 0.55
            ? `rgba(180, 255, 228, ${alpha})`
            : `rgba(0, 210, 255, ${alpha * 0.85})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // --- scan band glow ---
      if (sweep > 0 && sweep < 1) {
        const grad = ctx.createLinearGradient(0, bandY - BAND, 0, bandY + BAND);
        grad.addColorStop(0, 'rgba(0, 245, 160, 0)');
        grad.addColorStop(0.5, `rgba(0, 245, 160, ${0.22 * meshAlpha})`);
        grad.addColorStop(1, 'rgba(0, 245, 160, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(f.cx - f.rx * 1.5, bandY - BAND, f.rx * 3, BAND * 2);

        ctx.strokeStyle = `rgba(190, 255, 232, ${0.75 * meshAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(f.cx - f.rx * 1.35, bandY);
        ctx.lineTo(f.cx + f.rx * 1.35, bandY);
        ctx.stroke();
      }

      // --- tracking reticle around the locked face ---
      if (sweep >= 1) {
        const pad = 12;
        const L = f.rx * 0.42;
        const x0 = f.cx - f.rx - pad, x1 = f.cx + f.rx + pad;
        const y0 = f.cy - f.ry - pad, y1 = f.cy + f.ry + pad;
        ctx.strokeStyle = `rgba(0, 245, 160, ${0.85 * meshAlpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x0, y0 + L); ctx.lineTo(x0, y0); ctx.lineTo(x0 + L, y0);
        ctx.moveTo(x1 - L, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1, y0 + L);
        ctx.moveTo(x0, y1 - L); ctx.lineTo(x0, y1); ctx.lineTo(x0 + L, y1);
        ctx.moveTo(x1 - L, y1); ctx.lineTo(x1, y1); ctx.lineTo(x1, y1 - L);
        ctx.stroke();
      }
    }

    if (!img.complete) img.addEventListener('load', () => { drawFrame(1, 1, 0); }, { once: true });
  }

  /* ===========================================================================
   * 3. PORTRAIT TILT RIG
   * =========================================================================*/
  function initTilt() {
    const frame = document.querySelector('.cyber-frame');
    const visual = document.querySelector('.hero-visual');
    if (!frame || !visual || prefersReduced()) return;

    if (isTouch()) {
      frame.classList.add('auto-orbit');
      return;
    }

    let rx = 0, ry = 0, tx = 0, ty = 0;
    let raf = 0;

    function render() {
      rx += (tx - rx) * 0.09;
      ry += (ty - ry) * 0.09;
      frame.style.setProperty('--tilt-y', rx.toFixed(2) + 'deg');
      frame.style.setProperty('--tilt-x', ry.toFixed(2) + 'deg');
      if (Math.abs(tx - rx) > 0.01 || Math.abs(ty - ry) > 0.01) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    }

    function kick() { if (!raf) raf = requestAnimationFrame(render); }

    visual.addEventListener('pointermove', (e) => {
      const rect = visual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tx = px * 26;        // yaw
      ty = py * -16;       // pitch
      frame.style.setProperty('--glare-x', ((px + 0.5) * 100).toFixed(1) + '%');
      frame.style.setProperty('--glare-y', ((py + 0.5) * 100).toFixed(1) + '%');
      frame.classList.add('tilting');
      kick();
    }, { passive: true });

    visual.addEventListener('pointerleave', () => {
      tx = 0; ty = 0;
      frame.classList.remove('tilting');
      kick();
    });
  }

  function boot() {
    initBinaryRain();
    initFaceMesh();
    initTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
