import React, {useState} from 'react';
import Container from 'components/layout/container';
import ContentGrid from 'components/layout/contentGrid';
import NavBar from 'components/navBar';
import PageTitle from 'components/pageTitle';
import Section from 'components/section';
import Example from 'components/example';
import AirDatepicker from 'components/airDatepicker';
import Code from 'components/code';
import * as code from 'examples/commonExamples';
import {FormattedMessage, useIntl} from 'react-intl';
import Paragraph from 'components/common/paragraph';
import Link from 'components/common/link';
import Head from 'next/head';
import usePageTitle from 'hooks/usePageTitle';
import {createPopper} from '@popperjs/core';
import Note from 'components/common/note';

import sectionCSS from 'components/section/section.module.scss';
import css from './examples.module.scss';
import {basicPosition, popperjsPosition} from 'examples/commonExamples';
import anime from 'animejs';

const PopperLink = () => {
    return <Link href={'https://popper.js.org/'} target={'_blank'}>Popper.js</Link>
}

export default function Examples() {
    let [minDate, setMinDate] = useState();
    let [maxDate, setMaxDate] = useState();
    let today = new Date();
    let {messages} = useIntl();
    let {pageTitle} = usePageTitle('navExamples');


    return (
        <div className='examples'>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Container>
                <ContentGrid>
                    <NavBar
                        showSearch={false}
                        activeClass={sectionCSS.subSectionActive}
                        paramSelector={`.${sectionCSS.subSection}`}
                        paramNameSelector={`.${sectionCSS.subTitle}`}
                    />
                    <main role='main'>
                        <Section>
                            <PageTitle titleId={'navExamples'} />
                            <Paragraph id={'examplesNote'}/>
                        </Section>

                        <Section title='exampleBasicTitle'>
                            <Section.SubSection titleId={'exampleBasicDefaultsTitle'} titleHidden>
                                <Example>
                                    <AirDatepicker placeholder={messages.chooseDate} readonly  />
                                    <Code>{code.basicInit}</Code>
                                </Example>
                            </Section.SubSection>

                            <Section.SubSection titleId={'exampleBasicInlineTitle'}>
                                <FormattedMessage
                                    tagName={'p'}
                                    id={'exampleBasicInlineNote'}
                                    values={{param: <Code inline>{`{inline: true}`}</Code>   }}
                                />
                                <Example>
                                    <AirDatepicker inline/>
                                    <Code>{code.basicInitInline}</Code>
                                </Example>
                            </Section.SubSection>

                            <Section.SubSection titleId={'exampleBasicSelectedDatesTitle'}>
                                <Paragraph
                                    id={'exampleBasicSelectedDatesNote'}
                                    values={{
                                        optsName: <Code inline isFieldName>{`selectedDates`}</Code>,
                                        docsLink: <Link href={'/docs?scrollTo=selectedDates'}>{messages.inDocsSection}</Link>
                                    }}
                                />
                                <Example>
                                    <AirDatepicker inline selectedDates={[new Date()]}/>
                                    <Code>{code.basicSelectedDate}</Code>
                                </Example>
                            </Section.SubSection>

                            <Section.SubSection titleId={'exampleBasicMonthViewTitle'}>
                                <Paragraph
                                    id={'exampleBasicMonthViewNote'}
                                    values={{
                                        viewOpt: <Code inline isFieldName>{`view`}</Code>,
                                        minViewOpt: <Code inline isFieldName>{`minView`}</Code>
                                    }}
                                />
                                <Example>
                                    <AirDatepicker
                                        inlineInput
                                        view={'months'}
                                        minView={'months'}
                                        dateFormat={'MMMM yyyy'}
                                    />
                                    <Code>{code.basicMinView}</Code>
                                </Example>

                            </Section.SubSection>

                            <Section.SubSection titleId={'exampleBasicMobileTitle'}>
                                <Paragraph id='exampleBasicMobileNote' />
                                <Example>
                                    <AirDatepicker
                                        placeholder={messages.asModal}
                                        isMobile
                                        autoClose
                                    />
                                    <Code>
                                        {code.basicIsMobile}
                                    </Code>
                                </Example>
                            </Section.SubSection>
                        </Section>

                        <Section title='examplePositionTitle'>
                            <Paragraph id='examplePositionNote' values={{
                                position: <Code inline isFieldName>{`position`}</Code>
                            }} />
                            <Section.SubSection titleId={'examplePositionBasicTitle'}>
                                <Paragraph id='examplePositionBasicNote'
                                    values={{
                                        axis: <Code inline>{`"'${messages.mainAxis} '${messages.secondaryAxis}'"`}</Code>
                                    }}
                                />
                                <Example>
                                    <AirDatepicker
                                        position={'right center'}
                                        readonly
                                    />
                                    <Code>
                                        {code.basicPosition}
                                    </Code>
                                </Example>
                            </Section.SubSection>
                            <Section.SubSection titleId={'examplePositionPopperTitle'}>
                                <Paragraph id='examplePositionPopperNote1' />
                                <Paragraph id='examplePositionPopperNote2'
                                    values={{
                                        popper: <PopperLink />
                                    }}
                                />
                                <Example>
                                    <div className={css.positionContainer}>
                                        <AirDatepicker
                                            visible
                                            position={({$datepicker, $target, $pointer, done}) => {
                                                let popper = createPopper($target, $datepicker, {
                                                    placement: 'top',
                                                    modifiers: [
                                                        {
                                                            name: 'flip',
                                                            options: {
                                                                padding: {top: 64}
                                                            },
                                                        },
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, 20]
                                                            }
                                                        },
                                                        {
                                                            name: 'arrow',
                                                            options: {
                                                                element: $pointer
                                                            }
                                                        }
                                                    ]
                                                })

                                                return () => {
                                                    popper.destroy();
                                                    done();
                                                }
                                            }}
                                        />
                                    </div>
                                    <Code>
                                        {code.popperjsPosition(messages)}
                                    </Code>
                                </Example>
                                <Note>
                                    {messages.examplePositionPopperNote3}
                                </Note>
                            </Section.SubSection>

                            <Section.SubSection titleId={'examplePositionAnimeTitle'}>
                                <Paragraph id='examplePositionAnimeNote1' />
                                <Paragraph
                                    id='examplePositionAnimeNote2'
                                    values={{
                                        anime: <Link href={'https://animejs.com/'} target={"_blank"}>anime.js</Link>,
                                        popper: <PopperLink />
                                    }}
                                />
                                <Example>
                                    <div className={css.animeContainer}>
                                        <AirDatepicker
                                            placeholder={messages.showMeAnimation}
                                            container={`.${css.animeContainer}`}
                                            readonly
                                            position={({$datepicker, $target, $pointer, isViewChange, done}) => {
                                                let popper = createPopper($target, $datepicker, {
                                                    placement: 'bottom',
                                                    onFirstUpdate: state => {
                                                        !isViewChange && anime.remove($datepicker);

                                                        $datepicker.style.transformOrigin = 'center top';

                                                        !isViewChange && anime({
                                                            targets: $datepicker,
                                                            opacity: [0, 1],
                                                            rotateX: [-90, 0],
                                                            easing: 'spring(1.3, 80, 5, 0)',
                                                        })

                                                    },
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, 10]
                                                            }
                                                        },
                                                        {
                                                            name: 'arrow',
                                                            options: {
                                                                element: $pointer,
                                                            }
                                                        },
                                                        {
                                                            name: 'computeStyles',
                                                            options: {
                                                                gpuAcceleration: false,
                                                            },
                                                        },
                                                    ]
                                                });

                                                return () => {
                                                    anime({
                                                        targets: $datepicker,
                                                        opacity: 0,
                                                        rotateX: -90,
                                                        duration: 300,
                                                        easing: 'easeOutCubic'
                                                    }).finished.then(() => {
                                                        popper.destroy();
                                                        // Datepicker could be destroyed at this moment
                                                        // so wrap `done` function in try/catch
                                                        try {
                                                            done();
                                                        } catch (e) {

                                                        }
                                                    })
                                                }
                                            }}
                                        />
                                    </div>
                                    <Code>{code.animePosition}</Code>
                                </Example>
                            </Section.SubSection>

                        </Section>

                        <Section title='exampleRangeTitle'>
                            <FormattedMessage
                                tagName={'p'}
                                id={'exampleRangeNote'}
                                values={{param: <Code inline>{`{range: true}`}</Code>}}
                            />
                            <Example>
                                <AirDatepicker range={true} multipleDatesSeparator={' - '} readonly />
                                <Code>{code.rangeOption}</Code>
                            </Example>
                            <Section.SubSection titleId={'exampleRangeMinMaxTitle'}>
                                <Paragraph
                                    id={'exampleRangeMinMaxNote'}
                                    values={{
                                        minDate: <Code inline isFieldName>{`minDate`}</Code>,
                                        maxDate: <Code inline isFieldName>{`maxDate`}</Code>,
                                        update: <Code inline isFieldName>{`update()`}</Code>,
                                    }}
                                />
                                <Example>
                                    <Example.DoubleSection>
                                        <div>
                                            <AirDatepicker
                                                placeholder={messages.fromDatePlaceholder}
                                                maxDate={maxDate}
                                                onSelect={({date}) => {
                                                    setMinDate(date)
                                                }}
                                                inlineInput
                                                readonly
                                            />
                                        </div>
                                        <div>
                                            <AirDatepicker
                                                placeholder={messages.toDatePlaceholder}
                                                minDate={minDate}
                                                onSelect={({date}) => {
                                                    setMaxDate(date)
                                                }}
                                                inlineInput
                                                readonly
                                            />
                                        </div>
                                    </Example.DoubleSection>
                                    <Code>{code.rangeMinMax}</Code>
                                </Example>
                            </Section.SubSection>
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
                                <AirDatepicker timepicker={true} readonly/>
                                <Code>{code.timeOption}</Code>
                            </Example>

                            <Section.SubSection titleId={'exampleTimeTitleFormat'}>
                                <FormattedMessage
                                    tagName={'p'}
                                    id={'exampleTimeFormatNote'}
                                    values={{
                                        paramName: <Code inline>{`{timeFormat: '...'}`}</Code>,
                                        dateFormataa: <Code inline>{`'aa'`}</Code>,
                                        dateFormatAA: <Code inline>{`'AA'`}</Code>,
                                        hSym: <Code inline>{`'h'`}</Code>,
                                        hhSym: <Code inline>{`'hh'`}</Code>
                                    }}
                                />
                                <Example>
                                    <AirDatepicker
                                        timepicker
                                        selectedDates={new Date()}
                                        timeFormat={'hh:mm AA'}
                                        readonly
                                    />
                                    <Code>{code.timeFormatOption}</Code>
                                </Example>
                            </Section.SubSection>
                            <Section.SubSection titleId={'exampleTimeRangeTitle'}>
                                <FormattedMessage
                                    id={'exampleTimeRangeNote'}
                                    tagName={'p'}
                                    values={{
                                        commonOptions: <Code inline>{`minHours, maxHours, minMinutes, maxMinutes`}</Code>,
                                        stepOptions: <Code inline>{`hoursStep, minutesStep`}</Code>
                                    }}
                                />
                                <FormattedMessage
                                    id={'exampleTimeRangeNote2'}
                                    values={{
                                        from: '8',
                                        to: '19',
                                        step: '5',
                                    }}
                                    tagName={'p'}
                                />
                                <Example>
                                    <AirDatepicker inline timepicker minHours={9} maxHours={18} minutesStep={5}/>
                                    <Example>
                                        <Code>{code.timeRangeExample}</Code>
                                    </Example>
                                </Example>
                            </Section.SubSection>
                        </Section>
                        <Section title='exampleCellContentTitle'>
                            <FormattedMessage
                                tagName={'p'}
                                id={'exampleCellContentNote'}
                                values={{
                                    param: <Code inline>{`{onRenderCell: ({date, cellType}) => {})}`}</Code>,
                                }}
                            />
                            <FormattedMessage
                                tagName={'p'}
                                id={'exampleCellContentNote_2'}
                            />
                            <Example>
                                <AirDatepicker
                                    inline
                                    selectedDates={new Date(today.getFullYear(), today.getMonth(), 10)}
                                    onRenderCell={({date, cellType}) => {
                                        let dates = [1, 5, 7, 10, 15, 20, 25],
                                            emoji = ['💕', '😃', '🍙', '🍣', '🍻', '🎉', '🥁'],
                                            isDay = cellType === 'day',
                                            _date = date.getDate(),
                                            shouldChangeContent = isDay && dates.includes(_date),
                                            randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

                                        return {
                                            html: shouldChangeContent ? randomEmoji : false,
                                            classes: shouldChangeContent ? '-emoji-cell-' : false
                                        }
                                    }}/>
                                <Code>{code.customCellExample}</Code>
                                <Code language='css'>{code.customCellExampleCss}</Code>
                            </Example>
                        </Section>
                        <Section title={'exampleTitlesTitle'}>
                            <Paragraph id='exampleTitlesNote' />
                            <Section.SubSection titleId={'exampleTitlesBasic'}>
                                <Example>
                                    <AirDatepicker
                                        inline
                                        navTitles={{
                                            days: '<strong>yyyy</strong> <i>MMMM</i>',
                                            months: 'Select month of <i>yyyy</i>'
                                        }}
                                    />
                                    <Code>{code.customTitleBasicExample}</Code>
                                </Example>
                            </Section.SubSection>
                            <Section.SubSection titleId={'exampleTitlesCustomTitle'}>
                                <Example>
                                    <AirDatepicker
                                        inline
                                        navTitles={{
                                            days(dp) {
                                                if (dp.selectedDates.length) {
                                                    return `<small>${messages
                                                        .chosenDate
                                                        .replace('{date}', dp.formatDate(dp.selectedDates[0], 'dd MMMM yyyy'))}
                                                        </small>`
                                                }
                                                return messages.chooseDate
                                            }
                                        }}
                                    />
                                    <Code>{code.customTitleExample(messages)}</Code>
                                </Example>
                            </Section.SubSection>
                        </Section>
                        <Section title={'exampleButtonsTitle'}>
                            <Paragraph id='exampleButtonsNote' values={{
                                link: <Link href={'/docs#buttons'}>{messages.inDocsSection}</Link>
                            }}/>
                            <Section.SubSection titleId={'exampleButtonsBasicTitle'}>
                                <Paragraph id='exampleButtonsBasicNote' values={{
                                    optsName: <Code inline isFieldName>{`buttons`}</Code>,
                                }} />
                                <Example>
                                    <AirDatepicker
                                        inline
                                        buttons={['today', 'clear']}
                                    />
                                    <Code>{code.exampleButtonsBasic}</Code>
                                </Example>
                            </Section.SubSection>
                            <Section.SubSection titleId={'exampleButtonsAdvanceTitle'}>

                                <Paragraph id='exampleButtonsAdvanceNote'/>
                                <Example>
                                    <AirDatepicker
                                        inlineInput
                                        selectedDates={[new Date()]}
                                        buttons={[
                                            {
                                                content(dp) {
                                                    return dp.opts.timepicker
                                                        ? messages.exampleButtonsAdvanceTurnOff
                                                        : messages.exampleButtonsAdvanceTurnOn
                                                },
                                                onClick(dp) {
                                                    let viewDate = dp.viewDate;
                                                    let today = new Date();

                                                    viewDate.setHours(today.getHours());
                                                    viewDate.setMinutes(today.getMinutes());

                                                    dp.update({
                                                        timepicker: !dp.opts.timepicker,
                                                        viewDate
                                                    })
                                                }
                                            }
                                        ]}
                                    />
                                    <Code>{code.exampleButtonsAdvance(messages)}</Code>
                                </Example>
                            </Section.SubSection>
                        </Section>
                    </main>
                </ContentGrid>
            </Container>
        </div>
    );
}

