import { useState } from 'react';

import s from './Accordion.module.css';
import cn from 'classnames';

export const Accordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false);

  const toggleState = () => {
    setSelected(!selected);
  }
  return (
    <div className={cn(s.accordion, { [s.active]: selected })}>
      <button className={s.accordionButton} onClick={toggleState}>
        <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>{children}</p>
      </div>
    </div>
  );
};