import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from './../Form/Form';
import './Login.css'

export const Login = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Form handleFormSubmit={handleFormSubmit} title='Вход' >
        <div className='auth__controls'>
          <input
            className='auth__input'
            type='text'
            name='email'
            placeholder='Email'
            required
          />
          <input
            className='auth__input'
            type='password'
            name='password'
            placeholder='Пароль'
            required
          />
          </div>
          <p className='auth__info' onClick={() => { }}>
            Восстановить пароль
          </p>
          <div className='auth__actions'>
            <BaseButton type="submit" color={'yellow'}>Войти</BaseButton>
            <BaseButton type="button" color={'white'} onClick={() => {}}>Регистрация</BaseButton>
        </div>
      </Form>
    </>
  )
}