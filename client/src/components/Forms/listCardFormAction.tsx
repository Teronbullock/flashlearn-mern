import Btn from '../../components/Btn/Btn';


const ListCardFormAction = ({
  btnOneTo,
  listType,
  btnTwoTo,
  id 
}) => {
  return (
    <div className='card__action mb-3 flex'>
      {btnOneTo && (
        <Btn
          className='btn--medium btn--outline-black mr-3'
          to={btnOneTo} // ariaLabel='view set'
          elementType='anchor'
        >
          {listType === 'set' ? 'View' : 'Edit Card'}
        </Btn>
      )}
      {btnTwoTo && (
        <Btn className='btn--medium btn--outline-dark-shade mr-3' to={btnTwoTo}>
          Edit
        </Btn>
      )}
      <input type='hidden' name='set_id' value={id} />
      <input type='hidden' name='_method' value='DELETE' />
      <Btn
        className='btn--medium btn--outline-dark-shade'
        dataType='submit'
        ariaLabel='delete set'
        elementType='btn'
      >
        Delete
      </Btn>
    </div>
  );
}

export default ListCardFormAction;