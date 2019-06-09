import {
    ACTIONS
} from '../Actions/teamActions';

const initialState = {
    teams: [],
    usersToAddTeam: [],
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                teams: action.payload,
            };
        case ACTIONS.USERS_ADD_TEAM:
            return {
                ...state,
                usersToAddTeam: action.payload,
            };
        default:
            return state;
    }
};

export default teamReducer;