/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 18:20
 * @description Login Form Component
 */

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginCredentialsChanged, authenticateUser, setAuthToken} from '../../actions/AuthActions';

class LoginForm extends React.Component {

    componentWillMount() {
        console.log(this.props);

        if (this.props.auth.authToken) {
            this.props.history.push('/timesheets');
        }
    }

    componentDidUpdate (prevProps) {
        console.log('component updated');
        console.log('current props: ', this.props);
        console.log('previous props: ', prevProps);

        if (this.props.auth.authToken) {
            console.log('will redirect user to dashboard');
            this.props.history.push('/timesheets');
        }
    }

    processLoginForm = e => {
        e.preventDefault();

        // check length of values
        const {username, password} = this.props.auth;

        if (!username || !password) {
            alert('Please enter a username and password before continuing');
            return;
        }

        this.props.authenticateUser({username, password});
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-center">
                        <div className="card mt-4">
                            <div className="card-header">Login to Timesheets</div>
                            <div className="card-body">
                                <p className="card-text">Use the form below to login with your username and password.</p>
                                <form
                                    className="form"
                                    onSubmit={this.processLoginForm}
                                >
                                    <div className="form-group">
                                        <label className="text-muted">Username *</label>
                                        <input
                                            className="form-control"
                                            onChange={e => this.props.loginCredentialsChanged({prop: 'username', value: e.target.value})}
                                            placeholder="john.doe"
                                            required
                                            type="text"
                                            value={this.props.auth.username}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-muted">Password *</label>
                                        <input
                                            className="form-control"
                                            onChange={e => this.props.loginCredentialsChanged({prop: 'password', value: e.target.value})}
                                            placeholder="********"
                                            required
                                            type="password"
                                            value={this.props.auth.password}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn btn-block btn-primary">
                                                Login
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
        auth: state.auth
    };
};

const mapActionsToProps = () => {
    return {
        loginCredentialsChanged,
        authenticateUser,
        setAuthToken
    }
};

export default withRouter(connect(mapStateToProps, mapActionsToProps())(LoginForm));