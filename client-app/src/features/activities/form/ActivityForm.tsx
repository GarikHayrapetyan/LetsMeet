import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'

interface Props {
    activity:Activity | undefined;
    closeForm:()=>void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity:selectedActivity,closeForm,createOrEdit}:Props) {

    const initialState = selectedActivity ?? 
    {
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''
    }


    const [activity,setActivity] = useState(initialState);

    function handleInputChange(event:ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) {
        const {name,value} = event.target;
        setActivity({...activity, [name]:value})
    }

    function handleOnSubmit() {
        createOrEdit(activity);        
    }
 
    return (
        <Segment clearing >
            <Form onSubmit={handleOnSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button positive content='Submit' type='submit' floated='right' />
                <Button onClick={closeForm} basic content='Cancel' type='button' floated='right' />
            </Form>
        </Segment>
    )
}