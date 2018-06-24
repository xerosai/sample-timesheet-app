/**
 * @author Simon Neufville <simon@xrscodeworks.com / sneufville@teammps.com>
 * Created: June 22 2018 @ 15:51
 */

import React from 'react';

const PageHeader = props => {
    return (
        <header className="mt-2">
            <h1 className="display-4">{props.headerTitle}</h1>
            { props.headerSubtitle && <small>{props.headerSubtitle}</small>}
        </header>
    );
};

export default PageHeader;