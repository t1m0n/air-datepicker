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
                                    <Section.SubTitle secondary titleId={'optsDateFormatsTitle'} />
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

                                </Param>
                                <Param name={'altFieldDateFormat'} type={'string'}>

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
