import React from "react";

// Minimal, brand-aligned SVG chart (decreasing incidents over time)
// Follows guide §19: 1–2 hues, 2px lines, subtle grid (alpha .2), labels 12–14px
export default function CaseChart({ className }: { className?: string }) {
  // Chart geometry
  const W = 640;
  const H = 320;
  const PAD = { t: 24, r: 20, b: 32, l: 40 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  // X labels (6 months) and sample data (incidents per week -> trending down)
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [14, 12, 11, 7, 5, 4];

  // Scales
  const x = (i: number) => PAD.l + (i * innerW) / (labels.length - 1);
  const maxY = Math.max(...data);
  const minY = Math.min(...data);
  const y = (v: number) => PAD.t + innerH - ((v - minY) / (maxY - minY)) * innerH;

  // Path for the line
  const d = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`)
    .join(" ");

  // Vertical annotation marker at March rollout (index 2)
  const rolloutX = x(2);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      className={className}
      role="img"
      aria-label="Incidents trending down across six months with a change introduced in March"
    >
      <defs>
        <style>{`
          .chart-fg { fill: currentColor; }
          .chart-muted { stroke: currentColor; opacity: .35; }
          .chart-grid { stroke: currentColor; opacity: .18; }
          .chart-label { fill: currentColor; font: 12px var(--font-ibm_plex_sans, ui-sans-serif); }
        `}</style>
      </defs>

      {/* Background */}
      <rect x={0} y={0} width={W} height={H} fill="none" />

      {/* Gridlines (horizontal) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const yy = PAD.t + (i * innerH) / 4;
        return <line key={i} x1={PAD.l} x2={W - PAD.r} y1={yy} y2={yy} className="chart-grid" />;
      })}

      {/* Axes */}
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} className="chart-muted" />
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} className="chart-muted" />

      {/* X labels */}
      {labels.map((lbl, i) => (
        <text key={lbl} x={x(i)} y={H - 10} textAnchor="middle" className="chart-label">
          {lbl}
        </text>
      ))}

      {/* Y label (units) */}
      <text x={PAD.l - 12} y={PAD.t - 8} textAnchor="end" className="chart-label">
        Incidents/week
      </text>

      {/* Rollout marker */}
      <line x1={rolloutX} x2={rolloutX} y1={PAD.t} y2={H - PAD.b} strokeDasharray="4 4" className="chart-muted" />
      <text x={rolloutX + 6} y={PAD.t + 12} className="chart-label">Backpressure rollout</text>

      {/* Micro-annotations */}
      <g className="text-foreground">
        {/* Retry budget introduced near March */}
        <line x1={rolloutX} x2={rolloutX + 18} y1={y(data[2])} y2={y(data[2]) - 24} className="chart-muted" />
        <text x={rolloutX + 22} y={y(data[2]) - 26} className="chart-label">Retry budget</text>
        {/* Queue enabled around April */}
        <line x1={x(3)} x2={x(3) - 18} y1={y(data[3])} y2={y(data[3]) - 20} className="chart-muted" />
        <text x={x(3) - 22} y={y(data[3]) - 22} textAnchor="end" className="chart-label">Queue enabled</text>
        {/* Timeout tuned in May */}
        <line x1={x(4)} x2={x(4) + 18} y1={y(data[4])} y2={y(data[4]) + 20} className="chart-muted" />
        <text x={x(4) + 22} y={y(data[4]) + 22} className="chart-label">Timeout tuned</text>
      </g>

      {/* Data line */}
      <g className="text-primary">
        <path d={d} fill="none" stroke="currentColor" strokeWidth={2} />
        {data.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={3} fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}
