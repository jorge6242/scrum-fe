import {
  ACTIONS
} from '../Actions/roleActions';

const initialState = {
  roles: [],
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
      case ACTIONS.GET_ALL:
          return {
              ...state,
              roles: action.payload,
          };
      default:
          return state;
  }
};

export default roleReducer;