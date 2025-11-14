import { BtnLink } from "@/components/btn";

interface CardControlsProps {
  page: string;
  setId: string;
  cardCount: number;
  handleNavigation: () => void;
}

export const Controls = ({
  page,
  setId,
  cardCount,
  handleNavigation,
}: CardControlsProps) => {
  const currentPage = Number(page);
  const isFirstCard = currentPage <= 1;
  const isLastCard = currentPage >= cardCount;

  return (
    <div className="relative mb-4 flex items-center justify-between">
      <BtnLink
        to={`/set/${setId}/cards/?page=${isFirstCard ? currentPage : currentPage - 1}`}
        onClick={handleNavigation}
        disabled={isFirstCard}
        aria-label="Previous card"
        className="!min-w-fit justify-start"
      >
        <img
          className="h-[32px] w-[32px]"
          src="/public/assets/img/arrow-btn.svg"
        />
      </BtnLink>
      <span className="text-center">
        {page} of {cardCount}
      </span>
      <BtnLink
        to={`/set/${setId}/cards/?page=${isLastCard ? currentPage : currentPage + 1}`}
        onClick={handleNavigation}
        disabled={isLastCard}
        aria-label="Next card"
        className="!min-w-fit justify-end"
      >
        <img
          className="rotate-y-180 h-[32px] w-[32px]"
          src="/public/assets/img/arrow-btn.svg"
        />
      </BtnLink>
    </div>
  );
};
