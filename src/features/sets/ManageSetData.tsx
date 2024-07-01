import { useContext, useEffect, useState, useReducer } from "react";
import ListCardForm from "../../components/Forms/ListCardForm";
import { apiRequest } from "../../lib/api";
import { AuthContext } from "../../context/AuthContext";
import { SetDataConfig, SetReducerInterface } from "../../types/set-types";


const SetReducer: SetReducerInterface = (state, action) => {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        isSubmitted: true,
      }
    case 'reset':
      return {
        ...state,
        isSubmitted: false,
      }
    default:
      return state;
  }
}

const ManageSetData = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState([]);
  const [state, dispatch] = useReducer(SetReducer, {
    isSubmitted: false,
  });


  // Handle set deletion
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, setId: number) => {
    e.preventDefault();
  
    const res = await apiRequest({
      method: 'delete',
      url: `/api/set/${setId}/delete`,
      src: 'ManageSetData - deleteSet',
      data: {
        userId: userId,
      }
    });

    if(res) {
      const { msg, isSetDeleted } = res.data;

      if(res.status === 200 && isSetDeleted) {
        alert(msg);
        dispatch({type: 'submit'});
      }
    } else { console.error(res.status); }
  }

  useEffect(() => {
    ( async () => {
      const res = await apiRequest({
        url:`/api/set/user/${userId}`,
        src: 'ManageSetData - useEffect'
      });

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status);
        return;
      } 

      const { rows } = res.data;
      setSets(rows);

      // Reset the state after submission
      if(state.isSubmitted) {
        dispatch({type: 'reset'});
      }
    })();

  },[userId, state.isSubmitted]);

  return (
    <section className="container py-12">
    { sets.length > 0 && sets.map((setData: SetDataConfig) => {
      const { title, description, cardCount, ID } = setData;
      
      return (
        <ListCardForm
          key={ID}
          title={title}
          description={description}
          cardCount={cardCount}
          onSubmit={handleSubmit}
          id={ID}
          listType={'set'}
          btnOneTo={`/set/${ID}`}
          btnTwoTo={`/set/${ID}/edit`}
        />
      )
    })}
  </section>
  );
}

export default ManageSetData;