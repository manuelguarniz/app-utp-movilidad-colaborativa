type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={
          compact
            ? "mb-3 flex h-20 w-20 items-center justify-center"
            : "mb-4 flex h-24 w-24 items-center justify-center"
        }
        aria-label="ColaboraCar logo"
      >
        <svg
          viewBox="0 0 120 80"
          className={compact ? "h-16 w-20" : "h-20 w-24"}
          role="img"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M26 54h68c8.5 0 16.5-7 18-15.5L118 27c1.7-7.6-4.4-14.7-12.3-14.7H54L44 9H20c-6.6 0-12 5.4-12 12v23.5C8 48.9 15.9 54 26 54Z" />
            <path d="M18 41h82" />
            <path d="M30 26h18l9 12H23l7-12Z" />
            <path d="M74 26h18l8 12H66l8-12Z" />
            <circle cx="32" cy="56" r="10" />
            <circle cx="86" cy="56" r="10" />
            <path d="M8 36h16" />
            <path d="M96 21h10" />
            <path d="M108 20c5 0 8 4 8 9" />
          </g>
        </svg>
      </div>

      <div className="text-center text-[2.2rem] font-black leading-none tracking-[-0.08em] text-[#d93a43]">
        ColaboraCar
      </div>
    </div>
  );
}
