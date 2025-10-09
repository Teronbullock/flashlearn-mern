import classNames from "classnames";
import React from "react";
import { SectionHeader } from "@components/ui/header/SectionHeader";

interface SectionTwoColProps {
  children: React.ReactNode;
  isReversed?: boolean;
  className?: {
    main?: string;
    container?: string;
    inner?: string;
  };
  header?: {
    title: string;
    subTitle?: string;
    className?: string;
  };
}

export const SectionTwoCol = ({
  children,
  className,
  isReversed = false,
  header,
}: SectionTwoColProps) => {
  const mainClassName = classNames(
    "section section-feature py-8",
    className?.main,
  );

  const containerClassName = classNames(
    "max-w-8xl mx-auto",
    className?.container,
  );

  const innerClassName = classNames(
    "flex flex-col md:items-stretch md:gap-20",
    isReversed ? "md:flex-row-reverse" : "md:flex-row",
    className?.inner,
  );

  return (
    <section className={mainClassName} data-name="section-two-col">
      <div className={containerClassName} data-name="section-two-col-container">
        {header && (
          <>
            <SectionHeader
              title={header.title}
              subTitle={header.subTitle}
              className={{ section: header.className }}
            />
          </>
        )}
        <div className={innerClassName}>{children}</div>
      </div>
    </section>
  );
};
