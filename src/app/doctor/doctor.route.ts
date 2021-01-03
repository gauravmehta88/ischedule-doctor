import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DoctorComponent } from "./doctor.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookAppointmentComponent } from "./book-appointment/book-appointment.component";
import { AddPatientComponent } from "./add-patient/add-patient.component";
import { DoctorScheduleComponent } from "./doctor-schedule/doctor-schedule.component";
import { AddStaffComponent } from "./add-staff/add-staff.component";
import { ComposeMailComponent } from "./compose-mail/compose-mail.component";
import { InboxMailComponent } from "./inbox-mail/inbox-mail.component";
import { ViewMailComponent } from "./view-mail/view-mail.component";
import { DoctorProfileComponent } from "./doctor-profile/doctor-profile.component";
import { SearchPatientComponent } from "./search-patient/search-patient.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { AddDoctorScheduleComponent } from './add-doctor-schedule/add-doctor-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { NotesComponent } from './notes/notes.component';


import { DocumentsComponent } from './documents/documents.component';
import { ApproveDisapproveAppointmentComponent } from './approve-disapprove-appointment/approve-disapprove-appointment.component';

import { CoupensComponent } from './coupens/coupens.component';
import { ViewCoupenComponent } from './view-coupen/view-coupen.component';

import { ChatComponent } from './chat/chat.component';
import { CoupenCategoryComponent } from './coupen-category/coupen-category.component';
import { AllCoupensComponent } from './all-coupens/all-coupens.component';
import { EditCoupenComponent } from './edit-coupen/edit-coupen.component';
import { TodayAppointmentComponent } from './today-appointment/today-appointment.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { MySubscriptionPlanComponent } from './my-subscription-plan/my-subscription-plan.component';
import { PaySubscriptionComponent } from './pay-subscription/pay-subscription.component';
import { ViewAllStaffComponent } from './view-all-staff/view-all-staff.component';

export const routes: Routes = [
  {
    path: "",
    component: DoctorComponent,
    children: [
      { path: "", component: DashboardComponent, pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent, pathMatch: "full" },

      { path: "viewAllStaff", component: ViewAllStaffComponent, pathMatch: "full" },
      { path: "subscriptionPlan", component: SubscriptionPlanComponent, pathMatch: "full" },
      { path: "mySubscriptionPlan", component: MySubscriptionPlanComponent, pathMatch: "full" },
      { path: "pay-subscription/:subsId", component: PaySubscriptionComponent, pathMatch: "full" },

      { path: "todaysAppointments", component: TodayAppointmentComponent, pathMatch: "full" },
      { path: "allAppointments", component: AllAppointmentsComponent, pathMatch: "full" },
      { path: "allBills", component: AllBillsComponent, pathMatch: "full" },

      { path: "coupenCategory", component: CoupenCategoryComponent, pathMatch: "full" },
      { path: "allCoupens", component: AllCoupensComponent, pathMatch: "full" },

      { path: "approveDisapprove", component: ApproveDisapproveAppointmentComponent, pathMatch: "full" },
      { path: "viewCoupen/:id", component: ViewCoupenComponent, pathMatch: "full" },

      { path: "chat", component: ChatComponent, pathMatch: "full" },


      { path: "profile", component: DoctorProfileComponent, pathMatch: "full" },
      {
        path: "bookAppointment",
        component: BookAppointmentComponent,
        pathMatch: "full"
      },
      {
        path: "schedule",
        component: ScheduleComponent,
        pathMatch: "full"
      },
      {
        path: "notes",
        component: NotesComponent,
        pathMatch: "full"
      },
      {
        path: "slotBooking",
        component: SlotBookingComponent,
        pathMatch: "full"
      },
      { path: "addPatient", component: AddPatientComponent, pathMatch: "full" },
      {
        path: "addCoupen",
        component: CoupensComponent,
        pathMatch: "full"
      },
      {
        path: "editCoupen/:id",
        component: EditCoupenComponent,
        pathMatch: "full"
      },
      {
        path: "doctorSchedule",
        component: DoctorScheduleComponent,
        pathMatch: "full"
      },
      {
        path: "adddoctorSchedule",
        component: AddDoctorScheduleComponent,
        pathMatch: "full"
      },
      {
        path: "doctorProfile",
        component: DoctorProfileComponent,
        pathMatch: "full"
      },
      { path: "addStaff", component: AddStaffComponent, pathMatch: "full" },
      {
        path: "composeMail",
        component: ComposeMailComponent,
        pathMatch: "full"
      },

      { path: "inboxMail", component: InboxMailComponent, pathMatch: "full" },
      { path: "viewMail", component: ViewMailComponent, pathMatch: "full" },

      {
        path: "searchPatient",
        component: SearchPatientComponent,
        pathMatch: "full"
      },
      {
        path: "patientProfile/:id",
        component: PatientProfileComponent,
        pathMatch: "full"
      }
    ]
  }
];
