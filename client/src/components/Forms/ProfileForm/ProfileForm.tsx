import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import Btn from '../../Btn/Btn';
import axios from 'axios';

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
      const response = await axios.post('api/profile', profileFormData);
      console.log(response);
      // navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <Form
      onSubmit={handleFormSubmit}
      sectionHeaderTitle='Profile'
    >
      <FormGroup
        labelName='Username'
        inputObj={{
          type: 'text',
          name: 'user_name',
          value: profileFormData.user_name,
          placeholder: 'disabled',
          required: true,
          disabled: true,
        }}
        onChange={(e) => setProfileFormData({ ...profileFormData, user_name: e.target.value })}
      />
      <FormGroup
        labelName='Email'
        inputObj={{
          type: 'email',
          name: 'user_email',
          value: profileFormData.user_email,
          placeholder: 'Enter your email',
          required: true,
        }}
        onChange={(e) => setProfileFormData({ ...profileFormData, user_email: e.target.value })}
      />
      <FormGroup
        labelName='Password'
        inputObj={{
          type: 'password',
          name: 'user_pass',
          value: profileFormData.user_pass,
          placeholder: 'Enter your password',
          required: true,
        }}
        onChange={(e) => setProfileFormData({ ...profileFormData, user_pass: e.target.value })}
      />
      <Btn
        btnType='btn'
        btnClass='btn--large
        btn--tertiary text-white'
        type='submit'
      >
        Update
      </Btn>
    </Form>
  );
}

export default ProfileForm;