import { useReducer } from 'react';
import LoginForm from "../LoginForm";
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import { LoginFormState, LoginFormAction } from '../../../types/form-types';


const loginFormReducer = (state: LoginFormState, action: LoginFormAction) => {
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

/**
 *  -- LoginPage --
 * 
 * @returns 
 */
const LoginPage = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(loginFormReducer, {
    user_name: '',
    user_pass: '',
  });


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if( login) {
        login(state.user_name, state.user_pass);
      } else {
        throw new Error('Login function not found');
      }
    } catch (error) {
      console.error(error);
      alert('Login Error: Please check your user name and password and try again');
    }
  }

  return (
    <main className="main main--login">
      <section className="container py-12 w-1/2 min-h-[calc(100vh-11rem)]">
        <LoginForm 
          onSubmit={handleFormSubmit}
          dispatch={dispatch}
          state={state}
        />
      </section>
    </main>
  );
}

export default LoginPage;