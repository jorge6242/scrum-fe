import {
 ACTIONS
} from '../Actions/backlogActions';

const initialState = {
 backlogs: [],
};

const backlogReducer = (state = initialState, action) => {
 switch (action.type) {
     case ACTIONS.GET_ALL:
         return {
             ...state,
             users: action.payload,
         };
     case ACTIONS.UPDATE:
         return {
             ...state,
             users: action.payload,
         };
     default:
         return state;
 }
};

export default backlogReducer;