import classNames from "classnames";
import { FormLayout } from "@components/forms";
import { Btn } from "@components/btn";
import { SectionHeader } from "@components/ui/header";

interface CTASplitPageProps {
  children: React.ReactNode;
  bottomOfFormSlot?: React.ReactNode;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isProfilePage?: boolean;
  title: string;
  subTitle?: string;
  image: {
    src: string;
    alt: string;
  };
  cta: string;
}

export const CTASplitPage = ({
  handleFormSubmit,
  bottomOfFormSlot,
  image,
  title,
  subTitle,
  cta,
  children,
  isProfilePage = false,
}: CTASplitPageProps) => {
  const rightColClass = classNames("w-full md:w-[50%]", {
    "md:mt-11": !isProfilePage,
  });

  const ctaBtnSize = isProfilePage ? "md" : "full";

  return (
    <section className="max-w-8xl mb-15 container mx-auto mt-8 flex px-4 py-12">
      <div className="lg:mr-15 hidden md:mr-10 md:block md:w-[50%]">
        <img
          src={image.src}
          alt={image.alt}
          className="w-[100%] rounded-[20px]"
        />
      </div>
      <div className={rightColClass}>
        <div className="mx-auto max-w-[532px]">
          <FormLayout
            onSubmit={handleFormSubmit}
            className={{ container: "mb-7" }}
          >
            <SectionHeader
              showIcons={false}
              title={title}
              subTitle={subTitle}
              className={{ section: "mb-10", title: "!font-medium" }}
            />
            {children}
            <Btn
              type="submit"
              variants={{
                style: "btn",
                size: ctaBtnSize,
                color: "primary",
              }}
            >
              {cta}
            </Btn>
          </FormLayout>
          {bottomOfFormSlot}
        </div>
      </div>
    </section>
  );
};
