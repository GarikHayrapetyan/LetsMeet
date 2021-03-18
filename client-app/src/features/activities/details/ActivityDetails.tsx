import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface Props {
    activity: Activity;
    cancelSelectedActivity: () => void;
    openForm:(id:string)=>void;
}

export default function ActivityDetails({ activity, cancelSelectedActivity,openForm}: Props) {
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
                    <Button onClick={cancelSelectedActivity} basic content='Cancel' color='grey' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}