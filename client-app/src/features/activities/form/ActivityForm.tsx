import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';


export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity,loading,updateActivity,
        loadActivity,loadingInitial,setInitialLoading} = activityStore;
    const {id} = useParams<{id:string}>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(()=>{
        if (id) {
            loadActivity(id).then(activity=>setActivity(activity!))
        }else{
            setInitialLoading(false);
        }
    },[id,loadActivity,setInitialLoading])

     
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    function handleOnSubmit() {
       if (activity.id.length === 0) {
           let newActivity = {...activity,id:uuid()};
           createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
       }else{
           updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
       }
    }

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..."/>
    }

    return (
        <Segment clearing >
            <Form onSubmit={handleOnSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button 
                    name={activity.id}
                    positive 
                    loading={loading} 
                    content='Submit' 
                    type='submit' 
                    floated='right' />
                <Button  
                    as={Link} to='/activities'
                    basic 
                    content='Cancel' 
                    type='button' 
                    floated='right' />
            </Form>
        </Segment>
    )
})


