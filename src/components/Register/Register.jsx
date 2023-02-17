import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from './../Form/Form';
import './../Login/Login.css'
import { useForm } from 'react-hook-form';
import { EMAIL_REGEXP, VALIDATE_CONFIG, PASS_REGEXP } from './../../constants/constants';

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.email
    }
  });

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage
    },
    pattern: {
      value: PASS_REGEXP,
      message: VALIDATE_CONFIG.password
    }
  });

  const sendData = (data) => {
    console.log({ data });
  };

  return (
    <>
      <Form handleFormSubmit={handleSubmit(sendData)} title='Регистрация' >
        <div className='auth__controls'>
          <input
            {...emailRegister}
            className={`auth__input ${errors?.email ? 'auth__input_error' : ''}`}
            type='email'
            name='email'
            placeholder='Email'
          />
          {errors.email && (<p className='auth__error'>{errors?.email.message}</p>)}
          <input
            {...passwordRegister}
            className={`auth__input ${errors?.password ? 'auth__input_error' : ''}`}
            type='password'
            name='password'
            placeholder='Пароль'
          />
          {errors.password && (<p className='auth__error'>{errors?.password.message}</p>)}
        </div>
        <p className='auth__info' onClick={() => { }} style={{textAlign: 'left', fontSize: '12px', lineHeight: '14px'}}>
          Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.
        </p>
        <div className='auth__actions'>
          <BaseButton type="submit" color={'yellow'}>
            Зарегистрироваться
          </BaseButton>
          <BaseButton type="button" color={'white'} onClick={() => { }}>
            Войти
          </BaseButton>
        </div>
      </Form>
    </>
  )
}