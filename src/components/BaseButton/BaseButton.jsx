import cn from 'classnames';
import s from './BaseButton.module.scss';

export const BaseButton = ({ children, color, className, ...props }) => {
  return (
    /* динамически прокидываем любой новый класс, чтобы можно было переписать/добавить стили */
    <button {...props} className={className ? `${cn(s.btn, s[color])} ${className}` : cn(s.btn, s[color])}>
      {children}
    </button>
  );
};
