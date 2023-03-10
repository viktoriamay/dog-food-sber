import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from './../Form/Form';
import './../Login/Login.scss';
import { useForm } from 'react-hook-form';
import {
  EMAIL_REGEXP,
  VALIDATE_CONFIG,
  PASS_REGEXP,
} from './../../constants/constants';
import { authApi } from './../../utils/authApi';
import { useState, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { parseJwt } from './../../utils/parseJWT';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = ({ setAuthentificated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const [tokenResp, setTokenResp] = useState(null);

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

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
      value: !!tokenResp,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASS_REGEXP,
      message: VALIDATE_CONFIG.password,
    },
  });

  const tokenRegister = register('token', {
    required: {
      value: !!tokenResp,
      message: VALIDATE_CONFIG.requiredMessage,
    },
  });

  const sendData = async (formData) => {
    if (tokenResp) {
      const { token, data } = await authApi.resetPassToken(
        { password: formData.password },
        formData.token,
      );
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(data));
        setAuthentificated(true);
        navigate('/');
      }
    } else {
      await authApi.resetPass(formData);
      setTokenResp(true);
    }
  };

  return (
    <>
      <Form
        handleFormSubmit={handleSubmit(sendData)}
        title="Восстановление пароля">
        <p
          className="auth__info"
          onClick={() => {}}
          style={{ textAlign: 'left', fontSize: '12px', lineHeight: '14px' }}>
          Для получения временного пароля необходимо ввести email, указанный при
          регистрации.
        </p>
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
            disabled={!tokenResp}
          />
          {errors.password && (
            <p className="auth__error">{errors?.password.message}</p>
          )}

          <input
            {...tokenRegister}
            className={`auth__input ${
              errors?.password ? 'auth__input_error' : ''
            }`}
            type="text"
            name="token"
            placeholder="Токен"
            disabled={!tokenResp}
          />
        </div>
        <p
          className="auth__info"
          style={{ textAlign: 'left', fontSize: '12px', lineHeight: '14px' }}>
          Срок действия временного пароля 24 ч.
        </p>
        <div className="auth__actions">
          <BaseButton type="submit" color={'yellow'}>
            Отправить
          </BaseButton>
        </div>
      </Form>
    </>
  );
};
