import { SectionTwoCol } from "@components/layout/sections/SectionTwoCol";
import { BasicHeader, SectionHeaderProps } from "@components/ui/header";
import { BtnLink } from "@components/btn";

interface CTASectionProps extends SectionHeaderProps {
  img: {
    src: string;
    alt: string;
  };
  buttonText: string;
}

export const CTASection = ({
  title,
  subTitle,
  buttonText,
  img: { src, alt },
}: CTASectionProps) => {
  const sectionClass = {
    container: "bg-primary relative md:h-[685px] rounded-[30px]",
    inner: "md:!gap-0 flex-col-reverse md:flex-row",
  };
  return (
    <SectionTwoCol className={sectionClass}>
      <span
        className="h-30.25 w-92 absolute left-0 top-0 z-0 bg-[url('/assets/img/vector-4.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <span
        className="h-36.25 w-49.25 absolute bottom-0 right-0 z-0 bg-[url('/assets/img/vector-3.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <div className="z-10 flex items-center justify-center md:w-[50%]">
        <img
          src={src}
          alt={alt}
          className="sm-[350px] md:w-132.5 lg:w-137.5 bottom-0 h-auto w-60 max-w-full rounded-lg md:absolute md:-left-[2%] lg:left-[5%]"
        />
      </div>
      <div className="justify-left md:pt-15 pt-13 flex md:w-[50%]">
        <div className="lg:max-w-143.75 z-50 w-full px-4 py-6 text-white">
          <BasicHeader
            className={{
              container: "mb-12",
              title: "mx-0! text-left! z-10 mb-4 text-xl",
              subtitle: "text-left!",
            }}
            title={title}
            subTitle={subTitle}
          />
          <BtnLink
            to="/register"
            variants={{ style: "btn", color: "white", size: "md" }}
          >
            {buttonText}
          </BtnLink>
        </div>
      </div>
    </SectionTwoCol>
  );
};
