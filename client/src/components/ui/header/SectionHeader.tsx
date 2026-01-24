import classNames from "classnames";
import { BasicHeader, SectionHeaderProps } from "@components/ui/header";

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
              className="h-[24px] w-[24px] md:h-[42px] md:w-[42px]"
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
              className="h-[24px] w-[24px] md:h-[42px] md:w-[42px]"
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
