interface FormPropsBase {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ID: number;
}

export interface SetCardConfig extends FormPropsBase {
  card_definition: string;
  card_term: string;
  set_id: number;
}

export interface SetDataBase {
  title: string;
  description?: string;
  cardCount?: number;
  id: number;
  user_id?: number;
}

export interface SetsProps {
  sets: SetDataBase[];
}

export interface SetWithTo extends SetDataBase {
  to: string;
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

export interface ListCardFormProps extends SetDataBase {
  // onSubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  listType?: 'set' | 'card' | null;
  btnOneTo: string;
  btnTwoTo?: string;
}


