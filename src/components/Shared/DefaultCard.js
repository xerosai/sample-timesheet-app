/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 20 2018 @ 22:30
 */

import React from 'react';

const DefaultCard = props => {
    return (
        <div className="card">
            <div className="card-block">
                {props.children}
            </div>
        </div>
    );
};

export default DefaultCard;
