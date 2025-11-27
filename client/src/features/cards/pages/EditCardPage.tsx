// import { BtnLink } from "@components/btn";
import { useParams } from "react-router-dom";
import { Main } from "@layouts/Main";

import {
  FormTextArea,
  FormInput,
  FormGroup,
  FormLayout,
  FormAction,
} from "@components/forms";
import { PageHeader } from "@components/layout/PageHeader";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import data from "@content/editCardPage.json";
import { useCardManager, useFetchCard } from "@feats/cards/hooks";

const EditCardPage = () => {
  const { setId, cardId } = useParams();
  const { token } = useAuthContext();
  const { card } = useFetchCard({ setId, cardId, token });
  const { state, dispatch, editCardHandler } = useCardManager({
    cardId,
    setId,
    token,
    card,
  });
  const EditCard = data;

  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={EditCard.header} />
      <section className="w-full py-12">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <FormLayout onSubmit={editCardHandler}>
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
            submitBtnText="Save Card"
            cancelBtnTo={`/set/${setId}`}
          />
        </FormLayout>
      </section>
    </Main>
  );
};

export default EditCardPage;
