import { FormLayout, FormGroup, FormInput } from "@components/forms";
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
      <FormLayout className={{ container: "w-[568px]" }} onSubmit={onSubmit}>
        <FormGroup name="search-bar" className={{ group: "relative" }}>
          <img
            src="/assets/img/Vector-finder.png"
            alt="icon of a magnifying glass"
            width="19px"
            height="19px"
            className="absolute left-4 top-[35%]"
          />
          <FormInput
            type="text"
            className="bg-light w-full !py-[0.55rem] !pl-11 placeholder:text-sm"
            name="search-bar"
            onChange={onChange}
            placeholder="Search for set"
          />
        </FormGroup>
      </FormLayout>
    </div>
  );
};
