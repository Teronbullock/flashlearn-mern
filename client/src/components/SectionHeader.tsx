import classNames from "classnames";

interface Props {
  header: string | undefined;
  subHeader?: string;
  className?: string;
}

export const SectionHeader = ({ header, subHeader, className }: Props) => {
  const sectionClass = classNames("mx-auto max-w-4xl", className);

  return (
    <div className={sectionClass} data-js="section-header">
      <div className="mx-auto mb-4 flex w-[60%] items-center justify-between">
        <span>
          <img src="/assets/img/star-3.svg" height="30" width="30" alt="" />
        </span>
        <h2>{header}</h2>
        <span>
          <img src="/assets/img/star-3.svg" height="30" width="30" alt="" />
        </span>
      </div>
      <p className="text-center text-base">{subHeader}</p>
    </div>
  );
};
