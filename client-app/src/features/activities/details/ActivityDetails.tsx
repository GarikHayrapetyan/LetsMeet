import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity,openForm,cancelActivity} = activityStore;

    if (!activity) {
        return <h2>Never can be reached!</h2>
    }

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header as='h2' content={activity.title} />
                <Card.Meta content={activity.date} />
                <Card.Description>
                    <div>{activity.description}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={()=>openForm(activity.id)} basic content='Edit' color='blue' />
                    <Button onClick={cancelActivity} basic content='Cancel' color='grey' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}