import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {FormattedMessage} from 'react-intl';

import css from './section.module.scss';

function Section({title, titleHidden, isPrimary, children, className} = {}) {
    return (
        <section
            className={cn(css.el, className, {
                [css.isPrimary]: isPrimary,
                [css.titleHidden]: titleHidden
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

function SubTitle({titleId, mini, secondary}) {
    return <h3 className={cn(css.subTitle, {
        [css.subTitleMini]: mini,
        [css.subTitleSecondary]: secondary,
    })}>
        <FormattedMessage id={titleId} />
    </h3>
}

function SubSection(props) {
    return <div className={css.subSection}>
        <SubTitle {...props} />
        {props.children}
    </div>
}

SubTitle.propTypes = {
    mini: PropTypes.bool,
    secondary: PropTypes.bool,
    title: PropTypes.string,
    titleHidden: PropTypes.bool, // For NavBar purpose
}

Section.propTypes = {
    title: PropTypes.string,
    isPrimary: PropTypes.bool,
    className: PropTypes.string
};

Section.SubTitle = SubTitle;
Section.SubSection = SubSection;
export default Section;
