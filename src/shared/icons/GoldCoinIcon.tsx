import { useId } from "react";
import type { IconProps } from "@/shared/icons/types";

export function GoldCoinIcon({
  className = "h-5 w-5",
  size,
  ...props
}: IconProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E27D" />
          <stop offset="45%" stopColor="#E8B923" />
          <stop offset="100%" stopColor="#C9920A" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" fill={`url(#${gradientId})`} />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1.2"
      />
      <ellipse cx="12" cy="10" rx="5.5" ry="2" fill="#FFF3B0" opacity="0.45" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="#8B6914"
        fontFamily="Inter, sans-serif"
      >
        S/
      </text>
    </svg>
  );
}
