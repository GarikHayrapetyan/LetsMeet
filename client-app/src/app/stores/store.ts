import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import CommanStore from "./commanStore";

interface Store {
    activityStore:ActivityStore;
    commanStore:CommanStore;
}

export const store:Store = {
    activityStore : new ActivityStore(),
    commanStore:new CommanStore()
}


export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}