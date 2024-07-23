import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';


export const useDeleteCard = (refreshCards: () => void) => {
  const { token } = useAuthContext();

  const handlerDelete = async (e: React.FormEvent<HTMLFormElement>,  cardId: string, setId: string) => {
    e.preventDefault();
    
    if (setId && cardId) {
      const res = await apiRequest({
        method: 'delete',
        url: `/api/set/${setId}/card/${cardId}/delete`,
        src: 'ManageSetData - deleteSet',
        config: {
          headers: { Authorization: `Bearer ${token}` },
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