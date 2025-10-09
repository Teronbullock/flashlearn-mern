import { BasicHeader } from "@components/ui/header";
import classNames from "classnames";

interface InnerPageHeaderProps {
  className?: string;
  children?: React.ReactNode;
  data: {
    title: string;
    subTitle?: string;
  };
}

export const InnerPageHeader = ({
  data,
  children,
  className,
}: InnerPageHeaderProps) => {
  const containerClass = classNames(
    "mb-10 flex items-end justify-between",
    className,
  );

  return (
    <header className={containerClass}>
      <BasicHeader {...data} />
      {children}
    </header>
  );
};

// components/PageHeader/PageHeader.tsx

// import { BasicHeader } from "@components/ui/BasicHeader";
// import classNames from "classnames";
// import React from "react";

// // 1. Define the props for the main component
// interface PageHeaderProps {
//   className?: string;
//   children: React.ReactNode; // Now explicitly requires children
// }

// // 2. Define the props for the Title sub-component
// interface PageHeaderTitleProps {
//   data: {
//     title: string;
//     subTitle?: string;
//   };
// }

// const PageHeaderTitle = ({ data }: PageHeaderTitleProps) => {
//   return <BasicHeader {...data} />;
// };

// const PageHeaderActions = ({ children }: { children: React.ReactNode }) => {
//   return <div className="flex items-end">{children}</div>;
// };

// export const PageHeader = ({ children, className }: PageHeaderProps) => {
//   const containerClass = classNames(
//     "mb-10 flex items-end justify-between", // Controls the main layout
//     className,
//   );

//   // 4. Render the structure
//   return <header className={containerClass}>{children}</header>;
// };

// // 5. Attach the sub-components to the main component for the Compound Pattern
// PageHeader.Title = PageHeaderTitle;
// PageHeader.Actions = PageHeaderActions;
