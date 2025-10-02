import Form from "@components/Forms/Form";
import { Btn } from "@components/Btn/Btn";
import FormInput from "@components/Forms/FormInput";
import { UserState, LoginReducerAction } from "@pages/LoginPage";
import { Dispatch } from "react";
import { SectionHeader } from "@components/SectionHeader";

interface CTASplitPageProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  dispatch: Dispatch<LoginReducerAction>;
  state: UserState;
  data: {
    image: {
      src: string;
      alt: string;
    };
  };
}

export const CTASplitPage = ({
  handleFormSubmit,
  // e,
  dispatch,
  state,
  data,
}: CTASplitPageProps) => {
  const { image, header } = data;

  return (
    <section className="max-w-8xl container mx-auto mt-8 flex px-4 py-12">
      <div className="hidden w-[45%] md:mr-20 md:block">
        <img
          src={image.src}
          alt={image.alt}
          className="w-[100%] rounded-[20px]"
        />
      </div>
      <Form className="card--login-form !w-[50%]" onSubmit={handleFormSubmit}>
        <>
          <SectionHeader
            icons={false}
            {...header}
            className={{ section: "mb-10" }}
          />
          <FormInput
            labelName="Email"
            type="email"
            name="user_email"
            value={state.user_email}
            placeholder="Enter your email"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: {
                  user_email: e.target.value,
                },
              })
            }
            autoFocus={true}
          />
          <FormInput
            labelName="Password"
            type="password"
            name="user_pass"
            value={state.user_pass}
            placeholder="Enter your password"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: {
                  user_pass: e.target.value,
                },
              })
            }
          />
          {/* <Btn className="btn--large btn--tertiary text-white" type="submit">
            Login
          </Btn> */}
        </>
      </Form>
    </section>
  );
};
