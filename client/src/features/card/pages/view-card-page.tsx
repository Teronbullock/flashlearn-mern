import { useParams, useSearchParams } from "react-router-dom";

import { CardFace } from "@feats/card/components/card-face";
import { CardLayout } from "@feats/card/components/card-layout";
import { Controls } from "@feats/card/components/controls";
import { FlashCard } from "@feats/card/components/flash-card";

import { useCardFlip } from "@feats/card/hooks/use-card-flip";

import { Button } from "@components/ui/button";
import { Main } from "@components/layout/main/Main";
import { Spinner } from "@components/ui/spinner/Spinner";
import { useViewCardData } from "@feats/card/hooks/use-view-card-data";

const ViewCardPage = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get("page");
  const { card, cardCount, isLoading, error } = useViewCardData({
    setId,
    pageNum,
  });
  const { isFlipped, handleFlip, resetFlip } = useCardFlip();

  // show spinner
  if (isLoading) {
    return <Spinner />;
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
              cardText={card.term}
              handFlipAction={handleFlip}
            />
            <CardFace
              className="rotate-y-180 z-50"
              cardText={card.definition}
              handFlipAction={handleFlip}
            />
          </FlashCard>
          <div className="mt-14 text-center">
            <Button
              onClick={handleFlip}
              variants={{ color: "outline-primary", size: "lg", style: "btn" }}
              aria-label={`Show ${isFlipped ? "term" : "definition"}`}
            >
              Flip Card
            </Button>
          </div>
        </CardLayout>
      )}
    </Main>
  );
};

export default ViewCardPage;
