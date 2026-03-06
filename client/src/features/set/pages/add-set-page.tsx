import { Main } from "@components/layout/main/Main";
import { useSetManager } from "@feats/set/hooks/use-set-manager";
import {
  FormTextArea,
  FormInput,
  FormGroup,
  Form,
  FormAction,
  FormInputError,
} from "@components/form";
import { PageHeader } from "@components/layout/page-header/PageHeader";
import data from "@content/setContent.json";

const AddSetPage = () => {
  const { register, errors, handleSubmit, onSubmit } = useSetManager({});
  const { addSetPage } = data;

  return (
    <>
      <Main className="md:mt-35" width="content">
        <PageHeader data={addSetPage.header} />
        <section className="w-full py-12">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
              labelName="Enter Set Title"
              className={{ label: "font-medium" }}
            >
              <FormInput
                id={"title"}
                type="text"
                required={true}
                placeholder="Enter Title"
                autoFocus={true}
                {...register("title")}
              />
              <FormInputError errors={errors} name="title" />
            </FormGroup>
            <FormGroup
              labelName="Enter Description"
              className={{ group: "mb-9", label: "font-medium" }}
            >
              <FormTextArea
                id={"description"}
                placeholder="Enter Description"
                {...register("description")}
              />
              <FormInputError errors={errors} name="description" />
            </FormGroup>
            <FormAction
              className="justify-center gap-4"
              submitBtnText="Save Set"
              cancelBtnTo={`/dashboard`}
            />
          </Form>
        </section>
      </Main>
    </>
  );
};

export default AddSetPage;
