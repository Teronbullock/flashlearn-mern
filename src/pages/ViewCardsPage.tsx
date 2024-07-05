import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import { PageTempContext } from "../context/PageTempContext";
import ViewCardSection from "../features/cards/ViewCardSection";

const ViewCards = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { setHeaderNav } = useContext(PageTempContext);

  const headerNavArr = [
    {
      "className": "btn--tertiary",
      "btnText": "Back to Set",
      "to": `/set/${setId}`,
      "ariaLabel": "Back to Set Button. Click to return to the set of flashcards."
    }
  ];


  useEffect(() => {
    setHeaderNav(headerNavArr);
  }, []);

  return(
    <PageTemplate currentPage={'viewCardsPage'} >
      <ViewCardSection />
    </PageTemplate>
  );
}

export default ViewCards;