import { InfoCard, InfoCardProps } from "@components/ui/card";

interface InfoCardSectionProps {
  data: InfoCardProps[];
}

export const InfoSection = ({ data }: InfoCardSectionProps) => {
  return (
    <section className="mb-12 overflow-auto">
      <div className="flex w-[450px] md:w-full">
        {data.map((card) => {
          return <InfoCard {...card} />;
        })}
      </div>
    </section>
  );
};
