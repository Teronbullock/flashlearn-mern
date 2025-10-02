import classNames from "classnames";

interface ContentBlockProps {
  title: string;
  copy: string;
  headingLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
  className?: {
    main?: string;
    title?: string;
    copy?: string;
  };
}

export const ContentBlock = ({
  title,
  copy,
  headingLevel = "h2",
  children,
  className,
}: ContentBlockProps) => {
  const HeadingTag = headingLevel;

  const mainClasses = classNames(className?.main);
  const titleClasses = classNames("mb-3", className?.title);
  const copyClasses = classNames(
    "text-base font-normal md:pb-5",
    className?.copy,
  );

  return (
    <div className={mainClasses} data-js="content-block">
      <HeadingTag className={titleClasses} data-js="content-block-title">
        {title}
      </HeadingTag>
      <p className={copyClasses} data-js="content-block-copy">
        {copy}
      </p>
      {children}
    </div>
  );
};
