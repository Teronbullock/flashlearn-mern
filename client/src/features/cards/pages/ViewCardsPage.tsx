import { useParams, useSearchParams } from "react-router-dom";
import PageHero from "../../../layouts/PageComponents/PageHero";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import Btn from "../../../components/Btn/Btn";
import ViewCardSection from "../components/ViewCardSection";
import useGetCardView from "../hooks/useGetCardView";


const ViewCardsPage = () => {
  const currentPage = 'viewCardsPage';
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { card, cardCount } = useGetCardView(setId, page);

  return(
    <main className="main main-viewCardsPage" >
      <PageHero currentPage={currentPage} className="page-header--index hidden md:block" />
      <PageHeader currentPage={currentPage}>
        <Btn
          className="btn--tertiary btn--large"
          to={`/set/${setId}`}
          isListItem={true}
        >
          Set Page
        </Btn>
      </PageHeader>
      { setId && page && card && cardCount && (
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
}

export default ViewCardsPage;