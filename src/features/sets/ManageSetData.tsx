import { useContext, useEffect, useState, useReducer } from "react";
import ListCardForm from "../../components/Forms/ListCardForm";
import { apiRequest } from "../../lib/api";
import { AuthContext } from "../../context/AuthContext";
import { SetDataConfig } from "../../types/user-types";


const SetReducer = (state: object, action: object) => {
  return {
    ...state,
    ...action,
  }
}

const ManageSetData = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const [state, dispatch] = useReducer(SetReducer, {
    reset: false,
  });

  // Handle set deletion
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, setId: number) => {
    e.preventDefault();
  
    const res = apiRequest({
      method: 'delete',
      url: `/api/set/${setId}/delete`,
      src: 'ManageSetData - deleteSet',
      data: {
        userId: userId,
      }
    });

    if(res) {
      const { msg, status } = res;

      if(status === 200) {
        alert(msg);
        dispatch({reset: true});
      }
    }
  }

  useEffect(() => {
    ( async () => {
      const res = await apiRequest({
        url:`/api/set/user/${userId}`,
        src: 'ManageSetData - useEffect'
      });
      const { rows, message } = res.data;

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status, message);
        return;
      } 

      setSets(rows);
      setRowCount(rows.length);

      console.log('UseEffect State-b4: ', state);
      dispatch({reset: false});

      console.log('UseEffect state-a: ', rows, state );
    })();

  },[userId, state.reset]);

  console.log('state: ', state);
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
          ID={ID}
          listType={'set'}
          to={`/set/${ID}`}
        />
      )
    })
    }
  </section>
  );
}

export default ManageSetData;