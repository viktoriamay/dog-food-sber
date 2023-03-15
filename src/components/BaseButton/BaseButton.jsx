import cn from 'classnames';
import s from './BaseButton.module.scss';

export const BaseButton = ({ children, color, className, ...props }) => {
  return (
    <button {...props} className={className ? cn(s.btn, s[color]) + ' ' + className : cn(s.btn, s[color])}>
      {children}
    </button>
  );
};
