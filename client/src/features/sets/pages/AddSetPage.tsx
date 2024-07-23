import classNames from "classnames";
import ManageCardForm from "../../../components/Forms/ManageCardForm";
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import PageHero from "../../../layouts/PageComponents/PageHero";
import useAddSetData from "../hooks/useAddSetData";
import ListItemBtn from "../../../components/Btn/ListItemBtn";
import FormAction from "../../../components/Forms/FormAction";

const AddSetPage = () => {
  const { userId } = useAuthContext();
  const { state, submitHandler, dispatch} = useAddSetData();
  const currentPage = 'createSetPage';


  return (
    <main className={classNames('main', `main-${currentPage}`)} >
      <PageHero currentPage={currentPage} className="h-[42vh]"/>
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className='btn--outline-black btn--large'
          to={`/dashboard/${userId}/`}
        >
          Dashboard Page
        </ListItemBtn>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-2xl text-center">No set found</h2>}
        <ManageCardForm
          formType='set'
          inputOneValue={state.inputOneValue}
          inputTwoValue={state.inputTwoValue}
          onSubmit={submitHandler}
          dispatch={dispatch}
        >
          <FormAction
            submitBtnText='Create'
            cancelBtnTo={`/dashboard/${userId}/`}
          />
        </ManageCardForm>
      </section>
    </main>
  );
}

export default AddSetPage;