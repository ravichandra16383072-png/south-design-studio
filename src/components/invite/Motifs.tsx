import { useMemo } from "react";

export function Lamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 140" className={className} aria-hidden>
      <defs>
        <linearGradient id="brass" x1="0" x2="1">
          <stop offset="0" stopColor="var(--gold)" />
          <stop offset=".5" stopColor="var(--turmeric)" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="var(--turmeric)" stopOpacity=".7" />
          <stop offset="1" stopColor="var(--turmeric)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="22" r="22" fill="url(#glow)" />
      <g className="flame">
        <path d="M40 6 C46 16 46 24 40 30 C34 24 34 16 40 6Z" fill="var(--turmeric)" />
        <path d="M40 14 C43 20 43 25 40 28 C37 25 37 20 40 14Z" fill="var(--jasmine)" />
      </g>
      <path d="M22 32 Q40 42 58 32 L54 38 Q40 44 26 38Z" fill="url(#brass)" />
      <rect x="37" y="40" width="6" height="60" fill="url(#brass)" />
      <ellipse cx="40" cy="60" rx="8" ry="3" fill="url(#brass)" />
      <ellipse cx="40" cy="80" rx="10" ry="3.5" fill="url(#brass)" />
      <path d="M24 125 Q40 100 56 125Z" fill="url(#brass)" />
      <ellipse cx="40" cy="128" rx="22" ry="5" fill="url(#brass)" />
    </svg>
  );
}

export function Thoranam({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 13 });
  return (
    <svg viewBox="0 0 390 90" className={className} preserveAspectRatio="none" aria-hidden>
      <path d="M0 8 Q195 26 390 8" stroke="var(--gold)" strokeWidth="3" fill="none" />
      {leaves.map((_, i) => {
        const x = 15 + i * 30;
        const y = 8 + Math.sin((i / 12) * Math.PI) * 18;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0 C10 18 8 44 0 58 C-8 44 -10 18 0 0Z" fill="var(--leaf)" />
            <path d="M0 2 L0 54" stroke="oklch(0.38 0.1 145)" strokeWidth="1" />
            {i % 2 === 0 && <circle cy="2" r="6" fill="var(--turmeric)" stroke="oklch(0.7 0.17 60)" strokeWidth="2" />}
          </g>
        );
      })}
    </svg>
  );
}

export function JasmineStrings({ className = "" }: { className?: string }) {
  const strings = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 390 160" className={className} preserveAspectRatio="none" aria-hidden>
      {strings.map((s) => {
        const x = 20 + s * 58;
        const len = 60 + ((s * 37) % 90);
        const n = Math.floor(len / 10);
        return (
          <g key={s} className="sway" style={{ animationDelay: `${s * 0.3}s` }}>
            <line x1={x} y1="0" x2={x} y2={len} stroke="var(--leaf)" strokeWidth="1" />
            {Array.from({ length: n }).map((_, k) => (
              <circle key={k} cx={x} cy={6 + k * 10} r="3.6" fill={k % 5 === 4 ? "oklch(0.7 0.17 50)" : "var(--jasmine)"} stroke="var(--gold-soft)" strokeWidth=".6" />
            ))}
            <circle cx={x} cy={len + 6} r="6" fill="oklch(0.72 0.17 55)" />
          </g>
        );
      })}
    </svg>
  );
}

export function Kolam({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={16 + c * 16} cy={16 + r * 16} r="1.8" fill="var(--maroon)" />))}
      <path d="M32 6 C46 6 58 18 58 32 C58 46 46 58 32 58 C18 58 6 46 6 32 C6 18 18 6 32 6Z M32 14 L50 32 L32 50 L14 32Z" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
      <path d="M16 16 Q32 26 48 16 Q38 32 48 48 Q32 38 16 48 Q26 32 16 16Z" fill="none" stroke="var(--maroon)" strokeWidth="1" opacity=".7" />
    </svg>
  );
}

export function KolamDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6" aria-hidden>
      <span className="h-px w-16 bg-gold/60" />
      <Kolam size={40} />
      <span className="h-px w-16 bg-gold/60" />
    </div>
  );
}

export function Gopuram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <path d="M70 120 V100 H130 V120Z M76 100 V82 H124 V100Z M82 82 V64 H118 V82Z M88 64 V48 H112 V64Z M93 48 V34 H107 V48Z M96 34 Q100 18 104 34Z M0 120 V108 H40 V96 H60 V120Z M200 120 V108 H160 V96 H140 V120Z" fill="currentColor" />
    </svg>
  );
}

export function Ganesha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M50 12 L46 20 H54Z" />
      <path d="M36 28 Q50 18 64 28 Q70 38 62 46 Q58 52 56 60 Q54 70 60 74 Q66 76 64 82" />
      <path d="M36 28 Q30 38 38 46 Q42 52 44 60" />
      <path d="M36 30 Q20 28 18 42 Q20 54 34 50" />
      <path d="M64 30 Q80 28 82 42 Q80 54 66 50" />
      <circle cx="44" cy="36" r="1.5" fill="currentColor" />
      <circle cx="56" cy="36" r="1.5" fill="currentColor" />
      <path d="M44 26 H56" />
      <path d="M30 88 Q50 80 70 88" />
    </svg>
  );
}

export function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.3 4.5 6.8 4.5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.5 0 5.8 3.5 4.3 7.2C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

export function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M0 0 Q40 10 60 50 Q70 75 100 100" stroke="var(--leaf)" strokeWidth="1.5" fill="none" />
      {[
        [20, 8], [42, 26], [58, 48], [72, 74],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} rx="3" ry="7" cy="-6" fill={i % 2 ? "var(--jasmine)" : "oklch(0.75 0.16 55)"} stroke="var(--gold-soft)" strokeWidth=".5" transform={`rotate(${a})`} />
          ))}
          <circle r="2.5" fill="var(--turmeric)" />
        </g>
      ))}
    </svg>
  );
}

export function Petals({ count = 26, burst = false }: { count?: number; burst?: boolean }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: burst ? Math.random() * 0.4 : Math.random() * 4,
        dur: 5 + Math.random() * 5,
        dx: (Math.random() - 0.5) * 120,
        size: 8 + Math.random() * 8,
        marigold: i % 4 === 0,
      })),
    [count, burst],
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="petal absolute top-0 block rounded-[60%_40%_60%_40%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.marigold ? "var(--turmeric)" : "var(--jasmine)",
            boxShadow: "0 1px 2px color-mix(in oklab, var(--maroon) 25%, transparent)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--dx" as string]: `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
}
