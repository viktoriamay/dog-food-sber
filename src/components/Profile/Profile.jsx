import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { Form } from './../Form/Form';
import { useForm } from 'react-hook-form';
import { BaseButton } from './../BaseButton/BaseButton';
import { VALIDATE_CONFIG } from './../../constants/constants';
import api from './../../utils/api';
import { openNotification } from './../Notifications/Notifications';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const sendData = async (data) => {
    try {
      await api.setUserInfo(data).then((data) => setCurrentUser(data)); // сохранение отображения новых данных юзера без перезагрузки
      openNotification('success', 'Успешно', 'Данные успешно изменены');
    } catch (error) {
      openNotification('error', 'Ошибка', 'Не получилось изменить данные');
    }
  };

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile">
      <div className="profile__controls">
        <span
          className="profile__back"
          onClick={() => navigate(-1)}>{`< Назад`}</span>
        <h1 className="profile__title">Мои данные</h1>
      </div>
      {currentUser ? (
        <Form className="" handleFormSubmit={handleSubmit(sendData)}>
          <div className="profile__info_form">
            <div>
              <input
                {...register('name', {
                  required,
                })}
                className={`auth__input ${
                  errors?.name ? 'auth__input_error' : ''
                }`}
                type="text"
                name="name"
                placeholder="Имя"
                defaultValue={currentUser.name}
              />
              {errors.name && (
                <p className="auth__error">{errors?.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('about', {
                  required,
                })}
                className={`auth__input ${
                  errors?.about ? 'auth__input_error' : ''
                }`}
                type="text"
                name="about"
                placeholder="Обо мне"
                defaultValue={currentUser.about}
              />
              {errors.about && (
                <p className="auth__error">{errors?.about.message}</p>
              )}
            </div>
            <input
              className="auth__input"
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              disabled
            />
            <input
              className="auth__input"
              type="text"
              name="id"
              placeholder="ID"
              defaultValue={currentUser._id}
              disabled
            />

            <BaseButton
              className="profile__button"
              type="submit"
              color={'yellow'}>
              Сохранить
            </BaseButton>
            <div className="profile__logout">
              <BaseButton
                className="profile__button"
                color={'white'}
                onClick={handleLogout}>
                Выйти
              </BaseButton>
            </div>
          </div>
        </Form>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};
