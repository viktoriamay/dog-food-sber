import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from './../pages/catalog/CatalogPage';
import { ProductPage } from './../pages/product/ProductPage';
import { NoMatchFound } from './../pages/NoMatchFound/NoMatchFound';

export const Router = ({cards, currentUser, handleProductLike}) => {
  return (
    <Routes>
      <Route
        path='/' element={
          <CatalogPage
            cards={cards}
            currentUser={currentUser}
            handleProductLike={handleProductLike}
          />
        }>
      </Route>
      <Route path='/product/:productId' element={<ProductPage />}></Route>
      <Route path='*' element={<NoMatchFound />}></Route>
    </Routes>
  )
}