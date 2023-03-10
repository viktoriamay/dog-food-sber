import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from './../Form/Form';
import './Login.scss';
import { useForm } from 'react-hook-form';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from './../../utils/authApi';
import api from './../../utils/api';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { setAuthentificated } = useContext(UserContext);

  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.email,
    },
  });

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASS_REGEXP,
      message: VALIDATE_CONFIG.password,
    },
  });

  const sendData = async (data) => {
    try {
      const { token } = await authApi.login(data);
      // {token} === result.token
      localStorage.setItem('token', token);
      setAuthentificated(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const initialPath = location.state?.initialPath;

  return (
    <>
      <Form handleFormSubmit={handleSubmit(sendData)} title="Вход">
        <div className="auth__controls">
          <input
            {...emailRegister}
            className={`auth__input ${
              errors?.email ? 'auth__input_error' : ''
            }`}
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="auth__error">{errors?.email.message}</p>
          )}
          <input
            {...passwordRegister}
            className={`auth__input ${
              errors?.password ? 'auth__input_error' : ''
            }`}
            type="password"
            name="password"
            placeholder="Пароль"
          />
          {errors.password && (
            <p className="auth__error">{errors?.password.message}</p>
          )}
        </div>
        <span
          className="auth__info auth__link"
          onClick={() => {
            navigate('/reset-pass');
          }}>
          Восстановить пароль
        </span>
        <div className="auth__actions">
          <BaseButton type="submit" color={'yellow'}>
            Войти
          </BaseButton>
          <BaseButton
            type="button"
            color={'white'}
            onClick={() =>
              navigate('/register', {
                replace: true,
                state: { backgroundLocation: location, initialPath },
              })
            }>
            Регистрация
          </BaseButton>
        </div>
      </Form>
    </>
  );
};
