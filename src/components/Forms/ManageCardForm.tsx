import FormInput from './FormInput';
import Card from '../cards/Card';
import { CardAction } from '../../features/cards/types/card-types';


interface ManageCardFormProps {
  formType: 'card' | 'set';
  inputOneValue: string | null;
  inputTwoValue: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  dispatch: React.Dispatch<CardAction>;
  children: React.ReactNode;
}

const ManageCardForm = ({
  formType,
  inputOneValue,
  inputTwoValue,
  onSubmit,
  dispatch,
  children,
}: ManageCardFormProps) => {
  const inputLabels = {
    card: {
      inputOneLabel: 'Term',
      inputTwoLabel: 'Definition',
    },
    set: {
      inputOneLabel: 'Title',
      inputTwoLabel: 'Description',
    },
  };

  return (
    <Card className='bg-white'>
      <form onSubmit={onSubmit}>
        <FormInput
          labelName={inputLabels[formType].inputOneLabel}
          type='textarea'
          name='term'
          value={inputOneValue}
          required={true}
          placeholder={`Enter ${inputLabels[formType].inputOneLabel}`}
          onChange={e =>
            dispatch({
              type: 'ON_INPUT_ONE_CHANGE',
              payload: { inputOneValue: e.target.value },
            })
          }
          autoFocus={true}
        />
        <FormInput
          labelName={inputLabels[formType].inputTwoLabel}
          type='textarea'
          name='definition'
          value={inputTwoValue}
          required={true}
          placeholder={`Enter ${inputLabels[formType].inputTwoLabel}`}
          onChange={e =>
            dispatch({
              type: 'ON_INPUT_TWO_CHANGE',
              payload: { inputTwoValue: e.target.value },
            })
          }
        />
        {children}
      </form>
    </Card>
  );
};

export default ManageCardForm;
