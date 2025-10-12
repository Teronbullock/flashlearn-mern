import React from "react";
import classNames from "classnames";
import { ContainerWidth } from "./types/LayoutTypes";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: ContainerWidth;
  el?: "div" | "section" | "main";
}

/**
 * Name: Container
 * A flexible container component to manage content width and centering.
 *
 * @see ContainerProps
 */
export const Container = ({
  children,
  className,
  width = "wide",
  el: Tag = "div",
}: ContainerProps) => {
  const containerClasses = classNames(
    "mx-auto px-4",
    {
      "w-full": width === "full",
      "max-w-8xl": width === "wide",
      "max-w-[1000px]": width === "content",
    },
    className,
  );

  return <Tag className={containerClasses}>{children}</Tag>;
};
