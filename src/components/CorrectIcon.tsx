interface CorrectIconProps {
  className?: string;
  width?: number;
  height?: number;
  circleColor: string;
  strokeColor: string;
}

export default function CorrectIcon({
  className,
  width = 40,
  height = 40,
  circleColor,
  strokeColor,
}: CorrectIconProps) {
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
        d="M8 12.5L10.5 15L16 9.5"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
