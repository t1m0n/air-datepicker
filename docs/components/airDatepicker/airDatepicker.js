import React from 'react';
import PropTypes from 'prop-types';
import Datepicker from '../../../dist';
import cn from 'classnames';
import Input from 'components/form/input';
import isEqual from 'react-fast-compare';
import enLocale from '../../../dist/locale/en';
import ruLocale from '../../../dist/locale/ru';
import {withRouter} from 'next/router';

import css from './airDatepicker.module.scss';


class AirDatepicker extends React.Component {
    $el = React.createRef();

    constructor() {
        super();
    }

    static propTypes = {
        dpClassName: PropTypes.string,
        inline: PropTypes.bool,
        inlineInput: PropTypes.bool,
        readonly: PropTypes.bool,
    }

    componentDidMount(){
        this.dp = new Datepicker(this.$el.current, {
            inline: this.props.inline || this.props.inlineInput,
            locale: this.props.router.locale === 'ru' ? ruLocale : enLocale,
            ...this.props
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!isEqual(prevProps, this.props)) {
            this.dp.update({...this.props,
                locale: this.props.router.locale === 'ru' ? ruLocale : enLocale
            });
        }
    }

    componentWillUnmount() {
        this.dp.destroy();
    }

    render() {
        let {inline, inlineInput,  dpClassName, placeholder, readonly} = this.props;

        return (
            <>
                {inline
                    ? <div className={cn(css.inlineContainer, dpClassName)} ref={this.$el} />
                    : inlineInput
                        ? null
                        : <Input ref={this.$el} placeholder={placeholder} readonly={readonly} />
                }
                {inlineInput && <Input ref={this.$el} placeholder={placeholder} readonly={readonly} />}
            </>
        );
    }
}


let version = Datepicker.version;
export {version};

export default withRouter(AirDatepicker);
