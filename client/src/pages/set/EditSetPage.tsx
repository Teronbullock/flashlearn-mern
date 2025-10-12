import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useAuthContext } from "@hooks/useAuthContext";
// import PageHeader from "../layouts/PageComponents/PageHeader";
// import useSetCollection from "../features/sets/hooks/useSetCollection";
import { FormLayout, FormInput, FormAction } from "@components/forms";
import { BtnLink } from "@components/btn";

export const EditSetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  const { state, editSetHandler, dispatch } = useSetCollection({
    isEditSet: true,
    setId,
  });
  const currentPage = "editSetPage";

  return (
    <main className={classNames("main", `main-${currentPage}`)}>
      <PageHeader currentPage={currentPage}>
        <li>
          <BtnLink
            variants={{ style: "btn" }}
            className="btn--large btn--outline-black mr-6"
            to={`/set/${setId}/`}
          >
            View Set
          </BtnLink>
        </li>
        <li>
          <BtnLink
            variants={{ style: "btn" }}
            className="btn--large btn--outline-black"
            to={`/${userSlug}/dashboard`}
          >
            Dashboard Page
          </BtnLink>
        </li>
      </PageHeader>
      <section className="container py-12 lg:max-w-screen-lg">
        {!state && <h2 className="text-center text-2xl">No set found</h2>}
        <Form onSubmit={editSetHandler} className="bg-white">
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
            submitBtnText="Update"
            cancelBtnTo={`/${userSlug}/dashboard`}
          />
        </Form>
      </section>
    </main>
  );
};
