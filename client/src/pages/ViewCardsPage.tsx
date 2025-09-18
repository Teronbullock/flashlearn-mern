import { useParams, useSearchParams } from "react-router-dom";
import PageHero from "@layouts/PageComponents/PageHero";
import PageHeader from "@layouts/PageComponents/PageHeader";
import { ListItemLink } from "@components/ListItemLink/ListItemLink";
import ViewCardSection from "@features/cards/components/ViewCardSection";
import useGetCardView from "@features/cards/hooks/useGetCardView";

const ViewCardsPage = () => {
  const currentPage = "viewCardsPage";
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { card, cardCount } = useGetCardView(setId, page);

  return (
    <main className="main main-viewCardsPage">
      <PageHero
        currentPage={currentPage}
        className="page-header--index hidden md:block"
      />
      <PageHeader currentPage={currentPage}>
        <ListItemLink className="btn--tertiary btn--large" to={`/set/${setId}`}>
          Set Page
        </ListItemLink>
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
