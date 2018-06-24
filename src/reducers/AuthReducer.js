/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 18:35
 */

import {AUTH_ACTIONS} from "../constants";

const INITIAL_STATE = {
    authToken: undefined,
    user: undefined,
    username: '',
    password: '',
    error: '',
    processingLogin: false
};

export default (state = INITIAL_STATE, action) => {

    console.log(`Auth Reducer Action: `, action);

    switch (action.type) {
        case AUTH_ACTIONS.SET_AUTH_ERROR:
            return {...state, error: action.payload, processingLogin: false};
        case AUTH_ACTIONS.SET_AUTH_IN_PROGRESS:
            return {...state, processingLogin: action.payload};
        case AUTH_ACTIONS.SET_AUTH_TOKEN:
            return {...state, ...INITIAL_STATE, authToken: action.payload};
        case AUTH_ACTIONS.SET_LOGIN_CREDENTIAL:
            return {...state, [action.payload.prop]: action.payload.value};
        case AUTH_ACTIONS.SET_USER:
            return {...state, user: action.payload, processingLogin: false};
        default:
            return state;
    }
};

