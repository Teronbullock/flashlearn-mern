import { useEffect, useReducer, useRef, useState } from "react";
import apiRequest from "../../../lib/api";


// const CardReducer = (state: any, action: any) => {

//   switch (action.type) {
//     case 'GET_CARDS':
//       return {
//         ...state,
//         cards: action.payload,
//       }
//     default:
//       return state;
//   }
// }

const useGetCardView = (setId: string, pageNum: number) => {
// const cards = useRef([]);
const [cards, setCards] = useState();

  // const [state, dispatch] = useReducer(CardReducer, {
  //   pageNum: 1,
  //   cards: [],
  // });

  const getCards = async () => {
    try {
      const res = await apiRequest({
        'url': `/api/set/${setId}/cards/?page=${pageNum}`,
        'src': 'useGetCardView - getCards',
      });
      if (res.status === 200 && res.data) {
        const { cards, msg } = res.data;
        return {cards, msg};
      } else {
        throw new Error('Error fetching cards', res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log('outside useEffect custom hook', cards);
  useEffect(() => {

    ( async () => {
      // cards.current = await getCards();
      setCards(await getCards());

      console.log('inside useEffect', cards);
    })();
  }, []);
  
  // console.log('the getcardview is rednering', cards);
  return( {cards, getCards}
  );
};

export default useGetCardView;