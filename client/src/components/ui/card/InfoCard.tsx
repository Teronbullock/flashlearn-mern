import { Card } from "@components/ui/card";

export interface InfoCardProps {
  id: number;
  number: string;
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
      className="border-primary bg-tertiary mr-3 min-w-[140px] p-[7px] text-black md:mr-8 md:w-[277px] md:p-2"
    >
      <h3 className="mb-4 text-lg">{number}</h3>
      <div className="flex items-center">
        <span className="mr-2 flex h-[24px] w-[24px] items-center justify-center rounded-[40px] bg-white md:h-[50px] md:w-[50px]">
          <img
            src={icon.src}
            alt={icon.alt}
            className="h-[15px] w-[15px] md:h-[19px] md:w-[19px]"
          />
        </span>
        <p className="text-xs md:text-sm">{copy}</p>
      </div>
    </Card>
  );
};
