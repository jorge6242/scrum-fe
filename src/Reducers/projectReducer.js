import {
    ACTIONS
} from '../Actions/projectActions';

const initialState = {
    projects: [],
    selectedProject: {},
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                projects: action.payload,
            };
        case ACTIONS.SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.payload,
            };
        default:
            return state;
    }
};

export default projectReducer;