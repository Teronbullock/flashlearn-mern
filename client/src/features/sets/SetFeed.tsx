import { Btn } from "@/components/Btn/Btn";
import { Card } from "@components/Card";
import { ListCardForm } from "@components/Forms/ListCardForm";
import useManageSetData from "@features/sets/hooks/useManageSetData";

interface SetDataProps {
  title: string;
  description?: string;
  cardCount?: number;
  id: number;
  user_id?: number;
}

export const SetFeed = () => {
  const { sets, deleteSetHandler } = useManageSetData({ isGetSets: true });

  return (
    <section>
      {sets && sets.length > 0 ? (
        sets.map((setData: SetDataProps) => {
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
              <ul className="flex justify-between">
                <div className="flex">
                  <li>
                    <Btn
                      el="link"
                      variants={{ style: "btn", color: "primary" }}
                      className="mr-4 px-[1.25rem] md:mr-6"
                      to={`/set/${id}`}
                    >
                      View Set
                    </Btn>
                  </li>
                  <li>
                    <Btn
                      el="link"
                      variants={{ style: "btn", color: "outline-primary" }}
                      className="mr-4 px-[1.6rem] md:mr-6"
                      to={`/set/${id}/edit`}
                    >
                      Edit Set
                    </Btn>
                  </li>
                </div>
                <li>
                  <Btn type="submit" className="!justify-end !p-0">
                    <img src="/assets/img/Vector.png" alt="icon of trash can" />
                  </Btn>
                </li>
              </ul>
            </ListCardForm>
          );
        })
      ) : (
        <Card className="bg-white">
          <p>No sets found</p>
        </Card>
      )}
    </section>
  );
};
