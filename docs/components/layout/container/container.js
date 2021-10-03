import React from 'react';
import cn from 'classnames';

import css from './container.module.scss';

function Container({children, className} = {}) {
    return (
        <div className={cn(css.el, className)}>
            {children}
        </div>
    );
}

export default Container;
