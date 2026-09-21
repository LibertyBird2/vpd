export function WaveMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="20" cy="20" r="18.5" strokeOpacity="0.16" />
      <path d="M6 21 Q 12 12 18 21 T 30 21" />
      <path d="M6 26 Q 12 19 18 26 T 30 26" strokeOpacity="0.6" stroke="#5D2F94" />
    </svg>
  );
}

export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full ${className}`}
    >
      <path
        d="M0 30 Q 150 4 300 30 T 600 30 T 900 30 T 1200 30"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.2"
      />
      <path
        d="M0 42 Q 150 22 300 42 T 600 42 T 900 42 T 1200 42"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Soft organic arc used to transition between colour bands. */
export function CurveEdge({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0 80 C 300 0 900 0 1200 80 L 1200 80 L 0 80 Z" fill="currentColor" />
    </svg>
  );
}

export function WaveBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="wg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5D2F94" stopOpacity="0.12" />
          <stop offset="1" stopColor="#5D2F94" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 160 Q 200 100 400 160 T 800 160 T 1200 160 L 1200 400 L 0 400 Z"
        fill="url(#wg)"
      />
      <path
        d="M0 220 Q 200 170 400 220 T 800 220 T 1200 220"
        fill="none"
        stroke="#0A8F97"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Continuous drifting wave band — the signature VPD section separator. */
export function WaveRibbon({
  className = "",
  slow = false,
}: {
  className?: string;
  slow?: boolean;
}) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 2400 80"
        preserveAspectRatio="none"
        className={`h-full w-[200%] ${slow ? "wave-drift-slow" : "wave-drift"}`}
      >
        <path
          d="M0 44 Q 150 8 300 44 T 600 44 T 900 44 T 1200 44 T 1500 44 T 1800 44 T 2100 44 T 2400 44"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.6"
        />
        <path
          d="M0 58 Q 150 26 300 58 T 600 58 T 900 58 T 1200 58 T 1500 58 T 1800 58 T 2100 58 T 2400 58"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

/**
 * VoiceArcs — the signature VPD motif derived from the logo's twin arcs:
 * a purple arc and a teal arc rising together, each with a dot terminal
 * (voice leaving a person and travelling outward). Decorative only.
 */
export function VoiceArcs({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 220"
      aria-hidden="true"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      <g strokeLinecap="round" strokeWidth="14">
        <path d="M28 200 C 40 70 150 22 250 48" stroke="var(--voice)" strokeOpacity="0.20" />
        <path d="M58 200 C 70 96 160 62 236 84" stroke="var(--primary)" strokeOpacity="0.26" />
        <path d="M162 118 C 230 66 320 62 372 108" stroke="var(--primary)" strokeOpacity="0.20" />
      </g>
      <circle cx="122" cy="86" r="10" fill="var(--background)" />
      <circle cx="212" cy="56" r="12" fill="var(--background)" />
    </svg>
  );
}
