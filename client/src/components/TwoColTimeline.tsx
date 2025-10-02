import { SectionTwoCol } from "@components/SectionTwoCol";
import { TimelineCard, TimelineCardProps } from "@components/TimelineCard";

interface TwoColTimelineProps {
  data: {
    header: string;
    cardOne: TimelineCardProps;
    cardTwo: TimelineCardProps;
    cardThree: TimelineCardProps;
  };
}

export function TwoColTimeline({ data }: TwoColTimelineProps) {
  return (
    <SectionTwoCol
      className={{
        container: "bg-light mb-[3.75rem] rounded-[20px] p-8",
      }}
      header={{
        title: data.header,
        className: "mb-[5rem]",
      }}
    >
      <div
        className="mb-[4rem] justify-items-center px-[15%] md:mb-[2rem] md:basis-[50%] md:px-0"
        data-js="section-two-col-left"
      >
        <div>
          <img
            src="assets/img/woman-with-tablet.webp"
            alt=""
            className="border-primary rotate-11 w-[100%] rounded-[20px] border md:max-w-[450px]"
          />
        </div>
        <div>
          <img
            src="assets/img/student-with-a-book.webp"
            alt=""
            className="border-primary -rotate-11 w-[100%] rounded-[20px] border md:max-w-[450px]"
          />
        </div>
      </div>
      <div className="md:pt-[4rem]" data-js="section-two-col-right">
        <TimelineCard {...data.cardOne} className="pb-[6.75rem]" />
        <TimelineCard {...data.cardTwo} className="pb-[6.75rem]" />
        <TimelineCard isLast {...data.cardThree} />
      </div>
    </SectionTwoCol>
  );
}
