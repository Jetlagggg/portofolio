"use client";

import { useEffect, useRef } from "react";

type Atom = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  r: number;
};

type Molecule = {
  atoms: Atom[];
  bonds: [number, number][];
  vx: number;
  vy: number;
  spin: number;
  angle: number;
  tint: "primary" | "accent" | "ink";
};

type Circuit = {
  pts: { x: number; y: number }[];
  segLen: number[];
  total: number;
  pulse: number;
  speed: number;
};

type Bubble = {
  x: number;
  y: number;
  r: number;
  vy: number;
  life: number;
  maxLife: number;
};

type Ring = {
  x: number;
  y: number;
  r: number;
  life: number;
  maxLife: number;
};

function makeMolecule(cx: number, cy: number, size: number, tint: Molecule["tint"]): Molecule {
  const atoms: Atom[] = [];
  const bonds: [number, number][] = [];
  const verts = 6;
  for (let i = 0; i < verts; i++) {
    const a = (Math.PI * 2 * i) / verts - Math.PI / 2;
    atoms.push({
      x: cx + Math.cos(a) * size,
      y: cy + Math.sin(a) * size,
      ox: 0,
      oy: 0,
      r: 1.8,
    });
    bonds.push([i, (i + 1) % verts]);
  }
  if (Math.random() > 0.5) {
    atoms.push({ x: cx, y: cy, ox: 0, oy: 0, r: 2.2 });
    for (let i = 0; i < verts; i += 2) bonds.push([verts, i]);
  }
  return {
    atoms,
    bonds,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    spin: (Math.random() - 0.5) * 0.0006,
    angle: 0,
    tint,
  };
}

function makeCircuit(w: number, h: number): Circuit {
  const pts: { x: number; y: number }[] = [];
  const step = 90;
  let x = Math.round((Math.random() * w) / step) * step;
  let y = Math.round((Math.random() * h) / step) * step;
  pts.push({ x, y });
  const corners = 4 + Math.floor(Math.random() * 4);
  let horiz = Math.random() > 0.5;
  for (let i = 0; i < corners; i++) {
    const dist = step * (1 + Math.floor(Math.random() * 3));
    x += horiz ? (Math.random() > 0.5 ? dist : -dist) : 0;
    y += horiz ? 0 : Math.random() > 0.5 ? dist : -dist;
    x = Math.max(20, Math.min(w - 20, x));
    y = Math.max(20, Math.min(h - 20, y));
    pts.push({ x, y });
    horiz = !horiz;
  }
  const segLen: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    segLen.push(l);
    total += l;
  }
  return { pts, segLen, total, pulse: Math.random(), speed: 0.0009 + Math.random() * 0.0012 };
}

function pointOnCircuit(c: Circuit, t: number): { x: number; y: number } {
  let d = t * c.total;
  for (let i = 0; i < c.segLen.length; i++) {
    if (d <= c.segLen[i]) {
      const f = d / c.segLen[i];
      return {
        x: c.pts[i].x + (c.pts[i + 1].x - c.pts[i].x) * f,
        y: c.pts[i].y + (c.pts[i + 1].y - c.pts[i].y) * f,
      };
    }
    d -= c.segLen[i];
  }
  const last = c.pts.length - 1;
  return { x: c.pts[last].x, y: c.pts[last].y };
}

