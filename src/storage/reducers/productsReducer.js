const initialState = {
  data: [],
  isLoading: false,
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'PRODUCTS_ALL_ADD':
      return { ...state, data: action.payload };
    case 'PRODUCTS_SET_IS_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

export default productsReducer;
