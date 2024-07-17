import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import apiRequest from '../../../lib/api';


const useGetsCards = () => {
  const { setId } = useParams();
  const [cards, setCards] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);


  useEffect(() => {
    if (setId) {
      ( async () => {
        try {
          const res = await apiRequest({
            url:`/api/set/${setId}`,
            src: 'useGetCards - useEffect'
          });
    
          if (res !== undefined && res.data) {
            const { cards } = res.data;
            setCards(cards);
          }
        } catch (error) {
          console.error(error.response.data.msg, error);
        }
      })();
    }
  }, [setId, refreshCounter]);
  
  const refreshCards = () => {setRefreshCounter(prev => prev + 1)};
  console.log('useGetsCards - cards: ', cards);
  return {cards, refreshCards};
}

export default useGetsCards;