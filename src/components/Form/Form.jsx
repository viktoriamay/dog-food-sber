import { useState } from 'react';
import api from '../../utils/api';
import s from './Form.module.css';

export const Form = ({ title, handleFormSubmit, children }) => {
  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <h1 className={s.title}>{title}</h1>
      {children}
    </form>
  );
};