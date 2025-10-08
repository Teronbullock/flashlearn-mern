import { useParams } from "react-router-dom";
import classNames from "classnames";
import PageHeader from "../layouts/PageComponents/PageHeader";

import FormAction from "../components/Forms/FormAction";
import Form from "../components/Forms/FormLayout";
import FormInput from "../components/Forms/FormInput";
import useManageCardData from "@/features/cards/hooks/useManageCardData";
import { BtnLink } from "@components/btn";

const AddCardPage = () => {
  const { setId } = useParams();
  const { state, addCardHandler, dispatch } = useManageCardData({ setId });
  const currentPage = "addCardPage";

  return (
    <main className={classNames("main", `main-${currentPage}`)}>
      <PageHeader currentPage={currentPage}>
        <li>
          <BtnLink
            variants={{ style: "btn" }}
            className="btn--outline-black btn--large"
            to={`/set/${setId}/`}
          >
            Set page
          </BtnLink>
        </li>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <Form onSubmit={addCardHandler} className="bg-white">
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
          <FormAction submitBtnText="Create" cancelBtnTo={`/set/${setId}/`} />
        </Form>
      </section>
    </main>
  );
};

export default AddCardPage;
