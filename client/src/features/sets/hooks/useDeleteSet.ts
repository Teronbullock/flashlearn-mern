import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';



export const useDeleteSet = (refreshSets: () => void) => {
  const { userId, token } = useAuthContext();

  const handlerDelete = async (e: React.FormEvent<HTMLFormElement>,  setId: number) => {
    e.preventDefault();
    
    if (setId && userId) {
      const res = await apiRequest({
        method: 'delete',
        url: `/api/set/user/${userId}/${setId}/delete`,
        src: 'ManageSetData - deleteSet',
        config: {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      });

      if (res.status === 200 && res.data?.isSetDeleted) {
        const { msg } = res.data;
        alert(msg);
        refreshSets();
      }
    }
  }

  return { handlerDelete };
}

export default useDeleteSet;