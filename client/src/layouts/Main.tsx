import classNames from "classnames";
import { Container } from "./Container";
import { ContainerWidth } from "./types/LayoutTypes";

interface MainProps {
  children: React.ReactNode;
  width?: ContainerWidth;
  className?: string;
}

export const Main = ({ children, className, width }: MainProps) => {
  const containerClass = classNames(
    "pt-17 md:pt-27  min-h-screen mb-20",
    className,
  );

  return (
    <Container as="main" className={containerClass} width={width}>
      {children}
    </Container>
  );
};
