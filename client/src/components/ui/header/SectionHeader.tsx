import classNames from "classnames";
import type { SectionHeaderProps } from "@components/ui/header/types";
import { BasicHeader } from "@components/ui/header/BasicHeader";

export const SectionHeader = ({
  title,
  subTitle,
  className,
  showIcons = true,
}: SectionHeaderProps) => {
  const sectionClass = classNames("mx-auto max-w-3xl ", className?.section);
  const basicTitleClass = classNames(
    "mx-2 md:mx-8",
    { "text-center": showIcons },
    className?.title,
  );
  const basicSubTitleClass = classNames(
    "text-center text-base",
    className?.subtitle,
  );

  const titleClassObj = {
    title: basicTitleClass,
    subTitle: basicSubTitleClass,
  };

  return (
    <div className={sectionClass} data-name="section-header">
      <div className="mx-auto mb-4 flex items-center justify-center">
        {showIcons && (
          <span>
            <img
              className="md:h-10.5 md:w-10.5 h-6 w-6"
              src="/assets/img/star-3.svg"
              height="42"
              width="42"
              alt="star-icon"
            />
          </span>
        )}
        <BasicHeader className={titleClassObj} title={title} />
        {showIcons && (
          <span>
            <img
              className="md:h-10.5 md:w-10.5 h-6 w-6"
              src="/assets/img/star-3.svg"
              height="42"
              width="42"
              alt="star-icon"
            />
          </span>
        )}
      </div>
      {subTitle && <p className={basicSubTitleClass}>{subTitle}</p>}
    </div>
  );
};
