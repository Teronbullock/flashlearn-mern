import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';

interface Card {
  id: string;
  term: string;
  definition: string;
  set_id: string;
}


const useGetsCards = () => {
  const { setId } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { token } = useAuthContext();


  useEffect(() => {
    if (setId) {
      ( async () => {
        try {
          const res = await apiRequest({
            url:`/api/set/${setId}`,
            src: 'useGetCards - useEffect',
            config: {headers: { 'Authorization': `Bearer ${token}` }}
          });
    
          if ((res.status >= 200 && res.status < 300) && (res && res.data)) {
            const { cards } = res.data;
            setCards(cards);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [setId, refreshCounter, token]);
  
  const refreshCards = () => {setRefreshCounter(prev => prev + 1)};

  return {cards, refreshCards};
}

export default useGetsCards;