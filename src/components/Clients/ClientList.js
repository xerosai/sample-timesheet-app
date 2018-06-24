/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 21:52
 */

import React from 'react';
import {connect} from 'react-redux';

import {getClients} from "../../actions/ClientActions";
import ClientListItem from './ClientListItem'
import PageHeader from '../Shared/PageHeader';
import ErrorCard from '../Shared/ErrorCard';

class ClientList extends React.Component {

    componentDidMount() {
        this.getClientList();
    }

    getClientList () {
        this.props.getClients(this.props.auth.authToken);
    }

    renderContent() {

        const {clientList} = this.props.clients;

        if (!clientList.length) {
            return (
                <ErrorCard
                    errorTitle="No Clients"
                    errorMessage="No clients were found. Try reloading the list."
                />
            );
        }

        return clientList.map(client => <ClientListItem key={client.id} client={client} />);
    }

    render () {

        return (
            <div className="container">
                <PageHeader
                    headerTitle="Clients"
                />
                <div className="row">
                    <div className="col-lg-12">
                        {this.renderContent()}
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    const {auth, clients} = state;
    return {
        auth, clients
    };
};

const mapActionsToProps = () => {
    return {
        getClients
    };
};

export default connect(mapStateToProps, mapActionsToProps())(ClientList);
