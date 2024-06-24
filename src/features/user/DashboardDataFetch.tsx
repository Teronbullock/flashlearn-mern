import { useContext, useEffect, useState } from "react";
import ListCardForm from "../../components/Forms/ListCardForm";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { SetDataConfig } from "../../types/user-types";


const DashboardDataFetch = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('delete set from dashboardPage');
  }

  useEffect(() => {
    ( async () => {
      const res = await axios.get(`/api/set/user/${userId}`);
      const { rows, message } = res.data;

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status, message);
        return;
      } 

      setSets(rows);
      setRowCount(rows.length);
    })();

  },[userId]);

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

export default DashboardDataFetch;