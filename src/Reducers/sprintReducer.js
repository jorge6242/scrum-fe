import {
 ACTIONS
} from '../Actions/sprintActions';

const initialState = {
 sprints: [],
 selectedSprint: {},
 sprintsProject: [],
 sprintsFromProject: [],
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
    case ACTIONS.GET_SPRINTS_FROM_PROJECT1:
        return {
            ...state,
            sprintsFromProject: action.payload,
        };
     default:
         return state;
 }
};

export default sprintReducer;