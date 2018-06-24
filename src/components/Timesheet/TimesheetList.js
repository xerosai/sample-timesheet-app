/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 06:36
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {setAuthToken} from "../../actions/AuthActions";
import {getTimesheetEntries} from "../../actions/TimesheetEntryActions";

import Header from '../Shared/Header';
import ErrorCard from '../Shared/ErrorCard';
import TimesheetListItem from './TimesheetListItem';

class TimesheetList extends React.Component {

    componentDidMount() {
        console.log(this.props);

        if (!this.props.auth.authToken) {
            this.props.history.push('/');
        }

        this.getTimesheets();
    }

    componentDidUpdate (prevProps) {
        if (!this.props.auth.authToken) {
            console.log('will redirect user to login');
            this.props.history.push('/');
        }
    }

    getTimesheets () {
        this.props.getTimesheetEntries(this.props.auth.authToken);
    }

    renderContent() {

        const timesheetList = this.props.timesheets.timesheetList;

        if (!timesheetList.length) {
            return (
                <ErrorCard
                    errorTitle="Timesheets Not Found"
                    errorMessage="No timesheet entries were found. Click the Add New Entry button above to add one."
                />
            )
        }

        return timesheetList.map(entry => {
            return <TimesheetListItem key={entry.id} timesheetEntry={entry} />
        });
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <header>
                            <h2>Timesheet Entries</h2>
                        </header>
                        <div className="row">
                            <div className="col-lg-6 mb-2">
                                <button
                                    className="btn btn-block btn-primary"
                                    onClick={this.getTimesheets.bind(this)}
                                >
                                    Reload Entries
                                </button>
                            </div>
                            <div className="col-lg-6 mb-2">
                                <Link
                                    className="btn btn-block btn-info text-white"
                                    to="/timesheets/edit"
                                >
                                    <i className="fa fa-plus-circle fa-fw" /> Add New Entry
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row mt-1">
                    <div className="col-lg-12">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        timesheets: state.timesheets
    }
};

const mapActionsToProps = () => {
    return {
        getTimesheetEntries,
        setAuthToken
    };
};

export default withRouter(connect(mapStateToProps, mapActionsToProps())(TimesheetList));