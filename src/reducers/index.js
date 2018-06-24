/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 18:34
 */

import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import ClientsReducer from './ClientsReducer';
import TimesheetsReducer from './TimesheetsReducer';

export default combineReducers({
    auth: AuthReducer,
    clients: ClientsReducer,
    timesheets: TimesheetsReducer
});
