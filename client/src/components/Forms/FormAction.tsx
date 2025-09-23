import classNames from "classnames";
import { Btn } from "@components/Btn/Btn";

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
function FormAction({
  submitBtnText,
  cancelBtnTo,
  className,
}: FormActionProps) {
  return (
    <div className={classNames("form__action flex", className)}>
      <span className="w-1/2 md:w-1/4">
        <Btn className="btn--large btn--tertiary text-white" type="submit">
          {submitBtnText}
        </Btn>
      </span>
      <span className="w-1/2 md:w-1/4">
        <Btn
          el="link"
          variants={{ style: "btn" }}
          className="btn--large btn--outline-black"
          to={cancelBtnTo}
        >
          Cancel
        </Btn>
      </span>
    </div>
  );
}

export default FormAction;
