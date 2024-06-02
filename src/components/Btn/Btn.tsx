import { Children } from 'react';
import { Link } from 'react-router-dom'
import './Btn.scss';

interface BtnProps {
  btnClass?: string;
  btnAriaLabel?: string;
  btnURL?: string;
  children: React.ReactNode;
  btnDataType?: string;
  btnType?: 'anchor' | 'btn';
  btnClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

/**
 * 
 * @param btnClass [string] - class name for button
 * @param btnAriaLabel [sting] - aria label for button
 * @param btnURL [string] - url for button
 * @param children [React.ReactNode] - children for button
 * @param btnDataType [string] - data type for button
 * @param btnType - [string] - anchor | btn - type of button
 * @param btnClick [function] - function for button click 
 * @param type [string] - type of button
 * @returns 
 */
export default function Btn({ 
  btnClass = '',
  btnAriaLabel,
  btnURL,
  btnDataType,
  children, btnType = 'anchor',
  btnClick,
  type = undefined
  }: BtnProps): JSX.Element {



  return (
    <>
      { btnType === 'anchor' ? (
        <Link className={`btn ${btnClass}`} to={btnURL} aria-label={btnAriaLabel} data-js={btnDataType}>{children}</Link>
      ) : btnType === 'btn' ? (
        <button className={btnClass} aria-label={btnAriaLabel} onClick={btnClick} data-js={btnDataType} type={type}>{children}
        </button> ) : null
      }
    </>
  )

}