import { FormGroup } from "@components/Forms/FormGroup";
import { FormLayout } from "@components/Forms/FormLayout";
import { SectionTwoCol } from "@components/SectionTwoCol";
import { FormInput } from "@components/Forms/FormInput";
import { Card } from "@components/Card";

interface DashboardHeaderProps {
  onSubmit: string;
  onChange: string;
  data: {
    title: string;
    copy: string;
  };
}

export const DashboardHeader = ({
  onSubmit,
  onChange,
  data,
}: DashboardHeaderProps) => {
  const { title, copy } = data;

  return (
    <SectionTwoCol className={{ inner: "justify-between", container: "mb-15" }}>
      <div>
        <h2 className="mb-2 font-semibold">{title}</h2>
        <h3 className="text-base">{copy}</h3>
      </div>
      <div>
        <FormLayout onSubmit={onSubmit}>
          <FormGroup name="search-bar">
            <FormInput
              className="w-full max-w-[568px]"
              name="search-bar"
              onChange={onChange}
            />
          </FormGroup>
        </FormLayout>
      </div>
    </SectionTwoCol>
  );
};
