type Props = { glyph: string; className?: string };

/**
 * A generated SVG "signature" visual for each project. No screenshots needed.
 * Each glyph evokes the project's domain. Pure SVG, scales perfectly.
 */
export default function ProjectGlyph({ glyph, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`text-signal/70 ${className}`}
      role="img"
      aria-hidden
    >
      {glyph === "grid" && <GridGlyph />}
      {glyph === "radar" && <RadarGlyph />}
      {glyph === "hex" && <HexGlyph />}
      {glyph === "heatmap" && <HeatmapGlyph />}
      {glyph === "mesh" && <MeshGlyph />}
      {glyph === "scatter" && <ScatterGlyph />}
    </svg>
  );
}

function GridGlyph() {
  // 5x5 dot grid with a few highlighted, evoking multi-LLM monitoring cells.
  const dots = [];
  const highlighted = new Set(["1-2", "2-0", "3-3", "0-4", "4-1"]);
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const x = 30 + c * 35;
      const y = 30 + r * 35;
      const key = `${r}-${c}`;
      const isHi = highlighted.has(key);
      dots.push(
        <circle
          key={key}
          cx={x}
          cy={y}
          r={isHi ? 3.5 : 1.8}
          fill="currentColor"
          opacity={isHi ? 1 : 0.35}
        />
      );
    }
  }
  return <g>{dots}</g>;
}

function RadarGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="100" cy="100" r="20" opacity="0.9" />
      <circle cx="100" cy="100" r="40" opacity="0.6" />
      <circle cx="100" cy="100" r="60" opacity="0.4" />
      <circle cx="100" cy="100" r="80" opacity="0.25" />
      <line x1="100" y1="20" x2="100" y2="180" opacity="0.3" />
      <line x1="20" y1="100" x2="180" y2="100" opacity="0.3" />
      <line x1="100" y1="100" x2="160" y2="56" stroke="currentColor" strokeWidth="1.4" opacity="1" />
      <circle cx="160" cy="56" r="3" fill="currentColor" />
    </g>
  );
}

function HexGlyph() {
  // Hex tiling.
  const hex = (cx: number, cy: number, r: number, op = 0.4) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    return <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="0.8" opacity={op} />;
  };
  const r = 20;
  const dx = r * Math.sqrt(3);
  const dy = r * 1.5;
  const hexes = [];
  for (let row = -2; row <= 4; row++) {
    for (let col = -2; col <= 4; col++) {
      const cx = 100 + col * dx + (row % 2 === 0 ? 0 : dx / 2);
      const cy = 100 + row * dy;
      if (cx > 10 && cx < 190 && cy > 10 && cy < 190) {
        const filled = (row + col) % 3 === 0;
        hexes.push(
          <g key={`${row}-${col}`}>
            {hex(cx, cy, r - 1, filled ? 1 : 0.3)}
            {filled && <circle cx={cx} cy={cy} r="2.4" fill="currentColor" />}
          </g>
        );
      }
    }
  }
  return <g>{hexes}</g>;
}

function HeatmapGlyph() {
  // Concentric blobby gradients suggesting a plume from above.
  return (
    <g>
      <defs>
        <radialGradient id="plume" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="35%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="75%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" fill="url(#plume)" />
      <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6">
        <ellipse cx="100" cy="110" rx="40" ry="28" />
        <ellipse cx="100" cy="110" rx="60" ry="42" opacity="0.6" />
        <ellipse cx="100" cy="110" rx="80" ry="56" opacity="0.35" />
      </g>
      <circle cx="100" cy="110" r="3" fill="currentColor" />
    </g>
  );
}

function MeshGlyph() {
  // Triangulated mesh evoking SfM / photogrammetry tie points.
  const pts: [number, number][] = [
    [40, 60], [80, 40], [130, 50], [170, 80],
    [50, 110], [95, 95], [140, 105], [175, 130],
    [60, 160], [110, 145], [155, 160],
  ];
  const tris = [
    [0, 1, 4], [1, 2, 5], [2, 3, 6], [1, 4, 5], [2, 5, 6],
    [3, 6, 7], [4, 5, 8], [5, 6, 9], [6, 7, 10], [5, 8, 9],
    [6, 9, 10],
  ];
  return (
    <g>
      {tris.map(([a, b, c], i) => (
        <polygon
          key={i}
          points={`${pts[a][0]},${pts[a][1]} ${pts[b][0]},${pts[b][1]} ${pts[c][0]},${pts[c][1]}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.45"
        />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fill="currentColor" />
      ))}
    </g>
  );
}

function ScatterGlyph() {
  // Scattered points at varying density, like a sparse point cloud projection.
  const seed = [
    [44, 56], [62, 38], [88, 70], [110, 52], [134, 88], [156, 64],
    [38, 110], [58, 130], [80, 118], [102, 142], [122, 124], [148, 138],
    [50, 168], [76, 162], [98, 178], [128, 170], [162, 172],
    [70, 96], [92, 102], [120, 108], [140, 76], [170, 110],
  ];
  return (
    <g>
      {seed.map(([x, y], i) => {
        const r = (i % 4 === 0) ? 3 : 1.6;
        const op = (i % 3 === 0) ? 1 : 0.45;
        return <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={op} />;
      })}
      <line x1="20" y1="190" x2="180" y2="190" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <line x1="20" y1="190" x2="20" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    </g>
  );
}
