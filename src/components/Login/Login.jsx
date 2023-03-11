import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from './../Form/Form';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from './../../utils/authApi';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { emailRegister, passwordRegister } from '../../utils/utils';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { setAuthentificated } = useContext(UserContext);

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

  const handleClickToRegister = (e) => {
    e.preventDefault()
    navigate('/register', {
      replace: true,
      state: { backgroundLocation: location, initialPath: initialPath },
    })
  }

  return (
    <>
      <Form handleFormSubmit={handleSubmit(sendData)} title="Вход">
        <div className="auth__controls">
          <input
            {...emailRegister(register)}
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
            {...passwordRegister(register)}
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
            navigate('/reset-pass', {
              replace: true,
              state: { backgrounLocation: location, initialPath },
            });
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
            onClick={handleClickToRegister}>
            Регистрация
          </BaseButton>
        </div>
      </Form>
    </>
  );
};
