/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 21:53
 */

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getCurrentUser} from "../../actions/AuthActions";
import DefaultCard from '../Shared/DefaultCard';

class UserDetail extends React.Component {

    componentDidMount () {
        console.log(this.props);

        if (!this.props.authToken) {
            this.props.history.push('/');
            return;
        }

        console.log(`Fetch user detail`);

        this.props.getCurrentUser(this.props.authToken);
    }

    renderContent() {

        const user = this.props.user;

        if (this.props.processingLogin || !user) {
            return (
                <div>
                    Loading user details
                </div>
            );
        }

        return (
            <div>
                <h3 className="card-body__title">
                    ID
                </h3>
                <p className="card-text">
                    {user.id}
                </p>
                <h3 className="card-body__title">
                    Username
                </h3>
                <p className="card-text">
                    {user.username}
                </p>
                <h3 className="card-body__title">
                    Email Address
                </h3>
                <p className="card-text">
                    {user.emailAddress}
                </p>
                <h3 className="card-body__title">
                    Phone Number
                </h3>
                <p className="card-text">
                    {user.phoneNumber}
                </p>
                <h3 className="card-body__title">
                    Street Address
                </h3>
                <p className="card-body">
                    {user.streetAddress}
                </p>
            </div>
        )
    }

    render () {
        return (
            <div>
                User Detail Form
                <DefaultCard>
                    {this.renderContent()}
                </DefaultCard>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user, processingLogin, authToken} = state.auth;
    return {
        user, processingLogin, authToken
    };
};

const mapActionsToProps = () => {
    return {
        getCurrentUser
    };
};

export default withRouter(connect(mapStateToProps, mapActionsToProps())(UserDetail));