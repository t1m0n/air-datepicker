import React from 'react';
import Container from 'components/layout/container';
import ContentGrid from 'components/layout/contentGrid';
import PageTitle from 'components/pageTitle';
import Section from 'components/section';
import NavBar from 'components/navBar';
import Param from 'components/param';
import Example from 'components/example';
import AirDatepicker from 'components/airDatepicker';
import Code from 'components/code';
import Paragraph from 'components/common/paragraph';
import * as examples from 'examples/commonExamples';
import {FormattedMessage, useIntl} from 'react-intl';
import Link from 'components/common/link';


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
                            </Param.List>
                        </Section>
                    </main>
                </ContentGrid>
            </Container>
        </div>
    );
}

export default Docs;
