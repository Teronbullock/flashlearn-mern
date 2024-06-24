interface FormPropsBase {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ID: number;
}

export interface SetCardConfig extends FormPropsBase {
  card_definition: string;
  card_term: string;
  set_id: number;
}