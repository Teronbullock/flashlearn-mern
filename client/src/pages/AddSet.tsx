import classNames from "classnames";
import useManageSetData from "../features/sets/hooks/useManageSetData";
import { useAuthContext } from "@hooks/useAuthContext";
import { FormLayout } from "@components/Forms/FormLayout";
import { FormTextArea } from "@components/Forms/FormTextArea";
import FormAction from "@components/Forms/FormAction";
import { Btn } from "@components/Btn/Btn";
import { FormGroup } from "@components/Forms/FormGroup";

const AddSetPage = () => {
  const { userSlug } = useAuthContext();
  // const { state, addSetHander, dispatch } = useAddSetData();
  const { state, addSetHandler, dispatch } = useManageSetData();
  const currentPage = "createSetPage";

  return (
    <main className={classNames("main", `main-${currentPage}`)}>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <FormLayout onSubmit={addSetHandler}>
          <FormGroup labelName="Title">
            <FormTextArea
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
          </FormGroup>
          <FormGroup labelName="Description">
            <FormTextArea
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
          </FormGroup>
          <FormAction
            submitBtnText="Create"
            cancelBtnTo={`/dashboard/${userSlug}/`}
          />
        </FormLayout>
      </section>
    </main>
  );
};

export default AddSetPage;
