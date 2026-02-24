import { useParams } from "react-router-dom";

import { FormTextArea, FormGroup, Form, FormAction } from "@components/forms";

import { Main } from "@layouts/Main";
import { PageHeader } from "@components/layout/PageHeader";

import { useCardManager } from "@feats/cards/hooks/use-card-manager";
import { useFetchCards } from "@feats/cards/hooks/use-fetch-card";

import data from "@content/editCardPage.json";

const EditCardPage = () => {
  const { setId, cardId } = useParams();

  const { card } = useFetchCards({ setId, cardId });

  const { onSubmit, errors, register, handleSubmit, isSubmitting } =
    useCardManager({ setId, cardId, card });

  const EditCard = data;

  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={EditCard.header} />
      <section className="w-full py-12">
        {!card ? (
          <h2 className="text-center text-2xl">Card not found!</h2>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
              labelName="Enter Card Title"
              className={{ label: "font-medium" }}
              name="term"
            >
              <FormTextArea
                id="term"
                placeholder="Term"
                autoFocus={true}
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
              cancelBtnTo={`/set/${setId}`}
              disable={isSubmitting}
            />
          </Form>
        )}
      </section>
    </Main>
  );
};

export default EditCardPage;
