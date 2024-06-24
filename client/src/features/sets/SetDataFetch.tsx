import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListCardForm from "../../components/Forms/ListCardForm";
import { CardDataConfig } from "../../types/user-types";


const SetDataFetch = () => {
  const { setId } = useParams();
  const [cards, setCards] = useState([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('delete set from set page');
  }

  useEffect(() => {
    ( async () => {
      const res = await axios.get(`/api/set/${setId}`);

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status);
        return;
      } 

      const { cards, message } = res.data;
      setCards(cards);
    })();

  },[setId]);
  return (
    <section className="container py-12">
    { cards.length > 0 && cards.map((card: CardDataConfig, index) => {
      const { 
        ID,
        card_definition,
        card_term,
        user_id,
      } = card;

      return (
        <ListCardForm 
          key={index} 
          title={card_term}
          description={card_definition}
          onSubmit={handleSubmit}
          to={`/set/${user_id}/card/${ID}/edit`}
        />
      ) 
    })}
  </section>
  );
}

export default SetDataFetch;