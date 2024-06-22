import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components-layouts/PageComponents/PageTemplate";
import CardListForm from "../components/Forms/CardListForm";
import { SetCardData } from "./routes-types";
import axios from "axios";


const Set = () => {
  const { setId } = useParams();
  const [cards, setCards] = useState([]);

  console.log('Set ID:', setId);
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
      console.log(`Res: `, cards, message);
    
    })();

  },[setId]);

  return (
    <PageTemplate 
      currentPage="setPage"
    >
      <section className="container py-12">
        { cards.length > 0 && cards.map((card: SetCardData, index) => {
          return (
            <CardListForm formData={card} key={index} />
          ) 
        })}
      </section>
    </PageTemplate>
  )
}

export default Set;