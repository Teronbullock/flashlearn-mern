import classNames from "classnames";
import { Btn, BtnLink } from "@components/btn";

type FormActionProps = {
  submitBtnText: string;
  cancelBtnTo: string;
  className?: string;
};

/**
 *  -- FormAction Component --
 * FormAction component is used to render the form action buttons.
 *
 *
 * @param param0
 * @returns
 */
export const FormAction = ({
  submitBtnText,
  cancelBtnTo,
  className,
}: FormActionProps) => {
  return (
    <div className={classNames("form__action flex", className)}>
      <Btn
        className="md:mr-7"
        type="submit"
        variants={{ style: "btn", color: "primary", size: "lg" }}
      >
        {submitBtnText}
      </Btn>
      <BtnLink
        variants={{ style: "btn", color: "outline-black", size: "lg" }}
        to={cancelBtnTo}
      >
        Cancel
      </BtnLink>
    </div>
  );
};
