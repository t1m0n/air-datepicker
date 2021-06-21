import React from 'react';
import PropTypes from 'prop-types';
import Datepicker from 'air-datepicker';
import cn from 'classnames';
import Input from 'components/form/input';

import css from './airDatepicker.module.scss';

export default class AirDatepicker extends React.Component {
    $el = React.createRef();

    constructor() {
        super();
    }

    static propTypes = {
        dpClassName: PropTypes.string,
        inline: PropTypes.bool
    }

    componentDidMount(){
        new Datepicker(this.$el.current, this.props);
    }

    render() {
        let {inline, dpClassName, placeholder} = this.props;

        return (
            <>
                {inline
                    ? <div className={cn(css.inlineContainer, dpClassName)} ref={this.$el} />
                    : <Input ref={this.$el} placeholder={placeholder}/>
                }
            </>
        );
    }
}
