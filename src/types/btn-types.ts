export interface BtnProps {
  children?: React.ReactNode;
  className?: string;
  tag?: 'Link' | 'button';
  

  dataType?: string;
  isListItem?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  to?: string;  
}
