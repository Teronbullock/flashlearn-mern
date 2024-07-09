import FormInput from '../../components/Forms/FormInput';
import Btn from '../../components/Btn/Btn';
import Card from '../../components/cards/Card';
import classNames from 'classnames';


/**
 *  -- LoginForm Component --
 * 
 * @returns 
 */
const LoginForm = ({onSubmit, dispatch, state}) => {

  return (
    <Card className='bg-white text-black'>
      <form
        onSubmit={onSubmit}
        className='form'
      >
        <div className="form__title-container">
          <h2 className={classNames('form__title mx-0 mb-4')}>
            Login
          </h2>
        </div>
        <FormInput
          labelName='Username'
          inputProps={{
            type: 'text',
            name: 'user_name',
            value: state.user_name,
            placeholder: 'Enter your username',
            required: true,
            onChange: (e) => dispatch({type: 'ON_CHANGE', 'payload': {user_name: e.target.value}}),
          }}
        />
        <FormInput
          labelName='Password'
          inputProps={{
            type: 'password',
            name: 'user_pass',
            value: state.user_pass,
            placeholder: 'Enter your password',
            required: true,
            onChange: (e) => dispatch({ type: 'ON_CHANGE', 'payload': {user_pass: e.target.value} }),
          }}
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
  );
}

export default LoginForm;