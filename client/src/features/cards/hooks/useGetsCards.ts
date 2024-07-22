import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';


const useGetsCards = () => {
  const { setId } = useParams();
  const [cards, setCards] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { token } = useAuthContext();


  useEffect(() => {
    if (setId) {
      ( async () => {
        try {
          const res = await apiRequest({
            url:`/api/set/${setId}`,
            src: 'useGetCards - useEffect',
            data: {headers: { 'Authorization': `Bearer ${token}` }}
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