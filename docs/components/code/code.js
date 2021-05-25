import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import cn from 'classnames';

import css from './code.module.scss';

export default class Code extends React.Component {
    constructor() {
        super();

        this.$el = React.createRef();
    }

    static propTypes = {
        language: PropTypes.oneOf(['javascript', 'css', ''])
    }

    componentDidMount() {
        Prism.highlightElement(this.$el.current)
    }

    render() {
        let {children, language = 'javascript'} = this.props;
        return (
            <pre className={cn(`language-${language}`, css.el)} ref={this.$el}>
                <code>
                    {children}
                </code>
            </pre>
        );
    }
}

