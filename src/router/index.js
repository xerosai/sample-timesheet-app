/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 19:38
 */

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../components/Shared/Header';
import LoginForm from '../components/Login/LoginForm';
import UserDetail from '../components/User/UserDetail';
import ClientList from '../components/Clients/ClientList';
import TimesheetEntryList from '../components/Timesheet/TimesheetList';
import TimesheetEntryForm from '../components/Timesheet/TimesheetEntryForm';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route path="/" component={LoginForm} exact={true} />
                    <Route path="/me" component={UserDetail} />
                    <Route path="/clients" component={ClientList} exact={true} />
                    <Route path="/timesheets" component={TimesheetEntryList} exact={true}/>
                    <Route path="/timesheets/edit" component={TimesheetEntryForm} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
