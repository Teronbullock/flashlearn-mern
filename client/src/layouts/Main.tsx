import classNames from "classnames";
import { Container } from "./Container";
import { ContainerWidth } from "./types/LayoutTypes";

interface MainProps {
  children: React.ReactNode;
  isContainer?: boolean;
  width?: ContainerWidth;
  className?: string;
}

export const Main = ({ children, className, width }: MainProps) => {
  const mainClass = classNames("md:pt-23  min-h-screen mb-20", className);

  return (
    <Container el="main" className={mainClass} width={width}>
      {children}
    </Container>
  );
};
