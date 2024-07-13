import { useContext, useEffect, useState } from 'react';
import apiRequest from '../../../lib/api';
import { AuthContext } from '../../../context/AuthContext';


const useGetSets = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);


  useEffect(() => {
    if (userId) {
      ( async () => {
        try {
          const res = await apiRequest({
            url:`/api/set/user/${userId}`,
            src: 'useGetSets - useEffect'
          });
    
          if (res !== undefined && res.data) {
            const { rows } = res.data;
            setSets(rows);
          } 
        } catch (error) {
          console.error(error.response.data.msg, error);
        }
      })();
    }
  }, [userId, refreshCounter]);
  
  const refreshSets = () => {setRefreshCounter(prev => prev + 1)};

  return {sets, refreshSets};
}

export default useGetSets;