import Card from '@components/Card/Card';
import ListCardForm from '@components/Forms/ListCardForm';
import useManageSetData from '@features/sets/hooks/useManageSetData';
import Btn from '@components/Btn/Btn';

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
    <section className='container py-12'>
      {sets && sets.length > 0 ? (
        sets.map((setData: ISetData) => {
          const { id } = setData;
          const data = {
            ...setData,
            listType: 'set',
          } as const;

          return (
            <ListCardForm onSubmit={e => deleteSetHandler(e, id)} key={id} isSetFeed={true} {...data}>
              <Btn className='btn--outline-black btn--small mr-4 md:mr-6' to={`/set/${id}`} isListItem={true}>
                View Set
              </Btn>
              <Btn className='btn--outline-black btn--small mr-4 md:mr-6' to={`/set/${id}/edit`} isListItem={true}>
                Edit Set
              </Btn>
              <Btn tag='button' type='submit' className='btn--outline-black btn--small' isListItem={true}>
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
