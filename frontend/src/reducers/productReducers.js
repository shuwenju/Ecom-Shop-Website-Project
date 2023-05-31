import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
} from '../constants/productConstants'
//in order to use this reducer, we have to add it to our store *******

export const productListReducer = (state = { products: [] }, action) => {
  //reducer takes in initial state and action, we will dispatch this action to this reducer
  // this action will be an object that has a type, also contain a payload(with product in it that we fetch from the server).

  //we want to evaluate the type in the action object
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] } // when we make the req, we want the components to know its fetching
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  // usually we would set product to be {}, but reviews is an entity itself so we have to set to empty array at first
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state } // when we make the req, we want the components to know its fetching
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  // usually we would set product to be {}, but reviews is an entity itself so we have to set to empty array at first
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true } // when we make the req, we want the components to know its fetching
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
