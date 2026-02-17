type RatingProps = {
  value: number;
};

export const RatingStars = ({ value }: RatingProps) => {
  const safeValue = Math.max(0, Math.min(5, value));

  return (
    <div
      role="img"
      aria-label={`${safeValue} out of 5 stars`}
      className="my-2.25 flex items-center justify-center gap-1"
    >
      {Array.from({ length: 5 }, (_, i) => {
        const index = i + 1;
        return (
          <svg
            key={index}
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill={index <= safeValue ? "#FFD700" : "#E5E7EB"} // yellow for filled, gray for empty
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.268L12 19.771l-7.417 4.092L6 15.595 0 9.748l8.332-1.73z" />
          </svg>
        );
      })}
    </div>
  );
};
