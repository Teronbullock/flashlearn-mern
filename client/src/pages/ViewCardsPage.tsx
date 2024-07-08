import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";
import ViewCardSection from "../features/cards/ViewCardSection";


const ViewCards = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const headerNav = [
    {
      "className": "btn--tertiary",
      "btnText": "Back to Set",
      "to": `/set/${setId}`,
      "ariaLabel": "Back to Set Button. Click to return to the set of flashcards."
    }
  ];


  return(
    <main className={classNames('main main-viewCardsPage')} currentPage={'viewCardsPage'} >
      <PageHero currentPage={'viewCardsPage'} />
      <PageHeader currentPage={'viewCardsPage'} headerNav={headerNav} />
      <ViewCardSection />
    </main>
  );
}

export default ViewCards;