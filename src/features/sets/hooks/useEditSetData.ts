import { useReducer, useEffect } from "react";
import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';


interface InputState {
  inputOneValue?: string;
  inputTwoValue?: string;
}

interface SetAction {
  type: 'ON_INPUT_ONE_CHANGE' | 'ON_INPUT_TWO_CHANGE' | 'ON_LOAD';
  payload: InputState;
}

const SetReducer = (state: InputState, action: SetAction) => {
  switch (action.type) {
    case 'ON_LOAD':
      return {
        ...state,
        ...action.payload,
      };
    case 'ON_INPUT_ONE_CHANGE':
      return {...state, inputOneValue: action.payload.inputOneValue};
    case 'ON_INPUT_TWO_CHANGE':
      return {...state, inputTwoValue: action.payload.inputTwoValue};
    default:
      return state;
  }
}

const useEditSetData = (setId: string | undefined) => {
  const { token } = useAuthContext();

  const [state, dispatch] = useReducer(SetReducer, {
    inputOneValue: '',
    inputTwoValue: '',
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
        config: {
          headers: { authorization: `Bearer ${token}` },
        },
        src: 'SetDataFetch - onSubmit'
      });

      if (res.data && res.status === 200) {
        const { msg } = res.data;
        alert(msg);
      }
    } catch (error) {
      alert(`Error updating set ${error}`);
      console.error('Set data fetch error', error);
    }

  }

  useEffect( () => {
    (async () => {
      const res = await apiRequest({
        url: `/api/set/${setId}/edit`,
        src: 'SetDataFetch - useEffect',
        config: {
          headers: { authorization: `Bearer ${token}` },
        }
      });

      if (res !==undefined && res.data) {
        const { title, description } = res.data.set;
        dispatch({
          type: 'ON_LOAD',
          payload: {
            inputOneValue: title,
            inputTwoValue: description,
          }
        });
        return;
      }
    })();
  }, [setId, token]);

  return{state, submitHandler, dispatch };
}

export default useEditSetData;