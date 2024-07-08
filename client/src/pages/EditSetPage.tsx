import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";
import ManageCardForm from "../components/Forms/ManageCardForm";
import useEditSetData from "../features/sets/hooks/useEditSetData";
import { AuthContext } from "../context/AuthContext";
import FormAction from "../components/Forms/FormAction";


const EditSetPage = () => {
  const { userId } = useContext(AuthContext);
  const { setId } = useParams();
  const { state, submitHandler, dispatch} = useEditSetData(setId);

  const currentPage = 'editSetPage';
  const headerNav = [
    {
      "className": "btn--outline-black mr-6",
      "btnText": "View Set",
      "to": `/set/${setId}/`,
      "ariaLabel": "View Set Button. Click to view the current set."
    },
    {
      "className": "btn--outline-black",
      "btnText": "Dashboard",
      "to": `/dashboard/${userId}/`,
      "ariaLabel": "Dashboard Button. Click to return to the dashboard."
    }
  ];

  console.log('currentState:', state); 
  return (
    <main className={classNames('main', `main-${currentPage}`)} >
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage} headerNav={headerNav} />
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-2xl text-center">No set found</h2>}
        <ManageCardForm
          formType='set'
          inputValues={[state.inputOneValue, state.inputTwoValue]}
          onSubmit={submitHandler}
          dispatch={dispatch}
          >
          <FormAction 
            submitBtnText='Update'
            cancelBtnTo={`/set/${setId}/edit`}
          />
        </ManageCardForm>
      </section>
    </main>
  );
}

export default EditSetPage;