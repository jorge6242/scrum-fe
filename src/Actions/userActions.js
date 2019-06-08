import User from '../Api/User';
import {
    ACTIONS as ACTIONS_FORM
} from './userFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'user/get_all',
    GET: 'user/get',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await User.getAll();
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
        } = await User.create(body);
        let response = [];
        if (status === 200 || status === 201) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'User Created!',
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
        } = await User.get(id);
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
        } = await User.update(body);
        let response = [];
        if (status === 200) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'User Updated!',
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
        } = await User.remove(id);
        let response = [];
        if (status === 200) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'User Removed!',
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