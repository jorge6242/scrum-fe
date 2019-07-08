import {
  ACTIONS
} from '../Actions/roleFormActions';

const initialState = {
  id: '',
  name: '',
};

const roleFormReducer = (state = initialState, action) => {
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

export default roleFormReducer;