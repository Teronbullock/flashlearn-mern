import { Link } from 'react-router-dom';
import './Btn.scss';
import classNames from 'classnames';
import { BtnProps } from '../../types/btn-types';

/**
 * -- Btn Component --
 * @param className {string} - class name for button
 * @param children [React.ReactNode] - children for button
 * @param tag {string} - tag for button (Link, button) | Default is Link
 * @param type {string} - button attribute type (submit, reset, button)
 * The type attribute should only be used when the tag is 'button'.
 *  
 * @param ariaLabel {string} - aria label for button
 * @param to {string} - url for button
 * @param datatype {string} - data type for button
 * @param onClick {function} - function for button click
 * @returns
 */
export default function Btn({
  children,
  className = '',
  tag = 'Link',
  ...otherProps
}: BtnProps): JSX.Element {
  let Tag;
  
  if (tag === 'Link' ) {
    Tag = Link;
  } else {
    Tag = tag;
  }

  return (
    <Tag
      className={classNames('btn', className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}
