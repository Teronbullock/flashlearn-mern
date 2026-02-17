import { SectionTwoCol } from "@components/layout/sections/SectionTwoCol";
import { TimelineCard, TimelineCardProps } from "@components/TimelineCard";

interface TwoColTimelineProps {
  title: string;
  cards: TimelineCardProps[];
}

export function TwoColTimeline({ title, cards }: TwoColTimelineProps) {
  return (
    <SectionTwoCol
      className={{
        container: "bg-light mb-15 rounded-[20px] p-8",
      }}
      header={{
        title: title,
        className: "mb-[5rem]",
      }}
    >
      <div
        className="mb-16 justify-items-center px-[15%] md:mb-8 md:basis-[50%] md:px-0"
        data-name="section-two-col-left"
      >
        <div>
          <img
            src="assets/img/woman-with-tablet.webp"
            alt=""
            className="border-primary rotate-11 md:max-w-112.5 w-full rounded-[20px] border"
          />
        </div>
        <div>
          <img
            src="assets/img/student-with-a-book.webp"
            alt=""
            className="border-primary -rotate-11 md:max-w-112.5 w-full rounded-[20px] border"
          />
        </div>
      </div>
      <div className="md:pt-16" data-name="section-two-col-right">
        {cards.map((card, index) => {
          const isLast = index === cards.length - 1;
          const cardClassName = isLast ? undefined : "pb-[6.75rem]";

          return (
            <TimelineCard
              key={card.number}
              {...card}
              className={cardClassName}
              isLast={isLast}
            />
          );
        })}
      </div>
    </SectionTwoCol>
  );
}
