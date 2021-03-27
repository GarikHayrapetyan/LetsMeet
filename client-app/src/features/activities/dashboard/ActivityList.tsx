import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { activitiesByDate: activities, deleteActivity, loadingDelete } = activityStore;
    const [target, setTarget] = useState('');

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="h2" content={activity.title} />
                            <Item.Meta content={activity.date} />
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    as={Link} to={`/activities/${activity.id}`}
                                    floated='right' 
                                    content='View' 
                                    color='blue' />
                                <Button
                                    name={activity.id}
                                    loading={loadingDelete && target === activity.id}
                                    onClick={(e) => handleDeleteActivity(e, activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic floated='left' content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})