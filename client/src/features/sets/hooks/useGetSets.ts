import { useEffect, useState } from 'react';
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

const useGetSets = () => {
  const { userId, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    if (userId && token) {
      (async () => {
        try {
          const res = await apiRequest({
            url: `/api/set/user/${userId}`,
            src: 'useGetSets - useEffect',
            config: { headers: { Authorization: `Bearer ${token}` } },
          });

          if (res !== undefined && res.data) {
            const sets = res.data.sets;
            setSets(sets);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error(error);
          }
          alert('Error fetching cards');
        }
      })();
    }
  }, [userId, refreshCounter, token]);

  const refreshSets = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return { sets, refreshSets };
};

export default useGetSets;
