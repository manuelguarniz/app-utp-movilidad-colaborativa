import type { IconProps } from "@/shared/icons/types";

export function CarIcon({ className = "h-4 w-4", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 11h1.2l1.1-3.2A2 2 0 0 1 9.2 6h5.6a2 2 0 0 1 1.9 1.3L17.8 11H19a2 2 0 0 1 2 2v1h-1.1a2.9 2.9 0 0 1-5.8 0H9.9a2.9 2.9 0 0 1-5.8 0H3v-1a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
