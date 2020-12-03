import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./common/login/login.component";
import { LandingComponent } from "./landing.component";
import { DoctorForgotPasswordComponent } from "./common/doctor-forgot-password/doctor-forgot-password.component";
import { PatientForgotPasswordComponent } from "./common/patient-forgot-password/patient-forgot-password.component";

import { SignupComponent } from "./common/signup/signup.component";
import { PatientSignUpComponent } from "./common/patient-sign-up/patient-sign-up.component";
import { PatientLoginComponent } from "./common/patient-login/patient-login.component";
// import { DoctorProfileWithoutloginComponent } from "./common/doctor-profile-withoutlogin/doctor-profile-withoutlogin.component";
import { ListAllDoctorsComponent } from "./common/list-all-doctors/list-all-doctors.component";
import { DoctorNewPasswordComponent } from './common/doctor-new-password/doctor-new-password.component';
import { DoctorEmailVerificationComponent } from './common/doctor-email-verification/doctor-email-verification.component';
import { PatientEmailVerificationComponent } from './common/patient-email-verification/patient-email-verification.component';
import { PatientNewPasswordComponent } from './common/patient-new-password/patient-new-password.component';
import { ViewCoupenComponent } from './common/view-coupen/view-coupen.component';
import { ViewDocComponent } from './common/view-doc/view-doc.component';



export const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    children: [
      { path: "", component: LoginComponent, pathMatch: "full" },
      { path: "login", component: LoginComponent, pathMatch: "full" },
      { path: "viewCoupen/:id", component: ViewCoupenComponent, pathMatch: "full" },
      { path: "viewDocument/:id", component: ViewDocComponent, pathMatch: "full" },

      {
        path: "doctorforgotPassword",
        component: DoctorForgotPasswordComponent,
        pathMatch: "full"
      },
      {
        path: "patientforgotPassword",
        component: PatientForgotPasswordComponent,
        pathMatch: "full"
      },
      {
        path: "doctorNewPassword",
        component: DoctorNewPasswordComponent,
        pathMatch: "full"
      },
      {
        path: "patientNewPassword",
        component: PatientNewPasswordComponent,
        pathMatch: "full"
      },
      {
        path: "doctorEmailVerification",
        component: DoctorEmailVerificationComponent,
        pathMatch: "full"
      },
      {
        path: "patientEmailVerification",
        component: PatientEmailVerificationComponent,
        pathMatch: "full"
      },
      {
        path: "signup",
        component: SignupComponent,
        pathMatch: "full"
      },

      {
        path: "patientsignup",
        component: PatientSignUpComponent,
        pathMatch: "full"
      },

      {
        path: "patientlogin",
        component: PatientLoginComponent,
        pathMatch: "full"
      },
      // {
      //   path: "doctorPublicProfile/:id",
      //   component: DoctorProfileWithoutloginComponent,
      //   pathMatch: "full"
      // },
      {
        path: "listAllDoctors",
        component: ListAllDoctorsComponent,
        pathMatch: "full"
      }
    ]
  }
];
