import {
  ACTIONS
} from '../Actions/productFormActions';

const initialState = {
  id: '',
  name: '',
};

const productFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_EDIT:
      return {
        ...state, ...action.payload
      };
    case ACTIONS.CLEAR:
      return {
        ...state, ...initialState
      };
    case ACTIONS.CLEAR1:
      return {
        ...state, ...action.payload
      };
    default:
      return state;
  }
};

export default productFormReducer;