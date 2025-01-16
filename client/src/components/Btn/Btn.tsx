import { Link, To } from 'react-router-dom';
import './btn.scss';
import classNames from 'classnames';


type LinkProps = {
  tag: 'link' | 'listItemLink';
  to: To;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type ButtonProps = {
  tag: 'button' | 'listItemBtn';
  type: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};


interface BtnProps {
  children: React.ReactNode;
  className?: string;
  tag?: 'link' | 'button' | 'listItemBtn' | 'listItemLink';
  to?: To;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isListItem?: boolean;
  defaultStyle?: boolean;
}

/**
 * -- Btn Component --
 * @param className {string} - class name for button
 * @param children [React.ReactNode] - children for button
 * @param tag {string} - tag for button (Link, button) | Default is Link
 * @param type {string} - button attribute type (submit, reset, button)
 * The type attribute should only be used when the tag is 'button'.
 *  
 * @param to {string} - url for button
 * @param onClick {function} - function for button click
 * @param isListItem {boolean} - boolean for list item
 * @param defaultStyle {boolean} - boolean for default style - 
 * Default is true
 * @returns
 */
export default function Btn(props: BtnProps) {
  const {
    children,
    tag = 'link',
    isListItem = false,
    defaultStyle = true,
  } = props;

  if (tag === 'link') {
    const { to, className, onClick } = props as LinkProps;
    return (
      <>
      {isListItem ? (
        <li>
          <Link
            className={classNames({'btn': defaultStyle}, className)}
            to={to}
            onClick={onClick}
          >
            {children}
          </Link>
        </li>
      ) : (
        <Link
          className={classNames({'btn': defaultStyle}, className)}
          to={to}
          onClick={onClick}
          >
          {children}
        </Link>
      )}
      </>
    );
  }

  if (tag === 'button') {
    const { type, onClick, className } = props as ButtonProps;
    return (
      <>
      {isListItem ? (
        <li>
          <button
            className={classNames({'btn': defaultStyle}, className)}
            type={type}
            onClick={onClick}
          >
            {children}
          </button>
        </li>
      ) : (
        <button
          className={classNames({'btn': defaultStyle}, className)}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      </>
    );
  }


}
