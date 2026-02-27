import { Form } from "@components/forms";
import { Btn } from "@components/btn";
import classNames from "classnames";

interface CTASplitFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ctaBtnSize?: "full" | "md" | undefined;
  cta: string;
  className?: string;
}

export const CTASplitForm = ({
  children,
  onSubmit,
  cta,
  ctaBtnSize = "full",
  className,
}: CTASplitFormProps) => {
  const formClass = classNames("mb-7", className);

  return (
    <Form onSubmit={onSubmit} className={{ container: formClass }}>
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
    </Form>
  );
};
