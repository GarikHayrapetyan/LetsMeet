import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
      if(id)loadActivity(id);
    },[id,loadActivity])

    if (loadingInitial || !activity) {
        return <LoadingComponent content='Loading activity...'/>
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
                    <Button as={Link} to={`/manage/${activity.id}`} basic content='Edit' color='blue' />
                    <Button as={Link} to={'/activities'} basic content='Cancel' color='grey' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
})