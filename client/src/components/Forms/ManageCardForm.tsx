import FormInput from './FormInput';
import Card from '../cards/Card';
import  { ManageCardFormProps } from '../../types/card-types';
import Btn from '../Btn/Btn';


const ManageCardForm = ({
  formType,
  inputValues,
  onSubmit,
  dispatch,
  children,
  submitBtnText,
}: ManageCardFormProps) => {

  const inputLabels = {
    'card': {
      'inputOneLabel': 'Term',
      'inputTwoLabel': 'Definition',
    },
    'set': {
      'inputOneLabel': 'Title',
      'inputTwoLabel': 'Description',
    },
  };

  return (
    <Card className='bg-white'>
      <form onSubmit={onSubmit}>
        <FormInput 
          labelName={inputLabels[formType].inputOneLabel}
          inputProps={{
            type: 'textarea',
            name: 'term',
            value: inputValues[0],
            required: true,
            placeholder: `Enter ${inputLabels[formType].inputOneLabel}`,
            onChange: (e) => dispatch({
              type: 'ON_CHANGE',
              payload: {inputOneValue: e.target.value}
            })
          }}
        />
        <FormInput 
          labelName={inputLabels[formType].inputTwoLabel}
          inputProps={{
            type: 'textarea',
            name: 'definition',
            value: inputValues[1],
            required: true,
            placeholder: `Enter ${inputLabels[formType].inputTwoLabel}`,
            onChange: (e) => dispatch({
              type: 'ON_CHANGE',
              payload: {inputTwoValue: e.target.value}
            })
          }}
        />
          {children}
      </form>
    </Card>
  );
};

export default ManageCardForm;