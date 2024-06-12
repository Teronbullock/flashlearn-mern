import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Cards/Card';
import Form from './Form';
import FormInput from './FormInput';
import Btn from '../Btn/Btn';
import axios from 'axios';
import { AuthContext } from '../../context/auth-context';

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

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = (await axios.post('api/login', state));
      
      if (!res) {
        return;
      }
      login?.(res.data.userID, res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="container py-12 w-1/2 min-h-[calc(100vh-11rem)]">
      <Card>
        <Form
          onSubmit={handleFormSubmit}
          formObj={{
            hasTitle: true,
            title: 'Login',
          }}
        >
          <FormInput
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
          <FormInput
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
            elementType='btn'
            className='btn--large btn--tertiary text-white'
            type='submit'
          >
            Login
          </Btn>
        </Form>
      </Card>
    </section>
  );
}

export default LoginForm;