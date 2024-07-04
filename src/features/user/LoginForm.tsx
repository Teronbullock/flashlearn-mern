import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/Forms/FormInput';
import Btn from '../../components/Btn/Btn';
import { AuthContext } from '../../context/AuthContext';
import { LoginFormState } from '../../types/form-types';
import Card from '../../components/cards/Card';
import apiRequest from '../../lib/api';
import classNames from 'classnames';


const loginFormReducer = (state: LoginFormState, action: object) => {
  return {
    ...state,
    ...action,
  }
}

/**
 *  -- LoginForm Component --
 * 
 * @returns 
 */
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
      const res = await apiRequest({
        method: 'post',
        url: 'api/users/login',
        data: state,
        src: 'LoginForm - handleFormSubmit'
      });
      
      const { userId, token } = res.data;

      if (userId && token) {
        login?.(res.data.userId, res.data.token);
        navigate(`/dashboard/${userId}`);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }


  return (
    <section className="container py-12 w-1/2 min-h-[calc(100vh-11rem)]">
      <Card className='bg-white text-black'>
        <form
          onSubmit={handleFormSubmit}
          className='form'
        >
          <div className="form__title-container">
            <h2 className={classNames('form__title mx-0 mb-4')}>
              Login
            </h2>
          </div>
          <FormInput
            labelName='Username'
            type={'text'} 
            name={'user_name'} 
            value={state.user_name} 
            placeholder={'Enter your username'} 
            required={true}
            onChange={(e) => dispatch({ user_name: e.target.value })}
          />
          <FormInput
            labelName='Password'
            type={'password'} 
            name={'user_pass'} 
            value={state.user_pass} 
            placeholder={'Enter your password'} 
            required={true} 
            onChange={(e) => dispatch({user_pass: e.target.value })}
          />
          <Btn
            elementType='btn'
            className='btn--large btn--tertiary text-white'
            type='submit'
          >
            Login
          </Btn>
        </form>
      </Card>
    </section>
  );
}

export default LoginForm;