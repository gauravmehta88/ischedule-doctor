import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DoctorComponent } from "./doctor.component";
import { Routes, RouterModule } from "@angular/router";
import { routes } from "./doctor.route";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
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
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";



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

import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig,
  ToasterModule
} from "angular2-toaster";

import { CookieService } from "../landing/services/cookie.service";
import { AddDoctorScheduleComponent } from './add-doctor-schedule/add-doctor-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { NotesComponent } from './notes/notes.component';
import { SearchNotesPipe } from './search-notes.pipe';
import { SearchChatPipe } from './search-chat.pipe';

import { DocumentsComponent } from './documents/documents.component';
import { ApproveDisapproveAppointmentComponent } from './approve-disapprove-appointment/approve-disapprove-appointment.component';
import { CoupensComponent } from './coupens/coupens.component';
import { ViewCoupenComponent } from './view-coupen/view-coupen.component';
import { ChatComponent } from './chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CoupenCategoryComponent } from './coupen-category/coupen-category.component';
import { AllCoupensComponent } from './all-coupens/all-coupens.component';
import { EditCoupenComponent } from './edit-coupen/edit-coupen.component';
import { TodayAppointmentComponent } from './today-appointment/today-appointment.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { AllBillsComponent } from './all-bills/all-bills.component';


const config: SocketIoConfig = { url: 'http://api.Ischedulenow.com/ ', options: {} };


@NgModule({
  declarations: [
    DoctorComponent,
    DashboardComponent,
    TopBarComponent,
    SideBarComponent,
    BookAppointmentComponent,
    AddPatientComponent,
    DoctorScheduleComponent,
    AddStaffComponent,
    ComposeMailComponent,
    InboxMailComponent,
    ViewMailComponent,
    DoctorProfileComponent,
    SearchPatientComponent,
    PatientProfileComponent,
    AddDoctorScheduleComponent,
    ScheduleComponent,
    SlotBookingComponent,
    NotesComponent,
    SearchNotesPipe,
    SearchChatPipe,
    DocumentsComponent,
    ApproveDisapproveAppointmentComponent,
    CoupensComponent,
    ViewCoupenComponent,
    ChatComponent,
    CoupenCategoryComponent,
    AllCoupensComponent,
    EditCoupenComponent,
    TodayAppointmentComponent,
    AllAppointmentsComponent,
    AllBillsComponent,
  ],
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    BsDatepickerModule,
    TimepickerModule,
    ToasterModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [CookieService]
})
export class DoctorModule { }
