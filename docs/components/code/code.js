import React from 'react';
import PropTypes from 'prop-types';
import {highlightElement} from 'prismjs';
import cn from 'classnames';

import css from './code.module.scss';

export default class Code extends React.Component {
    constructor() {
        super();

        this.$el = React.createRef();
    }

    static propTypes = {
        language: PropTypes.oneOf(['javascript', 'css', 'terminal', 'typescript']),
        bgTransparent: PropTypes.bool,
        isFieldName: PropTypes.bool,
        inline: PropTypes.bool,
        className: PropTypes.string,
    }

    componentDidMount() {
        highlightElement(this.$el.current)
    }

    render() {
        let {children, inline, bgTransparent, isFieldName, className, language = 'javascript'} = this.props;
        let _className = cn(`language-${language}`, className, css.el, {
            [css.inline]: inline,
            [css.bgTransparent]: bgTransparent,
            [css.isFieldName]: isFieldName
        })

        if (inline) {
            return <code className={_className} ref={this.$el}>{children}</code>
        }

        return (
            <pre
                className={_className}
                ref={this.$el}
            >
                <code>
                    {children}
                </code>
            </pre>
        );
    }
}

