import { Card } from "@components/ui/card";

export interface InfoCardProps {
  id: number;
  number: number | string | undefined;
  copy: string;
  icon: {
    src: string;
    alt: string;
  };
}

export const InfoCard = ({ number, icon, copy }: InfoCardProps) => {
  return (
    <Card
      spacing={false}
      className="border-primary bg-tertiary min-w-35 p-1.75 md:w-69.25 mr-3 text-black md:mr-8 md:p-2"
    >
      <h3 className="mb-4 text-lg">{number}</h3>
      <div className="flex items-center">
        <span className="md:w-12.5 md:h-12.5 mr-2 flex h-6 w-6 items-center justify-center rounded-[40px] bg-white">
          <img
            src={icon.src}
            alt={icon.alt}
            className="h-3.75 w-3.75 md:h-4.75 md:w-4.75"
          />
        </span>
        <p className="text-xs md:text-sm">{copy}</p>
      </div>
    </Card>
  );
};
