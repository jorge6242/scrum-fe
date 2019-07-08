import Role from '../Api/Role';
import {
    ACTIONS as ACTIONS_FORM
} from './roleFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'role/get_all',
    GET: 'role/get',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Role.getAll();
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
        } = await Role.create(body);
        let response = [];
        if (status === 200 || status === 201) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Team Created!',
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
        } = await Role.get(id);
        let teamResponse = [];
        if (status === 200) {
            teamResponse = data;
            dispatch({
                type: ACTIONS_FORM.SET_EDIT,
                payload: data
            });
        }
        return teamResponse;
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
        } = await Role.update(body);
        let teamResponse = [];
        if (status === 200) {
            teamResponse = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Team Updated!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return teamResponse;
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
        } = await Role.remove(id);
        let teamResponse = [];
        if (status === 200) {
            teamResponse = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Team Removed!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return teamResponse;
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

export const createUsersTeam = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Role.createUsersTeam(body);
        let response = [];
        if (status === 200 || status === 201) {
            response = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'User Team Created!',
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

export const selectedUsers = users => ({ type: ACTIONS.USERS_ADD_TEAM, payload: users });