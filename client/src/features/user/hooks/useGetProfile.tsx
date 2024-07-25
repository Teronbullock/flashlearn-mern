import { useEffect,  } from 'react';
import { useParams } from 'react-router-dom';
import apiRequest from '../../../lib/api';
import { useAuthContext } from '../../../context/hooks/useAuthContext';

interface UserAction {
  type: 'GET_PROFILE';
  payload: {
    user_name: string;
    user_email: string;
  };
}

const useGetProfile = (dispatch: React.Dispatch<UserAction>) => { 
  const { userId } = useParams();
  const { token } = useAuthContext()!;

  useEffect(() => {
    ( async () => {
      try {
        const res = await apiRequest({
          url: `/api/user/${userId}/profile`,
          src: 'useGetProfile',
          config: { headers: { Authorization: `Bearer ${token}` } },
        }, 'all');

        const { user_name, user_email } = res.data;
        dispatch({ type: 'GET_PROFILE', payload: { user_name, user_email } });

      } catch (error) {
        console.error(error);
      }
    })();    
  }, [userId, dispatch, token]);

  return;

};

export default useGetProfile;