import { useReducer, useState, useContext } from "react";
import { useParams } from "react-router";
import ManageCardForm from "../../../components/Forms/ManageCardForm";
import FormAction from "../../../components/Forms/FormAction";
import apiRequest from "../../../lib/api";
import  { AuthContext } from "../../../context/AuthContext";



const CardReducer = ( state, action ) => {
  return {
    ...state,
    ...action,
  }
}

const AddCard = () => {
  const [state, dispatch] = useReducer(CardReducer, {
    inputOneValue: '',
    inputTwoValue: '',
  });

  const { userId } = useContext(AuthContext);
  const { setId } = useParams();
  

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await apiRequest({
      method: 'post',
      url: `/api/set/${setId}/card/add`,
      data: {
        term: state.inputOneValue,
        definition: state.inputTwoValue,
        userId: userId,

      },
      src: 'AddCard - onSubmit'
    });

    if (res && res.status) {
      const { card, msg } = res.data;
      alert(msg);
      console.log('Add Card', card);
      dispatch({inputOneValue: '', inputTwoValue: ''});
    }
  }


  return (
    <section className="container py-12 lg:max-w-screen-lg">
      <ManageCardForm
        formType='card'
        inputValues={[state.inputOneValue, state.inputTwoValue]}
        onSubmit={onSubmit}
        dispatch={dispatch}
        submitBtnText='Add Card'
      >
        <FormAction
          submitBtnText='Add Card'
          cancelBtnTo={`/set/${setId}/`}
        />
      </ManageCardForm>
    </section>
  );
}

export default AddCard; 