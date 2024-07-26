import Card from '../../../components/Card/Card';
import ListCardForm from '../../../components/Forms/ListCardForm';
import useDeleteSet from '../hooks/useDeleteSet';
import useGetSets from '../hooks/useGetSets';
import Btn from '../../../components/Btn/Btn';

interface SetDataBase {
  title: string;
  description?: string;
  cardCount?: number;
  id: number;
  user_id?: number;
}

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
              <Btn
                className='btn--outline-black btn--medium mr-6'
                to={`/set/${id}`}
                isListItem={true}
              >
                View
              </Btn>
              <Btn
                className='btn--outline-black btn--medium mr-6'
                to={`/set/${id}/edit`}
                isListItem={true}
              >
                Edit
              </Btn>
              <Btn
                tag='button'
                type='submit'
                className='btn--outline-black btn--medium'
                isListItem={true}
              >
                Delete Set
              </Btn>
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
