import { useParams } from "react-router-dom";
import { useSetData } from "@pages/set/hooks";
import { InnerPageHeader } from "@components/InnerPageHeader";
import {
  FormTextArea,
  FormGroup,
  FormLayout,
  FormAction,
} from "@components/forms";
import { Main } from "@layouts/Main";
import data from "@content/cardContent.json";
import { useAuthContext } from "@hooks/useAuthContext";

export const AddCardPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  const { state, addCardHandler, dispatch } = useSetData({ setId });
  const { addCard } = data;

  return (
    <Main className="md:mt-35" width="content">
      <InnerPageHeader data={addCard.header} />
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
                  type: "SET_INPUT_ONE",
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
                  type: "SET_INPUT_TWO",
                  payload: { inputTwoValue: e.target.value },
                })
              }
            />
          </FormGroup>
          <FormAction
            className="justify-center"
            submitBtnText="Save Card"
            cancelBtnTo={`/${userSlug}/set/${setId}/`}
          />
        </FormLayout>
      </section>
    </Main>
  );

  // return (
  //   <main className={classNames("main", `main-${currentPage}`)}>
  //     <PageHeader currentPage={currentPage}>
  //       <li>
  //         <BtnLink
  //           variants={{ style: "btn" }}
  //           className="btn--outline-black btn--large"
  //           to={`/set/${setId}/`}
  //         >
  //           Set page
  //         </BtnLink>
  //       </li>
  //     </PageHeader>
  //     <section className="container py-12 lg:max-w-screen-lg">
  //       {!state && <h2 className="text-center text-2xl">No set found</h2>}
  //       <Form onSubmit={addCardHandler} className="bg-white">
  //         <FormInput
  //           labelName="Term"
  //           type="textarea"
  //           name="term"
  //           value={state.inputOneValue}
  //           required={true}
  //           placeholder="Enter Term"
  //           onChange={(e) =>
  //             dispatch({
  //               type: "SET_INPUT_ONE",
  //               payload: { inputOneValue: e.target.value },
  //             })
  //           }
  //           autoFocus={true}
  //         />
  //         <FormInput
  //           labelName="Definition"
  //           type="textarea"
  //           name="definition"
  //           value={state.inputTwoValue}
  //           placeholder="Enter Definition"
  //           onChange={(e) =>
  //             dispatch({
  //               type: "SET_INPUT_TWO",
  //               payload: { inputTwoValue: e.target.value },
  //             })
  //           }
  //         />
  //         <FormAction submitBtnText="Create" cancelBtnTo={`/set/${setId}/`} />
  //       </Form>
  //     </section>
  //   </main>
  // );
};
