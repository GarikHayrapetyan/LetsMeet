import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface Props {
    activities: Activity[];
    setSelectedActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
}

export default function ActivityList({ activities,setSelectedActivity,deleteActivity }: Props) {
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
                                <Button onClick={()=>setSelectedActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Button onClick={()=>deleteActivity(activity.id)} floated='right' content='Delete' color='red'/>
                                <Label basic floated='left' content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}