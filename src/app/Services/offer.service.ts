import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offer} from "../Model/offer";
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private HttpClient:HttpClient) { }

  getOffer(data:any):Observable<any>{
    return this.HttpClient.post<any>("http://127.0.0.1:8000/api/offer",data);
  }
}
