/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 07:38
 */

import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {

    componentDidMount() {
        // console.log(this.props);
    }

    logoutUser () {
        localStorage.removeItem('authToken');
        this.props.history.push('/')
    }

    render () {
        return (
            <nav className="navbar navbar-light bg-light">
                <NavLink to="/timesheets">Timesheets App</NavLink>

                {
                    this.props.auth.authToken &&
                    (<ul className="nav justify-content-end">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/timesheets"
                            >
                                Timesheets
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/clients"
                            >
                                Clients
                            </NavLink>

                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={this.logoutUser.bind(this)}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>)
                }

            </nav>
        );
    }

};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default withRouter(connect(mapStateToProps)(Header));