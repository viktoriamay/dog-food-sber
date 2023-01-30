import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import CardList from '../../components/CardList/card-list';

export const Favorite = () => {
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
