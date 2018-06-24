/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 22 2018 @ 14:56
 */

import React from 'react';

const ClientListItem = props => {

    const {client} = props;

    return (
        <div className="card mb-2">
            <h5 className="card-header">{client.companyName}</h5>
            <div className="card-body">
                <p className="card-text">
                    <i className="fa fa-user fa-fw" /> ID: {client.id}
                </p>
                <p className="card-text">
                    Manager: {client.manager}
                </p>
                <p className="card-text">
                    Phone #: {client.mainPhone}
                </p>
            </div>
        </div>
    )
};

export default ClientListItem;
