import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard(){
   const {activityStore} = useStore();
   const {loadingActivities,activityRegistry,loadingInitial} = activityStore

   useEffect(() => {
        if(activityRegistry.size <= 1) loadingActivities();     
   }, [loadingActivities,activityRegistry.size]);


  if (loadingInitial) {
    return <LoadingComponent content="Loading activities ..."/>
  }

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
        </Grid>
    )
})