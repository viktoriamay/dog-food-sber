import { useContext } from 'react';
import { CardContext } from '../../context/CardContext';
import { UserContext } from '../../context/UserContext';
import { CardList } from '../../components/CardList/CardList';

export const Favorites = () => {
  const { favorites } = useContext(CardContext);
  const { handleProductLike } = useContext(UserContext);

  return (
    <>
      <div>
        <h3>Избранное</h3>
        <div className='content__cards'>
          <CardList cards={favorites} onProductLike={handleProductLike} />
        </div>
      </div>
    </>
  );
};