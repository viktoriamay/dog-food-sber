import './Modal.css';
import cn from 'classnames';
import { useState, useEffect } from 'react';

export const Modal = ({children, activeModal, setActiveModal}) => {
  // const [active, setActive] = useState(false);

  useEffect(() => {
    // setActiveModal(false)
  }, []);

  return (
    <div className={cn('modal', {['active']: activeModal})} onClick={() => {}}
    // onClick={() => setActiveModal(false)} 
    >
      <div className={cn('modal_content', {['active']: activeModal})} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}