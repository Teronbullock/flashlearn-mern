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
        className="absolute left-0 top-0 z-0 h-[121px] w-[368px] bg-[url('/assets/img/vector-4.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 z-0 h-[145px] w-[197px] bg-[url('/assets/img/vector-3.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      />
      <div className="z-10 flex items-center justify-center md:w-[50%]">
        <img
          src={src}
          alt={alt}
          className="sm-[350px] bottom-0 h-auto w-[240px] max-w-full rounded-lg md:absolute md:-left-[2%] md:w-[530px] lg:left-[5%] lg:w-[550px]"
        />
      </div>
      <div className="justify-left md:pt-15 pt-13 flex md:w-[50%]">
        <div className="z-50 w-full px-4 py-6 text-white lg:max-w-[575px]">
          <BasicHeader
            className={{
              container: "mb-12",
              title: "z-10 !mx-0 mb-4 !text-left text-xl",
              subtitle: "!text-left",
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
