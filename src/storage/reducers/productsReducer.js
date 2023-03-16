const initialState = {
  list: null,
  total: null,
  isLoading: false,
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'PRODUCTS_ALL_ADD':
      return { ...state, list: action.payload.products, total: action.payload.total};
    case 'PRODUCTS_SET_IS_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

export default productsReducer;
