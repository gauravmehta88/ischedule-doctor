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
  selector: 'app-all-coupens',
  templateUrl: './all-coupens.component.html',
  styleUrls: ['./all-coupens.component.css'],
  providers: [DoctorService]
})


export class AllCoupensComponent implements OnInit {
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
  cNames: any = [];
  coupenCategories: any = [];

  constructor(private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private route: Router,

    private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.getCoupens();
    // this.getCoupenCat()
  }

  search() {
    if (this.keyword == "") {
      this.getCoupens();
      return false;
    }
    this.doctorService
      .searchCoupens(this.keyword)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.allCoupens = res.Data

        } else {
          this.ts.pop("error", "", res.Message)
        }

      })
  }





  edit(coupen) {
    console.log(coupen)
    this.route.navigate(["/doctor/editCoupen/" + coupen._id]);

  }
  scroll() {
    $('html, body').animate({
      scrollTop: $('.content').offset().top - 20
    }, 'slow');
  }




  delete(id) {
    this.doctorService.deleteCoupen(id).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "coupen deleted successfully");
        this.getCoupens();
        this.isEdit = false;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  viewCoupen(id) {
    this.route.navigate(["/doctor/viewCoupen/" + id]);

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

  getDiscountPercnt(coupen) {

    return (coupen.value - coupen.discountedValue) * 100 / coupen.value

  }

  getCoupens() {
    this.doctorService.getCoupens().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allCoupens = res.Data
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }



}
