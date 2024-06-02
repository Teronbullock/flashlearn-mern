import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import Btn from '../../Btn/Btn';
import axios from 'axios';
import { AuthContext } from '../../../context/auth-context';

interface FormState {
  user_name: string;
  user_pass: string;
}

const loginFormReducer = (state: FormState, action: object) => {
  return {
    ...state,
    ...action,
  }
}

const LoginForm = () => {
  const [state, dispatch] = useReducer(loginFormReducer, {
    user_name: '',
    user_pass: '',
  });

  const {
    setToken,
    setUserID,
    setIsLoggedIn,
    login
   } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = (await axios.post('api/login', state));
      
      if (!res) {
        return;
      }
  
      
      console.log(res, 'res');
      login?.(res.data.userID, res.data.token);
      setIsLoggedIn?.(true);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form 
      onSubmit={handleFormSubmit}
      sectionHeaderTitle='Login'
    >
      <FormGroup
        labelName='Username'
        inputObj={{
          type: 'text',
          name: 'user_name',
          value: state.user_name,
          placeholder: 'Enter your username',
          required: true,
        }}
        onChange={(e) => dispatch({ user_name: e.target.value })}
      />
      <FormGroup
        labelName='Password'
        inputObj={{
          type: 'password',
          name: 'user_pass',
          value: state.user_pass,
          placeholder: 'Enter your password',
          required: true,
        }}
        onChange={(e) => dispatch({user_pass: e.target.value })}
      />
      <Btn
        btnType='btn'
        btnClass='btn--large btn--tertiary text-white'
        type='submit'
      >
        Login
      </Btn>
    </Form>
  );
}

export default LoginForm;