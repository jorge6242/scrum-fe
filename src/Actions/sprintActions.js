import Sprint from '../Api/Sprint';
import {
    ACTIONS as ACTIONS_FORM
} from './sprintFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'sprint/get_all',
    GET: 'sprint/get',
    SELECTED_SPRINT: 'sprint_selected_sprint',
    GET_SPRINTS_FROM_PROJECT: 'sprint/get_sprints_from_project',
    GET_SPRINTS_FROM_PROJECT1: 'sprint/get_sprints_from_project1',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Sprint.getAll();
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

export const create = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Sprint.create(body);
        let response = [];
        if (status === 200 || status === 201) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Sprint Created!',
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
            data: { data },
            status
        } = await Sprint.get(id);
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

export const update = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Sprint.update(body);
        let response = [];
        if (status === 200) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Sprint Updated!',
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
        } = await Sprint.remove(id);
        let response = [];
        if (status === 200) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Sprint Removed!',
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

export const setSelectedSprint = sprint => ({ type: ACTIONS.SELECTED_SPRINT, payload: sprint });

export const getSprintsProject = project => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Sprint.getSprintsProject(project);
        let response = [];
        if (status === 200) {
            response = data;
            dispatch({
                type: ACTIONS.GET_SPRINTS_FROM_PROJECT,
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

export const getSprintsFromProject = project => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Sprint.getSprintsFromProject(project);
        let response = [];
        if (status === 200) {
            response = data;
            dispatch({
                type: ACTIONS.GET_SPRINTS_FROM_PROJECT1,
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