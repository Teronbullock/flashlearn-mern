import { useParams } from "react-router";
import { Main } from "@layouts/Main";

import { FormTextArea } from "@components/forms";
import { FormInput } from "@components/forms";
import { FormGroup } from "@components/forms";
import { Form } from "@components/forms";
import { FormAction } from "@components/forms";
import { FormInputError } from "@components/forms";
import { PageHeader } from "@components/layout/PageHeader";
import data from "@content/setContent.json";
import { useFetchSet } from "@feats/sets/hooks/use-fetch-set";
import { useSetManager } from "@feats/sets/hooks/use-set-manager";
import { Spinner } from "@components/ui/Spinner";

const EditSetPage = () => {
  const { setId } = useParams();

  if (!setId) {
    throw new Error("Set ID is required");
  }

  const { set, isLoading } = useFetchSet({ setId });

  const { errors, onSubmit, handleSubmit, register } = useSetManager({
    set: set,
    setId: setId,
  });

  const { editSetPage } = data;

  if (isLoading) {
    return <Spinner />;
  }
  console.error("errors", errors.root?.message);
  return (
    <Main className="md:mt-35" width="content">
      <PageHeader data={editSetPage.header} />
      <section className="w-full py-12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup
            labelName="Enter Set Title"
            className={{ label: "font-medium" }}
          >
            <FormInput
              type="text"
              required={true}
              placeholder="Enter Title"
              {...register("title")}
              autoFocus={true}
            />
            <FormInputError errors={errors} name="title" />
          </FormGroup>
          <FormGroup
            labelName="Enter Description"
            className={{ group: "mb-9", label: "font-medium" }}
          >
            <FormTextArea
              placeholder="Enter Description"
              {...register("description")}
            />
            <FormInputError errors={errors} name="description" />
            <FormInputError message={errors.root?.message} />
          </FormGroup>
          <FormAction
            className="justify-center"
            submitBtnText="Save Set"
            cancelBtnTo={`/dashboard`}
          />
        </Form>
      </section>
    </Main>
  );
};

export default EditSetPage;
