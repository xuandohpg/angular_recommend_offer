import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tags} from "../Model/tags";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  // public tags=new Tags();
  public listTags:any={
    "status": "success",
    "code": 200,
    "name": "OK",
    "message": "Tags List",
    "info": {
      "tags-list": [
        {
          "id": 45,
          "title": "Credit Card Submit",
          "sort": 0
        },
        {
          "id": 42,
          "title": "Accessories",
          "sort": 0
        },
        {
          "id": 43,
          "title": "Women Enhancement",
          "sort": 0
        },
        {
          "id": 44,
          "title": "Fashion",
          "sort": 0
        },
        {
          "id": 40,
          "title": "Inhouse",
          "sort": 0
        },
        {
          "id": 46,
          "title": "Cosmetic",
          "sort": 0
        },
        {
          "id": 47,
          "title": "Gift",
          "sort": 0
        },
        {
          "id": 49,
          "title": "Job",
          "sort": 0
        },
        {
          "id": 50,
          "title": "Luxury Design",
          "sort": 0
        },
        {
          "id": 51,
          "title": "White Product",
          "sort": 0
        },
        {
          "id": 52,
          "title": "Exclusive Offer",
          "sort": 0
        },
        {
          "id": 36,
          "title": "Health Product",
          "sort": 0
        },
        {
          "id": 37,
          "title": "Adult",
          "sort": 0
        },
        {
          "id": 38,
          "title": "Diet & Weightloss",
          "sort": 0
        },
        {
          "id": 39,
          "title": "Male Enhancement",
          "sort": 0
        },
        {
          "id": 54,
          "title": "Ecommerce",
          "sort": 0
        },
        {
          "id": 48,
          "title": "Mobile Application",
          "sort": 0
        },
        {
          "id": 53,
          "title": "Hybrid Deal ",
          "sort": 0
        },
        {
          "id": 41,
          "title": "Feng Shui",
          "sort": 0
        },
        {
          "id": 20,
          "title": "Automotive",
          "sort": 1
        },
        {
          "id": 1,
          "title": "Baby",
          "sort": 2
        },
        {
          "id": 28,
          "title": "Business Opportunity",
          "sort": 3
        },
        {
          "id": 2,
          "title": "Books & Magazines",
          "sort": 4
        },
        {
          "id": 3,
          "title": "Clothing & Shoes",
          "sort": 6
        },
        {
          "id": 4,
          "title": "Computers & Networking",
          "sort": 7
        },
        {
          "id": 27,
          "title": "Consumer Products",
          "sort": 8
        },
        {
          "id": 30,
          "title": "Dating",
          "sort": 9
        },
        {
          "id": 26,
          "title": "Education",
          "sort": 10
        },
        {
          "id": 5,
          "title": "Electronics",
          "sort": 11
        },
        {
          "id": 34,
          "title": "Email / Zip submit",
          "sort": 12
        },
        {
          "id": 35,
          "title": "Entertainment",
          "sort": 13
        },
        {
          "id": 6,
          "title": "Finance",
          "sort": 14
        },
        {
          "id": 22,
          "title": "Mobile Game",
          "sort": 15
        },
        {
          "id": 8,
          "title": "Gift Cards & Certificates",
          "sort": 16
        },
        {
          "id": 9,
          "title": "Health & Beauty",
          "sort": 17
        },
        {
          "id": 10,
          "title": "Home",
          "sort": 18
        },
        {
          "id": 11,
          "title": "Jewelry & Accessories",
          "sort": 19
        },
        {
          "id": 29,
          "title": "Incentive",
          "sort": 20
        },
        {
          "id": 25,
          "title": "Internet",
          "sort": 21
        },
        {
          "id": 13,
          "title": "Lawn & Garden",
          "sort": 22
        },
        {
          "id": 33,
          "title": "Mobile",
          "sort": 23
        },
        {
          "id": 12,
          "title": "Kitchenware & Appliances",
          "sort": 24
        },
        {
          "id": 15,
          "title": "Office Products",
          "sort": 25
        },
        {
          "id": 14,
          "title": "Music & Video",
          "sort": 26
        },
        {
          "id": 16,
          "title": "Personal & Home",
          "sort": 27
        },
        {
          "id": 17,
          "title": "Pet Supplies & Products",
          "sort": 28
        },
        {
          "id": 31,
          "title": "Real Estate",
          "sort": 29
        },
        {
          "id": 32,
          "title": "Social Media",
          "sort": 30
        },
        {
          "id": 19,
          "title": "Sports & Outdoors",
          "sort": 31
        },
        {
          "id": 23,
          "title": "Travel",
          "sort": 32
        },
        {
          "id": 18,
          "title": "Software",
          "sort": 33
        },
        {
          "id": 21,
          "title": "Toys & Hobbies",
          "sort": 34
        },
        {
          "id": 24,
          "title": "Other",
          "sort": 35
        }
      ]
    }
  }
  constructor(private HttpClient:HttpClient) { }
  getListTags(){
    return this.listTags;
  }
  // getListTags():Observable<any>{
  //   return this.HttpClient.get<any>("https://dinos.scaletrk.com/api/v2/common/lists/tags");
  // }
}
