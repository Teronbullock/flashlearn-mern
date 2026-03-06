import classNames from "classnames";
import { ContentBlock } from "@components/ui/content-block/ContentBlock";

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
  const cardClasses = classNames("timeline-card relative flex", className);

  return (
    <div className={cardClasses} data-name={`timeline-card-${number}`}>
      {!isLast && (
        <div className="bg-primary/40 absolute left-7 top-6 h-full w-px"></div>
      )}
      <div className="h-15 w-15 relative z-10 mr-6 flex shrink-0 items-center justify-center">
        <div className="border-primary border-7 bg-light h-15 w-15 flex items-center justify-center rounded-full text-sm font-bold">
          {number}
        </div>
      </div>
      <div className="grow">
        <ContentBlock
          className={{ title: "mb-4! font-normal", copy: "font-light!" }}
          title={title}
          copy={copy}
        />
      </div>
    </div>
  );
};
