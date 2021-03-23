import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity,closeForm,createActivity,loading,updateActivity} = activityStore;

    const initialState = selectedActivity ??
    {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }


    const [activity, setActivity] = useState(initialState);
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    function handleOnSubmit() {
        activity.id ? updateActivity(activity):createActivity(activity) ;
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
                <Button onClick={closeForm} basic content='Cancel' type='button' floated='right' />
            </Form>
        </Segment>
    )
})