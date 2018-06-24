/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 02:16
 */

import axios from 'axios';

import {API_CONSTANTS, TIMESHEET_ACTIONS} from '../constants';

export const setTimesheetLoading = isLoading => {
    return {
        type: TIMESHEET_ACTIONS.SET_TIMESHEETS_LOADING,
        payload: isLoading
    };
};

export const setTimesheetsError = errorString => {
    return {
        type: TIMESHEET_ACTIONS.SET_TIMESHEETS_ERROR,
        payload: errorString
    };
};

export const setTimesheetEntries = (entries) => {
    return {
        type: TIMESHEET_ACTIONS.SET_TIMESHEETS,
        payload: entries
    };
};

export const getTimesheetEntries = (authToken) => {
    return dispatch => {

        dispatch(setTimesheetLoading(true));

        const url = `${API_CONSTANTS.ENDPOINT_BASE}${API_CONSTANTS.ENDPOINT_TIMESHEETS}`;

        const headers = {
            'content-type': 'application/json',
            'x-auth-token': authToken
        };

        console.log('using headers: ', headers);

        axios.get(url, {headers}).then(response => response.data).then(data => {
            dispatch(setTimesheetLoading(false));

            console.log(data);

            if (!data['success']) {
                return dispatch(setTimesheetsError('Failed to get timesheets'));
            }

            dispatch(setTimesheetEntries(data['data']['results']));

        }).catch(err => {
            dispatch(setTimesheetLoading(false));
            dispatch(setTimesheetsError(`Failed to get timesheet entries with error: ${err.toString()}`));
        })
    }
};

export const submitTimesheetEntry = (timesheetEntry, authToken) => {
    return dispatch => {

        dispatch(setTimesheetLoading(true));

        const url = `${API_CONSTANTS.ENDPOINT_BASE}${API_CONSTANTS.ENDPOINT_TIMESHEETS}`;

        const headers = {
            'content-type': 'application/json',
            'x-auth-token': authToken
        };

        axios.post(url, timesheetEntry, {headers}).then(response => response.data).then(data => {
            dispatch(setTimesheetLoading(false));

            if (!data['success']) {
                return dispatch(setTimesheetsError('Failed to save timesheet entry'));
            }


        }).catch(err => {
            dispatch(setTimesheetLoading(false));
            dispatch(setTimesheetsError(`Failed to save timesheet entry with error: ${err.toString()}`));
        })
    };
};