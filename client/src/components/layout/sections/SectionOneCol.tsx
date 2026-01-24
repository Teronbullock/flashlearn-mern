import { SectionHeader } from "@components/ui/header/SectionHeader";
import classNames from "classnames";

interface DataProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export const SectionOneCol = ({ title, subTitle, className }: DataProps) => {
  const sectionClass = classNames("py-8 md:py-15", className);

  return (
    <section className={sectionClass} data-name="one-col">
      <SectionHeader title={title} subTitle={subTitle} />
    </section>
  );
};
