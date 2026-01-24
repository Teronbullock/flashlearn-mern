import { Card } from "@components/ui/card/Card";
import { RatingStars } from "@components/RatingStars";
import { SectionHeader, BasicHeader } from "@components/ui/header";

interface TestimonialProps {
  title: string;
  subTitle: string;
  cards: Array<{
    id: number;
    rating: number;
    body: string;
    title: string;
    subTitle: string;
  }>;
}

export const Testimonials = ({ title, subTitle, cards }: TestimonialProps) => {
  return (
    <section
      className="max-w-8xl md:mb-30 py-15 mx-auto px-4"
      data-name="Testimonials"
    >
      <SectionHeader
        title={title}
        subTitle={subTitle}
        className={{ section: "mb-15" }}
      />
      <div className="grid grid-cols-1 grid-rows-2 gap-6 md:grid-cols-2">
        {cards.map((card) => {
          return (
            <Card key={card.id} className="bg-light" border={false}>
              <BasicHeader
                title={card.title}
                subTitle={card.subTitle}
                as="h3"
                className={{ title: "text-center", subtitle: "text-center" }}
              />
              <RatingStars value={card.rating} />
              <p className="text-center text-base">{card.body}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
