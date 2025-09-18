import Card from "@components/Card/Card";
import { ListCardForm } from "@components/Forms/ListCardForm";
import useManageSetData from "@features/sets/hooks/useManageSetData";
import { ListItemLink } from "@components/ListItemLink/ListItemLink";
import { ListLinkBtn } from "@components/ListLinkBtn/ListLinkBtn";

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
              <ListItemLink
                className="btn--outline-black btn--small mr-4 md:mr-6"
                to={`/set/${id}`}
              >
                View Set
              </ListItemLink>
              <ListItemLink
                className="btn--outline-black btn--small mr-4 md:mr-6"
                to={`/set/${id}/edit`}
              >
                Edit Set
              </ListItemLink>
              <ListLinkBtn
                type="submit"
                className="btn--outline-black btn--small"
              >
                Delete Set
              </ListLinkBtn>
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
