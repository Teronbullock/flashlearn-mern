import classNames from "classnames";
import { ContentBlock } from "@components/ContentBlock";

export interface TimelineCardProps {
  number: string;
  title: string;
  copy: string;
  isLast?: boolean;
  className?: string;
}

export const TimelineCard = ({
  number,
  title,
  copy,
  isLast,
  className,
}: TimelineCardProps) => {
  const cardClasses = classNames(
    "timeline-card relative flex",
    {
      last: isLast,
    },
    className,
  );

  return (
    <div className={cardClasses} data-js={`timeline-card-${number}`}>
      {!isLast && (
        <div className="bg-primary/40 absolute left-7 top-6 h-full w-[1px]"></div>
      )}
      <div className="relative z-10 mr-6 flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center">
        <div className="border-primary border-7 bg-light flex h-[60px] w-[60px] items-center justify-center rounded-full text-sm font-bold">
          {number}
        </div>
      </div>
      <div className="flex-grow">
        <ContentBlock
          className={{ title: "!mb-4 font-normal", copy: "!font-light" }}
          title={title}
          copy={copy}
        />
      </div>
    </div>
  );
};
