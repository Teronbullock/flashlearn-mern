import { Card } from "@components/ui/card/Card";
import { CardData } from "@/types/index/cardType";

interface CardFeedProps {
  children: (card: CardData) => React.ReactNode;
  cards: CardData[];
}

export const CardFeed = ({ children, cards }: CardFeedProps) => {
  return (
    <section className="max-h-187.5 overflow-auto">
      {cards && cards.length > 0 ? (
        cards.map((card) => <div key={card.id}>{children(card)}</div>)
      ) : (
        <Card className="bg-white">
          <p>No cards found</p>
        </Card>
      )}
    </section>
  );
};
