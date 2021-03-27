import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/Activity";

export default class ActivityStore{
    activityRegistry = new Map<string,Activity>()
    selectedActivity:Activity|undefined=undefined;
    loadingInitial=true;
    loading=false;
    loadingDelete=false;
    editMode=false;
   
    constructor() {
        makeAutoObservable(this);       
    }

    get activitiesByDate (){
        return Array.from(this.activityRegistry.values())
                 .sort((a,b)=>Date.parse(a.date)*Date.parse(b.date));
    }

    loadingActivities = async () =>{
        this.loadingInitial=true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity=>{
                this.setActivity(activity);
            })
        } catch (error) {
            console.log(error);            
        }finally{
           this.setInitialLoading(false);
        }        
    }

    loadActivity = async (id:string)=>{
        this.loadingInitial = true;
        let activity = this.getActivity(id);
        if (activity) {
            this.setSelectedActivity(activity);
            this.setInitialLoading(false);
            return activity;
        } else {
            try {
                activity = await agent.Activities.details(id);
                this.setSelectedActivity(activity);
                this.setActivity(activity);
                this.setInitialLoading(false)
                return activity;
            } catch (error) {
                console.log(error);   
                this.setInitialLoading(false);             
            }
        }

        
    }

    private setSelectedActivity(activity:Activity){
        this.selectedActivity=activity;
    }

    private getActivity (id:string){
        return this.activityRegistry.get(id);
    }

    private setActivity(activity:Activity){
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id,activity);
    }

    setInitialLoading = (state:boolean) =>{
        this.loadingInitial = state;
    }


    createActivity = async (activity:Activity) =>{
        this.loading = true;   
        try {
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;
                this.loadingInitial=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
                this.loadingInitial=false;
            });
        }

    }

    updateActivity = async (activity:Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(()=>{                
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false
            });
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })            
        }
    }

    deleteActivity = async (id:string)=>{
        this.loadingDelete=true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id)
                this.loadingDelete=false;
                if (this.selectedActivity?.id === id) {
                    this.selectedActivity=undefined;
                    this.editMode=false;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loadingDelete=false;
            });            
        }
    }
  

}