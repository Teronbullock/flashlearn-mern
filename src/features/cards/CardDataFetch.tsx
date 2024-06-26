import { useEffect, useState, useReducer } from "react";
import ManageCardForm from "./ManageCardForm";
import { useParams } from "react-router-dom";
import { CardType } from "../../types/card-types";
import { apiRequest } from "../../lib/api";


const CardReducer = (state: ManageCardFormProps, action: object) => {
  return {
    ...state,
    ...action,
  }
}


const CardDataFetch = () => {
  const {setId, cardId} = useParams();
  const [cardUpdated, setCardUpdated] = useState(false);
  const [card, setCard] = useState<CardType | null>(null);

  const [state, dispatch] = useReducer(CardReducer, {
    term: '',
    definition: '',
    bgColor: '',
    textColor: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      console.log('state here:',state);
      
      const res = await apiRequest({
        method: 'put',
        url: `/api/set/${setId}/card/${cardId}/edit`,
        data: {
          card_term: state.term,
          card_definition: state.definition,
          card_color: state.bgColor,
          card_text_color: state.textColor,
          id: cardId,
        },
        src: 'CardDataFetch - onSubmit'
      });

      if (res.data) {
        const { card, msg, cardUpdate } = res.data;
        setCardUpdated(cardUpdate);
        alert(msg);
        console.log('Update Card data fetch', card, msg, cardUpdate);
      }

      
    } catch (error) {
      console.error(error);
      throw new Error('Error updating card');
    }

  }

  useEffect(() => {
    ( async () => {
      const res = await apiRequest({
        url: `/api/set/${setId}/card/${cardId}/edit`,
        src: 'CardDataFetch - useEffect'
      });

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status);
        return;
      } 

      const { card } = res.data;
      dispatch({
        term: card.card_term,
        definition: card.card_definition,
        bgColor: card.card_color,
        textColor: card.card_text_color,
      });

    })();

  }, [setId, cardId, cardUpdated]);



  if (state) {
    return (
      <section className="container py-12 lg:max-w-screen-lg">
        <ManageCardForm
          formType='edit'
          term={state.term}
          definition={state.definition}
          bgColor={state.bgColor}
          textColor={state.textColor}
          onSubmit={onSubmit}
          to={`/set/${setId}`}
          dispatch={dispatch}
        />
      </section>
    );
  } else {
    return (
      <section className="container py-12 lg:max-w-screen-lg">
        <h2 className="text-2xl text-center">No card found</h2>
      </section>
    );
  }


};

export default CardDataFetch;