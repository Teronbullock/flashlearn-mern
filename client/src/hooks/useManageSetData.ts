import { useContext, useEffect, useState, useReducer } from "react";
import apiRequest from "../lib/api";
import { AuthContext } from "../context/AuthContext";
import { SetReducerInterface } from "../types/pages-types";


const SetReducer: SetReducerInterface = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {...state, ...action.payload}
    case 'ON_CHANGE':
      return {...state, ...action.payload}
    case 'SUBMIT':
      return {...state, isSubmitted: true}
    case 'RESET':
      return {...state, isSubmitted: false}
    default:
      return state;
  }
}

const useManageSetData = () => {
  const { userId } = useContext(AuthContext);
  const [actionType, setActionType] = useState(null);

  const [state, dispatch] = useReducer(SetReducer, {
    isSubmitted: false,
    payload: {
      inputOneValue: '',
      inputTwoValue: '',
    }
  });

  // Handle set deletion
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>, setId ) => {
    e.preventDefault();
    
    if (actionType === 'edit') {
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

      if (res.data) {
        const { set, msg, setUpdate } = res.data;

        alert(msg);
        console.log('Update Card data fetch', set, msg, setUpdate);
      }
    
    } else if (actionType === 'add') {
      const res = await apiRequest({
        method: 'post',
        url: `/api/set/user/${userId}/add`,
        data: {
          title: state.inputOneValue,
          desc: state.inputTwoValue,
          userId: userId,
        },
        src: 'SetDataFetch - onSubmit'
      });

      if (res.data) {
        const { set, msg, setUpdate } = res.data;

        alert(msg);
        console.log('Update Card data fetch', set, msg, setUpdate);
        dispatch({
          type: 'on_change',
          payload: {
            inputOneValue: '',
             inputTwoValue: ''
          }
        });
      }
    }

  }

  useEffect(() => {
    let res;

    ( async () => {
      if (actionType === 'edit') {
        res = await apiRequest({
          url: `/api/set/${setId}/edit`,
          src: 'SetDataFetch - useEffect'
        });

        if (res !==undefined && res.data) {
          const { title, description } = res.data.set;

          dispatch({
            type: 'update',
            payload: {
              inputOneValue: title,
              inputTwoValue: description,
            }
          });
          return;
        }

      }

      // Reset the state after submission
      if(state.isSubmitted) {
        dispatch({type: 'reset'});
      }

    })();

  },[userId, state.isSubmitted, actionType]);


  return{state, submitHandler, setActionType, dispatch };

}

export default useManageSetData;