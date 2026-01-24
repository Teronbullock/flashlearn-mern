import { BtnLink } from "@components/btn";

interface EmptyPageStateProps {
  title: string;
  subTitle?: string;
  cta: string;
  ctaURL?: string;
  img: {
    src: string;
    alt: string;
  };
}

export const EmptyPageState = ({
  title,
  subTitle,
  cta,
  ctaURL,
  img,
}: EmptyPageStateProps) => {
  return (
    <div>
      <div className="mb-10 flex justify-center md:mt-3">
        <img src={img.src} alt={img.alt} width="360" height="360" />
      </div>
      <h2 className="mb-2 text-center font-medium">{title}</h2>
      <p className="mb-15 text-center text-base">{subTitle}</p>
      <div className="flex text-center">
        <BtnLink
          to={ctaURL ?? " "}
          className="w-111 py-3! text-base!"
          variants={{ style: "btn", color: "primary", size: "lg" }}
        >
          {cta}
        </BtnLink>
      </div>
    </div>
  );
};
