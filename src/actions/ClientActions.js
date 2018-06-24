/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 08:43
 */

import axios from 'axios';
import {API_CONSTANTS, CLIENT_ACTIONS} from "../constants";

export const setLoading = isLoading => {
    return {
        type: CLIENT_ACTIONS.SET_CLIENTS_LOADING,
        payload: isLoading
    };
};

export const setError = errorString => {
    return {
        type: CLIENT_ACTIONS.SET_CLIENT_ERROR,
        payload: errorString
    };
};

export const setClients = clients => {
    return {
        type: CLIENT_ACTIONS.SET_CLIENTS,
        payload: clients
    };
};

export const getClients = (authToken) => {

    return dispatch => {

        dispatch(setLoading(true));

        const headers = {
            'content-type': 'application/json',
            'x-auth-token': authToken
        };

        const url = `${API_CONSTANTS.ENDPOINT_BASE}${API_CONSTANTS.ENDPOINT_CLIENTS}`;

        axios.get(url, {headers}).then(response => response.data).then(data => {
            dispatch(setLoading(false));

            if (!data['success']) {
                return dispatch(setError('Failed to get clients'));
            }

            dispatch(setClients(data['data']['results']));
        }).catch(err => {
            dispatch(setLoading(false));
        });
    };

};