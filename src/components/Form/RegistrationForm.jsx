import { useForm } from 'react-hook-form';
import s from './Form.module.css';


export const RegistrationForm = () => {
  
  const {register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = data => {
    console.log(data);
  }

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
        className={s.input}
        type='text'
        // name='name' не нужно писать так как в поле реджистер в кавычках написали содержимое атрибута нейм
        placeholder='Имя'
        {...register('name', {
          required: "Обязательное поле",
          maxLength: {
            value: 10,
            message: 'Слишком длинное имя'
          }
        })}
        // value={contactInfo.name}
        // onChange={handleChange}
        //ctrl shift i
      />
      <div>
        {errors?.name && <p>{errors?.name?.message}</p>}
      </div>
      <input
        className={s.input}
        type='password'
        // name='password'
        placeholder='Пароль'
        {...register('password', {
          required: 'Обязательное поле',
          minLength: {
            value: 5,
            message: 'Слишком короткий пароль'
          }
        })}
        // value={contactInfo.lastName}
        // onChange={handleChange}
      />
      <div>
        {errors?.password && <p>{errors?.password?.message}</p>}
      </div>
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