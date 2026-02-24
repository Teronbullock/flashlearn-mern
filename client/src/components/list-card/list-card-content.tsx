interface ListCardFormProps {
  title: string;
  description?: string | null;
  cardCount?: number;
  feedType?: "set" | "card";
}

export const ListCardContent = ({
  title,
  description,
  cardCount = 0,
  feedType,
}: ListCardFormProps) => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <h3 className="mb-3 text-base">{title}</h3>
        {feedType === "set" &&
          (cardCount || cardCount === 0 ? (
            <p className="card__body-info-title my-0">Terms: {cardCount}</p>
          ) : null)}
      </div>
      {description && (
        <div className="mb-6">
          <p className="line-clamp line-clamp--2 mb-0 text-base">
            {description}
          </p>
        </div>
      )}
    </>
  );
};
