import { Form } from "@components/Forms/Form";
import { Btn } from "@components/Btn/Btn";
import { UserState, LoginReducerAction } from "@pages/LoginPage";
import { Dispatch } from "react";
import { SectionHeader } from "@components/SectionHeader";

interface CTASplitPageProps {
  children: React.ReactNode;
  bottomOfFormSlot?: React.ReactNode;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  dispatch: Dispatch<LoginReducerAction>;
  state: UserState;
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
}: CTASplitPageProps) => {
  const { image, header, cta } = data;

  return (
    <section className="max-w-8xl mb-15 container mx-auto mt-8 flex px-4 py-12">
      <div className="hidden md:block md:w-[50%]">
        <img
          src={image.src}
          alt={image.alt}
          className="w-[100%] rounded-[20px]"
        />
      </div>
      <div className="w-full md:mt-11 md:w-[50%]">
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
                size: "full",
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
