import {
 ACTIONS
} from '../Actions/sprintActions';

const initialState = {
 sprints: [],
 selectedSprint: {},
 sprintsProject: [],
};

const sprintReducer = (state = initialState, action) => {
 switch (action.type) {
     case ACTIONS.GET_ALL:
         return {
             ...state,
             sprints: action.payload,
         };
    case ACTIONS.SELECTED_SPRINT:
        return {
            ...state,
            selectedSprint: action.payload,
        };
    case ACTIONS.GET_SPRINTS_FROM_PROJECT:
        return {
            ...state,
            sprintsProject: action.payload,
        };
     default:
         return state;
 }
};

export default sprintReducer;