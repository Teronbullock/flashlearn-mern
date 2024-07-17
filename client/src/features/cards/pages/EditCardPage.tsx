import { useParams } from "react-router-dom";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import PageHero from "../../../layouts/PageComponents/PageHero";
import ListItemBtn from "../../../components/Btn/ListItemBtn";  
import ManageCardForm from "../../../components/Forms/ManageCardForm";
import useEditCardData from "../hooks/useEditCardData";
import FormAction from "../../../components/Forms/FormAction";
import FormColorPicker from "../../../components/Forms/FormColorPicker";

const EditCardPage = () => {
  const { setId, cardId } = useParams();
  const currentPage = 'editCardPage';

  const { state, submitHandler, dispatch } = useEditCardData(cardId, setId);

  console.log('EditCardPage:', state);
  return (
    <main className="main main--edit-card-page">
      <PageHero currentPage={currentPage} className="h-[42vh]"/>
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className="btn--tertiary btn--large mr-6"
          to={`/set/${setId}`}
        >
          Set Page
        </ListItemBtn>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        <ManageCardForm
          formType='card'
          inputValues={[state.inputOneValue, state.inputTwoValue]}
          onSubmit={submitHandler}
          dispatch={dispatch}
          submitBtnText="Update"
        >
          <FormColorPicker
            bgColor={state.bgColor}
            textColor={state.textColor}
            dispatch={dispatch}
          />
          <FormAction
            submitBtnText="Update"
            cancelBtnTo={`/set/${setId}`}
          />
        </ManageCardForm>
      </section>
    </main>
  );
}

export default EditCardPage;