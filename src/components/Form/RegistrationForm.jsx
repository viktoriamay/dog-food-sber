import { useForm } from 'react-hook-form';
import s from './Form.module.css';


export const RegistrationForm = () => {
  
  const {register, handleSubmit} = useForm();
  const onSubmit = data => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
        className={s.input}
        type='text'
        // name='name' не нужно писать так как в поле реджистер в кавычках написали содержимое атрибута нейм
        placeholder='Имя'
        {...register('name', {
          required: true,
          maxLength: 5
        })}
        // value={contactInfo.name}
        // onChange={handleChange}
      />
      <input
        className={s.input}
        type='password'
        // name='password'
        placeholder='Пароль'
        {...register('password')}
        // value={contactInfo.lastName}
        // onChange={handleChange}
      />
      <input
        className={s.input}
        type='number'
        // name='phoneNumber'
        placeholder='Номер телефона'
        {...register('phoneNumber')}
        // value={contactInfo.phoneNumber}
        // onChange={handleChange}
      />
      <button className={s.button}>Зарегистироваться</button>
    </form>
  )
}