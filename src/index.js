import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { ProductPage } from './pages/product/ProductPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ProductPage />
  </React.StrictMode>
);

reportWebVitals();