import './Modal.scss';
import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Modal = ({
  children,
  activeModal,
  setActiveModal,
  closeModalEsc,
}) => {
  // const [active, setActive] = useState(false);

  const onKeydown = (e) => {
    switch (e.key) {
      case 'Escape':
        closeModalEsc();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  return (
    <div
      className={cn('modal', { ['active']: activeModal })}
      // tabIndex={1} для того, чтобы можно было делать события клавиатуры
      // onKeyDown={closeModalEsc}
      // onClick={() => setActiveModal(false)}
      // role="button"
    >
      <div
        className={cn('modal_content', { ['active']: activeModal })}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
