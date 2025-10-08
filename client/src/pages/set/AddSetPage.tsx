import useManageSetData from "@pages/dashboard/hooks/useManageSetData";
import { useAuthContext } from "@hooks/useAuthContext";
import {
  FormTextArea,
  FormInput,
  FormGroup,
  FormLayout,
  FormAction,
} from "@components/forms";

import { InnerPageHeader } from "@pages/shared/InnerPageHeader";

import data from "@content/setContent.json";

const AddSetPage = () => {
  const { userSlug } = useAuthContext();
  const { state, addSetHandler, dispatch } = useManageSetData();
  const { AddSet } = data;

  return (
    <main className="add-set-page md:mt-35 w-8xl mx-auto h-screen px-4">
      <InnerPageHeader data={AddSet.header} />
      <section className="w-full py-12">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <FormLayout onSubmit={addSetHandler}>
          <FormGroup
            labelName="Enter Set Title"
            className={{ label: "font-medium" }}
          >
            <FormInput
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
            cancelBtnTo={`/dashboard/${userSlug}/`}
          />
        </FormLayout>
      </section>
    </main>
  );
};

export default AddSetPage;
