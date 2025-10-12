import { BtnLink } from "@components/btn";

interface EmptyFeedSectionProps {
  title: string;
  subTitle: string;
  cta: string;
  setId: string;
  userSlug: string;
}

export const EmptyFeedSection = ({
  userSlug,
  setId,
  title,
  subTitle,
  cta,
}: EmptyFeedSectionProps) => {
  return (
    <div>
      <div className="mb-10 flex justify-center">
        <img
          src="/assets/img/vector-person.webp"
          alt="cartoon of a person with an empty box in their hands"
          width="560"
          height="570"
        />
      </div>
      <h2 className="mb-2 text-center font-medium">{title}</h2>
      <p className="mb-15 text-center text-base">{subTitle}</p>
      <div className="text-center">
        <BtnLink
          to={`/${userSlug}/set/${setId}/card/add`}
          className="w-[444px] !py-3 !text-base"
          variants={{
            style: "btn",
            color: "primary",
            size: "lg",
          }}
        >
          {cta}
        </BtnLink>
      </div>
    </div>
  );
};
