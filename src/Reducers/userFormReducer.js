import {
    ACTIONS
  } from '../Actions/userFormActions';
  
  const initialState = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    role_id: 0,
  };
  
  const userFormReducer = (state = initialState, action) => {
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
  
  export default userFormReducer;