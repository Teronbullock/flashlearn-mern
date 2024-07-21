import { useContext } from "react";
import apiRequest from "../../../lib/api";
import { useAuthContext } from '../../../context/hooks/useAuthContext';


export const useDeleteSet = (refreshSets) => {
  const { userId } = useAuthContext();

  const handlerDelete = async (e,  setId: number) => {
    e.preventDefault();
    
    if (setId && userId) {
      const res = await apiRequest({
        method: 'delete',
        url: `/api/set/${setId}/delete`,
        src: 'ManageSetData - deleteSet',
        data: {
          userId: userId,
        }
      });

      if (res.status === 200 && res.data?.isSetDeleted) {
        const { msg } = res.data;
        alert(msg);
        refreshSets();
      }
    }
  }

  return { handlerDelete, };
}

export default useDeleteSet;