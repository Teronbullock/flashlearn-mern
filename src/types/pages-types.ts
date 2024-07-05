interface FormPropsBase {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ID: number;
}

export interface SetCardConfig extends FormPropsBase {
  card_definition: string;
  card_term: string;
  set_id: number;
}

interface SetDataBase {
  title: string;
  description?: string;
  cardCount?: number;
  to: string;
  ID?: number;
}

export interface SetDataConfig extends SetDataBase {
  user_id: number;
}

export interface ListCardFormProps extends SetDataBase {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  listType?: 'set' | 'card' | null;
}

export interface SetReducerInterface {
  (
    state: {
      isSubmitted: boolean;
    },
    action: {
      type: string;
    }
  ): {
    isSubmitted: boolean;
  };
}