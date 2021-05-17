import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AppContext from 'context/appContext';

function Message({} = {}) {
    let {messages} = useContext(AppContext)
    console.log(messages);
    return (
        <div className='message'>

        </div>
    );
}

Message.propTypes = {};

export default Message;
