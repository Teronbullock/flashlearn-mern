import { useReducer } from "react";
import { useParams } from "react-router";
import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import { CardState, CardAction } from '../../../types/card-set-types';



const CardReducer = (state: CardState, action: CardAction) => {
  switch (action.type) {
    case 'ON_INPUT_ONE_CHANGE':
      return {
        ...state,
        inputOneValue: action.payload.inputOneValue
      }
    case 'ON_INPUT_TWO_CHANGE':
      return {
        ...state,
        inputTwoValue: action.payload.inputTwoValue
      }
    case 'RESET':
      return {
        ...state,
        inputOneValue: '',
        inputTwoValue: ''
      }
    default:
      return state;
  }
}

const useAddCardData = () => {
  const { userId, token } = useAuthContext();
  const { setId } = useParams();

  const [state, dispatch] = useReducer(CardReducer, {
    inputOneValue: '',
    inputTwoValue: '',
    bgColor: '#ffffff',
    textColor: '#000000'
  } );

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
        },
        config: {
          headers: { Authorization: `Bearer ${token}` },
        },
        src: 'useAddCardData - onSubmit'
      });
      if ((res.status >= 200 && res.status < 300) && (res && res.data)) {
        const { msg } = res.data;
        alert(msg);
        dispatch({ type: 'RESET'});
        
        const termInput =  document.querySelector('#term') as HTMLInputElement;

        if (termInput) {
          termInput.focus();
        }

      }
      
    } catch (error) {
      console.error(`Set data fetch error (${error})`);
    }

  }

  return{state, submitHandler, dispatch };
}

export default useAddCardData;