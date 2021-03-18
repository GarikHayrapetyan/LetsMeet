import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    setSelectedActivity: (id: string) => void;
    cancelSelectedActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity:(id:string)=>void
}

export default function ActivityDashboard
    ({
        activities,
        setSelectedActivity,
        selectedActivity,
        cancelSelectedActivity,
        editMode,
        openForm,
        closeForm,
        createOrEdit,
        deleteActivity }: Props) {
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList
                    activities={activities}
                    setSelectedActivity={setSelectedActivity} 
                    deleteActivity={deleteActivity}/>
            </GridColumn>
            <GridColumn width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectedActivity={cancelSelectedActivity}
                        openForm={openForm} />}

                {editMode && <ActivityForm activity={selectedActivity} closeForm={closeForm} createOrEdit={createOrEdit} />}
            </GridColumn>
        </Grid>
    )
}