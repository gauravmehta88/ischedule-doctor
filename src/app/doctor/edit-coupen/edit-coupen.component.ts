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
  templateUrl: './edit-coupen.component.html',
  styleUrls: ['./edit-coupen.component.css'],
  providers: [DoctorService]
})


export class EditCoupenComponent implements OnInit {
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
    this.router.params.subscribe(data => {
      console.log(data);
      this.coupenId = data.id
      this.getCoupen();






    });
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




  editCoupen() {
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
      "valid_till": this.valid_till,
      "_id": this._id

    }

    this.doctorService.editCoupen(dataToSend).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "coupen edited successfully");

        this.isEdit = false;
        this.clear()
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
    $("#drpdownCat").selectpicker("refresh");
    this.cNames = []
  }

  getCoupen() {
    this.doctorService.getCoupen(this.coupenId).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        let coupen = res.Data

        this.title = coupen.title;
        this.description = coupen.description;
        this.price = coupen.value;
        this.address = coupen.address;
        this.couponCategory = coupen.coupon_category_id;
        this.discountedValue = coupen.discountedValue;
        let dateValidFrom = new Date(coupen.valid_from);
        let dateValidFromString = (dateValidFrom.getMonth() + 1) + '/' + dateValidFrom.getDate() + '/' + dateValidFrom.getFullYear();
        let dateValidTill = new Date(coupen.valid_till);
        let dateValidTillString = (dateValidTill.getMonth() + 1) + '/' + dateValidTill.getDate() + '/' + dateValidTill.getFullYear();

        this.valid_from = dateValidFromString;
        this.valid_till = dateValidTillString;

        this.coupenDocs = coupen.images;
        this.isEdit = true;
        this._id = coupen._id;
        coupen.images.forEach(element => {
          this.cNames.push({
            url: element,
            filename: element
          })
        });

        this.scroll();

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

}
