import { useReducer } from 'react';
import Form from '@components/Forms/Form';
import Btn from '@components/Btn/Btn';
import FormInput from '@components/Forms/FormInput';
import { useAuthContext } from '../context/hooks/useAuthContext';

interface UserState {
  user_email: string;
  user_pass: string;
}

interface LoginReducerAction {
  type: 'SUBMIT' | 'ON_CHANGE';
  payload: {
    user_email?: string;
    user_pass?: string;
  };
}

// Reducer function for the Login component
const loginReducer = (state: UserState, action: LoginReducerAction) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SUBMIT':
      return {
        user_email: '',
        user_pass: '',
      };
    default:
      return state;
  }
};

/**
 *  -- LoginPage --
 *
 * @returns
 */
const LoginPage = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(loginReducer, {
    user_email: '',
    user_pass: '',
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login) {
      login(state.user_email, state.user_pass);
    } else {
      throw new Error('Login function not found');
    }
  };

  return (
    <main className='main main--login'>
      <section className='container py-12 md:w-1/2 min-h-[calc(100vh-11rem)]'>
        <Form className='bg-white card--login-form' onSubmit={handleFormSubmit} title='Login'>
          <>
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
              autoFocus={true}
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
            <Btn className='btn--large btn--tertiary text-white' tag='button' type='submit'>
              Login
            </Btn>
          </>
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
