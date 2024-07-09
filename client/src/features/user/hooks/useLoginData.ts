import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../../lib/api';
import { LoginFormState } from '../../../types/form-types';
import { AuthContext } from '../../../context/AuthContext';


const loginFormReducer = (state: LoginFormState, action: object) => {

  switch (action.type) {
    case 'SUBMIT':
    case 'ON_CHANGE':
      return {
        ...state,
        ...action.payload,
      }
    default: 
      return state;
  }
}

const useLoginData = () => {  
  const [state, dispatch] = useReducer(loginFormReducer, {
    user_name: '',
    user_pass: '',
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiRequest({
        method: 'post',
        url: 'api/users/login',
        data: state,
        src: 'LoginForm - handleFormSubmit'
      });
      
      if (res.status === 200 && res.data) {
        const { userId, token } = res.data;

        login?.(userId, token);
        navigate(`/dashboard/${userId}`);
      }

    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return { state, dispatch, handleFormSubmit };

};

export default useLoginData;
