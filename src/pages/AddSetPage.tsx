import { useContext } from "react";
import classNames from "classnames";
import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";
import ManageCardForm from "../components/Forms/ManageCardForm";
import useAddSetData from "../features/sets/hooks/useAddSetData";
import { AuthContext } from "../context/AuthContext";
import FormAction from "../components/Forms/FormAction";


const AddSetPage = () => {
  const { userId } = useContext(AuthContext);
  const { state, submitHandler, dispatch} = useAddSetData();

  const currentPage = 'createSetPage';
  const headerNav = [
    {
      "className": "btn--outline-black",
      "btnText": "Dashboard",
      "to": `/dashboard/${userId}/`,
      "ariaLabel": "Dashboard Button. Click to return to the dashboard."
    }
  ];


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
            submitBtnText='Create'
            cancelBtnTo={`/set/user/${userId}/add`}
          />
        </ManageCardForm>
      </section>
    </main>
  );
}

export default AddSetPage;