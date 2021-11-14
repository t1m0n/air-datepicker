import React from 'react';
import PropTypes from 'prop-types';

import css from './note.module.scss';

function Note({children} = {}) {
    return (
        <div className={css.el}>
            {children}
        </div>
    );
}

Note.propTypes = {
    children: PropTypes.any
};

export default Note;
