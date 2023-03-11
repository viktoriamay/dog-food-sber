import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { Form } from './../Form/Form';
import { useForm } from 'react-hook-form';
import { BaseButton } from './../BaseButton/BaseButton';
import { VALIDATE_CONFIG } from './../../constants/constants';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const sendData = (data) => {
    console.log(data);
  };

  console.log({ errors });

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
                  required: {
                    value: true,
                    message: VALIDATE_CONFIG.requiredMessage,
                  },
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
                  required: {
                    value: true,
                    message: VALIDATE_CONFIG.requiredMessage,
                  },
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
          </div>
          <BaseButton type="submit" color={'yellow'}>
            Сохранить
          </BaseButton>
        </Form>
      ) : (
        <>Loading</>
      )}
      <div className="profile__logout"></div>
    </div>
  );
};
