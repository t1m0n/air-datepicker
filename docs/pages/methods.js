import React from 'react';
import Container from 'components/layout/container';
import ContentGrid from 'components/layout/contentGrid';
import PageTitle from 'components/pageTitle';
import Section from 'components/section';
import NavBar from 'components/navBar';
import Param from 'components/param';
import Example from 'components/example';
import Code from 'components/code';
import Paragraph from 'components/common/paragraph';
import * as examples from 'examples/commonExamples';
import Link from 'components/common/link';
import dataTypes from 'data/dataTypes';
import {useIntl} from 'react-intl';
import Head from 'next/head';
import usePageTitle from 'hooks/usePageTitle';


const trueField = (() => <Code inline>{'true'}</Code>)();
const falseField = (() => <Code inline>{'false'}</Code>)();

function Methods({} = {}) {
    let {messages} = useIntl();
    let {pageTitle} = usePageTitle('navApi');

    return (
        <div className='api'>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Container>
                <ContentGrid>
                    <NavBar />
                    <main role='main'>
                        <PageTitle titleId='navApi' />
                        <Section>
                            <Paragraph id={'apiIntro'}/>
                            <Example>
                                <Code>{examples.apiAccess}</Code>
                            </Example>
                        </Section>
                        <Section title={'apiMethodsTitle'}>
                            <Param.List>
                                <Param name={'show()'} id={'show'}>
                                    <Paragraph id={'apiShow'} />
                                </Param>
                                <Param name={'hide()'} id={'hide'}>
                                    <Paragraph id={'apiHide'} />
                                </Param>
                                <Param name={'next()'} id={'next'}>
                                    <Paragraph id={'apiNext'} />
                                </Param>
                                <Param name={'prev()'} id={'prev'}>
                                    <Paragraph id={'apiPrev'} />
                                </Param>
                                <Param name={'selectDate(date | date[], opts?)'} id={'selectDate'}>
                                    <Paragraph id={'apiSelectDate'} />
                                    <Param.List nested>
                                        <Param
                                            name={'date'}
                                            type={dataTypes.date}
                                            definition={'apiSelectDateDate'}
                                            definitionValues={{
                                                jsDate: <Code inline>{`Date`}</Code>
                                            }}
                                            addId={false}
                                        />
                                        <Param
                                            name={'opts.updateTime'}
                                            type={'boolean'}
                                            definition={'apiSelectDateUpdateTime'}
                                            definitionValues={{
                                                trueField,
                                                falseField,
                                                timepickerOn: <Code inline>{`{timepicker: true}`}</Code>
                                            }}
                                            addId={false}
                                        />
                                        <Param
                                            name={'opts.silent'}
                                            type={'boolean'}
                                            definition={'apiSelectDateSilent'}
                                            definitionValues={{
                                                trueField,
                                                onSelectLink: <Link href={'/docs?scrollTo=onSelect'}>onSelect()</Link>
                                            }}
                                            addId={false}
                                        />
                                    </Param.List>
                                </Param>
                                <Param name={'unselectDate(date)'} id={'unselectDate'}>
                                    <Paragraph id={'apiUnselectDate'} />
                                    <Param.List nested>
                                        <Param name={'date'} addId={false} type={dataTypes.date} definition={'apiUnselectDateDate'} />
                                    </Param.List>
                                </Param>

                                <Param name={'clear(opts)'} id={'clear'}>
                                    <Paragraph id={'apiClear'} />
                                    <Param.List nested>
                                        <Param
                                            name={'opts.silent'}
                                            type={'boolean'}
                                            definition={'apiClearSilent'}
                                            definitionValues={{
                                                trueField,
                                                onSelectLink: <Link href={'/docs?scrollTo=onSelect'}>onSelect()</Link>
                                            }}
                                            addId={false}
                                        />
                                    </Param.List>
                                </Param>
                                <Param name={'formatDate(date, format)'} id={'formatDate'}>
                                    <Paragraph id={'apiFormatDate'} />
                                    <Param.List nested>
                                        <Param
                                            name={'date'}
                                            type={dataTypes.date}
                                            definition={'apiFormatDateDate'}
                                            addId={false}
                                        />
                                        <Param
                                            name={'format'}
                                            type={'string'}
                                            definition={'apiFormatDateFormat'}
                                            definitionValues={{
                                                dateFormat: <Code inline isFieldName>{`dateFormat`}</Code>,
                                                link: <Link href={'/docs?scrollTo=dateFormat'}>{messages.inDocsSection}</Link>
                                            }}
                                            addId={false}
                                        />
                                    </Param.List>
                                </Param>
                                <Param name={'destroy()'} id={'destroy'}>
                                    <Paragraph id={'apiDestroy'}/>
                                </Param>
                                <Param name={'update(newOpts)'} id={'update'}>
                                    <Paragraph id={'apiUpdate'} />
                                    <Param.List nested>
                                        <Param name={'newOpts'} addId={false} type={'object'} definition={'apiUpdateNewOpts'} />
                                    </Param.List>
                                </Param>
                                <Param name={'setCurrentView(view)'} id={'setCurrentView'}>
                                    <Paragraph id={'apiSetCurrentView'} />
                                    <Param.List nested>
                                        <Param name={'view'} addId={false} type={'"days" | "months" | "years"'} definition={'apiSetCurrentViewView'} />
                                    </Param.List>
                                </Param>
                                <Param name={'setViewDate(date)'} id={'setViewDate'}>
                                    <Paragraph id={'apiSetViewDate'}/>
                                    <Param.List nested>
                                        <Param name={'date'} addId={false} type={dataTypes.date} definition={'apiSetViewDateDate'} />
                                    </Param.List>
                                </Param>
                                <Param name={'setFocusDate(date, opts?)'} id={'setFocusDate'}>
                                    <Paragraph id={'apiSetFocusDate'} />
                                    <Param.List nested>
                                        <Param name={'date'} addId={false} type={dataTypes.date} definition={'apiSetViewDateDate'} />
                                        <Param
                                            name={'opts.viewDateTransition'}
                                            type={'boolean'}
                                            addId={false}
                                            definition={'apiSetFocusDateDateViewTransition'}
                                            definitionValues={{
                                                trueField
                                            }}
                                        />
                                    </Param.List>
                                </Param>
                                <Param name={'up(date?)'} id={'up'}>
                                    <Paragraph  id={'apiUp'}/>
                                    <Param.List nested>
                                        <Param addId={false} name={'date'} type={dataTypes.date} definition={'apiUpDate'} />
                                    </Param.List>
                                </Param>
                                <Param name={'down(date?)'} id={'down'}>
                                    <Paragraph  id={'apiDown'}/>
                                    <Param.List nested>
                                        <Param addId={false} name={'date'} type={dataTypes.date} definition={'apiUpDate'} />
                                    </Param.List>
                                </Param>
                            </Param.List>
                        </Section>

                        <Section title={'apiPropertiesTitle'}>
                            <Param.List>
                                <Param name={'$datepicker'} type={"HTMLElement"} id={'datepicker'}>
                                    <Paragraph id={'api$datepicker'}/>
                                </Param>
                                <Param name={'viewDate'} type={'Date'}>
                                    <Paragraph id={'apiViewDate'}/>
                                </Param>
                                <Param name={'currentView'} type={dataTypes.views}>
                                    <Paragraph id={'apiCurrentView'}/>
                                </Param>
                                <Param name={'selectedDates'} type={'Date[]'}>
                                    <Paragraph id={'apiSelectedDates'}/>
                                </Param>
                                <Param name={'focusDate'} type={'Date | false'}>
                                    <Paragraph id={'apiFocusDate'} />
                                </Param>
                                <Param name={'visible'} type={'boolean'}>
                                    <Paragraph id={'apiVisible'} />
                                </Param>
                            </Param.List>
                        </Section>
                    </main>
                </ContentGrid>
            </Container>
        </div>
    );
}

export default Methods;
