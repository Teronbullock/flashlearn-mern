import { Card } from "@components/Card";
import { RatingStars } from "@components/RatingStars";
import { SectionHeader, SectionHeaderProps } from "@components/SectionHeader";

interface TestimonialCardsProps {
  header: SectionHeaderProps;
  body: string;
}

interface TestimonialProps {
  data: {
    header: SectionHeaderProps;
    cards: TestimonialCardsProps[];
  };
}

export const Testimonials = ({ data }: TestimonialProps) => {
  const { header, cards } = data;

  return (
    <div className="max-w-8xl mx-auto mb-[2rem] py-[3.75rem]">
      <SectionHeader {...header} className={{ section: "mb-[3.75rem]" }} />
      <div className="grid grid-cols-2 grid-rows-2 gap-[24px]">
        <Card
          className="bg-light"
          slotOne={
            <>
              <SectionHeader {...cards[0].header} icons={false} />
              <RatingStars value={5} />
            </>
          }
        >
          <p className="text-center text-base">{cards[0].body}</p>
        </Card>
        <Card
          className="bg-light"
          slotOne={
            <>
              <SectionHeader {...cards[1].header} icons={false} />
              <RatingStars value={5} />
            </>
          }
        >
          <p className="text-center text-base">{cards[1].body}</p>
        </Card>
        <Card
          className="bg-light"
          slotOne={
            <>
              <SectionHeader {...cards[2].header} icons={false} />
              <RatingStars value={5} />
            </>
          }
        >
          <p className="text-center text-base">{cards[0].body}</p>
        </Card>
        <Card
          className="bg-light"
          slotOne={
            <>
              <SectionHeader {...cards[3].header} icons={false} />
              <RatingStars value={5} />
            </>
          }
        >
          <p className="text-center text-base">{cards[3].body}</p>
        </Card>
      </div>
    </div>
  );
};
