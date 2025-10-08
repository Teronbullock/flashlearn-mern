import { useParams, useSearchParams } from "react-router-dom";
import PageHeader from "@layouts/PageComponents/PageHeader";
import ViewCardSection from "@features/cards/components/ViewCardSection";
import useGetCardView from "@features/cards/hooks/useGetCardView";
import { BtnLink } from "@components/btn";

const ViewCardsPage = () => {
  const currentPage = "viewCardsPage";
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { card, cardCount } = useGetCardView(setId, page);

  return (
    <main className="main main-viewCardsPage">
      <PageHeader currentPage={currentPage}>
        <li>
          <BtnLink
            variants={{ style: "btn" }}
            className="btn--tertiary btn--large"
            to={`/set/${setId}`}
          >
            Set Page
          </BtnLink>
        </li>
      </PageHeader>
      {setId && page && card && cardCount && (
        <ViewCardSection
          page={Number(page)}
          setId={setId}
          card={card}
          cardCount={cardCount}
          cardLoadClass={null}
        />
      )}
    </main>
  );
};

export default ViewCardsPage;
