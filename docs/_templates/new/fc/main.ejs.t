---
to: components/<%= directory && (directory + '/') %><%= name %>/<%= name %>.js
---

import React from 'react';
import PropTypes from 'prop-types';

import './<%= name %>.module.scss';

function <%= Name %>({} = {}) {
    return (
        <div className='<%= h.changeCase.paramCase(name) %>'>

        </div>
    );
}

<%= Name %>.propTypes = {};

export default <%= Name %>;
