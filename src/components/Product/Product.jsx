import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import s from './Product.module.css';
import { ReactComponent as Save } from './img/save.svg';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import { ReactComponent as Basket } from './img/basket.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Rating } from '../Rating/Rating';
import api from './../../utils/api';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';

import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from './../../constants/constants';

export const Product = ({
  pictures,
  name,
  price,
  discount,
  onProductLike,
  likes = [],
  currentUser,
  description,
  reviews,
  onSendReview,
  deleteReview,
  stock,
}) => {
  const discount_price = Math.round(price - (price * discount) / 100);
  const isLike = likes.some((id) => id === currentUser?._id);
  const desctiptionHTML = { __html: description };

  const [isClicked, setClicked] = useState(isLike);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [counterCart, setCounterCart] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(reviews?.slice(0, 2));

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('name=dear')) {
      navigate('/');
    }
  }, [location.search]);

  const onLike = (e) => {
    onProductLike(e);
    setClicked((state) => !state);
  };

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);

  const getUser = (id) => {
    if (!users.length) return '';
    const user = users.find((el) => el._id === id);
    return user?.name ?? user;
  };

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const reviewRegister = register('text', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    minLength: {
      value: 5,
      message: 'Минимум 5 символов',
    },
    /* pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.email
    } */
  });

  const sendReview = (data) => {
    onSendReview({ ...data, rating });
    setShowForm(false);
  };

  const handleCart = () => {
    const goods = localStorage.getItem('goods');
    if (!goods) {
      localStorage.setItem('goods', JSON.stringify([{ name, counterCart }]));
    } else {
      localStorage.setItem(
        'goods',
        JSON.stringify([...JSON.parse(goods), { name, counterCart }]),
      );
    }
  };

  const showMore = () => {
    setReviewsProduct((state) => {
      return [...reviews?.slice(0, state.length + 2)];
    });
  };

  const hideReviews = () => {
    setReviewsProduct(() => {
      return [...reviews?.slice(0, 2)];
    });
  };

  return (
    <>
      <div>
        <button onClick={handleClickBack} className="btn btn__back">
          Назад
        </button>
        <h1 className={s.productTitle}>{name}</h1>
        <div className={s.rate__info}>
          <span>
            {' '}
            Артикул: <b>238907</b>{' '}
          </span>
          <Rating isEditable={true} rating={rating} setRating={setRating} />
          <span className={s.reviews__count}>
            {reviews?.length} отзывов
          </span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
          {!!discount && (
            <span className={cn(s.price, 'card__price_type_discount')}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button
                className={s.minus}
                onClick={() =>
                  counterCart > 0 && setCounterCart(counterCart - 1)
                }>
                -
              </button>
              <span className={s.num}>{counterCart}</span>
              <button
                className={s.plus}
                onClick={() =>
                  counterCart < stock && setCounterCart(counterCart + 1)
                }>
                +
              </button>
            </div>
            <button
              className={cn('btn', 'btn_type_primary', 'btn__card', s.cart)}
              onClick={handleCart}>
              В корзину
            </button>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isClicked })}
            onClick={(e) => onLike(e)}>
            <Save />
            <span>{isLike ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} dangerouslySetInnerHTML={desctiptionHTML}></p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
      <div className={s.reviews}>
        <div className={s.reviews__control}>
          <h2 className={s.title}>Отзывы</h2>
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn">
              Написать отзыв
            </button>
          ) : (
            <Form
              className={s.form}
              handleFormSubmit={handleSubmit(sendReview)}
              title="Оставить отзыв">
              <div className={s.form__review__rating}>
                Ваша оценка{' '}
                <Rating
                  isEditable={true}
                  rating={rating}
                  setRating={setRating}
                />
              </div>
              <div className={s.form__rating}>
                <textarea
                  {...reviewRegister}
                  className={`${s.auth__textarea} ${
                    errors?.email ? 'auth__textarea_error' : ''
                  }`}
                  type="text"
                  name="text"
                  placeholder="Оставьте ваш отзыв"
                />
                {errors.textarea && (
                  <p className="auth__error">{errors?.textarea.message}</p>
                )}
              </div>
              <div className="auth__actions">
                <BaseButton type="submit" color={'yellow'}>
                  Отправить
                </BaseButton>
              </div>
            </Form>
          )}
          <div className={s.reviews__hide_more}>
            <p onClick={showMore} className={s.review__more}>
              Ещё отзывы
            </p>
            <p onClick={hideReviews} className={s.review__more}>
              Свернуть отзывы
            </p>
          </div>
        </div>
        {reviewsProduct
          ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((e) => (
            <div className={s.review} key={e._id}>
              <div className={s.review__author}>
                <div className={s.review__info}>
                  <span>{getUser(e.author)}</span>
                  <span className={s.review__date}>
                    {new Date(e.created_at).toLocaleString('ru', options)}
                  </span>
                  {e.author === currentUser?._id && (
                    <span
                      className={s.basket}
                      onClick={() => deleteReview(e._id)}>
                      <Basket />
                    </span>
                  )}
                </div>
                <Rating rating={e.rating} />
              </div>
              <div className={s.text}>
                <span>«{e.text}»</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};