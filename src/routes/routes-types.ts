interface FormPropsBase {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ID: number;
}

export interface DashboardSetConfig extends FormPropsBase {
  title: string;
  description?: string;
  user_id: number;
  cardCount: number;
}

export interface SetCardConfig extends FormPropsBase {
  card_definition: string;
  card_term: string;
  set_id: number;
}