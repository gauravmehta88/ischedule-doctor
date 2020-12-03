import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
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

declare var $, swal;
declare var CKEDITOR, ckeditor;
@Component({
  selector: 'app-coupen-category',
  templateUrl: './coupen-category.component.html',
  styleUrls: ['./coupen-category.component.css'],
  providers: [DoctorService]
})
export class CoupenCategoryComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  query: string = "";

  title: string = "";

  coupenCategories: any = [];
  _id: string = "";

  isEdit: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) {

    this.getCoupenCat()
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }

  getCoupenCat() {
    this.doctorService
      .getCoupenCategories()
      .subscribe(res => {
        if (res.IsSuccess) {

          this.coupenCategories = res.Data;
        } else {
          this.ts.pop("error", "", res.Message)
        }

      })
  }
  editCoupenCat(cat) {

    this.title = cat.title;

    this.isEdit = true;
    this._id = cat._id

  }
  editCoupenCats() {
    if (this.title == "") {
      this.ts.pop("error", "", "Coupen Category is missing!");
      return false
    }

    let dataToSend = {
      "_id": this._id,
      "title": this.title,

    }
    this.doctorService
      .editCoupenCategory(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Coupen edited successfully");
          this.getCoupenCat()

          this.title = "";

          this.isEdit = false;


        } else
          this.ts.pop("error", "", res.Message)
      })
  }
  saveCoupenCategory() {

    if (this.title == "") {
      this.ts.pop("error", "", "Coupen Category is missing!");
      return false
    }

    let dataToSend = {

      "title": this.title,
      "doctor_id": ""

    }
    this.doctorService
      .addCoupenCategory(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Category added successfully");
          this.getCoupenCat()

          this.title = "";


        } else
          this.ts.pop("error", "", res.Message)
      })
  }

  deleteNotes(id) {


    swal({
      title: "Are you sure wanto delete this Category?...",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService
          .deleteNote(id)
          .subscribe(res => {
            if (res.IsSuccess) {
              this.ts.pop("success", "", "Category Delete successfully");
              this.getCoupenCat();
            } else {
              this.ts.pop("error", "", res.Mesage)
            }
          })

      }
    });



  }
}

