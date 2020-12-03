import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
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

import { CookieService } from "../../services/cookie.service";

import { LoginService } from "../../services/login.service";
declare var $: any;
@Component({
  selector: "app-change-password",
  templateUrl: "./doctor-new-password.component.html",
  styleUrls: ["./doctor-new-password.component.css"],
  providers: [LoginService]
})
export class DoctorNewPasswordComponent implements OnInit {
  validate: boolean = false
  loading: boolean = false;
  otp: String = "";
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  newPassword: String = "";
  confirmPassword: String = "";
  email: String = "";

  errorOtp: boolean = false;
  errorPassword: boolean = false;

  errorConfirmPassword: boolean = false;
  errorPasswordMisMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private ts: ToasterService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
  ) { }

  submit() {
    let flag = 0;

    if (this.newPassword == "") {
      this.errorPassword = true;
      flag = 1;
    }
    if (this.confirmPassword == "") {
      this.errorConfirmPassword = true;
      flag = 1;
    }
    if (this.confirmPassword != this.newPassword) {
      this.errorPasswordMisMatch = true;
      flag = 1;
    }
    if (flag) return false;

    let dataTosend = {
      code: this.otp,
      email: this.email,
      newPassword: this.newPassword
    };
    this.loginService.generateNewPassword(dataTosend).subscribe(data => {
      if (data.IsSuccess) {
        this.loading = false;

        this.ts.pop("success", "New password generated", "");
        this.ts.pop("success", "", "redirecting in 3 seconds....");

        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 3000);
      } else {
        this.loading = false;
        this.ts.pop("error", "", data.Message);
      }
      //  this.loading = false;
    });
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.otp = params['code'];
      this.email = params['email'];
    });
  }
}
