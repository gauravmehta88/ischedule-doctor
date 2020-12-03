import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

import { DoctorService } from "../../../doctor/services/doctor.service";

import { CookieService } from "../../services/cookie.service";

import { LoginService } from "../../services/login.service";
declare var $: any;
@Component({
  selector: "app-list-all-doctors",
  templateUrl: "./list-all-doctors.component.html",
  styleUrls: ["./list-all-doctors.component.css"],
  providers: [DoctorService]
})
export class ListAllDoctorsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;
  allDoctors: any = [];
  constructor(
    private doctorService: DoctorService,
    private ts: ToasterService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.getDoctorList();
  }

  getDoctorList() {
    this.doctorService.getDoctorList().subscribe(res => {
      console.log(res);
      this.loading = false;
      if (res.IsSuccess) {
        this.allDoctors = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
}
