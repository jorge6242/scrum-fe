import Sprint from '../Api/Sprint';
import {
    ACTIONS as ACTIONS_FORM
} from './sprintFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'sprint/get_all',
    GET: 'sprint/get',
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