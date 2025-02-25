import { useReducer } from 'react';
import Form from '../../../components/Forms/Form';
import Btn from '../../../components/Btn/Btn';
import FormInput from '../../../components/Forms/FormInput';
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import apiRequest from '../../../lib/api';

interface UserState {
  user_name: string;
  user_email: string;
  user_pass: string;
  user_pass_confirm: string;
}

interface RegisterReducerAction {
  type: 'ON_CHANGE' | 'SUBMIT';
  payload?: {
    user_name?: string;
    user_email?: string;
    user_pass?: string;
    user_pass_confirm?: string;
  };
}

// Reducer function for the Register component
const registerReducer = (state: UserState, action: RegisterReducerAction) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SUBMIT':
      return {
        user_name: '',
        user_email: '',
        user_pass: '',
        user_pass_confirm: '',
      };
    default:
      return state;
  }
};

/**
 *  -- Register --
 *
 * @returns
 */
const Register = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(registerReducer, {
    user_name: '',
    user_email: '',
    user_pass: '',
    user_pass_confirm: '',
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // check if both strings are at least 8 characters long
      if (state.user_pass.length < 8 || state.user_pass_confirm.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // check if both strings are the same
      if (state.user_pass !== state.user_pass_confirm) {
        throw new Error('Passwords do not match');
      }

      // sending the request to register the user
      const res = await apiRequest({
        method: 'post',
        url: '/api/user/register',
        data: state,
        src: 'RegistrationForm - handleFormSubmit',
      });

      // if the response is successful, alert the user and log them in
      if (res.status === 200 && login) {
        alert('Registration successful');
        login(state.user_name, state.user_pass);
        dispatch({ type: 'SUBMIT' });
      } else {
        throw new Error('Registration Error');
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error: ' + error.message);
      } else {
        console.error(error);
      }
      alert(error);
    }
  };

  return (
    <main className='main main--register'>
      <section className='container py-12 md:w-1/2 min-h-[calc(100vh-11rem)]'>
        <Form
          className='bg-white card--login-form'
          onSubmit={handleFormSubmit}
          title='Register'
        >
          <FormInput
            labelName='Username'
            type='text'
            name='user_name'
            value={state.user_name}
            placeholder='Enter your username'
            required={true}
            onChange={e =>
              dispatch({
                type: 'ON_CHANGE',
                payload: { user_name: e.target.value },
              })
            }
          />
          <FormInput
            labelName='Email'
            type='email'
            name='user_email'
            value={state.user_email}
            placeholder='Enter your email'
            required={true}
            onChange={e =>
              dispatch({
                type: 'ON_CHANGE',
                payload: { user_email: e.target.value },
              })
            }
          />
          <FormInput
            labelName='Password'
            type='password'
            name='user_pass'
            value={state.user_pass}
            placeholder='Enter your password'
            required={true}
            onChange={e =>
              dispatch({
                type: 'ON_CHANGE',
                payload: { user_pass: e.target.value },
              })
            }
          />
          <FormInput
            labelName='Confirm Password'
            type='password'
            name='user_confirm_pass'
            value={state.user_pass_confirm}
            placeholder='Confirm your password'
            required={true}
            onChange={e =>
              dispatch({
                type: 'ON_CHANGE',
                payload: { user_pass_confirm: e.target.value },
              })
            }
          />
          <Btn
            className='btn--large btn--tertiary text-white'
            tag='button'
            type='submit'
          >
            Register
          </Btn>
        </Form>
      </section>
    </main>
  );
};

export default Register;
