import { useParams, useSearchParams } from "react-router-dom";
import { ViewCardSection } from "./components";
import useGetCardView from "@pages/card/hooks/useGetCardView";
import { BtnLink } from "@components/btn";
import { Main } from "@layouts/Main";

export const ViewCardsPage = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { card, cardCount } = useGetCardView(setId, page);
  console.log("page:", page);
  return (
    <Main>
      {setId && page && card && cardCount && (
        <ViewCardSection
          page={Number(page)}
          setId={setId}
          card={card}
          cardCount={cardCount}
          cardLoadClass={null}
        />
      )}
    </Main>
  );
};
