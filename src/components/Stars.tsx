import { Star } from "lucide-react";

export default function Stars({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.6}
          className={
            i <= Math.round(rating)
              ? "fill-orange text-orange"
              : "fill-transparent text-ink/35"
          }
        />
      ))}
    </span>
  );
}
