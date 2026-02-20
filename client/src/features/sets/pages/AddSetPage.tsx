import { Main } from "@layouts/Main";
import { useAddSet } from "@feats/sets/hooks";
import {
  FormTextArea,
  FormInput,
  FormGroup,
  FormLayout,
  FormAction,
  FormInputError,
} from "@components/forms";
import { PageHeader } from "@components/layout/PageHeader";
import data from "@content/setContent.json";

const AddSetPage = () => {
  const { register, errors, handleSubmit, onSubmit } = useAddSet();
  // const { state, addSetHandler, dispatch } = useSetManager({});
  const { addSetPage } = data;

  return (
    <>
      <Main className="md:mt-35" width="content">
        <PageHeader data={addSetPage.header} />
        <section className="w-full py-12">
          {/* {!state && <h2 className="text-center text-2xl">No set found</h2>} */}
          <FormLayout onSubmit={handleSubmit(onSubmit)}>
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
          </FormLayout>
        </section>
      </Main>
    </>
  );
};

export default AddSetPage;
