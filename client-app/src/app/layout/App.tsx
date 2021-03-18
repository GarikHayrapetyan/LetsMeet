import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import {v4 as uuid} from 'uuid';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:13818/api/activities").then(response => {
      console.log(response.data);
      setActivities(response.data);
    });
  }, []);


  function handleSelectActivity(id: string) {   
    setSelectedActivity(activities.find(x => x.id === id));
    console.log(typeof(selectedActivity));
    
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);    
    console.log(typeof(selectedActivity));
  }

  function handleOpenForm(id?:string) {
    id? handleSelectActivity(id) : handleCancelActivity()      
      setSelectedActivity(undefined)
      console.log("else selected activity:"+selectedActivity?.description);
      
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity) {
    activity.id ? 
      setActivities([...activities.filter(x=>x.id !== activity.id),activity])
      : setActivities([...activities,{...activity,id:uuid()}])

      setSelectedActivity(activity)
      setEditMode(false)
  }

  function handleDeleteActivity(id:string) {
    setActivities([...activities.filter(x=>x.id !== id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handleOpenForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          setSelectedActivity={handleSelectActivity} 
          cancelSelectedActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          />
      </Container>
    </Fragment>
  );
}

export default App;
