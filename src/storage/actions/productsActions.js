import api from './../../utils/api';

export function addAllProducts(data) {
  return {
    type: 'PRODUCTS_ALL_ADD',
    payload: data,
  };
}

export function productsIsLoading(isLoading) {
  return {
    type: 'PRODUCTS_SET_IS_LOADING',
    payload: isLoading,
  };
}

export function getAllProducts() {
  return (dispatch, getState) => {
    dispatch(productsIsLoading(true));
    api
      .getProductsList()
      .then((data) => dispatch(addAllProducts(data)))
      .finally(() => dispatch(productsIsLoading(false)))
  };
}
