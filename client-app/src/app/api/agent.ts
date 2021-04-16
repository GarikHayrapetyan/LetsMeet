import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/Activity';
import { store } from '../stores/store';

axios.defaults.baseURL = "http://localhost:13818/api";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status,config } = error.response!;
    
    switch (status) {
        case 400:
            if(typeof data ==='string'){                
                toast.error("bad request");
            }
            if (config.method==='get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = []
                for(const key in data.errors){
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }

                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error("unauthorized");
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commanStore.setServerError(data)
            history.push("/server-error");
            break;
    }

})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post('/activities', activity),
    update: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent