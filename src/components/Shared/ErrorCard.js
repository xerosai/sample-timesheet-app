/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 21 2018 @ 17:34
 */

import React from 'react';

const ErrorCard = props => {
    return (
        <div className="card">
            <div className="card-body p-4">
                <h3 className="text-center text-muted">
                    <i className="fa fa-exclamation-triangle fa-fw fa-3x" />
                </h3>
                <h3 className="card-title text-center text-muted">{props.errorTitle}</h3>
                <p className="card-text text-center text-muted">{props.errorMessage}</p>
            </div>
        </div>
    );
};

export default ErrorCard;
