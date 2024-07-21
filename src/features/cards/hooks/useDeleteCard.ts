import { useContext } from "react";
import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';


export const useDeleteCard = (refreshCards) => {
  const { userId } = useAuthContext();

  const handlerDelete = async (e,  cardId: number, setId: number) => {
    e.preventDefault();
    
    if (setId && cardId) {
      const res = await apiRequest({
        method: 'delete',
        url: `/api/set/${setId}/card/${cardId}/delete`,
        src: 'ManageSetData - deleteSet',
        data: {
          id : cardId,
          setId,
        }
      });

      if (res.status === 200 && res.data?.isCardDeleted) {
        const { msg } = res.data;
        alert(msg);
        refreshCards();
      }
    }
  }

  return { handlerDelete};
}

export default useDeleteCard;