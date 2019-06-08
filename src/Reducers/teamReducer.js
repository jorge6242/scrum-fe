import {
    ACTIONS
} from '../Actions/teamActions';

const initialState = {
    teams: [],
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                teams: action.payload,
            };
        default:
            return state;
    }
};

export default teamReducer;