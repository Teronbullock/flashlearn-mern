import { Dispatch } from "react";
import classNames from "classnames";
import { Form } from "@components/Forms/Form";
import { Btn } from "@components/Btn/Btn";
import { UserState, LoginReducerAction } from "@pages/LoginPage";
import { SectionHeader } from "@components/SectionHeader";

interface CTASplitPageProps {
  children: React.ReactNode;
  bottomOfFormSlot?: React.ReactNode;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  dispatch: Dispatch<LoginReducerAction>;
  state: UserState;
  isProfilePage?: boolean;
  data: {
    header: {
      header: string;
      subHeader?: string;
    };
    image: {
      src: string;
      alt: string;
    };
    cta: string;
  };
}

export const CTASplitPage = ({
  handleFormSubmit,
  bottomOfFormSlot,
  data,
  children,
  isProfilePage = false,
}: CTASplitPageProps) => {
  const { image, header, cta } = data;

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
          <Form
            onSubmit={handleFormSubmit}
            card={false}
            className={{ container: "mb-7" }}
          >
            <SectionHeader
              icons={false}
              {...header}
              className={{ section: "mb-10" }}
            />
            {children}
            <Btn
              type="submit"
              variants={{
                size: ctaBtnSize,
                color: "primary",
              }}
            >
              {cta}
            </Btn>
          </Form>
          {bottomOfFormSlot}
        </div>
      </div>
    </section>
  );
};
