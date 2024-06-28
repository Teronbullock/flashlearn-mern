import { useEffect, useState, useReducer } from "react";
import ManageCardForm from "../../components/Forms/ManageCardForm";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../lib/api";
import Nav from "../../layouts/Nav/Nav";


const SetReducer = (state: ManageCardFormProps, action: object) => {
  return {
    ...state,
    ...action,
  }
}


const SetDataFetch = () => {
  const {userId } = useParams();
  const [setUpdated, setSetUpdated] = useState(false);

  const [state, dispatch] = useReducer(SetReducer, {
    inputOneValue: '',
    InputTwoValue: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      console.log('state here:',state);
      
      const res = await apiRequest({
        method: 'post',
        url: `/api/set/user/${userId}/create`,
        data: {
          title: state.inputOneValue,
          desc: state.inputTwoValue,
          userId: userId,
        },
        src: 'SetDataFetch - onSubmit'
      });

      if (res.data) {
        const { set, msg, setUpdate } = res.data;
        setSetUpdated(setUpdate);
        alert(msg);
        console.log('Update Card data fetch', set, msg, setUpdate);
        dispatch({inputOneValue: '', inputTwoValue: ''});
      }

      
    } catch (error) {
      console.error(error);
      throw new Error('Error updating card');
    }

  }

  useEffect(() => {
    ( async () => {

      // // check if the response is successful
      // if (res.status !== 200) {
      //   console.error(res.status);
      //   return;
      // } 

    })();

  }, [userId, setUpdated]);



  if (state) {
    return (
      <section className="container py-12 lg:max-w-screen-lg">
        <ManageCardForm
          inputOneLabel='Title'
          inputTwoLabel='Description'
          submitBtnText='Create'
          inputOneValue={state.inputOneValue}
          inputTwoValue={state.inputTwoValue}
          onSubmit={onSubmit}
          to={`/set/user/${userId}/create`}
          dispatch={dispatch}
        />
      </section>
    );
  } else {
    return (
      <section className="container py-12 lg:max-w-screen-lg">
        <h2 className="text-2xl text-center">No set found</h2>
      </section>
    );
  }


};

export default SetDataFetch;