import { useContext, useReducer } from "react";
import { useParams } from "react-router";
import apiRequest from "../../../lib/api";
import { AuthContext } from "../../../context/AuthContext";



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
  const { userId } = useContext(AuthContext);
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
        },
        src: 'SetDataFetch - onSubmit'
      });
      if (res.data && res.status === 200) {
        const { msg, card } = res.data;
        alert(msg);
        dispatch({ type: 'SUBMIT', payload: { inputOneValue: '', inputTwoValue: '' } });
        console.log('Card data fetch', card);
      }
      
    } catch (error) {
      console.error(`Set data fetch error (${error.response.data.msg})`, error);
    }

  }

  return{state, submitHandler, dispatch };
}

export default useAddCardData;