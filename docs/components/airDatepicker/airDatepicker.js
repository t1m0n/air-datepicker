import React from 'react';
import PropTypes from 'prop-types';
import Datepicker from 'air-datepicker';
import cn from 'classnames';

import css from './airDatepicker.module.scss';

export default class AirDatepicker extends React.Component {
    $el = React.createRef();

    constructor() {
        super();
    }

    static propTypes = {
        dpClassName: PropTypes.string
    }

    componentDidMount(){
        new Datepicker(this.$el.current, this.props);
    }

    render() {
        let {inline = true, dpClassName} = this.props;

        return (
            <>
                {inline
                    ? <div className={cn(css.inlineContainer, dpClassName)} ref={this.$el} />
                    : <input type='text' ref={this.$el}/>
                }
            </>
        );
    }
}
