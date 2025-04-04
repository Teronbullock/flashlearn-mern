import { useReducer } from 'react';
import useGetProfile from '@features/user/hooks/useGetProfile';
import PageHero from '@layouts/PageComponents/PageHero';
import PageHeader from '@layouts/PageComponents/PageHeader';
import Form from '@components/Forms/Form';
import FormInput from '@components/Forms/FormInput';
import Btn from '@components/Btn/Btn';
import apiRequest from '@/lib/api';
import { useAuthContext } from '@/context/hooks/useAuthContext';

interface UserState {
  user_email: string;
  user_pass: string;
  user_old_pass: string;
  user_pass_confirm: string;
}

interface UserAction {
  type: 'GET_PROFILE' | 'ON_CHANGE' | 'SUBMIT';
  payload?: {
    user_email?: string;
    user_pass?: string;
    user_old_pass?: string;
    user_pass_confirm?: string;
  };
}

const profileReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        ...action.payload,
      };
    case 'ON_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SUBMIT':
      return {
        ...state,
        user_pass: '',
        user_old_pass: '',
        user_pass_confirm: '',
      };
    default:
      return state;
  }
};

const Profile = () => {
  const { token, userSlug } = useAuthContext();
  const [state, dispatch] = useReducer(profileReducer, {
    user_email: '',
    user_pass: '',
    user_old_pass: '',
    user_pass_confirm: '',
  });

  useGetProfile(dispatch);

  const currentPage = 'profilePage';

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

      const res = await apiRequest({
        method: 'put',
        url: `/api/user/${userSlug}/profile`,
        data: {
          user_email: state.user_email,
          user_pass: state.user_pass,
          user_old_pass: state.user_old_pass,
          user_pass_confirm: state.user_pass_confirm,
        },
        config: {
          headers: { authorization: `Bearer ${token}` },
        },
      });

      if (res.status === 200 && res.data) {
        alert('Profile updated successfully');
        dispatch({ type: 'SUBMIT' });
      } else {
        throw new Error('Error updating profile');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error(error);
      }
      alert(error);
    }
  };

  return (
    <main className='main main--profile-page'>
      <PageHero currentPage={currentPage} className='hidden md:block' />
      <PageHeader currentPage={currentPage}></PageHeader>
      <section className='container py-12'>
        <Form className='bg-white card--login-form' onSubmit={handleFormSubmit} title='Update Profile'>
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
            labelName='Old Password'
            type='password'
            name='user_old_pass'
            value={state.user_old_pass}
            placeholder='Enter your password'
            required={true}
            onChange={e =>
              dispatch({
                type: 'ON_CHANGE',
                payload: { user_old_pass: e.target.value },
              })
            }
          />
          <FormInput
            labelName='New Password'
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
            labelName='Confirm New Password'
            type='password'
            name='user_pass_confirm'
            value={state.user_pass_confirm}
            placeholder='Enter your password'
            required={true}
            onChange={e =>
              dispatch({
                type: 'ON_CHANGE',
                payload: { user_pass_confirm: e.target.value },
              })
            }
          />
          <Btn className='btn--large btn--tertiary text-white' type='submit' tag='button'>
            Update
          </Btn>
        </Form>
      </section>
    </main>
  );
};

export default Profile;
