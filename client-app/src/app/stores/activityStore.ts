import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import {v4 as uuid} from "uuid";

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
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity=>{
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id,activity);
            })
        } catch (error) {
            console.log(error);            
        }finally{
           this.setInitialLoading(false);
        }        
    }

    setInitialLoading = (state:boolean) =>{
        this.loadingInitial = state;
    }

    selectActivity = (id:string)=>{
       this.selectedActivity = this.activityRegistry.get(id);
       this.editMode=false;
    }

    cancelActivity = () =>{
        this.selectedActivity = undefined;
    }

    openForm = (id?:string)=>{
        id? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true;
    }

    closeForm = () =>{
        this.editMode=false;
    }

    createActivity = async (activity:Activity) =>{
        this.loading = true;
        
        try {
            activity.id = uuid();
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
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