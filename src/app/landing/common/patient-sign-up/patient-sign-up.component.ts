import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { Router } from "@angular/router";
declare var $;
declare var swal: any;

@Component({
  selector: "patient-signup",
  templateUrl: "./patient-sign-up.component.html",
  styleUrls: ["./patient-sign-up.component.css"],
  providers: [LoginService]
})
export class PatientSignUpComponent implements OnInit {
  SignUpForm: FormGroup;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  constructor(
    private fb: FormBuilder,
    private ts: ToasterService,
    public loginService: LoginService,
    public router: Router
  ) {
    this.initSignUpForm();
  }

  ngOnInit() { }

  initSignUpForm() {
    this.SignUpForm = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      mobileNo: [""],
      pinNo: [""],
      address: [""],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      agree: [""]
    });
  }

  toggleNavbar() {
    $("html").toggleClass("nav-open");
  }

  signUp() {
    if (this.SignUpForm.valid) {
      if (!this.SignUpForm.controls.agree.value) {
        this.ts.pop("error", "", "please agree to term and conditions");
        return false;
      }
      let data = {
        firstName: this.SignUpForm.value.firstName,
        lastName: this.SignUpForm.value.lastName,
        email: this.SignUpForm.value.email,
        password: this.SignUpForm.value.password,
        mobileNumber: this.SignUpForm.value.mobileNo,
        address: this.SignUpForm.value.address,
        pincode: this.SignUpForm.value.pinNo
      };
      this.loginService.signUpPatient(data).subscribe(data => {
        if (data.IsSuccess) {
          this.ts.pop("success", "", "Successfully sign up");
          swal({
            title: "Almost there...",
            html: "<div><b>Please check your email to confirm your account</b> </br></br></br> <span> No confirmation email received?</span></br> Please check your spam folder or request new confirmation email</div>",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK  !"
          }).then(result => {
            console.log(result);
            if (result) {
              setTimeout(() => {
                this.router.navigate(["/patientlogin"]);
              }, 3000);
            }
          });
        } else {
          this.ts.pop("error", "", data.Message);
        }
      });
    } else {
      this.ts.pop("error", "", "Please fill all the Details");
    }
  }
}
