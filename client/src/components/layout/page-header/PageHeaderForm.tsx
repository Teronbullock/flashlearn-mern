import { Form, FormGroup, FormInput } from "@components/form";
import { BasicHeader, BasicHeaderProps } from "@components/ui/header";

interface PageHeaderFormProps {
  header: BasicHeaderProps;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const PageHeaderForm = ({
  header,
  onSubmit,
  onChange,
}: PageHeaderFormProps) => {
  return (
    <div>
      <BasicHeader {...header} />
      <Form className={{ container: "w-142" }} onSubmit={onSubmit}>
        <FormGroup htmlFor="search-bar" className={{ group: "relative" }}>
          <img
            src="/assets/img/Vector-finder.png"
            alt="icon of a magnifying glass"
            width="19px"
            height="19px"
            className="absolute left-4 top-[35%]"
          />
          <FormInput
            type="text"
            className="bg-light py-[0.55rem]! pl-11! w-full placeholder:text-sm"
            name="search-bar"
            onChange={onChange}
            placeholder="Search for set"
          />
        </FormGroup>
      </Form>
    </div>
  );
};
