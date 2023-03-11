import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { Form } from './../Form/Form';
import { useForm } from 'react-hook-form';
import { BaseButton } from './../BaseButton/BaseButton';

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

  return (
    <div className="profile">
      <div className="profile__controls">
        <span
          className="profile__back"
          onClick={() => navigate(-1)}>{`< Назад`}</span>
        <h1 className="profile__title">Мои данные</h1>
      </div>
      {currentUser ? (
        <Form
          className=""
          handleFormSubmit={handleSubmit(sendData)}>
          <div className="profile__info_form">
            <input
              className="auth__input"
              type="text"
              name="name"
              placeholder="Имя"
              defaultValue={currentUser.name}
            />
            <input
              className="auth__input"
              type="text"
              name="about"
              placeholder="Обо мне"
              defaultValue={currentUser.about}
            />
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
