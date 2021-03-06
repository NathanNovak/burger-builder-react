import * as actionTypes from './actionsTypes';
import axios from '../../axiosOrder';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
      dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(res => {
       dispatch(purchaseBurgerSuccess(res.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
};
