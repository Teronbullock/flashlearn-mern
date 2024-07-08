import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import useManageCardData from "../hooks/useManageCardData";
import { AuthContext } from "../context/AuthContext";
import { CardDataConfig } from "../types/card-types";
import ListCardForm from "../components/Forms/ListCardForm";
import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";


const Set = () => {
  const { userId } = useContext(AuthContext);
  const { setId } = useParams();
  const { cards, handleSubmit } = useManageCardData();

  const headerNav = useMemo(() =>[
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
  ], [userId, setId]);
  
  
  return (
    <main currentPage="setPage">
      <PageHero currentPage="setPage" />
      <PageHeader currentPage="setPage" headerNav={headerNav} />
      <section className="container py-12">
      { cards.length === 0 && <p>No cards found</p> }
      { cards.length > 0 && cards.map((card: CardDataConfig) => {
        const { 
          ID,
          card_definition,
          card_term,
          set_id,
        } = card;

        return (
          <ListCardForm 
            key={ID} 
            title={card_term}
            description={card_definition}
            onSubmit={handleSubmit}
            btnTwoTo={`/set/${set_id}/card/${ID}/edit`}
            id={ID}
          />
        ) 
      })}
    </section>
    </main>
  )
}

export default Set;