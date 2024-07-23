import { useEffect, useState } from 'react';
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';


const useGetSets = () => {
  const { userId, token } = useAuthContext();
  const [sets, setSets] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);


  useEffect(() => {
    if (userId && token) {
      // console.log('useGetSets - useEffect - tk:', token);
      ( async () => {
        try {
          const res = await apiRequest({
            url:`/api/set/user/${userId}`,
            src: 'useGetSets - useEffect',
            config: { headers: { 'Authorization': `Bearer ${token}` } }
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
  }, [userId, refreshCounter, token]);
  
  const refreshSets = () => {setRefreshCounter(prev => prev + 1)};

  return {sets, refreshSets};
}

export default useGetSets;