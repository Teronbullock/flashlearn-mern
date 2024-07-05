import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useManageCardData from "../hooks/useManageCardData";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import  { PageTempContext } from "../context/PageTempContext";
import { AuthContext } from "../context/AuthContext";
import { CardDataConfig } from "../types/card-types";
import ListCardForm from "../components/Forms/ListCardForm";


const Set = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { userId } = useContext(AuthContext);
  const { setId } = useParams();
  const { cards, handleSubmit } = useManageCardData();

  const headerNavArr = [
    {
      "className": "btn--tertiary mr-6",
      "btnText": "Add Card",
      "to": `/set/${setId}/card/add`,
      "ariaLabel": "Add Card Button. Click to add a new flashcard to this set."
    },
    {
      "className": "btn--outline-black mr-6",
      "btnText": "View Cards",
      "to": `/set/${setId}/cards/?page=1`,
      "ariaLabel": "View Cards Button. Click to view all flashcards in this set."
    },
    {
      "className": "btn--outline-black",
      "btnText": "Dashboard",
      "to": `/dashboard/${userId}/`,
      "ariaLabel": "Dashboard Button. Click to return to the dashboard."
    }
  ];

  useEffect(() => {
    setHeaderNav(headerNavArr);
  }, []);

  return (
    <PageTemplate currentPage="setPage">
      <section className="container py-12">
      { cards.length === 0 && <p>No cards found</p> }
      { cards.length > 0 && cards.map((card: CardDataConfig, index) => {
        const { 
          ID,
          card_definition,
          card_term,
          set_id,
        } = card;

        return (
          <ListCardForm 
            key={index} 
            title={card_term}
            description={card_definition}
            onSubmit={handleSubmit}
            btnTwoTo={`/set/${set_id}/card/${ID}/edit`}
            id={ID}
          />
        ) 
      })}
    </section>
    </PageTemplate>
  )
}

export default Set;