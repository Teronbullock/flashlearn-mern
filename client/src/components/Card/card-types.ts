import { FormProps } from '../Forms/form-types';

interface CardPropsBase {
  children: React.ReactNode;
  cardType?: 'card' | 'form'| null;
}

interface CardPropsWithForm extends CardPropsBase {
  cardType?: 'form';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  formData?: FormProps;
}

interface CardPropsWithoutForm extends CardPropsBase {
  cardType: 'card';
  onSubmit?: never;
  formData?: never; 
}

export type CardProps = CardPropsWithForm | CardPropsWithoutForm;