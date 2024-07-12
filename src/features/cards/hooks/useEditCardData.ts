import { useReducer, useEffect } from "react";
import apiRequest from "../../../lib/api";




const CardReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
    case 'UPDATE':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

const useEditCardData = (cardId, setId) => {
  const [state, dispatch] = useReducer(CardReducer, {
    payload: {
      inputOneValue: '',
      inputTwoValue: '',
      bgColor: '',
      textColor: '',
    }
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiRequest({
        method: 'put',
        url: `/api/set/${setId}/card/${cardId}/edit`,
        data: {
          term: state.inputOneValue,
          definition: state.inputTwoValue,
          bg_color: state.bgColor,
          text_color: state.textColor,
          id: cardId,
        },
        src: 'cardDataFetch - onSubmit'
      });
      if (res.data && res.status === 200) {
        const { msg } = res.data;
        alert(msg);
        console.log('Set data fetch');
      }
    } catch (error) {
      console.error(`Set data fetch error (${error.response.data.msg})`, error);
    }

  }

  useEffect( () => {
    (async () => {
      const res = await apiRequest({
        url: `/api/set/${setId}/card/${cardId}/edit`,
        src: 'SetDataFetch - useEffect'
      });

      if (res !== undefined && res.data) {
        const { term, definition, bg_color, text_color } = res.data.card;
        dispatch({
          type: 'UPDATE',
          payload: {
            inputOneValue: term,
            inputTwoValue: definition,
            bgColor: bg_color,
            textColor: text_color,
          }
        });
        return;
      }
    })();
  }, []);

  return{state, submitHandler, dispatch };
}

export default useEditCardData;