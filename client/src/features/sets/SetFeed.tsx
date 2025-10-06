import { Btn } from "@/components/Btn/Btn";
import { Card } from "@components/Card";
import { ListCardForm } from "@components/Forms/ListCardForm";

interface Sets {
  title: string;
  description?: string;
  cardCount?: number;
  id: number;
  user_id?: number;
}

interface SetFeedProps {
  sets: Sets[];
  deleteSetHandler: (
    e: React.FormEvent<HTMLFormElement>,
    setId: number,
  ) => Promise<void>;
}

export const SetFeed = ({ sets, deleteSetHandler }: SetFeedProps) => {
  return (
    <section>
      {sets && sets.length > 0
        ? sets.map((setData) => {
            const { id } = setData;
            const data = {
              ...setData,
              listType: "set",
            } as const;

            return (
              <ListCardForm
                onSubmit={(e) => deleteSetHandler(e, id)}
                key={id}
                isSetFeed={true}
                {...data}
              >
                <div className="flex flex-wrap justify-between">
                  <div className="mb-2 flex">
                    <Btn
                      el="link"
                      variants={{ style: "btn", color: "primary" }}
                      className="mr-2 p-0 md:mr-6 md:px-[1.25rem]"
                      to={`/set/${id}`}
                    >
                      View Set
                    </Btn>

                    <Btn
                      el="link"
                      variants={{ style: "btn", color: "outline-primary" }}
                      className="p-0 md:mr-6 md:px-[1.6rem]"
                      to={`/set/${id}/edit`}
                    >
                      Edit Set
                    </Btn>
                  </div>

                  <Btn
                    type="submit"
                    className="!min-w-[39px] !justify-end !p-0"
                  >
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
        : null}
    </section>
  );
};
