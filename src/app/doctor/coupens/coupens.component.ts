import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
import { Router, ActivatedRoute } from "@angular/router";


import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import * as filestack from 'filestack-js';

const client = filestack.init('AGqWW8kQNRqi122GGl1nvz');


declare var $;
@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.css'],
  providers: [DoctorService]
})


export class CoupensComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  Cattitle: string = "";
  discountedValue: string = "";
  address: string = "";
  valid_from: string = "";
  valid_till: string = "";
  keyword: string = "";
  minDate: Date = new Date()

  title: string = "";
  price: string = "";
  description = "";
  allCoupens: any = [];
  coupenDocs: any = [];
  couponCategory: string = "";
  isEdit: boolean = false;
  _id: string = "";
  coupenId: string = "";
  cNames: any = [];
  coupenCategories: any = [];

  constructor(private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private route: Router,

    private router: ActivatedRoute) {

  }

  ngOnInit() {

    this.getCoupenCat()
  }



  getCoupenCat() {
    this.doctorService
      .getCoupenCategories()
      .subscribe(res => {
        if (res.IsSuccess) {

          this.coupenCategories = res.Data;
          setTimeout(() => {
            $("#drpdownCat").selectpicker();
          }, 500);
        } else {
          this.ts.pop("error", "", res.Message)
        }

      })
  }
  saveCoupenCategory() {
    console.log(this.Cattitle)
    if (this.Cattitle == "") {
      this.ts.pop("error", "", "Coupen Category is missing!");
      return false
    }

    let dataToSend = {

      "title": this.Cattitle,
      "doctor_id": ""

    }
    this.doctorService
      .addCoupenCategory(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Category added successfully");
          this.getCoupenCat();
          this.couponCategory = res.catId;
          $('#catAdd').modal('hide')
          this.Cattitle = "";


        } else
          this.ts.pop("error", "", res.Message)
      })
  }

  uploadDocumentArray() {
    const options = {
      maxFiles: 10,
      onUploadDone: file => {
        // If you throw any error in this function it will reject the file selection.
        // The error message will be displayed to the user as an alert.
        file.filesUploaded.forEach(element => {
          this.coupenDocs.push(element.url);
          this.cNames.push({
            url: element.url,
            filename: element.filename
          })
        });

      }
    };


    client.picker(options).open();
  }

  scroll() {
    $('html, body').animate({
      scrollTop: $('.content').offset().top - 20
    }, 'slow');
  }

  onDateValueChangeEventFrom(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      this.valid_from = year + "/" + month + "/" + day;

    }
  }

  onDateValueChangeEventTo(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      this.valid_till = year + "/" + month + "/" + day;

    }
  }

  saveCoupen() {
    if (this.price == "" || this.title == "" || this.valid_from == "" || this.valid_till == "" || this.couponCategory == "") {
      this.ts.pop("error", "", "please fill all the fields");
      return false;
    }

    let dataToSend = {

      "value": this.price,
      "discountedValue": this.discountedValue,
      "address": this.address,
      "title": this.title,
      "description": this.description,
      "images": this.coupenDocs,
      "couponCategory": this.couponCategory,
      "valid_from": this.valid_from,
      "valid_till": this.valid_till

    }







    this.doctorService.addCoupen(dataToSend).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "coupen added successfully");

        this.clear();
        this.scroll();

      } else {
        this.ts.pop("error", "", res.Message);

      }
    });
  }





  clear() {
    this._id = "";
    this.address = "";
    this.coupenDocs = [];
    this.description = "";
    this.price = "";
    this.valid_till = "";
    this.valid_from = "";
    this.discountedValue = "";
    this.title = "";
    this.couponCategory = "";
    setTimeout(() => {
      $("<select>").selectpicker("refresh");
      $("#drpdownCat").selectpicker("refresh");

    }, 100);
    this.cNames = []
  }



}
