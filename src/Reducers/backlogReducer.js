import {
    ACTIONS
} from '../Actions/backlogActions';

const initialState = {
    backlogs: [],
    mainBacklogs: [],
    mainBacklogSprint: [],
};

const backlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                backlogs: action.payload,
            };
        case ACTIONS.GET_MAIN_BACKLOG:
            return {
                ...state,
                mainBacklogs: action.payload,
            };
        case ACTIONS.GET_MAIN_BACKLOG_SPRINT:
            return {
                ...state,
                mainBacklogSprint: action.payload,
            };
        case ACTIONS.UPDATE:
            return {
                ...state,
                backlogs: action.payload,
            };
        default:
            return state;
    }
};

export default backlogReducer;