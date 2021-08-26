import React from 'react';
import PropTypes from 'prop-types';
import Datepicker from 'air-datepicker';
import cn from 'classnames';
import Input from 'components/form/input';
import isEqual from 'react-fast-compare';

import css from './airDatepicker.module.scss';

export default class AirDatepicker extends React.Component {
    $el = React.createRef();

    constructor() {
        super();
    }

    static propTypes = {
        dpClassName: PropTypes.string,
        inline: PropTypes.bool,
        inlineInput: PropTypes.bool
    }

    componentDidMount(){
        this.dp = new Datepicker(this.$el.current, {
            inline: this.props.inline || this.props.inlineInput,
            ...this.props
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!isEqual(prevProps, this.props)) {
            this.dp.update(this.props);
        }
    }

    render() {
        let {inline, inlineInput,  dpClassName, placeholder} = this.props;

        return (
            <>
                {inline
                    ? <div className={cn(css.inlineContainer, dpClassName)} ref={this.$el} />
                    : inlineInput
                        ? null
                        : <Input ref={this.$el} placeholder={placeholder} />
                }
                {inlineInput && <Input ref={this.$el} placeholder={placeholder} />}
            </>
        );
    }
}
