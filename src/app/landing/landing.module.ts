import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray
} from "@angular/forms";

import { ToasterService } from "angular2-toaster";
import { ToasterModule } from "angular2-toaster";

//-----------------------------**services**-----------------------------
import { CookieService } from "./services/cookie.service";

import { LandingComponent } from "./landing.component";
import { Routes, RouterModule } from "@angular/router";
import { routes } from "./landing.route";
import { LoginComponent } from "./common/login/login.component";
import { DoctorForgotPasswordComponent } from "./common/doctor-forgot-password/doctor-forgot-password.component";

import { SignupComponent } from "./common/signup/signup.component";
import { NavBarComponent } from "./common/nav-bar/nav-bar.component";
import { FooterComponent } from "./common/footer/footer.component";
import { EmailConfirmationComponent } from "./common/email-confirmation/email-confirmation.component";
import { PatientSignUpComponent } from "./common/patient-sign-up/patient-sign-up.component";
import { PatientLoginComponent } from './common/patient-login/patient-login.component';
// import { DoctorProfileWithoutloginComponent } from './common/doctor-profile-withoutlogin/doctor-profile-withoutlogin.component';
import { ListAllDoctorsComponent } from './common/list-all-doctors/list-all-doctors.component';
import { DoctorNewPasswordComponent } from './common/doctor-new-password/doctor-new-password.component';
import { DoctorEmailVerificationComponent } from './common/doctor-email-verification/doctor-email-verification.component';
import { PatientEmailVerificationComponent } from './common/patient-email-verification/patient-email-verification.component';
import { PatientNewPasswordComponent } from './common/patient-new-password/patient-new-password.component';
import { PatientForgotPasswordComponent } from './common/patient-forgot-password/patient-forgot-password.component';
import { ViewCoupenComponent } from './common/view-coupen/view-coupen.component';
import { ViewDocComponent } from './common/view-doc/view-doc.component';

//services

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    DoctorForgotPasswordComponent,
    SignupComponent,
    NavBarComponent,
    FooterComponent,
    EmailConfirmationComponent,
    PatientSignUpComponent,
    PatientLoginComponent,
    // DoctorProfileWithoutloginComponent,
    ListAllDoctorsComponent,
    DoctorNewPasswordComponent,
    DoctorEmailVerificationComponent,
    PatientEmailVerificationComponent,
    PatientNewPasswordComponent,
    PatientForgotPasswordComponent,
    ViewCoupenComponent,
    ViewDocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ToasterModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ToasterService, CookieService]
})
export class LandingModule { }
