import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';


interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {

    //const { activityStore } = useStore();
    // const { deleteActivity, loadingDelete } = activityStore;
    // const [target, setTarget] = useState('');

    // function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(e.currentTarget.name)
    //     deleteActivity(id);
    // }

    return (
        <Segment.Group size='tiny'>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image src='/assets/user.png' size='tiny' circular/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`} 
                                content={activity.title}/>
                            <Item.Description content='Hosted by Bob'/>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/>{activity.date}
                    <Icon name='marker'/>{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    content='View'
                    floated='right'
                    color='teal'/>                   

             </Segment>
             </Segment.Group>      
    )} 