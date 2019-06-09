import {
 ACTIONS
} from '../Actions/sprintActions';

const initialState = {
 sprints: [],
};

const sprintReducer = (state = initialState, action) => {
 switch (action.type) {
     case ACTIONS.GET_ALL:
         return {
             ...state,
             sprints: action.payload,
         };
     default:
         return state;
 }
};

export default sprintReducer;