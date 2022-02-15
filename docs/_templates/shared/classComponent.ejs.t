import React from 'react';
import PropTypes from 'prop-types';

import css from './<%= name %>.module.scss';

export default class <%= Name %> extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={css.el}>

            </div>
        );
    }
}
