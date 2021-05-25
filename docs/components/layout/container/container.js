import React from 'react';

import css from './container.module.scss';

function Container({children} = {}) {
    return (
        <div className={css.el}>
            {children}
        </div>
    );
}

export default Container;
