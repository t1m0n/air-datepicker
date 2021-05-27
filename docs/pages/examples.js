import React from 'react';
import Container from 'components/layout/container';
import ContentGrid from 'components/layout/contentGrid';
import NavBar from 'components/navBar';

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
                            main
                        </main>
                    </ContentGrid>
                </Container>
            </div>
        );
    }
}
