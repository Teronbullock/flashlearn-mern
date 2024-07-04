import { useEffect, useState, useReducer } from "react";
import ManageCardForm from "../../components/Forms/ManageCardForm";
import { useParams } from "react-router-dom";
import { CardType } from "../../types/card-types";
import apiRequest from "../../lib/api";


const SetReducer = (state: ManageCardFormProps, action: object) => {
  return {
    ...state,
    ...action,
  }
}


const SetDataFetch = () => {
  const {setId } = useParams();
  const [setUpdated, setSetUpdated] = useState(false);

  const [state, dispatch] = useReducer(SetReducer, {
    title: '',
    description: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      console.log('state here:',state);
      
      const res = await apiRequest({
        method: 'put',
        url: `/api/set/${setId}/edit`,
        data: {
          title: state.inputOneValue,
          desc: state.inputTwoValue,
          id: setId,
        },
        src: 'SetDataFetch - onSubmit'
      });

      if (res.data) {
        const { set, msg, setUpdate } = res.data;
        setSetUpdated(setUpdate);
        alert(msg);
        console.log('Update Card data fetch', set, msg, setUpdate);
      }

      
    } catch (error) {
      console.error(error);
      throw new Error('Error updating card');
    }

  }

  useEffect(() => {
    ( async () => {
      const res = await apiRequest({
        url: `/api/set/${setId}/edit`,
        src: 'SetDataFetch - useEffect'
      });

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status);
        return;
      } 

      const { set } = res.data;
      const { title, description } = set;

      dispatch({
        inputOneValue: title,
        inputTwoValue: description,
      });

    })();

  }, [setId, setUpdated]);



  if (state) {
    return (
      <section className="container py-12 lg:max-w-screen-lg">
        <ManageCardForm
          inputOneLabel='Title'
          inputTwoLabel='Description'
          submitBtnText='Update'
          inputOneValue={state.inputOneValue}
          inputTwoValue={state.inputTwoValue}
          onSubmit={onSubmit}
          to={`/set/${setId}/edit`}
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