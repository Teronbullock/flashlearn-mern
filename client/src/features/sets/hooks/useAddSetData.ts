import { useReducer } from "react";
import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';



const SetReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
    case 'SUBMIT':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

const useAddSetData = () => {
  const { userId, token } = useAuthContext();

  const [state, dispatch] = useReducer(SetReducer, {
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
        url: `/api/set/user/${userId}/add`,
        data: {
          title: state.inputOneValue,
          description: state.inputTwoValue,
          user_id: userId,
        },
        config: {
          headers: { authorization: `Bearer ${token}` },
        },
        src: 'SetDataFetch - onSubmit'
      });
      if (res.data) {
        const { msg } = res.data;
        alert(msg);
        dispatch({ type: 'SUBMIT', payload: { inputOneValue: '', inputTwoValue: '' } });
        console.log('Set data fetch');
      }
      
    } catch (error) {
      console.error(`Set data fetch error (${error.response.data.msg})`, error);
    }

  }

  return{state, submitHandler, dispatch };
}

export default useAddSetData;