export interface BaseListCard {
  id: number;
}

export interface ListCardProps extends BaseListCard {
  children: React.ReactNode;
}

export interface ListCardContentProps {
  title: string;
  description?: string | null;
  cardCount?: number;
  feedType?: "set" | "card";
}

export interface ListCardActionProps {
  cardId: number | undefined;
  setId: string | undefined;
}