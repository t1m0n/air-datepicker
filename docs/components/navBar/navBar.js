import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import css from './navBar.module.scss';

export default class NavBar extends React.Component {
    constructor() {
        super();
    }

    attentionTimeoutId = 0;
    attention$el = false;

    state = {
        sections: [],
        activeParam: ''
    }

    static propTypes = {
        sectionSelector: PropTypes.string,
        sectionTitleSelector: PropTypes.string,
        paramNameSelector: PropTypes.string,
        paramSelector: PropTypes.string,
    }

    componentDidMount() {
        this.setState({
            sections: this.calculatesSection()
        });
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
                $param,
                $paramName
            }
        })
    }
    
    scrollTo = ($el) => {
        anime({
            targets: ['html', 'body'],
            scrollTop: $el.offsetTop - 16,
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
        this.scrollTo(param.$param);
    }

    render() {
        let {sections} = this.state;

        return (
            <aside className={css.el}>
                {sections.map(({title, params}) => {
                    return <div key={title} className={css.section}>
                        <h1 className={css.sectionTitle}>{title}</h1>
                        <div className={css.sectionParams}>
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
            </aside>
        );
    }
}

