import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import FormInput from './FormInput';
import Btn from '../Btn/Btn';
import axios from 'axios';
import { AuthContext } from '../../context/auth-context';


interface FormState {
  user_name: string;
  user_email: string;
  user_pass: string;
  user_pass_confirm: string;
}

const formReducer = (state: FormState, action: object ) => {
  return {
    ...state,
    ...action,
  }
}

const RegistrationForm = () => {
  const authContext = useContext(AuthContext);

  const [state, dispatch] = useReducer(formReducer, {
    user_name: '',
    user_email: '',
    user_pass: '',
    user_pass_confirm: '',

  });
  
  const navigate = useNavigate();


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
   
      const res = await axios.post('api/register', state);
      authContext.login(res.data.userID, res.data.token);


      console.log(res);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      sectionHeaderTitle='Register'
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
        labelName='Email'
        inputObj={{
          type: 'email',
          name: 'user_email',
          value: state.user_email,
          placeholder: 'Enter your email',
          required: true,
        }}
        onChange={(e) => dispatch({ user_email: e.target.value })}
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
        onChange={(e) => dispatch({ user_pass: e.target.value })}
      />
      <FormInput
        labelName='Confirm Password'
        inputObj={{
          type: 'password',
          name: 'user_pass_confirm',
          value: state.user_pass_confirm,
          placeholder: 'Confirm your password',
          required: true,
        }}
        onChange={(e) => dispatch({ user_pass_confirm: e.target.value })}
      />
      <Btn
        elementType='btn'
        className='btn--large
        btn--tertiary text-white'
        type='submit'
      >
        Register
      </Btn>
    </Form>
  );
}

export default RegistrationForm;