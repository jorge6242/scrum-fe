import {
    ACTIONS
  } from '../Actions/projectFormActions';
  
  const initialState = {
    id: 0,
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  };
  
  const projectFormReducer = (state = initialState, action) => {
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
  
  export default projectFormReducer;