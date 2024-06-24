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

export interface CardDataConfig {
  card_definition: string;
  card_term: string;
  set_id: number;
  user_id: number;
  ID: number;
}