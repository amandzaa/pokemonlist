import React from "react";

export default function PokeballWatermark({
  size = 192,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* Main circle background */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="rgba(255,255,255,1)"
      />
      {/* White horizontal band - full width */}
      <rect
        x="2"
        y="45"
        width="96"
        height="10"
        fill="rgba(0,0,0,1)"
      />
      
      {/* White ring around center */}
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="rgba(0,0,0,1)"
        strokeWidth="8"
      />
      {/* Cut out circle area from the band */}
      <circle
        cx="50"
        cy="50"
        r="16"
        fill="rgba(255,255,255,1"
      />
      
      
    </svg>
  );
}