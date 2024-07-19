import { useReducer } from 'react';
import LoginForm from "../LoginForm";
import { useAuthContext } from '../../../context/AuthContext';


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
      login(state.user_name, state.user_pass);
    } catch (error) {
      console.error(error);
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