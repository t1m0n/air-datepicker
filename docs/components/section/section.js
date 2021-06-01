import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {FormattedMessage} from 'react-intl';

import css from './section.module.scss';

function Section({title, isPrimary, children} = {}) {
    return (
        <section
            className={cn(css.el, {
                [css.isPrimary]: isPrimary
            })}
        >
            {title && <>
                {isPrimary
                    ? <h1 className={css.titlePrimary}><FormattedMessage id={title} /></h1>
                    : <h2 className={css.title}><FormattedMessage id={title}/></h2>
                }
            </>}
            {children}
        </section>
    );
}

function SubTitle({titleId}) {
    return <h3 className={css.subTitle}><FormattedMessage id={titleId} /></h3>
}

SubTitle.propTypes = {
    title: PropTypes.string
}

Section.propTypes = {
    title: PropTypes.string,
    isPrimary: PropTypes.bool
};

Section.SubTitle = SubTitle;
export default Section;
