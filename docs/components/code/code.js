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
        language: PropTypes.oneOf(['javascript', 'css', 'terminal']),
        bgTransparent: PropTypes.bool,
        inline: PropTypes.bool
    }

    componentDidMount() {
        Prism.highlightElement(this.$el.current)
    }

    render() {
        let {children, inline, bgTransparent, language = 'javascript'} = this.props;
        let className = cn(`language-${language}`, css.el, {
            [css.inline]: inline,
            [css.bgTransparent]: bgTransparent
        })

        if (inline) {
            return <code className={className} ref={this.$el}>{children}</code>
        }

        return (
            <pre
                className={className}
                ref={this.$el}
            >
                <code>
                    {children}
                </code>
            </pre>
        );
    }
}

