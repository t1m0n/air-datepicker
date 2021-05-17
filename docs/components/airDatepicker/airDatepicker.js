import React from 'react';
import Datepicker from 'air-datepicker';

import css from './airDatepicker.module.scss';

export default class AirDatepicker extends React.Component {
    $el = React.createRef();

    constructor() {
        super();
    }

    componentDidMount(){
        new Datepicker(this.$el.current, this.props);
    }

    render() {
        let {inline = true, } = this.props;

        return (
            <>
                {inline
                    ? <div className={css.inlineContainer} ref={this.$el} />
                    : <input type='text' ref={this.$el}/>
                }
            </>
        );
    }
}
