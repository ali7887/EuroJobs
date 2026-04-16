import React from "react";

export function BookmarkIcon({
  size = 20,
  stroke = 2,
  color = "currentColor",
}: {
  size?: number;
  stroke?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}
