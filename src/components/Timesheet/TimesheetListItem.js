/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 06:39
 */

import React from 'react';
import moment from 'moment';

const TimesheetListItem = props => {

    const {timesheetEntry} = props;

    return (
        <div className="card mb-3">
            <h5 className="card-header">{timesheetEntry.jobTitle}</h5>
            <div className="card-body">
                <p className="card-title">
                    <i className="fa fa-building fa-fw" /> Client: {timesheetEntry.client.clientName}
                </p>
                <p className="card-text">
                    <i className="fa fa-file fa-fw" /> {timesheetEntry.comments}
                </p>
                <p className="card-text">
                    <i className="fa fa-calendar fa-fw" /> Clock in: {moment(timesheetEntry.startDate).format('dddd MMM Do YYYY @ h:mm:ss a')}
                </p>
                <p className="card-text">
                    <i className="fa fa-calendar fa-fw" /> Clock out: {moment(timesheetEntry.endDate).format('dddd MMM Do YYYY @ h:mm:ss a')}
                </p>
                <p className="card-text">
                    <i className="fa fa-clock fa-fw" /> Overtime: {timesheetEntry.overtime / 3600} hrs
                </p>

                <a className="btn btn-block btn-primary text-white">
                    View / Edit Entry <i className="fa fa-arrow-right fa-fw" />
                </a>
            </div>
        </div>
    );
};

export default TimesheetListItem;
