import {Component, OnInit, HostBinding, SimpleChanges, OnChanges,DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy} from '@angular/core';
// import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';
import { FormControl } from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {locale as en} from './i18n/en'
import {locale as fr} from './i18n/fr'
import {locale as de} from './i18n/de'
import {locale as pt} from './i18n/pt'

import {CoreTranslationService} from '@core/services/translation.service'
import {OfferService} from "../../Services/offer.service";
import {trigger,state,style,animate,transition} from '@angular/animations';
import {FormDataService} from "../../Services/form-data.service";
import { NgxSpinnerService } from "ngx-spinner";
import {TagsService} from "../../Services/tags.service";

@Component({
    selector: 'app-sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit {
    public listTags:any;
    public isOnYes:boolean=false;
    public contentHeader: object
    public listOffer: any;
    public lenghtListOffer: number;
    public isLoading:boolean=false;
    public isStatusForm:string='general';
    public scale:string='0';
    public price:number;
    public trafficNetwork:string;
    public email:string;
    public tags:string='0';
    public country:string;
    public age:number;
    public socialNetwork:string;
    public exp:string='0';
    public confirm:string;
    public isActiveForm:boolean=false;
    public getFormDataByEmail:any;
    public emailPub:string='';//dinhhoang123@gmail.com
    public lengthFormData:number=0;
    public idFormData:number=0;
    public my_array_isToggle:any;



    selectAddTagMethod(name) {
        return { name: name, tag: true };
    }

    constructor(private TagsService:TagsService,private FormDataService:FormDataService,private spinner: NgxSpinnerService,private _coreTranslationService: CoreTranslationService, private formBuilder: FormBuilder, private OfferService: OfferService) {
        this._coreTranslationService.translate(en, fr, de, pt);
    }



    /////////////////////////////////////////////////////////////////// su kien keyup
    onKeyEmail(event){
        this.email=event.target.value;
        if(!this.email){
            this.my_array_isToggle.email.error='Email is required!';
        }
        else {
            if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.email)) {
                this.my_array_isToggle.email.error='';
            }
            else {
                this.my_array_isToggle.email.error='Must be a valid email!';
            }
        }
    }

    onKeyTags(event){
        this.tags=event.target.value;
        if(!this.tags){
            this.my_array_isToggle.tags.error='Tags is required!';
        }
        else {
            if (/^[a-zA-Z& ]{4,50}$/.test(this.tags)) {
                this.my_array_isToggle.tags.error='';
            }
            else {
                this.my_array_isToggle.tags.error='Must be a valid tags!';
            }
        }
    }

    onKeyCountry(event){
        this.country=event.target.value;
        if(!this.country){
            this.my_array_isToggle.country.error='Country is required!';
        }
        else {
            if (/^[a-zA-Z ]{4,50}$/.test(this.country)) {
                this.my_array_isToggle.country.error='';
            }
            else {
                this.my_array_isToggle.country.error='Must be a valid country!';
            }
        }
    }

    onKeyAge(event){
        this.age=event.target.value;
        if(!this.age){
            this.my_array_isToggle.age.error='Age is required!';
        }
        else {
            if(this.age>=18 && this.age<=100){
                this.my_array_isToggle.age.error='';
            }
            else {
                this.my_array_isToggle.age.error='Must be a valid age!';
            }
        }
    }


    onKeyTrafficNetwork(event){
        // console.log('okkk');
        if(!this.trafficNetwork){
            this.my_array_isToggle.trafficNetwork.error='Traffic Network is required!';
        }
        else {
            if (/^[a-zA-Z ]{4,50}$/.test(this.trafficNetwork)) {
                this.my_array_isToggle.trafficNetwork.error='';
            }
            else {
                this.my_array_isToggle.trafficNetwork.error='Must be a valid traffic network!';
            }
        }
    }
    onKeyPrice(event){
        if(!this.price){
            this.my_array_isToggle.price.error='Price is required!';
        }
        else {
            if(!isNaN(this.price)){
                this.my_array_isToggle.price.error='';
            }
            else {
                this.my_array_isToggle.price.error='Must be a valid price!';
            }
        }
    }

    // ngDoCheck(){
    //     this.mouseoverErrorScale();
    // }

    mouseoverErrorScale(){
        if(this.exp=='0'){
            this.my_array_isToggle.exp.error='Exp is required!';
        }
        else if(this.exp=='1' || this.exp=='2') {
            this.my_array_isToggle.exp.error='';
        }
        else {
            this.my_array_isToggle.exp.error='Must be a valid exp!';
        }

        if(this.scale=='0'){
            this.my_array_isToggle.scale.error='Scale is required!';
        }
        else if(this.scale=='odd_pub' || this.scale=='agency') {
            this.my_array_isToggle.scale.error='';
        }
        else {
            this.my_array_isToggle.scale.error='Must be a valid scale!';
        }
    }

    //////////////////////////////////////////////////////// su kien check
    clickInput(value){
        if(value=='scale'){
            if(this.scale=='0'){
                this.my_array_isToggle.scale.error='Scale is required!';
            }
            else{
                this.my_array_isToggle.scale.error='';
            }
        }
        else if(value=='price'){
            if(!this.price){
                this.my_array_isToggle.price.error='Price is required!';
            }
            else {
                if(!isNaN(this.price)){
                    this.my_array_isToggle.price.error='';
                }
                else {
                    this.my_array_isToggle.price.error='Must be a valid price!';
                }
            }
        }
        else if(value=='trafficNetwork'){
            if(!this.trafficNetwork){
                this.my_array_isToggle.trafficNetwork.error='Traffic Network is required!';
            }
            else {
                if (/^[a-zA-Z ]{4,50}$/.test(this.trafficNetwork)) {
                    this.my_array_isToggle.trafficNetwork.error='';
                }
                else {
                    this.my_array_isToggle.trafficNetwork.error='Must be a valid traffic network!';
                }
            }
        }
        else if(value=='email'){
            if(!this.email){
                this.my_array_isToggle.email.error='Email is required!';
            }
            else {
                if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.email)) {
                    this.my_array_isToggle.email.error='';
                }
                else {
                    this.my_array_isToggle.email.error='Must be a valid email!';
                }
            }
        }
        else if(value=='tags'){
            if(this.tags=='0'){
                this.my_array_isToggle.tags.error='Tags is required!';
            }
            else {
                this.my_array_isToggle.tags.error = '';
                console.log(this.tags);
            }

        }
        else if(value=='country'){
            if(!this.country){
                this.my_array_isToggle.country.error='Country is required!';
            }
            else {
                if (/^[a-zA-Z ]{4,50}$/.test(this.country)) {
                    this.my_array_isToggle.country.error='';
                }
                else {
                    this.my_array_isToggle.country.error='Must be a valid country!';
                }
            }
        }
        else if(value=='age'){
            if(!this.age){
                this.my_array_isToggle.age.error='Age is required!';
            }
            else {
                if(this.age>=18 && this.age<=100){
                    this.my_array_isToggle.age.error='';
                }
                else {
                    this.my_array_isToggle.age.error='Must be a valid age!';
                }
            }
        }
        else if(value=='exp'){
            if(this.exp=='0'){
                this.my_array_isToggle.exp.error='Exp is required!';
            }
            else if(this.exp=='1' || this.exp=='2') {
                this.my_array_isToggle.exp.error='';
            }
            else {
                this.my_array_isToggle.exp.error='Must be a valid exp!';
            }
        }
    }

    /////////////////////////////////////////////////////////////////////// xu ly
    handleResult(){
        let scale:any;
            this.isLoading=true;
            setTimeout(() => {

                this.isLoading=false;
                    let data_form={
                        tags: this.tags,
                        country: this.country.toLowerCase(),
                        age : this.age,
                        traffic_network : this.trafficNetwork.toLowerCase(),
                        exp : this.exp,
                        scale : this.scale,
                        price : this.price
                    };
                    // console.log(data_form);
                this.OfferService.getOffer(data_form).subscribe(data => {
                    this.listOffer = data;
                    this.lenghtListOffer = this.listOffer.length;
                    if(this.lenghtListOffer<=0){
                        this.listOffer={message:"No data"};
                    }
                    else if(this.idFormData!=0) {
                            this.FormDataService.editFormData(this.idFormData, data_form).subscribe(data=>{
                            });
                    }
                    else{
                        let data_form={
                            email:"xuando199888@gmail.com",
                            tags: this.tags,
                            country: this.country.toLowerCase(),
                            age : this.age,
                            traffic_network : this.trafficNetwork.toLowerCase(),
                            exp : this.exp,
                            scale : this.scale,
                            price : this.price
                        };
                        // this.FormDataService.createFormData(data_form).subscribe(data=>{});
                    }
                });
                this.isStatusForm='finish';
            }, 1600);
    }

    onBackTo(){
        this.lenghtListOffer=undefined;
        this.isStatusForm='general';
    }
    onClickNo(){
        this.isStatusForm='finish';
        this.isLoading=true;
        setTimeout(() => {
            this.isLoading=false;
            this.FormDataService.getFormDataById(this.idFormData).subscribe(data => {
                let data_form = {
                    tags: data.tags,
                    country: data.country,
                    age: data.age,
                    traffic_network: data.traffic_network,
                    exp: data.exp,
                    scale:data.scale,
                    price:data.price,
                };
                this.OfferService.getOffer(data_form).subscribe(data => {
                    console.log(data);
                    this.listOffer = data;
                    this.lenghtListOffer = this.listOffer.length;
                    this.lengthFormData = 0;
                });
            });
        },1600);
    }
    onClickYes(){
        for(let index in this.my_array_isToggle){
            this.my_array_isToggle[index].error='';
        }
        this.isOnYes=true;
        this.lengthFormData=0;
        this.isActiveForm=false;
        setTimeout(() => {
            this.isActiveForm=true;
        }, 6000);

        this.FormDataService.getFormDataById(this.idFormData).subscribe(data => {
            this.tags=data.tags;
            this.country=data.country;
            this.age=data.age;
            this.trafficNetwork=data.traffic_network;
            this.exp=data.exp;
            this.price=data.price;
            this.scale=data.scale;
        });
    }

    ngOnInit() {
        this.listTags=this.TagsService.getListTags().info;
        // this.TagsService.getListTags().subscribe(data=>{
        //     console.log(data);
        // });
        if(this.emailPub){
            this.FormDataService.getListFormData().subscribe(data=>{
                for(let item of data){
                    if(item.email==this.emailPub){
                        this.idFormData=item.id;
                    }
                }
                if(this.idFormData!=0){
                    this.email=this.emailPub;
                    this.lengthFormData=1;
                }
            });
        }

        setTimeout(() => {
            this.isActiveForm=true;
        }, 6000);

        this.my_array_isToggle={
            price:{
                error:'error',
            },
            scale:{
                error:'error',
            },

            trafficNetwork:{
                error:'error',
            },
            email:{
                error:'error',
            },
            tags:{
                error:'error',
            },
            country:{
                error:'error',
            },
            age:{
                error:'error',
            },
            exp:{
                error:'error',
            },
        }

        this.contentHeader = {
            headerTitle: 'Home',
            actionButton: true,
            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'Home',
                        isLink: true,
                        link: '/'
                    },
                    {
                        name: 'Recommend Offer',
                        isLink: false
                    }
                ]
            }
        }

    }
}

