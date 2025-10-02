import classNames from "classnames";

export interface SectionHeaderProps {
  header: string | undefined;
  subHeader?: string;
  className?: {
    section?: string;
    header?: string;
    subHeader?: string;
  };
  icons?: boolean;
}

export const SectionHeader = ({
  header,
  subHeader,
  className,
  icons = true,
}: SectionHeaderProps) => {
  const sectionClass = classNames("mx-auto max-w-3xl ", className?.section);
  const headerClass = classNames(
    "mx-2 md:mx-8",
    {
      "text-center": icons,
    },
    className?.header,
  );
  const subHeaderClass = classNames(
    "text-center text-base",
    className?.subHeader,
  );

  return (
    <div className={sectionClass} data-js="section-header">
      <div className="mx-auto mb-4 flex items-center justify-center">
        {icons && (
          <span>
            <img
              className="h-[24px] w-[24px] md:h-[42px] md:w-[42px]"
              src="/assets/img/star-3.svg"
              height="42"
              width="42"
              alt="star-icon"
            />
          </span>
        )}
        <h2 className={headerClass}>{header}</h2>
        {icons && (
          <span>
            <img
              className="h-[24px] w-[24px] md:h-[42px] md:w-[42px]"
              src="/assets/img/star-3.svg"
              height="42"
              width="42"
              alt="star-icon"
            />
          </span>
        )}
      </div>
      <p className={subHeaderClass}>{subHeader}</p>
    </div>
  );
};
