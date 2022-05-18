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
import ruLocaleText from 'examples/locales/ru';
import enLocaleText from 'examples/locales/en';
import Head from 'next/head';
import usePageTitle from 'hooks/usePageTitle';
import {
    eventsOnRenderCell,
    optsButtonsExample,
    optsButtonsShape, optsDateFormatFunc,
    optsNavTitlesDefaults,
    optsSelectedDatesExample
} from 'examples/commonExamples';

const trueField = (() => <Code inline>{'true'}</Code>)();
const UnicodeStandardLink = <Link href={'https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table'} target={'_blank'}>Unicode Technical Standard #35</Link>;

function Docs({} = {}) {
    let {messages, locale} = useIntl();
    let {pageTitle} = usePageTitle('navDoc');

    return (
        <div className='docs'>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Container>
                <ContentGrid>
                    <NavBar />
                    <main role='main'>
                        <PageTitle titleId='navDoc' />
                        <Section>
                            <Paragraph id={'docsIntro'}/>
                        </Section>
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
                                <Param name='isMobile' type='boolean' defaultValue='false'>
                                    <Paragraph id='optsIsMobile' values={{trueField}} />
                                </Param>
                                <Param name='visible' type='boolean' defaultValue='false'>
                                    <Paragraph id='optsVisible' values={{trueField}} />
                                </Param>
                                <Param name='dateFormat' type={'string | (date) => string'} defaultValue={'""'} >
                                    <Paragraph
                                        doubleOffset
                                        id='optsDateFormat'
                                        values={{
                                            standardLink: UnicodeStandardLink
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
                                    <Paragraph id='optsDateFormatFuncNote'/>
                                    <Example>
                                        <AirDatepicker
                                            dateFormat={(date) => {
                                                return date.toLocaleString('ja', {
                                                    year: 'numeric',
                                                    day: '2-digit',
                                                    month: 'long'
                                                });
                                            }}
                                            readonly
                                        />
                                        <Code>{examples.optsDateFormatFunc}</Code>
                                    </Example>
                                </Param>
                                <Param name={'altField'} type={'string | DOMNode'} defaultValue={'""'}>
                                    <Paragraph
                                        id={'optsAltField'}
                                        values={{
                                            fieldName: <Code inline isFieldName>altFieldDateFormat</Code>
                                        }}
                                    />
                                </Param>
                                <Param name={'altFieldDateFormat'} type={'string | (date) => string'} defaultValue={'"T"'}>
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
                                <Param name={'container'} type={'string | HTMLElement'} defaultValue={'""'}>
                                    <Paragraph
                                        id={'optsContainer'}
                                        values={{
                                            className: <Code language={'css'} inline>{'.air-datepicker-global-container'}</Code>
                                        }}
                                    />
                                </Param>
                                <Param name={'position'} type={'string | function'} defaultValue={'"bottom left"'}>
                                    <Paragraph id={'optsPosition'} />
                                    <Paragraph id={'optsPosition2'} values={{
                                        example: <Code inline>{`{position: 'top right'}`}</Code>
                                    }} />
                                    <Paragraph id='optsPosition3' values={{
                                        show: <Code inline>{`show()`}</Code>,
                                    }} />
                                    <Param.List nested>
                                        <Param name='$datepicker' type={'HTMLDivElement'} definition={'optsPosition$datepicker'} />
                                        <Param name='$target' type='HTMLInputElement' definition={'optsPosition$target'} />
                                        <Param name='$pointer' type='HTMLElement' definition={'optsPosition$pointer'} />
                                        <Param name='isViewChange' type='boolean' definition={'optsPositionIsViewChange'} />
                                        <Param name='done' type='() => void' definition={'optsPositionDone'} />
                                    </Param.List>
                                    <Paragraph id='optsPosition4' values={{
                                        position: <Code inline isFieldName>{`position`}</Code>,
                                        hide: <Code inline >{`hide()`}</Code>,
                                        done: <Code inline isFieldName>{`done`}</Code>,
                                    }} />
                                    <Paragraph id='optsPosition5' />
                                    <Example>
                                        <AirDatepicker
                                            autoClose
                                            readonly
                                            position={({$target, $datepicker, $pointer}) => {
                                                let coords = $target.getBoundingClientRect(),
                                                    dpHeight = $datepicker.clientHeight,
                                                    dpWidth = $datepicker.clientWidth;

                                                let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
                                                let left = coords.x + coords.width / 2 - dpWidth / 2;

                                                $datepicker.style.left = `${left}px`;
                                                $datepicker.style.top = `${top}px`;

                                                $pointer.style.display = 'none';
                                            }}
                                        />
                                        <Code>
                                            {examples.basicPositionCallback}
                                        </Code>
                                    </Example>
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
                                <Param name={'buttons'} type={'string | string[] | object | object[] | false'} defaultValue={'false'}>
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
                                            readonly
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
                                <Param name='showEvent' type={'string'} defaultValue={'"focus"'}>
                                    <Paragraph id={'optsShowEvent'} />
                                </Param>
                                <Param name='autoClose'>
                                    <Paragraph id={'optsAutoClose'} values={{trueField}} />
                                </Param>
                                <Param name='prevHtml' type={'string'} defaultValue={'"<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>"'} >
                                    <Paragraph id={'optsPrevHtml'}  />
                                </Param>

                                <Param name='nextHtml' type={'string'} defaultValue={'"<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>"'}>
                                    <Paragraph id={'optsNextHtml'} />
                                </Param>
                                <Param name='navTitles' type={'{[ "days" |"months" | "years" ]: string | function}'}>
                                    <Paragraph id={'optsNavTitles'} values={{
                                        formatDateField: <Code inline isFieldName>dateFormat</Code>
                                    }} />
                                    <Paragraph id={'optsNavTitles2'} />
                                    <Paragraph id={'optsNavTitles3'} />
                                    <Example>
                                        <Code>{examples.optsNavTitlesDefaults}</Code>
                                    </Example>
                                    <Paragraph id={'optsNavTitles4'} />
                                    <Example>
                                        <Code>{examples.optsNavTitlesUsage}</Code>
                                    </Example>
                                </Param>

                                <Param name={'timepicker'} type={'boolean'} defaultValue={'false'}>
                                    <Paragraph id={'optsTimepicker'}/>
                                </Param>
                                <Param name={'onlyTimepicker'} type={'boolean'} defaultValue={'false'}>
                                    <Paragraph id={'optsOnlyTimepicker'}/>
                                </Param>
                                <Param name={'dateTimeSeparator'} type={'string'} defaultValue={'" "'}>
                                    <Paragraph id={'optsDateTimeSeparator'} />
                                </Param>
                                <Param name={'timeFormat'} type={'string'}>
                                    <Paragraph
                                        id={'optsTimeFormat'}
                                        values={{
                                            dateFormatField: <Code inline isFieldName>{`dateFormat`}</Code>,
                                            standardLink: UnicodeStandardLink
                                        }}
                                    />
                                    <strong><Paragraph id={'possibleSymbols'} /></strong>
                                    <DList>
                                        <DList.Item value={'h'} definition={'optsTimeFormath'} />
                                        <DList.Item value={'hh'} definition={'optsTimeFormathh'} />
                                        <DList.Item value={'H'} definition={'optsTimeFormatH'} />
                                        <DList.Item value={'HH'} definition={'optsTimeFormatHH'} />
                                        <DList.Item value={'m'} definition={'optsTimeFormatm'} />
                                        <DList.Item value={'mm'} definition={'optsTimeFormatmm'} />
                                        <DList.Item value={'aa'} definition={'optsTimeFormataa'} />
                                        <DList.Item value={'AA'} definition={'optsTimeFormatAA'} />
                                    </DList>
                                </Param>
                                <Param name={'minHours'} type={'number'} defaultValue={'0'}>
                                    <Paragraph id={'optsMinHours'}/>
                                </Param>
                                <Param name={'maxHours'} type={'number'} defaultValue={'24'}>
                                    <Paragraph id={'optsMaxHours'}/>
                                </Param>
                                <Param name={'minMinutes'} type={'number'} defaultValue={'0'}>
                                    <Paragraph id={'optsMinMinutes'}/>
                                </Param>
                                <Param name={'maxMinutes'} type={'number'} defaultValue={'59'}>
                                    <Paragraph id={'optsMaxMinutes'}/>
                                </Param>
                                <Param name={'hoursStep'} type={'number'} defaultValue={'1'}>
                                    <Paragraph id={'optsHoursStep'}/>
                                </Param>
                                <Param name={'minutesStep'} type={'number'} defaultValue={'1'}>
                                    <Paragraph id={'optsMinutesStep'}/>
                                </Param>
                            </Param.List>
                        </Section>
                        <Section title='localeTitle'>
                            <Paragraph id='localeNote' values={{
                                dirName: <Code inline>{`'locales/'`}</Code>
                            }} />
                            <Section.SubTitle titleId={'localeShapeTitle'} />
                            <Example>
                                <Code>{locale === 'ru' ? ruLocaleText : enLocaleText}</Code>
                            </Example>
                        </Section>
                        <Section title={'eventsTitle'}>
                            <Param.List>
                                <Param name={'onSelect'} type={'({date, formattedDate, datepicker}) => void'}>
                                    <Paragraph id={'eventsOnSelect'}/>
                                    <Param.List nested>
                                        <Param name={'date'} type={'Date | Date[]'} definition={'eventsOnSelectDate'}/>
                                        <Param name={'formattedDate'} type={'string | string[]'} definition={'eventsOnSelectFormattedDate'} />
                                        <Param name={'datepicker'} type={'AirDatepicker'} definition={'eventsOnSelectAirDatepicker'} />
                                    </Param.List>
                                </Param>
                                <Param name={'onChangeViewDate'} type={'({month, year, decade}) => void'}>
                                    <Paragraph id={'eventsOnChangeViewDate'}/>
                                    <Param.List nested>
                                        <Param name={'month'} type={'number'} definition={'eventsOnChangeViewDateMonth'} />
                                        <Param name={'year'} type={'number'} definition={'eventsOnChangeViewDateYear'} />
                                        <Param name={'decade'} type={'number[]'} definition={'eventsOnChangeViewDateDecade'} />
                                    </Param.List>
                                </Param>
                                <Param name={'onChangeView'} type={'("days | months | years") => void'}>
                                    <Paragraph id={'eventsOnChangeView'} />
                                </Param>
                                <Param name={'onRenderCell'} type={'({date, cellType, datepicker}) => {html, classes, disabled}'}>
                                    <Paragraph id={'eventsOnRenderCell'} />
                                    <Paragraph id={'eventsOnRenderCell2'} />
                                    <Param.List nested>
                                        <Param name={'date'} type={'Date'} definition={'eventsOnRenderCellDate'}/>
                                        <Param name={'cellType'} type={'"day | month | year"'} definition={'eventsOnRenderCellCellType'} />
                                        <Param name={'datepicker'} type={'AirDatepicker'} definition={'eventsOnRenderCellDatepicker'} />
                                    </Param.List>
                                    <Paragraph id={'eventsOnRenderCell3'} />
                                    <Param.List nested>
                                        <Param name={'html'} type={'string'} definition={'eventsOnRenderCellHtml'}/>
                                        <Param name={'classes'} type={'string'} definition={'eventsOnRenderCellClasses'} />
                                        <Param name={'disabled'} type={'boolean'} definition={'eventsOnRenderCellDisabled'} />
                                    </Param.List>
                                    <Example>
                                        <Code>{examples.eventsOnRenderCell}</Code>
                                    </Example>
                                </Param>
                                <Param name={'onShow'} type={'(isFinished) => void'}>
                                    <Paragraph id={'eventsOnShow'}/>
                                    <Param.List nested>
                                        <Param name={'isFinished'} type={'boolean'} definition={'eventsOnShowArg'} />
                                    </Param.List>
                                </Param>
                                <Param name={'onHide'} type={'(isFinished) => void'}>
                                    <Paragraph id={'eventsOnHide'} type={'(isFinished) => void'}/>
                                    <Param.List nested>
                                        <Param name={'isFinished'} type={'boolean'} definition={'eventsOnHideArg'} />
                                    </Param.List>
                                </Param>
                                <Param name={'onClickDayName'} type='({dayIndex, datepicker}) => void'>
                                    <Paragraph id={'eventsOnClickDayName'} values={{
                                        className: <Code inline>`-clickable-`</Code>
                                    }} />
                                    <Param.List nested>
                                        <Param name={'dayIndex'} type={'index'} definition={'eventsOnClickDayNameDayIndex'} />
                                        <Param name={'datepicker'} type={'object'} definition={'eventsOnClickDayNameDatepicker'} />
                                    </Param.List>
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
