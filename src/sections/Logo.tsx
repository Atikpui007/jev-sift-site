export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#C6F35B" />
      <g stroke="#0B0D10" strokeWidth="5.5" strokeLinecap="round">
        <path d="M17 22h30" /><path d="M17 32h19" opacity=".4" /><path d="M17 42h26" />
      </g>
    </svg>
  );
}
