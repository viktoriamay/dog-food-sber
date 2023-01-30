import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from './../pages/catalog/CatalogPage';
import { ProductPage } from './../pages/product/ProductPage';
import { NoMatchFound } from './../pages/NoMatchFound/NoMatchFound';
import { FaqPage } from './../pages/faq/FaqPage';
import { Favorites } from '../pages/favorites/favorites';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<CatalogPage />}></Route>
      <Route path='/product/:productId' element={<ProductPage />}></Route>
      <Route path='/faq' element={<FaqPage />}></Route>
      <Route path='/favorites' element={<Favorites />}></Route>
      <Route path='*' element={<NoMatchFound />}></Route>
    </Routes>
  )
}