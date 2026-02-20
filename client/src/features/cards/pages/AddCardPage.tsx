import { useParams } from "react-router-dom";
import { useAddCard } from "../hooks/useAddCard";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  FormTextArea,
  FormGroup,
  FormLayout,
  FormAction,
} from "@/components/forms";
import { Main } from "@/layouts/Main";
import data from "@/content/cardContent.json";

const AddCardPage = () => {
  const { setId } = useParams();
  const { onSubmit, errors, register, handleSubmit, isSubmitting } = useAddCard(
    { setId },
  );

  const { addCard } = data;

  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={addCard.header} />
      <section className="w-full py-10">
        {/* {!state && <h2 className="text-center text-2xl">No set found</h2>} */}
        <FormLayout onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-7 text-red-500">
            {errors.root && errors.root.message}
          </div>
          <FormGroup
            labelName="Enter Card Title"
            className={{ label: "font-medium" }}
            name="term"
          >
            <FormTextArea
              id="term"
              placeholder="Term"
              // autoFocus={true}
              {...register("term")}
            />
            <div className="min-h-5 text-red-500">
              {errors.term && errors.term.message}
            </div>
          </FormGroup>
          <FormGroup
            labelName="Enter Definition"
            className={{ group: "mb-9", label: "font-medium" }}
            name="definition"
          >
            <FormTextArea
              id="definition"
              placeholder="Definition"
              {...register("definition")}
            />
            <div className="min-h-5 text-red-500">
              {errors.definition && errors.definition.message}
            </div>
          </FormGroup>
          <FormAction
            className="justify-center"
            submitBtnText="Save Card"
            cancelBtnTo={`/set/${setId}/`}
            disable={isSubmitting}
          />
        </FormLayout>
      </section>
    </Main>
  );
};

export default AddCardPage;
