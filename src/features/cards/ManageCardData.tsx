import { useEffect, useState, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../lib/api";
import ListCardForm from "../../components/Forms/ListCardForm";
import { CardDataConfig, CardReducerInterface } from "../../types/card-types";
import { AuthContext } from "../../context/AuthContext";


const CardReducer:CardReducerInterface = (state, action) => {
  console.log('CardReducer:', state, action);
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        isSubmitted: true,
      }
    case 'reset':
      return {
        ...state,
        isSubmitted: false,
      }
    default:
      return state;
  }
}

const ManageCardData = () => {
  const { setId } = useParams();
  const [cards, setCards] = useState([]);
  const { userId } = useContext(AuthContext);

  const [state, dispatch] = useReducer(CardReducer, {
    isSubmitted: false,
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, cardId: number) => {
    e.preventDefault();

    const res = await apiRequest({
      method: 'delete',
      url: `/api/set/${setId}/card/${cardId}/delete`,
      src: 'ManageCardData - deleteSet',
      data: {
        userId: userId,
        cardId: cardId,
      }
    });

    if(res && res.status == 200) {
      const { msg, isCardDeleted } = res.data;

      if(res.status === 200 && isCardDeleted) {
        // alert(msg);
        dispatch({type: 'submit'});
      }
    } else { console.error(res.status); }
    console.log('submit - isSubmitted:', state.isSubmitted);
  }

  useEffect(() => {
    ( async () => {
      const res = await apiRequest({
        url: `/api/set/${setId}`,
        src: 'ManageCardData - useEffect'
      });

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status);
        return;
      } 

      const { cards } = res.data;
      setCards(cards);

      // check if the state isSubmitted
      if(state.isSubmitted) {
        dispatch({type: 'reset'});
      }
      console.log('ManageCardData state isSubmitted:', state.isSubmitted);
    })();

  },[setId, state.isSubmitted]);
  
  return (
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
  );
}

export default ManageCardData;