export function LabBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let molecules: Molecule[] = [];
    let circuits: Circuit[] = [];
    const bubbles: Bubble[] = [];
    const rings: Ring[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;

    const palette = {
      primary: "108, 150, 157",
      accent: "242, 97, 87",
      ink: "85, 119, 123",
    };

    const readTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      palette.primary = dark ? "159, 197, 197" : "108, 150, 157";
      palette.accent = dark ? "247, 162, 120" : "242, 97, 87";
      palette.ink = dark ? "197, 209, 168" : "85, 119, 123";
    };
    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const molCount = Math.max(8, Math.min(16, Math.round((w * h) / 110000)));
      molecules = [];
      const tints: Molecule["tint"][] = ["primary", "ink", "primary", "accent", "ink", "primary"];
      for (let i = 0; i < molCount; i++) {
        molecules.push(
          makeMolecule(
            Math.random() * w,
            Math.random() * h,
            14 + Math.random() * 18,
            tints[i % tints.length],
          ),
        );
      }
      circuits = [];
      const circuitCount = Math.max(4, Math.min(10, Math.round((w * h) / 190000)));
      for (let i = 0; i < circuitCount; i++) circuits.push(makeCircuit(w, h));
    };

    const drawFrame = (animate: boolean, dt: number) => {
      ctx.clearRect(0, 0, w, h);

      // Circuits + data pulses
      for (const c of circuits) {
        if (animate) c.pulse = (c.pulse + c.speed * dt) % 1;
        ctx.strokeStyle = `rgba(${palette.ink}, 0.1)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(c.pts[0].x, c.pts[0].y);
        for (let i = 1; i < c.pts.length; i++) ctx.lineTo(c.pts[i].x, c.pts[i].y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${palette.ink}, 0.22)`;
        for (const p of c.pts) ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);

        if (animate) {
          const pp = pointOnCircuit(c, c.pulse);
          ctx.fillStyle = `rgba(${palette.primary}, 0.55)`;
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Molecules (drift + cursor repel + bond filament)
      for (const m of molecules) {
        if (animate) {
          m.angle += m.spin * dt;
          m.atoms.forEach((a) => {
            a.x += m.vx * dt * 0.06;
            a.y += m.vy * dt * 0.06;
            if (a.x < -80) a.x = w + 80;
            if (a.x > w + 80) a.x = -80;
            if (a.y < -80) a.y = h + 80;
            if (a.y > h + 80) a.y = -80;

            let tx = 0;
            let ty = 0;
            if (mouse.active) {
              const dx = a.x - mouse.x;
              const dy = a.y - mouse.y;
              const dist = Math.hypot(dx, dy);
              const range = 130;
              if (dist < range && dist > 0.01) {
                const f = (1 - dist / range) * 22;
                tx = (dx / dist) * f;
                ty = (dy / dist) * f;
              }
            }
            a.ox += (tx - a.ox) * 0.08;
            a.oy += (ty - a.oy) * 0.08;
          });
        }

        const rgb = palette[m.tint];
        const alpha = m.tint === "accent" ? 0.28 : 0.2;

        ctx.strokeStyle = `rgba(${rgb}, ${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const [i, j] of m.bonds) {
          const a = m.atoms[i];
          const b = m.atoms[j];
          ctx.moveTo(a.x + a.ox, a.y + a.oy);
          ctx.lineTo(b.x + b.ox, b.y + b.oy);
        }
        ctx.stroke();

        ctx.fillStyle = `rgba(${rgb}, ${alpha + 0.12})`;
        for (const a of m.atoms) {
          ctx.beginPath();
          ctx.arc(a.x + a.ox, a.y + a.oy, a.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (mouse.active) {
          let nearest: Atom | null = null;
          let nd = 170;
          for (const a of m.atoms) {
            const d = Math.hypot(a.x + a.ox - mouse.x, a.y + a.oy - mouse.y);
            if (d < nd) {
              nd = d;
              nearest = a;
            }
          }
          if (nearest) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - nd / 170) * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(nearest.x + nearest.ox, nearest.y + nearest.oy);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Click reactions
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        if (animate) {
          b.life += dt;
          b.y -= b.vy * dt;
          b.x += Math.sin(b.life * 0.004) * 0.3;
        }
        const k = 1 - b.life / b.maxLife;
        if (k <= 0) {
          bubbles.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${palette.primary}, ${k * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        if (animate) r.life += dt;
        const k = 1 - r.life / r.maxLife;
        if (k <= 0) {
          rings.splice(i, 1);
          continue;
        }
        const radius = r.r + (1 - k) * 34;
        ctx.strokeStyle = `rgba(${palette.accent}, ${k * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let s = 0; s < 6; s++) {
          const a = (Math.PI / 3) * s - Math.PI / 2;
          const px = r.x + Math.cos(a) * radius;
          const py = r.y + Math.sin(a) * radius;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      drawFrame(true, dt);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button")) return;
      for (let i = 0; i < 5; i++) {
        bubbles.push({
          x: e.clientX + (Math.random() - 0.5) * 26,
          y: e.clientY + (Math.random() - 0.5) * 10,
          r: 2.5 + Math.random() * 4,
          vy: 0.03 + Math.random() * 0.04,
          life: 0,
          maxLife: 1400 + Math.random() * 900,
        });
      }
      rings.push({ x: e.clientX, y: e.clientY, r: 12, life: 0, maxLife: 900 });
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduced) drawFrame(false, 0);
      }, 180);
    };
    let resizeTimer = 0;
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    build();

    if (reduced) {
      drawFrame(false, 0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
}
