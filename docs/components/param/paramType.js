import React from 'react';
import PropTypes from 'prop-types';
import css from "./param.module.scss";
import Code from "components/code";

function ParamType({children} = {}) {
    return (
        <div className={css.type}>
            <Code inline bgTransparent>{children}</Code>
        </div>
    );
}

ParamType.propTypes = {};

export default ParamType;
