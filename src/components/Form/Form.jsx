import s from './Form.module.css';
import { useState } from 'react';

export function Form ({addContact}) {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    checked: ''
  });

  const handleChange = (e) => {
    setContactInfo({ 
      ...contactInfo, 
      [e.target.name]: 
        e.target.name === 'checked' ? e.target.checked : e.target.value });
  };

  const handleSubmit = (e) => {
    /* пример апи запроса 
    api.sendReq(contactInfo); */

    e.preventDefault();
    addContact(contactInfo);

    // console.log(contactInfo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Введите данные</h3>
      <input
        className={s.input}
        type='text'
        name='name'
        placeholder='Имя'
        value={contactInfo.name}
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
      
      <input type='checkbox' name='checked' onChange={handleChange} />
      <button className={s.button}> Отправить</button>
    </form>
  )
}