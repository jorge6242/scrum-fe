import Team from '../Api/Team';
import {
    ACTIONS as ACTIONS_FORM
} from './teamFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'team/get_all',
    GET: 'team/get',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Team.getAll();
        let getAllTeam = [];
        if (status === 200) {
            getAllTeam = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: getAllTeam
            });
        }
        return getAllTeam;
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
        } = await Team.create(body);
        let createTeamResponse = [];
        if (status === 200 || status === 201) {
            createTeamResponse = {
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
        return createTeamResponse;
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
        } = await Team.get(id);
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
        } = await Team.update(body);
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
        } = await Team.remove(id);
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