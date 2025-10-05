import { Card } from "@components/Card";
import { RatingStars } from "@components/RatingStars";
import { SectionHeader, SectionHeaderProps } from "@components/SectionHeader";

interface TestimonialCardsProps {
  id: number;
  rating: number;
  header: SectionHeaderProps;
  body: string;
}

interface TestimonialProps {
  header: SectionHeaderProps;
  cards: TestimonialCardsProps[];
}

export const Testimonials = ({ header, cards }: TestimonialProps) => {
  return (
    <div className="max-w-8xl mx-auto mb-[2rem] px-4 py-[3.75rem]">
      <SectionHeader {...header} className={{ section: "mb-[3.75rem]" }} />
      <div className="grid grid-cols-1 grid-rows-2 gap-[24px] md:grid-cols-2">
        {cards.map((card) => {
          return (
            <Card key={card.id} className="bg-light" border={false}>
              <SectionHeader {...card.header} icons={false} />
              <RatingStars value={card.rating} />
              <p className="text-center text-base">{card.body}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
