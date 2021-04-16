import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store'

export default function ServerError() {
    const {commanStore} = useStore();

    return(
        <Container>
            <Header as='h1' content='Server Error'/>
            <Header sub as='h5' content={commanStore.error?.message}/>
            {commanStore.error?.details &&
                <Segment>
                    <Header as='h4' content="StackTrace"/>
                    <code style={{marginTop:'10px'}}>{commanStore.error.details}</code>
                </Segment>
            }
        </Container>
    )
}