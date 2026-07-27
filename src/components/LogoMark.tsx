interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 48, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── OUTER CHAMFERED FRAME ── */}
      <polygon
        points="20,0 80,0 100,20 100,80 80,100 20,100 0,80 0,20"
        stroke="white"
        strokeWidth="1.2"
        fill="none"
        opacity="0.18"
      />

      {/* Top-left corner — amber accent bracket */}
      <polyline
        points="26,0 20,0 0,20 0,26"
        stroke="#F59E0B"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
        strokeLinecap="square"
      />
      {/* Top-right corner — amber accent bracket */}
      <polyline
        points="74,0 80,0 100,20 100,26"
        stroke="#F59E0B"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
        strokeLinecap="square"
      />
      {/* Bottom-left corner — white subtle */}
      <polyline
        points="0,74 0,80 20,100 26,100"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
        strokeLinecap="square"
      />
      {/* Bottom-right corner — white subtle */}
      <polyline
        points="100,74 100,80 80,100 74,100"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
        strokeLinecap="square"
      />

      {/* ── PRECISION TICK MARKS at chamfer nodes ── */}
      <circle cx="20" cy="0" r="1.5" fill="#F59E0B" opacity="0.5" />
      <circle cx="80" cy="0" r="1.5" fill="#F59E0B" opacity="0.5" />
      <circle cx="0" cy="20" r="1.5" fill="#F59E0B" opacity="0.3" />
      <circle cx="100" cy="20" r="1.5" fill="#F59E0B" opacity="0.3" />

      {/* ── NETWORK DOT GRID — bottom hollow of A ── */}
      {[35, 50, 65].map(x =>
        [68, 78].map(y => (
          <circle key={`${x},${y}`} cx={x} cy={y} r="1.3" fill="white" opacity="0.12" />
        ))
      )}
      {/* Extra center column */}
      <circle cx="50" cy="88" r="1.3" fill="white" opacity="0.08" />

      {/* ── THE A MARK — main shape ── */}
      {/* Two legs meeting at apex with miter join */}
      <polyline
        points="9,87 50,13 91,87"
        stroke="white"
        strokeWidth="10.5"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="8"
      />

      {/* ── AMBER CROSSBAR — brand identity accent ── */}
      <line
        x1="27"
        y1="61"
        x2="73"
        y2="61"
        stroke="#F59E0B"
        strokeWidth="5.5"
        strokeLinecap="square"
      />

      {/* Crossbar precision tick marks */}
      <line x1="27" y1="55" x2="27" y2="67" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="square" opacity="0.6" />
      <line x1="73" y1="55" x2="73" y2="67" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="square" opacity="0.6" />

      {/* ── APEX AMBER CAP — top accent ── */}
      <line
        x1="43"
        y1="8"
        x2="57"
        y2="8"
        stroke="#F59E0B"
        strokeWidth="2.5"
        strokeLinecap="square"
        opacity="0.85"
      />
    </svg>
  );
}

export function LogoWordmark({
  markSize = 36,
  className = "",
  showTagline = false,
}: {
  markSize?: number;
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <LogoMark size={markSize} />
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span
            className="font-black tracking-[0.14em] text-white uppercase leading-none"
            style={{ fontSize: markSize * 0.36 }}
          >
            Aluminios
          </span>
          <span
            className="font-thin leading-none"
            style={{ fontSize: markSize * 0.28, color: "#F59E0B", opacity: 0.8 }}
          >
            &amp;
          </span>
          <span
            className="font-black tracking-[0.14em] text-white uppercase leading-none"
            style={{ fontSize: markSize * 0.36 }}
          >
            Redes
          </span>
        </div>
        {showTagline && (
          <span
            className="tracking-[0.3em] uppercase mt-1.5"
            style={{ fontSize: markSize * 0.15, color: "#F59E0B", opacity: 0.5 }}
          >
            Regiones de Arica · Iquique · Antofagasta
          </span>
        )}
      </div>
    </div>
  );
}

export function LogoHero() {
  return (
    <div className="flex flex-col items-center gap-5">
      <LogoMark size={88} />
      <div className="flex items-center gap-4 w-56">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
        <div className="w-1 h-1 rounded-none" style={{ background: "#F59E0B", opacity: 0.6 }} />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
      </div>
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-xl sm:text-2xl font-black tracking-[0.22em] text-white uppercase">
            Aluminios
          </span>
          <span className="text-lg font-thin" style={{ color: "#F59E0B", opacity: 0.7 }}>&amp;</span>
          <span className="text-xl sm:text-2xl font-black tracking-[0.22em] text-white uppercase">
            Redes
          </span>
        </div>
        <p className="text-[9px] tracking-[0.5em] text-white/20 uppercase mt-2">
          Regiones de Arica · Iquique · Antofagasta · Envíos a todo Chile
        </p>
      </div>
    </div>
  );
}

export default LogoMark;
