import Project from '../Api/Project';
import {
    ACTIONS as ACTIONS_FORM
} from './projectFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'project/get_all',
    GET: 'project/get',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Project.getAll();
        let getAllProjects = [];
        if (status === 200) {
            getAllProjects = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: getAllProjects
            });
        }
        return getAllProjects;
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
        } = await Project.create(body);
        let createProjectResponse = [];
        if (status === 200 || status === 201) {
            createProjectResponse = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Project Created!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return createProjectResponse;
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
        } = await Project.get(id);
        let projectResponse = [];
        if (status === 200) {
            projectResponse = data;
            dispatch({
                type: ACTIONS_FORM.SET_EDIT,
                payload: data
            });
        }
        return projectResponse;
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
        } = await Project.update(body);
        let projectResponse = [];
        if (status === 200) {
            projectResponse = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Project Updated!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return projectResponse;
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
        } = await Project.remove(id);
        let projectResponse = [];
        if (status === 200) {
            projectResponse = {
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
        return projectResponse;
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