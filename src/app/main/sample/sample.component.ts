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
    public payout:number;
    public trafficNetwork:string;
    public email:string;
    // public tags:string='0';
    // public country:string;
    public socialNetwork:string;
    public exp:string='0';
    public confirm:string;
    public isActiveForm:boolean=false;
    public getFormDataByEmail:any;
    public emailPub:string='';//dinhhoang123@gmail.com
    public lengthFormData:number=0;
    public idFormData:number=0;
    public my_array_isToggle:any;

    public isMoreInformation:boolean=false;

    public cr:number;
    public ar:number;
    public epc:number;
    public statusOffer:number=0;

    public quantity:number;

    public ratio1:number;
    public ratio2:number;
    public ratio3:number;

    public type:string='0';

    public selectedTags:any=[];
    public tags:any;

    public selectedCountry:any=[];
    public country=[
        { id: 1, name: 'Vietnam' },
        { id: 2, name: 'Thailand' },
        { id: 3, name: 'Bahamas' },
        { id: 4, name:"Indonesia"},
        { id: 5, name:"United States of America"},
    ];
    public selectedAge:any=[];
    public age = [
        { id: 1, name: '20 tuổi->35 tuổi',value:[20,35] },
        { id: 2, name: '35 tuổi->45 tuổi',value:[35,45] },
        { id: 3, name: '45 tuổi->60 tuổi+',value:[45,60] },
    ];

    public selectedTraffic: any=[];
    public traffic = [
        { id: 1, name: 'Facebook' },
        { id: 2, name: 'Google' },
        { id: 3, name: 'Tiktok' },
    ];

    selectAddTagMethod(name) {
        return { name: name, tag: true };
    }

    constructor(private TagsService:TagsService,private FormDataService:FormDataService,private spinner: NgxSpinnerService,private _coreTranslationService: CoreTranslationService, private formBuilder: FormBuilder, private OfferService: OfferService) {
        this._coreTranslationService.translate(en, fr, de, pt);
        // this.tags=this.TagsService.getListTags().info["tags-list"];
        this.tags=[
            {
                "id": 45,
                "title": "Health Product",
                "sort": 0
            },
            {
                "id": 48,
                "title": "Male Enhancement",
                "sort": 0
            },
            {
                "id": 49,
                "title": "Health & Beauty",
                "sort": 0
            },
            {
                "id": 50,
                "title": "Diet & Weightloss",
                "sort": 0
            },
            {
                "id": 51,
                "title": "Finance",
                "sort": 0
            },
        ];

        this.ratio1=Math.floor(Math.random() * 21) + 80;
        this.ratio2=Math.floor(Math.random() * 11) + 70;
        this.ratio3=Math.floor(Math.random() * 21) + 50;

        // Math.floor (Math.random () * 31) + 50
        // let data_form={
        //     tags: "Male Enhancement",
        //     country: "",
        //     age: 24,
        //     traffic_network: "ekiwi",
        //     exp: "1",
        //     scale: "agency",
        //     price:36
        // };

        // this.OfferService.getOffer(data_form).subscribe(data => {
        //     this.listOffer = data;
        //     this.lenghtListOffer = this.listOffer.length;
        //     this.lengthFormData = 0;
        // });
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
        // else {
        //     if (/^[a-zA-Z ]{4,50}$/.test(this.country)) {
        //         this.my_array_isToggle.country.error='';
        //     }
        //     else {
        //         this.my_array_isToggle.country.error='Must be a valid country!';
        //     }
        // }
    }

    onKeyAge(event){
        // this.age=event.target.value;
        // if(!this.age){
        //     this.my_array_isToggle.age.error='Age is required!';
        // }
        // else {
        //     if(this.age>=18 && this.age<=100){
        //         this.my_array_isToggle.age.error='';
        //     }
        //     else {
        //         this.my_array_isToggle.age.error='Must be a valid age!';
        //     }
        // }
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
    // ngDoCheck(){
    //     this.mouseoverErrorScale();
    // }

    mouseoverErrorScale(){
        // if(this.exp=='0'){
        //     this.my_array_isToggle.exp.error='Exp is required!';
        // }
        // else if(this.exp=='1' || this.exp=='2') {
        //     this.my_array_isToggle.exp.error='';
        // }
        // else {
        //     this.my_array_isToggle.exp.error='Must be a valid exp!';
        // }
        //
        // if(this.scale=='0'){
        //     this.my_array_isToggle.scale.error='Scale is required!';
        // }
        // else if(this.scale=='odd_pub' || this.scale=='agency') {
        //     this.my_array_isToggle.scale.error='';
        // }
        // else {
        //     this.my_array_isToggle.scale.error='Must be a valid scale!';
        // }
    }

    onKeyQuantity(event){
        if(!this.quantity){
            this.my_array_isToggle.quantity.error='Quantity is required!';
        }
        else {
            if(isNaN(this.quantity)){
                this.my_array_isToggle.quantity.error='Must be a valid quantity!';
            }
            else if(!isNaN(this.quantity) && this.quantity>=1){
                this.my_array_isToggle.quantity.error='';
            }
        }
    }
        onKeyPayout(event){
        if(!this.payout){
            this.my_array_isToggle.payout.error='';
        }
        else {
            if(isNaN(this.payout)){
            this.my_array_isToggle.payout.error='Must be a valid payout!';
            }
            else if(!isNaN(this.payout) && this.payout>0){
                this.my_array_isToggle.payout.error='';
            }
        }
        console.log(this.my_array_isToggle.payout.error);
    }
    onKeyCr(event){
        if(!this.cr){
            this.my_array_isToggle.cr.error='';
        }
        else {
            if(isNaN(this.cr)){
            this.my_array_isToggle.cr.error='Must be a valid cr!';
            }
            else if(!isNaN(this.cr) && this.cr>0){
                this.my_array_isToggle.cr.error='';
            }
        }
    }

    onKeyAr(event){
            if(!this.ar){
                this.my_array_isToggle.ar.error='';
            }
            else {
                if(isNaN(this.ar)){
                this.my_array_isToggle.ar.error='Must be a valid ar!';
                }
                else if(!isNaN(this.ar) && this.ar>0){
                    this.my_array_isToggle.ar.error='';
                }
            }
    }
    onKeyEpc(event){
        if(!this.epc){
            this.my_array_isToggle.epc.error='';
        }
        else {
            if(isNaN(this.epc)){
                this.my_array_isToggle.epc.error='Must be a valid epc!';
            }
            else if(!isNaN(this.epc) && this.epc>0){
                this.my_array_isToggle.epc.error='';
            }
        }
    }
    //////////////////////////////////////////////////////// su kien check
    clickInput(value){
        if(value=="traffic"){

            if(this.selectedTraffic.length<=0){
                this.my_array_isToggle.traffic.error='Traffic is required!';
            }
            else{
                this.my_array_isToggle.traffic.error='';
            }

            console.log("traffic-"+this.my_array_isToggle.traffic.error);
        }
        else if(value=='exp'){
            if(this.exp=='0'){
                this.my_array_isToggle.exp.error='Exp is required!';
            }
            else {
                this.my_array_isToggle.exp.error='';
            }
        }
        else if(value=='quantity'){
            if(!this.quantity){
                this.my_array_isToggle.quantity.error='Quantity is required!';
            }
            else {
                if(isNaN(this.quantity)){
                    this.my_array_isToggle.quantity.error='Must be a valid quantity!';
                }
                else if(!isNaN(this.quantity) && this.quantity>=1){
                    this.my_array_isToggle.quantity.error='';
                }
            }
        }
        else if(value=='age'){
            if(this.selectedAge.length<=0){
                this.my_array_isToggle.age.error='Age is required!';
            }
            else{
                this.my_array_isToggle.age.error='';
            }
        }
        else if(value=='tags'){
            if(this.selectedTags.length<=0){
                this.my_array_isToggle.tags.error='Tags is required!';
            }
            else {
                this.my_array_isToggle.tags.error = '';
            }

        }
        else if(value=='payout'){
            if(!this.payout){
                this.my_array_isToggle.payout.error='';
            }
            else {
                if(isNaN(this.payout)){
                this.my_array_isToggle.payout.error='Must be a valid payout!';
                }
                else if(!isNaN(this.payout) && this.payout>0){
                    this.my_array_isToggle.payout.error='';
                }
            }
        }
        else if(value=='country'){
            if(this.selectedCountry.length<=0){
                this.my_array_isToggle.country.error='Country is required!';
            }
            else {
                this.my_array_isToggle.country.error='';
            }
            console.log(this.my_array_isToggle.country.error);
        }
        else if(value=='type'){
            if(this.type=='0'){
                this.my_array_isToggle.type.error='Type is required!';
            }
            else {
                this.my_array_isToggle.type.error='';
            }
        }
        else if(value=="cr"){
            if(!this.cr){
                this.my_array_isToggle.cr.error='';
            }
            else {
                if(isNaN(this.cr)){
                this.my_array_isToggle.cr.error='Must be a valid cr!';
                }
                else if(!isNaN(this.cr) && this.cr>0){
                    this.my_array_isToggle.cr.error='';
                }
            }
        }
        else if(value=="ar"){
            console.log('click');
            if(!this.ar){
                this.my_array_isToggle.ar.error='';
            }
            else {
                if(isNaN(this.ar)){
                this.my_array_isToggle.ar.error='Must be a valid ar!';
                }
                else if(!isNaN(this.ar) && this.ar>0){
                    this.my_array_isToggle.ar.error='';
                }
            }
        }
        else if(value=='epc'){
            if(!this.epc){
                this.my_array_isToggle.epc.error='';
            }
            else {
                if(isNaN(this.epc)){
                    this.my_array_isToggle.epc.error='Must be a valid epc!';
                }
                else if(!isNaN(this.epc) && this.epc>0){
                    this.my_array_isToggle.epc.error='';
                }
            }
        }




        else if(value=='scale'){
            if(this.scale=='0'){
                this.my_array_isToggle.scale.error='Scale is required!';
            }
            else{
                this.my_array_isToggle.scale.error='';
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
    }

    /////////////////////////////////////////////////////////////////////// xu ly
    handleResult1(){
        console.log('ok');
        console.log('select traffic');
        console.log(this.selectedTraffic);
        console.log('exp-'+this.exp);
        console.log('quantity-'+this.quantity);
        console.log('age');
        console.log(this.selectedAge);
        console.log('linh vuc');
        console.log(this.selectedTags);

        console.log('hoa hong-'+this.payout);
        console.log('country');
        console.log(this.selectedCountry);
        console.log('type-'+this.type);
        console.log('ar-'+this.ar);
        console.log('cr-'+this.cr);
        console.log('epc-'+this.epc);
        console.log('status offer-'+this.statusOffer);

    }
    handleResult(){
        let scale:any;
            this.isLoading=true;
            setTimeout(() => {

                this.isLoading=false;
                    let data_form={
                        tags: this.tags,
                        // country: this.country.toLowerCase(),
                        age : this.age,
                        traffic_network : this.trafficNetwork.toLowerCase(),
                        exp : this.exp,
                        scale : this.scale,
                        payout : this.payout
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
                            // country: this.country.toLowerCase(),
                            age : this.age,
                            traffic_network : this.trafficNetwork.toLowerCase(),
                            exp : this.exp,
                            scale : this.scale,
                            payout : this.payout
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
                    payout:data.payout,
                };

                this.OfferService.getOffer(data_form).subscribe(data => {
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
            this.payout=data.payout;
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
            payout:{
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
            traffic:{
                error:'error',
            },
            quantity:{
                error:'error',
            },
            type:{
                error:'error',
            },
            cr:{
                error:'error',
            },
            ar:{
                error:'error',
            },
            epc:{
                error:'error',
            },
            statusOffer:{
                error:'error',
            }

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

