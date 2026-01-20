import { InfoCard, InfoCardProps } from "@components/ui/card";

interface InfoCardSectionProps {
  data: InfoCardProps[];
}

export const InfoSection = ({ data }: InfoCardSectionProps) => {
  return (
    <section className="mb-12 overflow-auto">
      <div className="w-112.5 flex md:w-full">
        {data.map((card) => {
          return <InfoCard key={card.id} {...card} />;
        })}
      </div>
    </section>
  );
};
