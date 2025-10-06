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
    <section>
      <h2 className="mb-2 font-semibold">{title}</h2>
      <div className="mb-10 flex flex-col justify-between md:flex-row">
        <div className="md:flex-2">
          <h3 className="mb-8 text-base md:mb-0">{copy}</h3>
        </div>
        <FormLayout className={{ container: "md:flex-1" }} onSubmit={onSubmit}>
          <FormGroup name="search-bar" className={{ group: "relative" }}>
            <img
              src="/assets/img/Vector-finder.png"
              alt="icon of a magnifying glass"
              width="19px"
              height="19px"
              className="absolute left-4 top-[35%]"
            />
            <FormInput
              className="bg-light w-full max-w-[568px] !py-[0.55rem] !pl-11 placeholder:text-sm"
              name="search-bar"
              onChange={onChange}
              placeholder="Search for sets"
            />
          </FormGroup>
        </FormLayout>
      </div>
    </section>
  );
};
