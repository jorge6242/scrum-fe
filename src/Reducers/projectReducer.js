import {
    ACTIONS
} from '../Actions/projectActions';

const initialState = {
    projects: [],
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                projects: action.payload,
            };
        default:
            return state;
    }
};

export default projectReducer;