/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 18:40
 */

import {TIMESHEET_ACTIONS} from "../constants";

const INITIAL_STATE = {
    timesheetList: [],
    loadingTimesheets: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TIMESHEET_ACTIONS.SET_TIMESHEETS:
            return {...state, ...INITIAL_STATE, timesheetList: action.payload};
        default:
            return state;
    }
};
