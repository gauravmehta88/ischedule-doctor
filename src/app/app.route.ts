import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
    { path: "", loadChildren: "./landing/landing.module#LandingModule" },

    { path: "doctor", loadChildren: "./doctor/doctor.module#DoctorModule" },
    // { path: "patient", loadChildren: "./patient/patient.module#PatientModule" }
];
