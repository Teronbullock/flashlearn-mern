import { useEffect, useState } from "react";

import apiRequest from "../../../lib/api";


const useGetCardView = (setId: string | undefined, pageNum: string | null) => {
const [card, setCard] = useState();
const [cardCount, setCardCount] = useState(0);
  
  useEffect(() => {
    ( async () => {
      try {
        const res = await apiRequest({
          'url': `/api/set/${setId}/cards/?page=${pageNum}`,
          'src': 'useGetCardView - getCards',
        });

        if (res.status === 200 && res.data) {
          const { card, count } = res.data;
          setCard(card);
          setCardCount(count);
        } else {
          throw new Error(`Error fetching cards ${res.status}`, );
        }
      } catch (error) {
        console.log(error);
      }

    })();
  }, [pageNum]);

  
  return( {card, cardCount}
  );
};

export default useGetCardView;