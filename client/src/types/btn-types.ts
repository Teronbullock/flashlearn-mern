export interface BtnProps {
  className?: string;
  ariaLabel?: string;
  to?: string;
  children?: React.ReactNode;
  dataType?: string;
  elementType?: 'anchor' | 'btn' | null;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}