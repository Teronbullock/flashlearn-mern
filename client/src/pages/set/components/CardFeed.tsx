import { BtnLink, Btn } from "@components/btn";
import { Card } from "@components/ui/card/Card";
import { ListCardForm } from "@components/forms";
import { useAuthContext } from "@/hooks/index";

interface CardFeed {
  cards: {
    id: string;
    term: string;
    definition: string;
    set_id: string;
  }[];
  deleteCardHandler: (
    e: React.FormEvent<HTMLFormElement>,
    cardId: string,
    setId: string,
  ) => void;
}

export const CardFeed = ({ cards, deleteCardHandler }: CardFeed) => {
  const { userSlug } = useAuthContext();

  return (
    <section className="max-h-[750px] overflow-auto">
      {cards && cards.length > 0 ? (
        cards.map((card) => {
          const { id, definition, term, set_id } = card;

          return (
            <ListCardForm
              key={id}
              title={term}
              description={definition}
              hasDescription={true}
              onSubmit={(e) => deleteCardHandler(e, id, set_id)}
            >
              <div className="flex flex-wrap justify-between">
                <div className="mb-2 flex">
                  <BtnLink
                    variants={{
                      style: "btn",
                      color: "outline-primary",
                      size: "sm",
                    }}
                    className="p-0 md:mr-6 md:p-2"
                    to={`/${userSlug}/set/${set_id}/${id}/edit`}
                  >
                    Edit Set
                  </BtnLink>
                </div>

                <Btn type="submit" className="!min-w-[39px] !justify-end !p-0">
                  <img
                    src="/assets/img/Vector.png"
                    alt="icon of trash can"
                    className="mx-auto"
                  />
                </Btn>
              </div>
            </ListCardForm>
          );
        })
      ) : (
        <Card className="bg-white">
          <p>No cards found</p>
        </Card>
      )}
    </section>
  );
};
