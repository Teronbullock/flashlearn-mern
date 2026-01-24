import { FormLayout } from "@components/forms";
import { Btn } from "@components/btn";

interface CTASplitFormProps {
  children: React.ReactNode;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ctaBtnSize?: "full" | "md" | undefined;
  cta: string;
}

export const CTASplitForm = ({
  children,
  handleFormSubmit,
  cta,
  ctaBtnSize = "full",
}: CTASplitFormProps) => {
  return (
    <FormLayout onSubmit={handleFormSubmit} className={{ container: "mb-7" }}>
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
  );
};
