import { makeAutoObservable, makeObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommanStore{
    error:ServerError|null=null;

    constructor() {
        makeAutoObservable(this)
    }

    setServerError=(error:ServerError)=>{
        this.error=error;
    }
}