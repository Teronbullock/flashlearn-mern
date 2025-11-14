import { useParams, useSearchParams } from "react-router-dom";
import {
  CardLayout,
  Controls,
  CardFace,
  FlashCard,
} from "@pages/Card/components";

import { useCardData, useCardFlip } from "@pages/Card/hooks";
import { Main } from "@layouts/Main";
import { Btn } from "@components/btn";

export const ViewCardsPage = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { card, cardCount } = useCardData(setId, page);
  const { isFlipped, handleFlip, resetFlip } = useCardFlip();

  return (
    <Main>
      {!card && (
        <section className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold">No Cards Found</h1>
        </section>
      )}
      {setId && page && card && cardCount && (
        <CardLayout>
          <Controls
            page={page}
            setId={setId}
            cardCount={cardCount}
            handleNavigation={resetFlip}
          />
          <FlashCard isFlipped={isFlipped}>
            <CardFace
              className=""
              bgColor={card.bg_color}
              textColor={card.text_color}
              cardText={card.term}
              handFlipAction={handleFlip}
            />
            <CardFace
              className="rotate-y-180 z-50"
              bgColor={card.bg_color}
              textColor={card.text_color}
              cardText={card.definition}
              handFlipAction={handleFlip}
            />
          </FlashCard>
          <div className="mt-14 text-center">
            <Btn
              onClick={handleFlip}
              variants={{ color: "outline-primary", size: "lg", style: "btn" }}
              aria-label={`Show ${isFlipped ? "term" : "definition"}`}
            >
              Flip Card
            </Btn>
          </div>
        </CardLayout>
      )}
    </Main>
  );
};
