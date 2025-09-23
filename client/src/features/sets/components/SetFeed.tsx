import { Btn } from "@/components/Btn/Btn";
import Card from "@components/Card/Card";
import { ListCardForm } from "@components/Forms/ListCardForm";
import useManageSetData from "@features/sets/hooks/useManageSetData";

interface ISetData {
  title: string;
  description?: string;
  cardCount?: number;
  id: number;
  user_id?: number;
}

const SetFeed = () => {
  const { sets, deleteSetHandler } = useManageSetData({ isGetSets: true });

  return (
    <section className="container py-12">
      {sets && sets.length > 0 ? (
        sets.map((setData: ISetData) => {
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
              <li>
                <Btn
                  el="link"
                  variants={{ style: "btn" }}
                  className="btn--outline-black btn--small mr-4 md:mr-6"
                  to={`/set/${id}`}
                >
                  View Set
                </Btn>
              </li>
              <li>
                <Btn
                  el="link"
                  variants={{ style: "btn" }}
                  className="btn--outline-black btn--small mr-4 md:mr-6"
                  to={`/set/${id}/edit`}
                >
                  Edit Set
                </Btn>
              </li>
              <li>
                <Btn type="submit" className="btn--outline-black btn--small">
                  Delete Set
                </Btn>
              </li>
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

export default SetFeed;
