import { DashboardICard, DashboardICardProps } from "./DashboardICard";

interface DashboardProps {
  data: DashboardICardProps[];
}

export const DashboardInfo = ({ data }: DashboardProps) => {
  return (
    <section className="mb-15 overflow-auto">
      <div className="flex w-[450px] md:w-full">
        {data.map((card) => {
          return <DashboardICard {...card} />;
        })}
      </div>
    </section>
  );
};
