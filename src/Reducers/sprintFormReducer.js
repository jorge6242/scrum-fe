import {
 ACTIONS
} from '../Actions/sprintFormActions';

const initialState = {
 id: 0,
 name: '', 
 description: '', 
 status: 0, 
 availables_days: 0, 
 start_date: '', 
 end_date: '', 
 project_id: 0,
};

const sprintFormReducer = (state = initialState, action) => {
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

export default sprintFormReducer;