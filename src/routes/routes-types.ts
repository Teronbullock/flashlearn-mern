export interface DashboardSetData {
  title: string;
  description?: string;
  ID: number;
  user_id: number;
  cardCount: number;
}

export interface SetCardData {
  card_definition: string;
  card_term: string;
  ID: number;
  set_id: number;
}