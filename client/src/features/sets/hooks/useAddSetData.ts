import { useReducer } from 'react';
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import { InputState, SetAction } from '../../../types/card-set-types';

const SetReducer = (state: InputState, action: SetAction) => {
  switch (action.type) {
    case 'ON_INPUT_ONE_CHANGE':
      return { ...state, inputOneValue: action.payload.inputOneValue };
    case 'ON_INPUT_TWO_CHANGE':
      return { ...state, inputTwoValue: action.payload.inputTwoValue };
    case 'SUBMIT':
      return { ...state,
        inputOneValue: '',
        inputTwoValue: '',
      };
    default:
      return state;
  }
};

const useAddSetData = () => {
  const { userId, token } = useAuthContext();

  const [state, dispatch] = useReducer(SetReducer, {
    inputOneValue: '',
    inputTwoValue: '',
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
        },
        config: {
          headers: { authorization: `Bearer ${token}` },
        },
        src: 'SetDataFetch - onSubmit',
      });

      if (res.data) {
        const { msg } = res.data;
        alert(msg);
        dispatch({type: 'SUBMIT'});
        console.log('Set data fetch');
      }
    } catch (error) {
      if ( error instanceof Error) {
        console.error(`Set data fetch ${error.message}`);
      } else {
        console.error('Set data fetch ', error);
      }
    }
  };

  return { state, submitHandler, dispatch };
};

export default useAddSetData;
