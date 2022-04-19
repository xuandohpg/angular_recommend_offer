import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormData} from "../Model/formData";
import {Offer} from "../Model/offer";

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private HttpClient:HttpClient) { }

  getListFormData():Observable<Array<FormData>>{
    return this.HttpClient.get<Array<FormData>>('http://localhost:8000/api/formdata');
  }

  getFormDataById(id:number):Observable<any>{
    return this.HttpClient.get<any>('http://localhost:8000/api/formdata/'+id);
  }
  editFormData(id:number,data:any){
    return this.HttpClient.put<any>('http://localhost:8000/api/formdata/'+id,data);
  }
  createFormData(data:any):Observable<any>{
    return this.HttpClient.post<any>('http://localhost:8000/api/formdata',data);
  }



}
