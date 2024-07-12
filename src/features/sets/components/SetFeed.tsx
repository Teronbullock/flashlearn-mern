
import Card from '../../../components/cards/Card';
import ListCardForm from '../../../components/Forms/ListCardForm';
import { SetDataBase } from '../../../types/set-types';
import useDeleteSet from '../hooks/useDeleteSet';
import useGetSets from '../hooks/useGetSets';
import ListItemBtn from '../../../components/Btn/ListItemBtn';


const SetFeed = () => {
  const { sets, refreshSets } = useGetSets();
  const { handlerDelete } = useDeleteSet(refreshSets);

  return (
    <section className='container py-12'>
      {sets && sets.length > 0 ? (
        sets.map((setData: SetDataBase) => {
          const { id } = setData;
          const data = {
            ...setData,
            listType: 'set',
          } as const;

          
          return (
            <ListCardForm
              onSubmit={e => handlerDelete(e, id)}
              key={id}
              {...data}
            >
              <ListItemBtn
                className='btn--outline-black btn--medium mr-6'
                to={`/set/${id}`}
              >
                View
              </ListItemBtn>
              <ListItemBtn
                className='btn--outline-black btn--medium mr-6'
                to={`/set/${id}/edit`}
              >
                Edit
              </ListItemBtn>
            </ListCardForm>
          );
        })
      ) : (
        <Card className='bg-white'>
          <p>No sets found</p>
        </Card>
      )}
    </section>
  );
};

export default SetFeed;
