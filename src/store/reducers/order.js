import * as actionType from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state, action) => {
  switch(action.type) {
    case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionType.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderID
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state
  }
};

export default reducer;
