import { useParams } from "react-router-dom";
import { useCardManager } from "@feats/cards/hooks";
import { PageHeader } from "@components/layout/PageHeader";
import {
  FormTextArea,
  FormGroup,
  FormLayout,
  FormAction,
} from "@components/forms";
import { Main } from "@layouts/Main";
import data from "@content/cardContent.json";
import { useAuthContext } from "@feats/auth/context/AuthContext";

const AddCardPage = () => {
  const { token } = useAuthContext();
  const { setId } = useParams();
  const { state, addCardHandler, dispatch } = useCardManager({
    setId,
    token,
  });
  const { addCard } = data;

  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={addCard.header} />
      <section className="w-full py-12">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <FormLayout onSubmit={addCardHandler}>
          <FormGroup
            labelName="Enter Card Title"
            className={{ label: "font-medium" }}
          >
            <FormTextArea
              name="term"
              value={state.inputOneValue}
              required={true}
              placeholder="Term"
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
            labelName="Enter Definition"
            className={{ group: "mb-9", label: "font-medium" }}
          >
            <FormTextArea
              name="definition"
              value={state.inputTwoValue}
              placeholder="Definition"
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
            submitBtnText="Save Card"
            cancelBtnTo={`/set/${setId}/`}
          />
        </FormLayout>
      </section>
    </Main>
  );
};

export default AddCardPage;
