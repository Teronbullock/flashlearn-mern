import { useParams } from "react-router-dom";
import classNames from "classnames";
import ManageCardForm from "../../../components/Forms/ManageCardForm";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import PageHero from "../../../layouts/PageComponents/PageHero";
import useAddCardData from "../hooks/useAddCardData";
import ListItemBtn from "../../../components/Btn/ListItemBtn";

import FormAction from "../../../components/Forms/FormAction";

const AddCardPage = () => {
  const { state, submitHandler, dispatch} = useAddCardData();
  const { setId } = useParams();
  const currentPage = 'addCardPage';


  return (
    <main className={classNames('main', `main-${currentPage}`)} >
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className='btn--outline-black btn--large'
          to={`/set/${setId}/`}
        >
          Set page
        </ListItemBtn>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-2xl text-center">No set found</h2>}
        <ManageCardForm
          formType='set'
          inputValues={[state.inputOneValue, state.inputTwoValue]}
          onSubmit={submitHandler}
          dispatch={dispatch}
          submitBtnText='Create'
        >
          <FormAction
            submitBtnText='Create'
            cancelBtnTo={`/set/${setId}/`}
          />
        </ManageCardForm>
      </section>
    </main>
  );
}

export default AddCardPage;