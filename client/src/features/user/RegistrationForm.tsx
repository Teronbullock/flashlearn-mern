import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Forms/Form';
import FormInput from '../../components/Forms/FormInput';
import Btn from '../../components/Btn/Btn';
import { apiRequest } from '../../lib/api';
import { AuthContext } from '../../context/AuthContext';
import { RegFormState, RegFormAction } from '../../types/form-types';


const formReducer = (state: RegFormState, action: RegFormAction ) => {
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
      const res = await apiRequest({
        method: 'post',
        url: 'api/users/register',
        data: state,
        src: 'RegistrationForm - handleFormSubmit'
      });
      const { userId, token } = res.data;

      if (userId && token && authContext.login) {
        authContext.login(res.data.userId, res.data.token);
        navigate('/dashboard');
      } else {
        const missingData = [];
        if (!userId) { missingData.push('User ID');}
        if (!token) {missingData.push('Token');}
        if (!authContext.login) {missingData.push('Login function');}

        throw new Error(`${missingData.join(', ')} not found`);
      }

      console.log(res);
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