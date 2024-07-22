import { useContext } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import ManageCardForm from "../../../components/Forms/ManageCardForm";
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import ListItemBtn from "../../../components/Btn/ListItemBtn";
import PageHero from "../../../layouts/PageComponents/PageHero";
import useEditSetData from "../hooks/useEditSetData";
import FormAction from "../../../components/Forms/FormAction";



const EditSetPage = () => {
  const { userId } = useAuthContext();
  const { setId } = useParams();
  const { state, submitHandler, dispatch} = useEditSetData(setId);
  const currentPage = 'editSetPage';

  return (
    <main className={classNames('main', `main-${currentPage}`)} >
      <PageHero currentPage={currentPage} className="h-[42vh]"/>
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className="btn--large btn--outline-black mr-6"
          to={`/set/${setId}/`} 
        >
          View Set
        </ListItemBtn>
        <ListItemBtn
          className="btn--large btn--outline-black"
          to={`/dashboard/${userId}/`}
        >
          Dashboard Page
        </ListItemBtn>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-2xl text-center">No set found</h2>}
        <ManageCardForm
          formType='set'
          inputValues={[state.inputOneValue, state.inputTwoValue]}
          onSubmit={submitHandler}
          dispatch={dispatch}
          submitBtnText="Update"
          >
            <FormAction
              submitBtnText="Update"
              cancelBtnTo={`/set/${setId}/`}
            />
        </ManageCardForm>
      </section>
    </main>
  );
}

export default EditSetPage;