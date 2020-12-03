import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
import * as filestack from 'filestack-js';
import { Router } from "@angular/router";

// import Swal from "sweetalert2";
declare var swal: any;
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


declare var $;

@Component({
  selector: "app-dashboard",
  templateUrl: "./approve-disapprove-appointment.component.html",
  styleUrls: ["./approve-disapprove-appointment.component.css"],
  providers: [DoctorService]
})
export class ApproveDisapproveAppointmentComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  allAppointments: any = [];
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loading = true;
    this.getAllAppointments();

  }


  approve(appId) {


    swal({
      title: "Are you sure want to approve this appointment ",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService.approveAppointment(appId).subscribe(res => {
          this.loading = false;
          if (res.IsSuccess) {
            this.ts.pop("success", "", "Appointment  successfully approved")
            this.getAllAppointments()
          } else {
            this.ts.pop("error", "", res.Message)

          }
        });

      }
    });



  }


  disapprove(appId) {


    swal({
      title: "Are you sure want to disapprove this appointment ",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService.disapproveAppointment(appId).subscribe(res => {
          this.loading = false;
          if (res.IsSuccess) {
            this.ts.pop("success", "", "Appointment  successfully disapproved")
            this.getAllAppointments()
          } else {
            this.ts.pop("error", "", res.Message)

          }
        });

      }
    });



  }

  viewProfile(id) {

    this.router.navigate(["/doctor/patientProfile/" + id]);

  }
  getAllAppointments() {
    this.doctorService.getAllAppointments().subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.allAppointments = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
}
