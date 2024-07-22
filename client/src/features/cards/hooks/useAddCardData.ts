import { useReducer } from "react";
import { useParams } from "react-router";
import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';



const CardReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
    case 'SUBMIT':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

const useAddCardData = () => {
  const { userId, token } = useAuthContext();
  const { setId } = useParams();

  const [state, dispatch] = useReducer(CardReducer, {
    payload: {
      inputOneValue: '',
      inputTwoValue: '',
    }
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiRequest({
        method: 'post',
        url: `/api/set/${setId}/card/add`,
        data: {
          term: state.inputOneValue,
          definition: state.inputTwoValue,
          user_id: userId,
          set_id: setId,
          headers: { 'Authorization': `Bearer ${token}` }
        },
        src: 'useAddCardData - onSubmit'
      });
      if (res.data && res.status === 200) {
        const { msg, card } = res.data;
        alert(msg);
        dispatch({ type: 'SUBMIT', payload: { inputOneValue: '', inputTwoValue: '' } });
        const termInput =  document.querySelector('#term') as HTMLInputElement;

        if (termInput) {
          termInput.focus();
        }

        console.log('Card data fetch', card, termInput);
      }
      
    } catch (error) {
      console.error(`Set data fetch error (${error.response.data.msg})`, error);
    }

  }

  return{state, submitHandler, dispatch };
}

export default useAddCardData;