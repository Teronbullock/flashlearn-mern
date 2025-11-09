import { Btn } from "@/components/btn";
import { CardDataProps } from "../type";

interface CardControlsProps extends CardDataProps {
  isFirstCard: boolean;
  isLastCard: boolean;
  handleNavigation: () => void;
}

export const Controls = ({
  page,
  setId,
  cardCount,
  handleNavigation,
}: CardControlsProps) => {
  const isFirstCard = page <= 1;
  const isLastCard = page >= cardCount;

  return (
    <div className="relative mb-4 flex items-center justify-between">
      <Btn
        to={`/set/${setId}/cards/?page=${isFirstCard ? page : page - 1}`}
        onClick={handleNavigation}
        variants={{
          color: "outline-secondary",
          style: "btn",
        }}
        disabled={isFirstCard}
        aria-label="Previous card"
        className="!min-w-fit justify-start"
      >
        <img
          className="h-[32px] w-[32px]"
          src="/public/assets/img/arrow-btn.svg"
        />
      </Btn>
      <span className="text-center">
        {page} of {cardCount}
      </span>
      <Btn
        to={`/set/${setId}/cards/?page=${isLastCard ? page : page + 1}`}
        onClick={handleNavigation}
        variants={{
          color: "black",
          style: "btn",
        }}
        disabled={isLastCard}
        aria-label="Next card"
        className="!min-w-fit justify-end"
      >
        <img
          className="rotate-y-180 h-[32px] w-[32px]"
          src="/public/assets/img/arrow-btn.svg"
        />
      </Btn>
    </div>
  );
};
