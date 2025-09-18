import classNames from "classnames";
import useManageSetData from "../features/sets/hooks/useManageSetData";
import { useAuthContext } from "@hooks/useAuthContext";
import PageHeader from "../layouts/PageComponents/PageHeader";
import PageHero from "../layouts/PageComponents/PageHero";
import Form from "@components/Forms/Form";
import FormInput from "@components/Forms/FormInput";
import FormAction from "@components/Forms/FormAction";
import { ListItemLink } from "@components/ListItemLink/ListItemLink";

const AddSetPage = () => {
  const { userSlug } = useAuthContext();
  // const { state, addSetHander, dispatch } = useAddSetData();
  const { state, addSetHandler, dispatch } = useManageSetData();
  const currentPage = "createSetPage";

  return (
    <main className={classNames("main", `main-${currentPage}`)}>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListItemLink
          className="btn--outline-black btn--large"
          to={`/dashboard/${userSlug}/`}
        >
          Dashboard Page
        </ListItemLink>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <Form onSubmit={addSetHandler} className="bg-white">
          <FormInput
            labelName="Title"
            type="textarea"
            name="title"
            value={state.inputOneValue}
            required={true}
            placeholder="Enter Title"
            onChange={(e) =>
              dispatch({
                type: "ON_INPUT_ONE_CHANGE",
                payload: { inputOneValue: e.target.value },
              })
            }
            autoFocus={true}
          />
          <FormInput
            labelName="Description"
            type="textarea"
            name="description"
            value={state.inputTwoValue}
            placeholder="Enter Description"
            onChange={(e) =>
              dispatch({
                type: "ON_INPUT_TWO_CHANGE",
                payload: { inputTwoValue: e.target.value },
              })
            }
          />
          <FormAction
            submitBtnText="Create"
            cancelBtnTo={`/dashboard/${userSlug}/`}
          />
        </Form>
      </section>
    </main>
  );
};

export default AddSetPage;
