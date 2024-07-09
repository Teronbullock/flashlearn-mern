import { useContext, useEffect, useState } from 'react';
import apiRequest from '../../../lib/api';
import { AuthContext } from '../../../context/AuthContext';


const useGetSets = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState();
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {

    if (userId) {
      ( async () => {
        const res = await apiRequest({
          url:`/api/set/user/${userId}`,
          src: 'useGetSets - useEffect'
        });
  
        if (res !== undefined && res.data) {
          const { rows } = res.data;
          setSets(rows);
        } else {
          console.error(res.status);
        }
      })();
    }
  }, [userId, refreshCounter]);
  
  const refreshSets = () => {setRefreshCounter(prev => prev + 1)};

  return {sets, refreshSets};
}

export default useGetSets;