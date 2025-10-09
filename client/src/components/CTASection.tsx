import { SectionTwoCol } from "@components/layout/sections/SectionTwoCol";
import {
  SectionHeader,
  SectionHeaderProps,
} from "@components/ui/header/SectionHeader";
import { BtnLink } from "@components/btn";

interface CTASectionProps {
  data: {
    img: {
      src: string;
      alt: string;
    };
    header: SectionHeaderProps;
    buttonText: string;
  };
}

export const CTASection = ({ data }: CTASectionProps) => {
  const sectionClass = {
    container: "bg-primary relative md:h-[685px] rounded-[30px]",
    inner: "md:!gap-0 flex-col-reverse md:flex-row",
  };
  return (
    <SectionTwoCol className={sectionClass}>
      <span
        className="absolute left-0 top-0 z-0 h-[121px] w-[368px] bg-[url('/assets/img/vector-4.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 z-0 h-[145px] w-[197px] bg-[url('/assets/img/vector-3.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <div className="z-10 flex items-center justify-center md:basis-[100%] lg:basis-[63%]">
        <img
          {...data.img}
          className="-left-[5%] bottom-0 h-auto w-[275px] max-w-full rounded-lg md:absolute md:w-[530px] lg:left-[9.5rem]"
        />
      </div>
      <div className="justify-left flex h-full items-center pt-12 md:pt-10">
        <div className="w-full p-6 text-white">
          <SectionHeader
            className={{
              section: "mb-12",
              title: "z-10 !mx-0 text-xl",
              subTitle: "!text-left",
            }}
            {...data.header}
            icons={false}
          />
          <BtnLink
            to="/register"
            variants={{ style: "btn", color: "white", size: "md" }}
          >
            {data.buttonText}
          </BtnLink>
        </div>
      </div>
    </SectionTwoCol>
  );
};
