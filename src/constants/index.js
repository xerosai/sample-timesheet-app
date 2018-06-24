/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 19:18
 */
import * as ACTIONS_CONSTANTS from './actionConstants';

// API related constants
export const API_CONSTANTS = {
    ENDPOINT_BASE: 'http://localhost:8101/api/v1',
    ENDPOINT_LOGIN: '/accounts/login',
    ENDPOINT_CLIENTS: '/clients',
    ENDPOINT_CURRENT_USER: '/accounts/me',
    ENDPOINT_TIMESHEETS: '/timesheets'
};


export const AUTH_ACTIONS = ACTIONS_CONSTANTS.AUTH_ACTIONS;
export const CLIENT_ACTIONS = ACTIONS_CONSTANTS.CLIENT_ACTIONS;
export const TIMESHEET_ACTIONS = ACTIONS_CONSTANTS.TIMESHEET_ACTIONS;