import React from 'react';
import Container from 'components/layout/container';
import ContentGrid from 'components/layout/contentGrid';
import NavBar from 'components/navBar';
import PageTitle from 'components/pageTitle';
import Section from 'components/section';
import Example from 'components/example';
import AirDatepicker from 'components/airDatepicker';
import Code from 'components/code';
import {basicInit, rangeOption, timeOption, customCellExample} from 'examples/commonExamples';
import {FormattedMessage} from 'react-intl';

export default class Examples extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className='examples'>
                <Container>
                    <ContentGrid>
                        <NavBar />
                        <main role='main'>
                            <PageTitle titleId={'navExamples'} />
                            <Section title='exampleBasicTitle'>
                                <Example>
                                   <AirDatepicker />
                                   <Code>{basicInit}</Code>
                                </Example>
                            </Section>
                            <Section title='exampleRangeTitle'>
                                <FormattedMessage
                                    tagName={'p'}
                                    id={'exampleRangeNote'}
                                    values={{param: <Code inline>{`{range: true}`}</Code>}}
                                />
                                <Example>
                                   <AirDatepicker range={true} multipleDatesSeparator={' - '} />
                                   <Code>{rangeOption}</Code>
                                </Example>
                            </Section>
                            <Section title='exampleTimeTitle'>
                                <FormattedMessage
                                    tagName={'p'}
                                    id={'exampleTimeNote'}
                                    values={{
                                        param: <Code inline>{`{timepicker: true}`}</Code>,
                                        startDate: <Code inline>{`startDate`}</Code>
                                    }}
                                />
                                <Example>
                                   <AirDatepicker timepicker={true}/>
                                   <Code>{timeOption}</Code>
                                </Example>
                            </Section>
                            <Section title='exampleCellContentTitle'>
                                <FormattedMessage
                                    tagName={'p'}
                                    id={'exampleCellContentNote'}
                                    values={{
                                        param: <Code inline>{`{onRenderCell: () => {})}`}</Code>,
                                    }}
                                />
                                <Example>
                                   <AirDatepicker onRenderCell={({date, type}) => {
                                       return {
                                           isDisabled: true
                                       }
                                   }}/>
                                   <Code>{customCellExample}</Code>
                                </Example>
                            </Section>
                        </main>
                    </ContentGrid>
                </Container>
            </div>
        );
    }
}
