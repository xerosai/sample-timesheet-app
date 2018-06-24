/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 01:26
 */

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {API_CONSTANTS} from "../../constants";
import {getClients} from "../../actions/ClientActions";

/**
 * {
	"clientId": 1,
	"startDate": "1529481600",
	"endDate": "1529488800",
	"jobTitle": "Example Job Two",
	"comments": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo."
}
 * */

class TimesheetEntryForm extends React.Component {

    constructor(props) {
        super(props);

        const {timesheetEntry} = this.props;

        this.state = {
            error: '',
            id: timesheetEntry ? timesheetEntry.id : undefined,
            clientId: timesheetEntry ? timesheetEntry.clientId : '',
            startDate: timesheetEntry ? moment(timesheetEntry.startDate) : moment(),
            endDate: timesheetEntry ? moment(timesheetEntry.endDate) : moment(),
            jobTitle: timesheetEntry ? timesheetEntry.jobTitle : '',
            comments: timesheetEntry ? timesheetEntry.comments: '',
            calendarFocused: false,
            loading: false,
            overtime: 0
        }
    }

    componentDidMount () {
        this.getClientList();
    }

    componentWillUpdate () {

    }

    getClientList () {
        if (!this.props.auth.authToken) return;
        this.props.getClients(this.props.auth.authToken);
    }

    onClientIdChange = e => {
        const clientId = e.target.value;
        this.setState(() => {
            return {...this.state, clientId};
        });
    };

    onJobTitleChange = e => {
        const jobTitle = e.target.value;
        this.setState(() => {
            return {...this.state, jobTitle}
        });
    };

    onCommentsChange = e => {
        const comments = e.target.value;
        this.setState(() => {
            return {...this.state, comments}
        });
    };

    onSubmitTimeEntry = e => {
        e.preventDefault();

        const headers = {
            'content-type': 'application/json',
            'x-auth-token': this.props.auth.authToken
        };

        const payload = {
            clientId: this.state.clientId,
            startDate: moment(this.state.startDate).unix(),
            endDate: moment(this.state.endDate).unix(),
            jobTitle: this.state.jobTitle,
            comments: this.state.comments
        };

        console.log(payload);

        let url = `${API_CONSTANTS.ENDPOINT_BASE}${API_CONSTANTS.ENDPOINT_TIMESHEETS}`;

        this.setState(() => {
            return {...this.state, loading: true}
        });

        if (this.state.id) {
            url += `/${this.state.id}`;
            axios.put(url, payload, {headers}).then(response => response.data).then(data => {
                console.log(data);
            }).catch(err => {

            });
        } else {
            axios.post(url, payload, {headers}).then(response => response.data).then(data=> {
                console.log(data);
            }).catch(err => {

            });
        }
    };

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card mt-4">
                            <h5 className="card-header">Add Timesheet</h5>
                            <div className="card-body">
                                <form onSubmit={this.onSubmitTimeEntry}>
                                    <div className="form-group">
                                        <label className="text-muted">Client</label>
                                        <select
                                            name="client"
                                            id="client"
                                            className="form-control"
                                            onChange={this.onClientIdChange}
                                            value={this.state.clientId}
                                        >
                                            <option disabled>Select A Client</option>
                                            {this.props.clients.clientList.map(client => {
                                                return (
                                                    <option key={client.id} value={client.id}>{client.companyName}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted">Job Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.jobTitle}
                                            placeholder="Job / Work Title"
                                            onChange={e => this.onJobTitleChange(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted">Comments</label>
                                        <textarea
                                            name="comments"
                                            id="comments"
                                            cols="30"
                                            rows="4"
                                            className="form-control"
                                            placeholder="Comments or notes about this job"
                                            value={this.state.comments}
                                            onChange={e => this.onCommentsChange(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted">Start Date / Time</label>
                                        <DateTime
                                            input={true}
                                            inputProps={{placeholder: 'Start Date / Time'}}
                                            onChange={startDate => this.setState({startDate, overtime: Math.abs(this.state.endDate - startDate)})}
                                            value={this.state.startDate}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted">End Date / Time</label>
                                        <DateTime
                                            input={true}
                                            inputProps={{placeholder: 'End Date / Time'}}
                                            onChange={endDate => this.setState({endDate, overtime: Math.abs(this.state.startDate - endDate)})}
                                            value={this.state.endDate}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted">Computed Overtime</label>
                                        <input
                                            className="form-control"
                                            disabled
                                            value={(this.state.overtime / 3600000).toFixed(1) + ' hrs'}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn btn-block btn-primary">
                                                Save Entry
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        clients: state.clients
    };
};

const mapActionsToProps = () => {
    return {
        getClients
    };
};


export default withRouter(connect(mapStateToProps, mapActionsToProps())(TimesheetEntryForm));