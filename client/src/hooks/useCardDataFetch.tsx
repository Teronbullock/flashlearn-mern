import { useEffect, useState, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CardType, CardInitialState, CardReducerAction } from "../types/card-types";
import apiRequest from "../lib/api";


const CardReducer = (state: CardInitialState, action: CardReducerAction) => {
  console.log('CardReducer:', state, action);
  switch (action.type) {
    case 'update_card':
      return {
        ...state,
        ...action.payload,
      };
    case 'on_change':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const useCardDataFetch = () => {
  const {setId, cardId} = useParams();
  const { userId } = useContext(AuthContext);
  const [cardUpdated, setCardUpdated] = useState(false);
  const [actionType, setActionType] = useState(null);

  // const [card, setCard] = useState<CardType | null>(null);

  const [state, dispatch] = useReducer(CardReducer, {
    inputOneValue,
    inputTwoValue,
    card_color: '',
    card_text_color: '',
  } as CardInitialState);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res;

    
    try {
      if (actionType === 'add') {
        res = await apiRequest({
          method: 'post',
          url: `/api/set/${setId}/card/add`,
          data: {
            card_term: state.inputOneValue,
            card_definition: state.inputTwoValue,
            user_id: userId,
            set_id: setId,
          },
          src: 'AddCard - onSubmit'
        });
      } else if (actionType === 'edit') {
        res = await apiRequest({
          method: 'put',
          url: `/api/set/${setId}/card/${cardId}/edit`,
          data: {
            card_term: state.inputOneValue,
            card_definition: state.inputTwoValue,
            card_color: state.card_color,
            card_text_color: state.card_text_color,
            id: cardId,
          },
          src: 'CardDataFetch - onSubmit'
        });
      }


      if (res !== undefined && res.data) {
        const { msg } = res.data;
        alert(msg);

        if ( actionType === 'add') {
          dispatch({
            type: 'on_change',
            payload: {inputValues: ['', '']}
          });
        } else if ( actionType === 'edit' ) {
          const { cardUpdate } = res.data;
          setCardUpdated(cardUpdate);
        }
      }

    } catch (error) {
      console.error(error);
      throw new Error('Error updating card');
    }

  }

  useEffect(() => {
    if ( actionType === 'edit' ) {
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

      const { card_term, card_definition, card_color, card_text_color } = res.data.card;

      dispatch({
        type: 'update_card',
        payload: {
          inputOneValue: card_term,
          inputTwoValue: card_definition,
          card_color,
          card_text_color,
        }
      });

    })();
  }

  }, [setId, cardId, cardUpdated, actionType]);

  return { state, onSubmit, dispatch, setActionType };
};

export default useCardDataFetch;