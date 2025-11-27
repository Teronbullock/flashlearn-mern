import { Main } from "@layouts/Main";
import { useSetManager } from "@feats/sets/hooks";
import {
  FormTextArea,
  FormInput,
  FormGroup,
  FormLayout,
  FormAction,
} from "@components/forms";
import { PageHeader } from "@components/layout/PageHeader";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import data from "@content/setContent.json";

const AddSetPage = () => {
  const { userSlug, token } = useAuthContext();
  const { state, addSetHandler, dispatch } = useSetManager({
    userSlug: userSlug || "",
    token: token || "",
  });
  const { addSetPage } = data;

  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={addSetPage.header} />
      <section className="w-full py-12">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <FormLayout onSubmit={addSetHandler}>
          <FormGroup
            labelName="Enter Set Title"
            className={{ label: "font-medium" }}
          >
            <FormInput
              type="text"
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
          <FormGroup
            labelName="Enter Description"
            className={{ group: "mb-9", label: "font-medium" }}
          >
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
            className="justify-center"
            submitBtnText="Save Set"
            cancelBtnTo={`/dashboard`}
          />
        </FormLayout>
      </section>
    </Main>
  );
};

export default AddSetPage;
