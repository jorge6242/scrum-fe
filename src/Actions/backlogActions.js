import Backlog from '../Api/Backlog';
import {
    ACTIONS as ACTIONS_FORM
} from './backlogFormActions';
import snackBarStatus from './snackbarActions';
import { ACTIONS as ACTIONS_SPRINT } from './sprintActions';

export const ACTIONS = {
    GET_ALL: 'backlog/get_all',
    GET_MAIN_BACKLOG: 'backlog/get_main_backlog',
    GET_MAIN_BACKLOG_SPRINT: 'backlog/get_main_backlog_sprint',
    GET_MAIN_BACKLOG_FROM_SPRINT: 'backlog/get_main_backlog_from_sprint',
    GET: 'backlog/get',
    CUSTOM_CLEAR: 'backlog/custom_clear',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: {
                data
            },
            status
        } = await Backlog.getAll();
        let response = [];
        if (status === 200) {
            response = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: response
            });
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const getMainBacklog = project => async dispatch => {
    try {
        const {
            data: {
                data
            },
            status
        } = await Backlog.getMainBacklog(project);
        let response = [];
        if (status === 200) {
            response = data;
            dispatch({
                type: ACTIONS.GET_MAIN_BACKLOG,
                payload: response
            });
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const getMainBacklogSprint = project => async dispatch => {
    try {
        const {
            data: {
                data
            },
            status
        } = await Backlog.getMainBacklogSprint(project);
        let response = [];
        if (status === 200) {
            response = data;
            console.log('data ', data);
            if (data.length > 0) {
                const getCurrentSprint = data.find(backlog => backlog);
            dispatch({
                type: ACTIONS_SPRINT.SELECTED_SPRINT,
                payload: getCurrentSprint.sprint
            });
            }
            dispatch({
                type: ACTIONS.GET_MAIN_BACKLOG_SPRINT,
                payload: response
            });
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const create = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Backlog.create(body);
        let response = [];
        if (status === 200 || status === 201) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Backlog Created!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const get = id => async dispatch => {
    try {
        const {
            data: {
                data
            },
            status
        } = await Backlog.get(id);
        let response = [];
        if (status === 200) {
            response = data;
            dispatch({
                type: ACTIONS_FORM.SET_EDIT,
                payload: data
            });
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const update = (body, title) => async dispatch => {
    try {
        const {
            data,
            status
        } = await Backlog.update(body);
        let response = [];
        if (status === 200) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: `${title === 'Backlog' ? 'Backlog' : 'Task' } Updated!`,
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const remove = id => async dispatch => {
    try {
        const {
            data,
            status
        } = await Backlog.remove(id);
        let response = [];
        if (status === 200) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Project Removed!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const checkTaskSprint = (project, sprint) => async dispatch => {
    try {
        const {
            data: {
                data
            },
            status
        } = await Backlog.checkTaskSprint(project, sprint);
        let response = [];
        if (status === 200) {
            response = data;
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const customBacklogClear = value => ({ type: ACTIONS.CUSTOM_CLEAR, ...value });

export const getMainBacklogFromSprint = project => async dispatch => {
    try {
        const {
            data: {
                data
            },
            status
        } = await Backlog.getMainBacklogFromSprint(project);
        let response = [];
        if (status === 200) {
            response = data;
            if (data.length > 0) {
            }
            dispatch({
                type: ACTIONS.GET_MAIN_BACKLOG_FROM_SPRINT,
                payload: response
            });
        }
        return response;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};