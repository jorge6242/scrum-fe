import {
 ACTIONS
} from '../Actions/backlogFormActions';

const initialState = {
 id: '',
 name: '',
};

const backlogFormReducer = (state = initialState, action) => {
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

export default backlogFormReducer;