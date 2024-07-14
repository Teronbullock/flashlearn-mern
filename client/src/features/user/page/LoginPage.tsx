import useLoginData from "../hooks/useLoginData";
import LoginForm from "../LoginForm";


/**
 *  -- LoginPage --
 * 
 * @returns 
 */
const LoginPage = () => {
  const { state, dispatch, handleFormSubmit } = useLoginData();

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