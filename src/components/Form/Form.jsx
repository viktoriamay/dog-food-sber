import s from './Form.module.scss';

export const Form = ({ title, handleFormSubmit, children, className }) => {
  return (
    /* динамически прокидываем любой новый класс, чтобы можно было переписать стили */
    <form className={className ?? s.form} onSubmit={handleFormSubmit}>
      <h1 className={s.title}>{title}</h1>
      {children}
    </form>
  );
};