/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 18:51
 */

import axios from 'axios';
import {API_CONSTANTS, AUTH_ACTIONS} from "../constants";

export const setAuthToken = (authToken = undefined) => {
    return {
        type: AUTH_ACTIONS.SET_AUTH_TOKEN,
        payload: authToken
    };
};

export const setUser = (user = undefined) => {
    return {
        type: AUTH_ACTIONS.SET_USER,
        payload: user
    };
};

export const loginCredentialsChanged = ({prop, value}) => {
    return {
        type: AUTH_ACTIONS.SET_LOGIN_CREDENTIAL,
        payload: {prop, value}
    };
};

export const setProcessingAuth = isAuthenticating => {
    return {
        type: AUTH_ACTIONS.SET_AUTH_IN_PROGRESS,
        payload: isAuthenticating
    };
};

export const setAuthError = errorString => {
    return {
        type: AUTH_ACTIONS.SET_AUTH_ERROR,
        payload: errorString
    };
};


export const authenticateUser = ({username, password}) => {

    console.log(`Attempting to authenticate user with username: ${username} and password: ${password}`);

    return dispatch => {
        dispatch(setProcessingAuth(true));
        dispatch(setAuthError(undefined));

        const url = `${API_CONSTANTS.ENDPOINT_BASE}${API_CONSTANTS.ENDPOINT_LOGIN}`;

        const payload = {username, password};

        axios.post(url, payload).then(response => response.data).then(data => {
            console.log(data);

            if (!data['success']) {
                dispatch({
                    type: AUTH_ACTIONS.SET_AUTH_ERROR,
                    payload: 'Failed to login user'
                });
                return;
            }

            const dataObj = data.data;

            dispatch(setAuthToken(dataObj.authToken));
            localStorage.setItem('authToken', dataObj.authToken);
        }).catch(err => {
            console.log(err);
            dispatch(setAuthError(`Failed to login with the following error: ${err.toString()}`))
        });
    }
};

export const getCurrentUser = authToken => {

    return dispatch => {
        dispatch(setProcessingAuth(true));

        const headers = {
            'content-type': 'application/json',
            'x-auth-token': authToken
        };

        console.log(headers);

        const url = `${API_CONSTANTS.ENDPOINT_BASE}${API_CONSTANTS.ENDPOINT_CURRENT_USER}`;

        axios.get(url, {headers}).then(response => response.data).then(data => {

            console.log(data);

            if (!data['success']) {
                dispatch(setAuthError('Failed to get user details'));
                return;
            }

            const dataObj = data.data;
            dispatch(setUser(dataObj.userAccount));
        }).catch(err => {
            console.log(err);
            dispatch(setAuthError(`Failed to get user details with error: ${err.toString()}`));
        })
    }
}