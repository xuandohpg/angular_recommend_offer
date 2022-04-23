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
    public classfy:number=0;

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

    }


    /////////////////////////////////////////////////////////////////// su kien keyup

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


    }

    /////////////////////////////////////////////////////////////////////// xu ly
    handleFirst(){
        // isStatusForm='offerAndInsightData'

        if(this.selectedTraffic.length<=0){
            this.my_array_isToggle.traffic.error='Traffic is required!';
        }

        if(!this.quantity){
            this.my_array_isToggle.quantity.error='Quantity is required!';
        }
        else {
            if(isNaN(this.quantity)){
                this.my_array_isToggle.quantity.error='Must be a valid quantity!';
            }
        }

        if(this.selectedAge.length<=0){
            this.my_array_isToggle.age.error='Age is required!';
        }
        if(this.exp=='0'){
            this.my_array_isToggle.exp.error='Exp is required!';
        }

        if(!this.my_array_isToggle.traffic.error && !this.my_array_isToggle.quantity.error && !this.my_array_isToggle.age.error && !this.my_array_isToggle.exp.error){
            this.isStatusForm='offerAndInsightData';
        }
    }

    handleResult(){

        if(this.type=='0'){
            this.my_array_isToggle.type.error='Type is required!';
        }

        if(this.selectedCountry.length<=0){
            this.my_array_isToggle.country.error='Country is required!';
        }

        if(this.selectedTags.length<=0){
            this.my_array_isToggle.tags.error='Tags is required!';
        }

        if(!this.my_array_isToggle.type.error && !this.my_array_isToggle.country.error && !this.my_array_isToggle.tags.error){
            if(!this.my_array_isToggle.payout.error && !this.my_array_isToggle.ar.error && !this.my_array_isToggle.cr.error && !this.my_array_isToggle.epc.error && !this.my_array_isToggle.type.error){
                this.isLoading=true;
                setTimeout(() => {
                    this.isLoading=false;
                    if(!this.payout) this.payout=0;
                    if(!this.ar) this.ar=0;
                    if(!this.cr) this.cr=0;
                    if(!this.epc) this.epc=0;

                    var data_create={
                        age:this.selectedAge.join(),
                        ar: this.ar,
                        classfy: this.classfy,
                        country:this.selectedCountry.join(),
                        cr: this.cr,
                        epc: this.epc,
                        exp: this.exp,
                        payout: this.payout,
                        quantity: this.quantity,
                        tags:this.selectedTags.join(),
                        traffic:this.selectedTraffic.join(),
                        type:this.type
                    };

                    var data={
                        traffic:this.selectedTraffic,
                        exp: this.exp,
                        age: this.selectedAge,
                        tags: this.selectedTags,
                        country: this.selectedCountry,
                        type:this.type,
                        quantity:this.quantity,
                        payout:this.payout,
                        ar:this.ar,
                        cr:this.cr,
                        epc:this.epc,
                        classfy:this.classfy
                    }

                    this.OfferService.getOffer(data).subscribe(data => {
                        this.listOffer = data;
                        this.lenghtListOffer = this.listOffer.length;
                        if(this.lenghtListOffer<=0) {
                        }
                        
                        else if(this.idFormData!=0) {
                            this.FormDataService.editFormData(this.idFormData, data_create).subscribe(data=>{
                            });
                        }
                        else{
                            if(!this.email){
                                this.email="dovando@gmail.com";
                            }
                            data_create['email']=this.email;
                            this.FormDataService.createFormData(data_create).subscribe(data=>{});
                        }
                    });
                    this.isStatusForm='finish';
                }, 1600)
            }
        }

    }

    onBackTo(){
        this.lenghtListOffer=undefined;
        this.isStatusForm='general';

        if(this.payout==0) this.payout=undefined;
        if(this.ar==0) this.ar=undefined;
        if(this.cr==0) this.cr=undefined;
        if(this.epc==0) this.epc=undefined;
    }
    onClickNo(){
        this.isStatusForm='finish';
        this.isLoading=true;
        setTimeout(() => {
            this.isLoading=false;
            this.FormDataService.getFormDataById(this.idFormData).subscribe(data => {
                let data_form = {
                    age:data.age.split(","),
                    ar: data.ar,
                    classfy: data.classfy,
                    country:data.country.split(","),
                    cr: data.cr,
                    epc: data.epc,
                    exp: data.exp,
                    payout: data.payout,
                    quantity: data.quantity,
                    tags:data.tags.split(","),
                    traffic:data.traffic.split(","),
                    type:data.type
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
        this.isOnYes=true;
        this.lengthFormData=0;
        this.isActiveForm=false;
    }

    ngOnInit() {
        // this.listTags=this.TagsService.getListTags().info;
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

        this.my_array_isToggle={
            payout:{
                error:'',
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
                error:'',
            },
            ar:{
                error:'',
            },
            epc:{
                error:'',
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

