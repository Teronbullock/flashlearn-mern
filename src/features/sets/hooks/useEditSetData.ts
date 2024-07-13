import { useContext, useReducer, useEffect } from "react";
import apiRequest from "../../../lib/api";
import { AuthContext } from "../../../context/AuthContext";



const SetReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
    case 'UPDATE':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

const useEditSetData = (setId) => {
  const { userId } = useContext(AuthContext);

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
        method: 'put',
        url: `/api/set/${setId}/edit`,
        data: {
          title: state.inputOneValue,
          description: state.inputTwoValue,
          id: setId,
        },
        src: 'SetDataFetch - onSubmit'
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
        url: `/api/set/${setId}/edit`,
        src: 'SetDataFetch - useEffect'
      });

      if (res !==undefined && res.data) {
        const { title, description } = res.data.set;
        dispatch({
          type: 'UPDATE',
          payload: {
            inputOneValue: title,
            inputTwoValue: description,
          }
        });
        return;
      }
    })();
  }, []);

  return{state, submitHandler, dispatch };
}

export default useEditSetData;