import ListCardForm from "../../components/Forms/ListCardForm";
import Card from "../../components/cards/Card";
import { SetDataBase, SetsProps } from "../../types/set-types";
import ListCardFormAction from "../../components/Forms/listCardFormAction";
import useGetSets from "./hooks/useGetSets";
import useDeleteSet from "./hooks/useDeleteSet";


const SetFeed = () => {
  const { sets, refreshSets } = useGetSets();
  const { handlerDelete } = useDeleteSet(refreshSets);


  return (
    <section className="container py-12">
      { sets ? sets.map((setData: SetDataBase) => {
        const { id } = setData;
        const data = {
          ...setData,
          listType: 'set',
        } as const;
        
        return (
          <ListCardForm
            onSubmit={(e) => handlerDelete(e, id)}
            key={id}
            {...data}
          >
          <ListCardFormAction
            id={id}
            listType='set'
            btnOneTo={`/set/${id}`}
            btnTwoTo={`/set/${id}/edit`}
          />
          </ListCardForm>
        )
      }) : (
        <Card className="bg-white">
          <p>No sets found</p>
        </Card>    
      )}
    </section>
  );
};

export default SetFeed;