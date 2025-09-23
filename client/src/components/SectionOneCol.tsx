import { SectionHeader } from "@components/SectionHeader";
import classNames from "classnames";

interface DataProps {
  data: {
    header: string;
    subHeader?: string;
  };
  className?: string;
  defaultStyles?: boolean;
}

export const SectionOneCol = ({
  data,
  className,
  defaultStyles = true,
}: DataProps) => {
  const sectionClass = classNames(
    {
      "py-[3.75rem]": defaultStyles,
    },
    className,
  );

  return (
    <section className={sectionClass}>
      <SectionHeader header={data.header} subHeader={data.subHeader} />
    </section>
  );
};
