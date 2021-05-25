---
to: components/<%= directory && (directory + '/') %><%= name %>/<%= name %>.js
---

import React from 'react';
import PropTypes from 'prop-types';

import css from './<%= name %>.module.scss';

function <%= Name %>({} = {}) {
    return (
        <div className={css.el}>

        </div>
    );
}

<%= Name %>.propTypes = {};

export default <%= Name %>;
