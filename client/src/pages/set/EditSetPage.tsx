import { useParams } from "react-router";
import { Main } from "@layouts/Main";
import { useSetForm } from "@/hooks/index";

import {
  FormTextArea,
  FormInput,
  FormGroup,
  FormLayout,
  FormAction,
} from "@components/forms";
import { PageHeader } from "@components/layout/PageHeader";

import { useAuthContext } from "@/hooks/index";
import data from "@content/setContent.json";

export const EditSetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  const { state, editSet, dispatch } = useSetForm({
    useOnLoad: true,
    setId: setId,
  });

  const { EditSet } = data;

  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={EditSet.header} />
      <section className="w-full py-12">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <FormLayout onSubmit={editSet}>
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
            cancelBtnTo={`/${userSlug}/dashboard`}
          />
        </FormLayout>
      </section>
    </Main>
  );
};
