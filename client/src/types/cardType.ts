export interface Card {
  term: string;
  definition: string;
  bg_color: string;
  text_color: string;
}

export interface CardFaceProps {
  className: string;
  bgColor: string;
  textColor: string;
  cardText: string;
  cardHeaderText?: string;
  handFlipAction: () => void;
  BtnText?: string;
  children?: React.ReactNode;
}
