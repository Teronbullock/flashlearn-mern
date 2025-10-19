import { useParams } from "react-router-dom";
import { useSetData } from "@pages/set/hooks/useSetData-old";
import {
  FormAction,
  FormColorPicker,
  FormLayout,
  FormInput,
} from "@components/forms";

import { BtnLink } from "@components/btn";

export const EditCardPage = () => {
  const { setId, cardId } = useParams();
  const currentPage = "editCardPage";
  const { state, dispatch, editCardHandler } = useSetData({
    isEditCard: true,
    cardId,
    setId,
  });

  return (
    <main className="main main--edit-card-page">
      <PageHeader currentPage={currentPage}>
        <li>
          <BtnLink
            variants={{ style: "btn" }}
            className="btn--outline-black btn--large mr-6"
            to={`/set/${setId}`}
          >
            Set Page
          </BtnLink>
        </li>
      </PageHeader>
      <section className="container pb-4 pt-8 md:pt-12 lg:max-w-screen-lg">
        {state ? (
          <Form onSubmit={editCardHandler} className="bg-white">
            <FormInput
              labelName="Term"
              type="textarea"
              name="term"
              value={state.inputOneValue}
              required={true}
              placeholder="Enter Term"
              onChange={(e) =>
                dispatch({
                  type: "SET_INPUT_ONE",
                  payload: { inputOneValue: e.target.value },
                })
              }
              autoFocus={true}
            />
            <FormInput
              labelName="Definition"
              type="textarea"
              name="definition"
              value={state.inputTwoValue}
              placeholder="Enter Definition"
              onChange={(e) =>
                dispatch({
                  type: "SET_INPUT_TWO",
                  payload: { inputTwoValue: e.target.value },
                })
              }
            />
            <FormColorPicker
              bgColor={state.bgColor}
              textColor={state.textColor}
              dispatch={dispatch}
            />
            <FormAction submitBtnText="Update" cancelBtnTo={`/set/${setId}`} />
          </Form>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
};
