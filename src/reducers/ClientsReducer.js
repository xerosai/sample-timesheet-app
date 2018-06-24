/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 18:39
 */

import {CLIENT_ACTIONS} from "../constants";

const INITIAL_STATE = {
    clientList: [],
    loadingList: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLIENT_ACTIONS.SET_CLIENT_ERROR:
            return {...state, error: action.payload};
        case CLIENT_ACTIONS.SET_CLIENTS_LOADING:
            return {...state, loadingList: action.payload};
        case CLIENT_ACTIONS.SET_CLIENTS:
            return {...state, ...INITIAL_STATE, clientList: action.payload};
        default:
            return state;
    }
};
