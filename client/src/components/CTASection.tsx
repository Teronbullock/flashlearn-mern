// import classNames from "classnames";
import { SectionTwoCol } from "@components/SectionTwoCol";
import { FormCard, FormField } from "@components/FormCard";
import { SectionHeaderProps } from "@components/SectionHeader";

interface CTASectionProps {
  data: {
    header: SectionHeaderProps;
    img: string;
    isReversed?: boolean;
    form: {
      fields: FormField[];
    };
  };
  className?: {
    main?: string;
    container?: string;
    inner?: string;
  };
}

export const CTASection = ({ data, className }: CTASectionProps) => {
  return (
    <SectionTwoCol isReversed={data.isReversed} className={className}>
      <span
        className="absolute left-0 top-0 h-[121px] w-[368px] bg-[url('/assets/img/vector-4.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 h-[145px] w-[197px] bg-[url('/assets/img/vector-3.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <div className="flex items-center justify-center md:basis-[38%]">
        <img
          src={data.img}
          alt={data.header.header}
          className="absolute bottom-0 left-[7.5rem] h-auto w-[465px] max-w-full rounded-lg"
        />
      </div>
      <div className="justify-left flex h-full items-center pt-[4rem]">
        <FormCard
          header={data.header}
          fields={data.form.fields}
          buttonText="Submit"
        />
      </div>
    </SectionTwoCol>
  );
};
