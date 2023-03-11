import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <div className="profile">
      <div className="profile__controls">
        <span
          className="profile__back"
          onClick={() => navigate(-1)}>{`< Назад`}</span>
        <h1 className="profile__title">Мои данные</h1>
      </div>
      <div className="profile__info">
        <form className='profile__info_form'>
          <input
            className={`auth__input`}
            type="text"
            name="name"
            placeholder="Имя"
            defaultValue={currentUser.name}
          />
          <input
            className={`auth__input`}
            type="text"
            name="about"
            placeholder="Обо мне"
            defaultValue={currentUser.about}
          />
          <input
            className={`auth__input`}
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            disabled
          />
        </form>
      </div>
      <div className="profile__logout"></div>
    </div>
  );
};
