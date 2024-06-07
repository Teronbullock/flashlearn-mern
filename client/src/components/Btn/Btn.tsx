import { Link } from 'react-router-dom'
import './Btn.scss';
import classNames from 'classnames';

interface BtnProps {
  className?: string;
  ariaLabel?: string;
  to?: string;
  children?: React.ReactNode;
  dataType?: string;
  elementType?: 'anchor' | 'btn';
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

/**
 * -- Btn Component --
 * 
 * @param className [string] - class name for button
 * @param ariaLabel [sting] - aria label for button
 * @param to [string] - url for button
 * @param children [React.ReactNode] - children for button
 * @param dataType [string] - data type for button
 * @param elementType - [string] - anchor | btn - type of button
 * @param onClick [function] - function for button click 
 * @param type [string] - type of button
 * @returns 
 */
export default function Btn({ 
  className = '',
  ariaLabel,
  to = '#',
  dataType,
  children, 
  elementType = 'anchor',
  onClick,
  type = undefined
  }: BtnProps): JSX.Element {


  if (elementType === 'btn') {
    return (
      <button 
        className={classNames('btn', className)}
        type={type}
        onClick={onClick} 
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        {...( dataType && {'data-js': dataType} )}
      >
        {children}
      </button>
    );
  } else {
    return (
      <Link 
        className={`btn ${className}`}
        to={to}
        {...( ariaLabel && {'aria-label': ariaLabel} )}
        {...( dataType && {'data-js': dataType} )}
      >
        {children}
      </Link>
    );
  }
}