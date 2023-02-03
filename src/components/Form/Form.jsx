import s from './Form.module.css';
import { useState } from 'react';

export function Form () {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    /* пример апи запроса 
    api.sendReq(contactInfo); */
    
    e.preventDefault();
    console.log(contactInfo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Введите данные</h3>
      <input
        className={s.input}
        type='text'
        name='name'
        placeholder='Имя'
        value={contactInfo.title}
        onChange={handleChange}
      />
      <input
        className={s.input}
        type='text'
        name='lastName'
        placeholder='Фамилия'
        value={contactInfo.lastName}
        onChange={handleChange}
      />
      <input
        className={s.input}
        type='number'
        name='phoneNumber'
        placeholder='Номер телефона'
        value={contactInfo.phoneNumber}
        onChange={handleChange}
      />
      <button className={s.button}> Отправить</button>
    </form>
  )
}