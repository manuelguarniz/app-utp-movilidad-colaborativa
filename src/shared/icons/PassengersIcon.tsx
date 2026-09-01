import type { IconProps } from "@/shared/icons/types";

export function PassengersIcon({
  className = "h-4 w-4",
  size,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c1.2-2 3-3.2 6-3.2s4.8 1.2 6 3.2" />
    </svg>
  );
}
