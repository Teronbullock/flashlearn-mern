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
        className="mb-[4rem] justify-items-center md:mb-[2rem] md:basis-[50%]"
        data-js="section-two-col-left"
      >
        <div className="border-primary rotate-11 h-[350px] w-[400px] rounded-[20px] border bg-[url(assets/img/woman-with-tablet.webp)] bg-no-repeat"></div>
        <div className="border-primary -rotate-11 h-[350px] w-[400px] rounded-[20px] border bg-[url(assets/img/student-with-a-book.webp)] bg-cover bg-no-repeat"></div>
      </div>
      <div className="md:pt-[4rem]" data-js="section-two-col-right">
        <TimelineCard {...data.cardOne} className="pb-[6.75rem]" />
        <TimelineCard {...data.cardTwo} className="pb-[6.75rem]" />
        <TimelineCard isLast {...data.cardThree} />
      </div>
    </SectionTwoCol>
  );
}
