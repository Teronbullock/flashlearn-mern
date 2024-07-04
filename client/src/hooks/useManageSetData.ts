import { useContext, useEffect, useState, useReducer } from "react";
import apiRequest from "../lib/api";
import { AuthContext } from "../context/AuthContext";
import { SetReducerInterface } from "../types/pages-types";


const SetReducer: SetReducerInterface = (state, action) => {
  switch (action.type) {
    case 'submit':
      return { ...state, isSubmitted: true }
    case 'reset':
      return { ...state, isSubmitted: false }
    default:
      return state;
  }
}

const useManageSetData = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState([]);
  const [state, dispatch] = useReducer(SetReducer, {
    isSubmitted: false,
  });
  
  // Handle set deletion
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, setId: number) => {
    e.preventDefault();
  
    const res = await apiRequest({
      method: 'delete',
      url: `/api/set/${setId}/delete`,
      src: 'ManageSetData - deleteSet',
      data: {
        userId: userId,
      }
    });

    if(res.status === 200 && res.data?.isSetDeleted) {
      const { msg } = res.data;

        alert(msg);
        dispatch({type: 'submit'});
    }
  }

  useEffect(() => {
    ( async () => {
      const res = await apiRequest({
        url:`/api/set/user/${userId}`,
        src: 'ManageSetData - useEffect'
      });

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status);
        return;
      } 

      const { rows } = res.data;
      setSets(rows);

      // Reset the state after submission
      if(state.isSubmitted) {
        dispatch({type: 'reset'});
      }
    })();

  },[userId, state.isSubmitted]);


  return{ sets, handleSubmit };

}

export default useManageSetData;