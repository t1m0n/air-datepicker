import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import Input from 'components/form/input';
import {injectIntl} from 'react-intl';
import {withRouter} from 'next/router';
import cloneDeep from 'clone-deep';
import fuzzysearch from 'fuzzysearch';
import {withApp} from 'context/appContext';
import cn from 'classnames';

import paramCSS from 'components/param/param.module.scss';
import sectionCSS from 'components/section/section.module.scss';

import css from './navBar.module.scss';

const easing = 'easeOutCubic';
const duration = 400;

class NavBar extends React.Component {
    constructor() {
        super();
    }

    attentionTimeoutId = 0;
    attention$el = false;

    state = {
        sections: [],
        filteredSections: [],
        searchQuery: '',
        activeParam: ''
    }

    static propTypes = {
        showSearch: PropTypes.bool,
        sectionSelector: PropTypes.string,
        sectionTitleSelector: PropTypes.string,
        paramNameSelector: PropTypes.string,
        paramSelector: PropTypes.string,
        activeClass: PropTypes.string,
    }

    static defaultProps = {
        showSearch: true,
        sectionSelector:`.${sectionCSS.el}`,
        sectionTitleSelector:`.${sectionCSS.title}`,
        paramSelector:`.${sectionCSS.el} > .${paramCSS.list} > .${paramCSS.el}`,
        paramNameSelector:`.${paramCSS.paramName}`,
        activeClass: paramCSS.paramActive
    }

    componentDidMount() {
        this.setState({
            sections: this.calculatesSection()
        });

        let query = new URLSearchParams(window.location.search);
        let scrollTo = query.get('scrollTo');

        if (scrollTo) {
            let $el = document.querySelector(`#${scrollTo}`).parentNode;
            if ($el) {
                setTimeout(() => {
                    this.scrollTo($el)
                }, 200)
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let filteredSections = [];
        let {searchQuery} = this.state;
        let {context: prevContext} = prevProps;
        let {context} = this.props;

        if (prevState.searchQuery !== searchQuery) {
            this.setState({
                filteredSections: this.getFilteredSections()
            })
        }

        if (prevContext.loadingLocales && !context.loadingLocales) {
            this.setState({
                sections: this.calculatesSection()
            });
        }

        if (!prevContext.navIsVisible && context.navIsVisible) {
            this.showNav();
        }

        if (prevContext.navIsVisible && !context.navIsVisible) {
            this.hideNav();
        }
    }

    showNav() {
        anime({
            targets: [`.${css.el}`],
            translateX: ['-100%', '0'],
            duration,
            easing,
        })
    }

    hideNav() {
        anime({
            targets: [`.${css.el}`],
            translateX: '-100%',
            duration,
            easing: 'easeInOutCubic'
        })
    }

    getFilteredSections() {
        let sections = cloneDeep(this.state.sections);
        let {searchQuery} = this.state;

        return sections.map(s => {
            s.params = s.params.filter(param => {
                return fuzzysearch(searchQuery.toLowerCase(), param.content.toLowerCase())
            })

            return s;
        })
    }

    calculatesSection() {
        let $sections = document.querySelectorAll(this.props.sectionSelector);

        return Array.from($sections).map($section => {
            let $title = $section.querySelector(this.props.sectionTitleSelector);

            if (!$title) return false;

            return {
                $section: $section,
                $title,
                title: $title.innerText,
                params: this.getParamList($section)
            }
        }).filter(el => el);
    }

    getParamList($section){
        let params = $section.querySelectorAll(this.props.paramSelector);

        return Array.from(params).map($param => {
            let $paramName = $param.querySelector(this.props.paramNameSelector);

            return {
                content: $paramName.innerText,
                visible: true,
                $param,
                $paramName
            }
        })
    }

    scrollTo = ($el) => {
        let headerHeight = 56,
            headerOffset = 32;

        anime({
            targets: ['html', 'body'],
            scrollTop: $el.offsetTop - headerHeight - headerOffset,
            duration: 600,
            easing: 'easeInOutCubic',
            complete: () => {
                this.attractAttention($el);
            }
        })
    }

    attractAttention($el) {
        let {activeClass} = this.props;

        if (this.attention$el) {
            this.attention$el.classList.remove(activeClass)
        }

        this.attention$el = $el;

        $el.classList.add(activeClass);

        this.attentionTimeoutId = setTimeout(() => {
            $el.classList.remove(activeClass);
        }, 3000)
    }

    onClickParam = (param) => (e) => {
        e.preventDefault();
        this.props.context.hideNav();
        this.scrollTo(param.$param);
    }

    onClickTitle = (title) => (e) => {
        e.preventDefault();
        this.props.context.hideNav();
        this.scrollTo(title.$title);
    }

    onChangeSearch = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    render() {
        let {sections, searchQuery, filteredSections, searchIsFocused} = this.state;
        let {intl: {messages}, showSearch} = this.props;
        return (
            <aside className={css.el}>
                {showSearch &&
                    <Input
                        className={css.searchInput}
                        onChange={this.onChangeSearch}
                        onFocus={this.onFocusSearch}
                        onBlur={this.onBlurSearch}
                        placeholder={messages.searchPlaceholder}
                        value={searchQuery}
                    />
                }
                <div className={cn(css.scroller, {
                    [css.scrollerWithSearch]: showSearch
                })}>
                    {(searchQuery ? filteredSections : sections).map((titleObj) => {
                        let {title, params} = titleObj;
                        return <div key={title} className={css.section}>
                            <a
                                href={'#'}
                                title={title}
                                className={css.sectionTitle}
                                onClick={this.onClickTitle(titleObj)}
                            >
                                {title}
                            </a>
                            <div className={css.sectionParams}>
                                {searchQuery && params.length === 0 && <div className={css.notFound}>
                                    {messages.notFound}
                                </div>}
                                {params.map((param) => {
                                    return <div className={css.sectionParam} key={`${title}${param.content}`}>
                                        <a
                                            className={css.sectionParamLink}
                                            href='#'
                                            onClick={this.onClickParam(param)}
                                        >
                                            {param.content}
                                        </a>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </aside>
        );
    }
}

export default injectIntl(withRouter(withApp(NavBar)));
