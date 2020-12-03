import { Component, OnInit, AfterViewInit } from "@angular/core";
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

import { CookieService } from "../../services/cookie.service";

import { LoginService } from "../../services/login.service";
declare var $: any;
@Component({
  selector: "app-forgot-password",
  templateUrl: "./patient-forgot-password.component.html",
  styleUrls: ["./patient-forgot-password.component.css"],
  providers: [LoginService]
})
export class PatientForgotPasswordComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  userNamevalidation: boolean = true;
  passwordvalidation: boolean = true;
  loading: boolean = false;
  emailMobile: String = "";
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private ts: ToasterService,
    private cookieService: CookieService
  ) { }
  toggleNavbar() {
    $("html").toggleClass("nav-open");
  }
  ngOnInit() { }
  submit() {
    if (this.emailMobile == "") {
      this.ts.pop("error", "", "please enter email or mobile");
      return false;
    }
    this.loading = true;

    this.loginService.forgotPasswordForPatient(this.emailMobile).subscribe(data => {
      if (data.IsSuccess) {
        this.loading = false;

        this.ts.pop(
          "success",
          "OTP sent",
          "OTP has been successfully sent to your email"
        );

        setTimeout(() => {
          this.router.navigate(["patientlogin"]);
        }, 2000);

      } else {
        this.loading = false;
        this.ts.pop("error", "", data.Message);
      }
      //  this.loading = false;
    });
  }
}
