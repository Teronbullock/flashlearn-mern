import { Form } from "@components/form";
import { Button } from "@components/ui/button";
import classNames from "classnames";
import { type CTASplitFormProps } from "@components/layout/cta-split";

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
      <Button
        type="submit"
        variants={{
          style: "btn",
          size: ctaBtnSize,
          color: "primary",
        }}
      >
        {cta}
      </Button>
    </Form>
  );
};
