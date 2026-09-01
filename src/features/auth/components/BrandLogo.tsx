type BrandLogoProps = {
  compact?: boolean;
  showWordmark?: boolean;
  inline?: boolean;
};

export function BrandLogo({
  compact = false,
  showWordmark = true,
  inline = false,
}: BrandLogoProps) {
  const iconSize =
    compact && inline ? "h-8 w-10" : compact ? "h-12 w-16" : "h-16 w-20";
  const containerSize =
    compact && inline ? "h-8 w-10" : compact ? "h-16 w-16" : "h-20 w-20";

  return (
    <div
      className={
        inline
          ? "flex items-center gap-2"
          : "flex flex-col items-center justify-center"
      }
    >
      <div
        className={`flex ${containerSize} items-center justify-center`}
        aria-label="ColaboraCar logo"
      >
        <svg
          viewBox="0 0 120 80"
          className={iconSize}
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

      {showWordmark ? (
        <div
          className={
            inline
              ? "text-lg font-black leading-none tracking-tight text-[#d93a43]"
              : "text-center text-2xl font-black leading-none tracking-tight text-[#d93a43]"
          }
        >
          ColaboraCar
        </div>
      ) : (
        <span className="sr-only">ColaboraCar</span>
      )}
    </div>
  );
}
