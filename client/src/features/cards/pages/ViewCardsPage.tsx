import { useParams, useSearchParams } from "react-router-dom";
import {
  CardLayout,
  Controls,
  CardFace,
  FlashCard,
} from "@feats/cards/components";

import { useCardData, useCardFlip } from "@feats/cards/hooks";
import { Main } from "@layouts/Main";
import { Btn } from "@components/btn";

const ViewCardsPage = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get("page");
  const { card, cardCount, isLoading, error } = useCardData({ setId, pageNum });
  const { isFlipped, handleFlip, resetFlip } = useCardFlip();

  // show spinner
  if (isLoading) {
    return (
      <Main>
        <section className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold">Loading Card...</h1>{" "}
          <div className="flex items-center justify-center">
            <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-200"></div>
          </div>
        </section>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <section className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold">error</h1>
        </section>
      </Main>
    );
  }

  // show card not found
  if (!card && !isLoading) {
    return (
      <Main>
        <section className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold">No Card Found for this Page</h1>
        </section>
      </Main>
    );
  }

  return (
    <Main>
      {setId && pageNum && card && cardCount && (
        <CardLayout>
          <Controls
            page={pageNum}
            setId={setId}
            cardCount={cardCount}
            handleNavigation={resetFlip}
          />
          <FlashCard isFlipped={isFlipped}>
            <CardFace
              className=""
              // bgColor={card.bg_color}
              // textColor={card.text_color}
              cardText={card.term}
              handFlipAction={handleFlip}
            />
            <CardFace
              className="rotate-y-180 z-50"
              // bgColor={card.bg_color}
              // textColor={card.text_color}
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

export default ViewCardsPage;
