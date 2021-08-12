import React from 'react';
import Container from 'components/layout/container';
import ContentGrid from 'components/layout/contentGrid';
import PageTitle from 'components/pageTitle';
import Section from 'components/section';
import NavBar from 'components/navBar';
import Param, {ParamType} from 'components/param';
import Example from 'components/example';
import AirDatepicker from 'components/airDatepicker';
import Code from 'components/code';
import Paragraph from 'components/common/paragraph';
import * as examples from 'examples/commonExamples';
import {FormattedMessage, useIntl} from 'react-intl';
import Link from 'components/common/link';
import DList from 'components/common/dList';
import {
    apiAccess,
    eventsOnRenderCell,
    optsButtonsExample,
    optsButtonsShape,
    optsNavTitlesDefaults,
    optsSelectedDatesExample
} from 'examples/commonExamples';

const trueField = (() => <Code inline>{'true'}</Code>)();
const falseField = (() => <Code inline>{'false'}</Code>)();
const UnicodeStandardLink = <Link href={'https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table'} target={'_blank'}>Unicode Technical Standard #35</Link>;


function Methods({} = {}) {
    let {messages} = useIntl();

    return (
        <div className='api'>
            <Container>
                <ContentGrid>
                    <NavBar></NavBar>
                    <main role='main'>
                        <PageTitle titleId='navApi' />
                        <Section>
                            <Paragraph id={'apiIntro'}/>
                            <Example>
                                <Code>{examples.apiAccess}</Code>
                            </Example>
                        </Section>
                        <Section>
                            <Param.List>
                                <Param name={'show()'}>
                                    <Paragraph id={'apiShow'} />
                                </Param>
                                <Param name={'hide()'}>
                                    <Paragraph id={'apiHide'} />
                                </Param>
                                <Param name={'next()'}>
                                    <Paragraph id={'apiNext'} />
                                </Param>
                                <Param name={'prev()'}>
                                    <Paragraph id={'apiPrev'} />
                                </Param>
                                <Param name={'selectDate(date | date[] [, opts])'}>
                                    <Paragraph id={'apiSelectDate'} />
                                    <Param.List nested>
                                        <Param
                                            name={'date'}
                                            type={'Date | string | number'}
                                            definition={'apiSelectDateDate'}
                                            definitionValues={{
                                                jsDate: <Code inline>{`Date`}</Code>
                                            }}
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
                                        />
                                        <Param
                                            name={'opts.silent'}
                                            type={'boolean'}
                                            definition={'apiSelectDateSilent'}
                                            definitionValues={{
                                                trueField,
                                                onSelectLink: <Link href={'/docs#onSelect'}>onSelect()</Link>
                                            }}
                                        />
                                    </Param.List>
                                </Param>
                                <Param name={'unselectDate(date)'}>
                                    <Paragraph id={'apiUnselectDate'} />
                                    <Param.List nested>
                                        <Param name={'date'} type={'Date | string | number'} definition={'apiUnselectDateDate'} />
                                    </Param.List>
                                </Param>

                                <Param name={'clear()'}>

                                </Param>
                                <Param name={'destroy()'}>

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
