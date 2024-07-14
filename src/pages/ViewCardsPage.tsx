import { useParams, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";
import ListItemBtn from "../components/Btn/ListItemBtn";
import ViewCardSection from "../features/cards/components/ViewCardSection";


const ViewCards = () => {
  const currentPage = 'viewCardsPage';
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');




  return(
    <main className="main main-viewCardsPage" >
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className="btn--tertiary"
          to={`/set/${setId}`}
        >
          Set Page
        </ListItemBtn>
      </PageHeader>
      <ViewCardSection />
    </main>
  );
}

export default ViewCards;