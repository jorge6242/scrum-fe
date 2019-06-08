import Auth from '../Api/Auth';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
  LOGIN: 'login/login',
};

export const login = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Auth.login(body);
        let authResponse = [];
        if (status === 200 || status === 201) {
            authResponse = {
                data,
                status
            };
            const { token } = data;
            localStorage.setItem('token', token);
        }
        return authResponse;
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

export const logout = () => {
    localStorage.clear();
    window.location.href = "/";
}
