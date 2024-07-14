import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import FormInput from '../../components/Forms/FormInput';
import Btn from '../../components/Btn/Btn';
import apiRequest from '../../lib/api';

const ProfileForm = () => {

  const navigate = useNavigate();
  const [profileFormData, setProfileFormData] = useState({
    user_name: '',
    user_email: '',
    user_pass: '',
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('I got clicked');
    try {
      const response = await apiRequest({
        method:'post',
        url: 'api/profile',
        data: profileFormData,
        src: 'ProfileForm - handleFormSubmit'
      });

      // navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <form onSubmit={handleFormSubmit} >
      <div className="form__title-container">
        <h2 className={classNames('form__title mx-0 mb-4')}>
          Profile
        </h2>
      </div>
      <FormInput
        labelName='Username'
        inputProps={{
          type: 'text',
          name: 'user_name',
          value: profileFormData.user_name,
          placeholder: 'disabled',
          required: true,
          disabled: true,
          onChange: (e) => setProfileFormData({ ...profileFormData, user_name: e.target.value }),
        }}
      />
      <FormInput
        labelName='Email'
        inputProps={{
          type: 'email',
          name: 'user_email',
          value: profileFormData.user_email,
          placeholder: 'Enter your email',
          required: true,
          onChange: (e) => setProfileFormData({ ...profileFormData, user_email: e.target.value }),
        }}
      />
      <FormInput
        labelName='Password'
        inputProps={{
          type: 'password',
          name: 'user_pass',
          value: profileFormData.user_pass,
          placeholder: 'Enter your password',
          required: true,
          onChange: (e) => setProfileFormData({ ...profileFormData, user_pass: e.target.value }),
        }}
      />
      <Btn
        
        className='btn--large
        btn--tertiary text-white'
        type='submit'
      >
        Update
      </Btn>
    </form>
  );
}

export default ProfileForm;