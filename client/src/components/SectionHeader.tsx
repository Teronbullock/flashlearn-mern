import classNames from "classnames";

export interface SectionHeaderProps {
  header: string | undefined;
  subHeader?: string;
  className?: string;
  icons?: boolean;
}

export const SectionHeader = ({
  header,
  subHeader,
  className,
  icons = true,
}: SectionHeaderProps) => {
  const sectionClass = classNames("mx-auto max-w-3xl ", className);

  return (
    <div className={sectionClass} data-js="section-header">
      <div className="mx-auto mb-4 flex items-center justify-center">
        {icons && (
          <span>
            <img
              src="/assets/img/star-3.svg"
              height="42"
              width="42"
              alt="star-icon"
            />
          </span>
        )}
        <h2 className="mx-[2rem]">{header}</h2>
        {icons && (
          <span>
            <img
              src="/assets/img/star-3.svg"
              height="42"
              width="42"
              alt="star-icon"
            />
          </span>
        )}
      </div>
      <p className="text-center text-base">{subHeader}</p>
    </div>
  );
};
