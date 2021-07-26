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
import {optsButtonsExample, optsButtonsShape, optsSelectedDatesExample} from 'examples/commonExamples';

const trueField = (() => <Code inline>{'true'}</Code>)();


function Docs({} = {}) {
    let {messages} = useIntl();

    return (
        <div className='docs'>
            <Container>
                <ContentGrid>
                    <NavBar></NavBar>
                    <main role='main'>
                        <PageTitle titleId='navDoc' />
                        <Section title='docsOptionsTitle'>
                            <Param.List>
                                <Param name={'classes'} type={'string'}>
                                    <Paragraph id='optsClasses' />
                                </Param>
                                <Param name={'inline'} type={'boolean'} defaultValue='false'>
                                    <Paragraph id='optsInline' />
                                </Param>
                                <Param name={'locale'} type={'object'} defaultValue='locale/ru'>
                                    <Paragraph
                                        id='optsLocale'
                                        values={{
                                            dir: <Code inline>{'air-datepicker/locale/'}</Code>
                                        }}
                                    />
                                    <Paragraph
                                        id='optsLocale2'
                                        values={{
                                            link: <Link href={'#locale-detail'}>{messages.inSection}</Link>
                                        }}
                                    />
                                    <Example>
                                        <Code>{examples.optsLocaleBasic}</Code>
                                    </Example>
                                </Param>
                                <Param name='startDate' type='Date | string | number' defaultValue='new Date()'>
                                    <Paragraph id='optsStartDate'/>
                                </Param>
                                <Param name='firstDay' type='number'>
                                    <Paragraph id='optsFirstDay'/>
                                </Param>
                                <Param name='weekends' type='array' defaultValue='[6, 0]'>
                                    <Paragraph
                                        id='optsWeekends'
                                        values={{
                                            className: <Code inline language='css'>{'.-weekend-'}</Code>
                                        }}
                                    />
                                </Param>
                                <Param name='dateFormat' type={'string'} defaultValue={'""'} >
                                    <Paragraph
                                        doubleOffset
                                        id='optsDateFormat'
                                        values={{
                                            standardLink: <Link href={'https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table'} target={'_blank'}>Unicode Technical Standard #35</Link>
                                        }}
                                    />
                                    <strong><Paragraph id={'optsDateFormatsTitle'} /></strong>
                                    <DList>
                                        <DList.Item value={'T'} definition={'optsDateFormatT'} />
                                        <DList.Item value={'E'} definition={'optsDateFormatE'} values={{
                                            fieldName: <Code inline isFieldName >daysShort</Code>
                                        }} />
                                        <DList.Item value={'EEEE'} definition={'optsDateFormatEEEE'} values={{
                                            fieldName: <Code inline isFieldName>days</Code>
                                        }} />
                                        <DList.Item value={'d'} definition={'optsDateFormatd'} />
                                        <DList.Item value={'dd'} definition={'optsDateFormatdd'} />
                                        <DList.Item value={'M'} definition={'optsDateFormatM'} />
                                        <DList.Item value={'MM'} definition={'optsDateFormatMM'} />
                                        <DList.Item value={'MMM'} definition={'optsDateFormatMMM'} values={{
                                            fieldName: <Code inline isFieldName>monthsShort</Code>
                                        }} />
                                        <DList.Item value={'MMMM'} definition={'optsDateFormatMMMM'} values={{
                                            fieldName: <Code inline isFieldName>months</Code>
                                        }} />
                                        <DList.Item value={'yy'} definition={'optsDateFormatyy'} />
                                        <DList.Item value={'yyyy'} definition={'optsDateFormatyyyy'} />
                                        <DList.Item value={'yyyy1'} definition={'optsDateFormatyyyy1'} />
                                        <DList.Item value={'yyyy2'} definition={'optsDateFormatyyyy2'} />
                                    </DList>
                                </Param>
                                <Param name={'altField'} type={'string | DOMNode'} defaultValue={'""'}>
                                    <Paragraph
                                        id={'optsAltField'}
                                        values={{
                                            fieldName: <Code inline isFieldName>altFieldDateFormat</Code>
                                        }}
                                    />
                                </Param>
                                <Param name={'altFieldDateFormat'} type={'string'} defaultValue={'"T"'}>
                                    <Paragraph id={'optsAltFieldDateFormat'} />
                                </Param>
                                <Param name={'toggleSelected'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph id={'optsToggleSelected'} values={{
                                        true: <Code inline>true</Code>
                                    }} />
                                </Param>
                                <Param name={'keyboardNav'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph id={'optsKeyboardNav'} />
                                    <strong><Paragraph id={'optsKeyboardNavListTitle'} /></strong>
                                    <DList>
                                        <DList.Item value={'Ctrl + → | ↑'} definition={'optsKeyboardNavMonthForward'} />
                                        <DList.Item value={'Ctrl + ← | ↓'} definition={'optsKeyboardNavMonthBackward'} />
                                        <DList.Item value={'Shift + → | ↑'} definition={'optsKeyboardNavYearForward'} />
                                        <DList.Item value={'Shift + ← | ↓'} definition={'optsKeyboardNavYearBackward'} />
                                        <DList.Item value={'Alt + → | ↑'} definition={'optsKeyboardNavDecadeForward'} />
                                        <DList.Item value={'Alt + ← | ↓'} definition={'optsKeyboardNavDecadeBackward'} />
                                        <DList.Item value={'Ctrl + Shift + ↑'} definition={'optsKeyboardNavView'} />
                                        <DList.Item value={'Esc'} definition={'optsKeyboardNavEsc'} />
                                    </DList>
                                </Param>
                                <Param name={'selectedDates'} type={'Date[] | string[] | number[]'} defaultValue={'false'}>
                                    <Paragraph id={'optsSelectedDates'} />
                                    <Example>
                                        <AirDatepicker
                                            inline
                                            multipleDates
                                            startDate={new Date('2021-07-20')}
                                            selectedDates={[[new Date('2021-07-20'), '2021-07-25', 1626307200000]]}
                                        />
                                        <Code>{examples.optsSelectedDatesExample}</Code>
                                    </Example>
                                </Param>
                                <Param name={'position'} type={'string'} defaultValue={'"bottom left"'}>
                                    <Paragraph id={'optsPosition'} />
                                    <Paragraph id={'optsPosition2'} values={{
                                        example: <Code inline>{`{position: 'top right'}`}</Code>
                                    }} />
                                </Param>
                                <Param name={'view'} type={'string'} defaultValue={'"days"'}>
                                    <Paragraph id={'optsView'} />
                                    <DList>
                                        <DList.Item value={'days'} definition={'optsViewDays'} />
                                        <DList.Item value={'months'} definition={'optsViewMonths'} />
                                        <DList.Item value={'years'} definition={'optsViewYears'} />
                                    </DList>
                                </Param>
                                <Param name={'minView'} type={'string'} defaultValue={'"days"'}>
                                    <Paragraph id={'optsMinView'} values={{
                                        optsName: <Code inline isFieldName>{'view'}</Code>
                                    }} />
                                </Param>
                                <Param name={'showOtherMonths'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph
                                        id={'optsShowOtherMonths'}
                                        values={{trueField}}
                                    />
                                </Param>
                                <Param name={'selectOtherMonths'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph
                                        id={'optsSelectOtherMonths'}
                                        values={{trueField}}
                                    />
                                </Param>
                                <Param name={'moveToOtherMonthsOnSelect'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph
                                        id={'optsMoveToOtherMonthsOnSelect'}
                                        values={{trueField}}
                                    />
                                </Param>
                                <Param name={'minDate'} type={'Date | string | number'} defaultValue={'""'}>
                                    <Paragraph id={'optsMinDate'} />
                                </Param>
                                <Param name={'maxDate'} type={'Date | string | number'} defaultValue={'""'}>
                                    <Paragraph id={'optsMaxDate'} />
                                </Param>
                                <Param name={'disableNavWhenOutOfRange'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph id={'optsDisableNavWhenOutOfRange'} />
                                    <Paragraph
                                        id={'optsDisableNavWhenOutOfRange2'}
                                        values={{trueField}}
                                    />
                                </Param>
                                <Param name={'multipleDates'} type={'boolean | number'} defaultValue={'false'}>
                                    <Paragraph id={'optsMultipleDates'} values={{trueField}} />
                                </Param>
                                <Param name={'multipleDatesSeparator'} type={'string'} defaultValue={'", "'}>
                                    <Paragraph id={'optsMultipleDatesSeparator'} />
                                </Param>
                                <Param name={'range'} type={'boolean'} defaultValue={'false'}>
                                    <Paragraph id={'optsRange'} values={{
                                        fieldName: <Code inline isFieldName>multipleDatesSeparator</Code>
                                    }} />
                                </Param>
                                <Param name={'dynamicRange'} type={'boolean'} defaultValue={'true'}>
                                    <Paragraph id={'optsDynamicRange'} values={{trueField}} />
                                </Param>
                                <Param name={'buttons'} type={'string | string[] | object[]'} defaultValue={'false'}>
                                    <Paragraph id={'optsButtons'} />
                                    <Paragraph id={'optsButtons2'} />
                                    <DList>
                                        <DList.Item value='today' definition='optsButtonsToday' />
                                        <DList.Item value='clear' definition='optsButtonsClear' />
                                    </DList>
                                    <Paragraph id='optsButtons3'/>
                                    <Code language='typescript'>{examples.optsButtonsShape}</Code>
                                    <Section.SubTitle titleId='optsButtons4'/>
                                    <Example titleId={'example'}>
                                        <AirDatepicker
                                            placeholder={messages.chooseDate}
                                            buttons={[
                                                {
                                                    content: 'Select 2021-07-26',
                                                    onClick: (dp) => {
                                                        let date = new Date('2021-07-26');
                                                        dp.selectDate(date);
                                                        dp.setViewDate(date);
                                                    }
                                                },
                                                'clear'
                                            ]}
                                        />
                                        <Code>{examples.optsButtonsExample}</Code>
                                    </Example>
                                </Param>
                                <Param name={'monthsField'} type={'string'} defaultValue={'"monthsShort"'}>
                                    <Paragraph id={'optsMonthsField'} values={{
                                        months: <Code isFieldName inline>{'months'}</Code>
                                    }}/>
                                </Param>
                                <Param name='showEvent'>

                                </Param>
                                <Param name='autoClose'>

                                </Param>
                                <Param name='prevHtml'>

                                </Param>

                                <Param name='nextHtml'>

                                </Param>
                                <Param name='navTitles'>

                                </Param>

                            </Param.List>
                        </Section>
                    </main>
                </ContentGrid>
            </Container>
        </div>
    );
}

export default Docs;
