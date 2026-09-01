import type { IconProps } from "@/shared/icons/types";

export function LuggageIcon({
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
      <rect x="6" y="8" width="12" height="10" rx="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
