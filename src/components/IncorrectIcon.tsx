interface IncorrectIconProps {
  className?: string;
  width?: number;
  height?: number;
  circleColor: string;
  strokeColor: string;
}

export default function IncorrectIcon({
  className,
  width = 40,
  height = 40,
  circleColor,
  strokeColor,
}: IncorrectIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill={circleColor} />
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
