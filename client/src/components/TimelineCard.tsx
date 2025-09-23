import classNames from "classnames";
import { ContentBlock } from "@components/ContentBlock";

interface TimelineCardProps {
  number: number;
  title: string;
  copy: string;
  isLast?: boolean;
}

export const TimelineCard = ({
  number,
  title,
  copy,
  isLast,
}: TimelineCardProps) => {
  const cardClasses = classNames("timeline-card", {
    last: isLast,
  });

  return (
    <div className="relative mb-8 flex">
      <div className="relative z-10 mr-6 flex h-6 w-6 flex-shrink-0 items-center justify-center">
        {!isLast && (
          <div className="bg-primary absolute left-3 top-6 h-full w-0.5"></div>
        )}
        <div className="border-primary flex h-[67px] w-[67px] items-center justify-center rounded-full border-2 text-sm font-bold text-black">
          {number}
        </div>
      </div>
      <div className="flex-grow">
        <ContentBlock title={title} copy={copy} />
      </div>
    </div>
  );
};
