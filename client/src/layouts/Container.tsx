import React from "react";
import classNames from "classnames";
import { ContainerWidth } from "./types/LayoutTypes";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: ContainerWidth;
  as?: "div" | "section" | "main";
  isCentered?: boolean;
}

/**
 * Name: Container
 * A flexible container component to manage content width and centering.
 * @see ContainerProps
 */
export const Container = ({
  children,
  className,
  width = "wide",
  as: Tag = "div",
  isCentered = true,
}: ContainerProps) => {
  const containerClasses = classNames(
    {
      "px-4": width !== "full",
      "w-full": width === "full",
      "max-w-8xl": width === "wide",
      "max-w-[1000px]": width === "content",
      "mx-auto": isCentered,
    },
    className,
  );

  return <Tag className={containerClasses}>{children}</Tag>;
};
