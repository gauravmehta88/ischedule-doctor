

import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
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
  selector: 'app-view-all-staff',
  templateUrl: './view-all-staff.component.html',
  styleUrls: ['./view-all-staff.component.css'],
  providers: [DoctorService]
})
export class ViewAllStaffComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  allStaff: any = [];
  appStatus: String = ""
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loading = true;
    this.getAllStaff();

  }


  selectChange(appId) {

    this.appStatus = $('#select' + appId).val()
    swal({
      title: "Are you sure want to change the status of this appointment ",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES  !"
    }).then(result => {
      console.log(result);
      if (result) {
        let datatosend = {
          appointmentStatusToSet: this.appStatus,
          appId: appId
        }
        this.doctorService.changeAppointmentStatus(datatosend).subscribe(res => {
          this.loading = false;
          if (res.IsSuccess) {
            this.ts.pop("success", "", "Appointment  Status Updated")

          } else {
            this.ts.pop("error", "", res.Message)

          }
        });

      }
    });


  }

  deleteStaff(staffId) {
    this.doctorService.deleteStaff(staffId).subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.ts.pop('success', '', 'Successfully deleted')
        this.getAllStaff()
      } else {
        this.ts.pop("error", "", res.Message)

      }
    });
  }
  getAllStaff() {
    this.doctorService.getAllStaff().subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.allStaff = res.Data;
        $('select').selectpicker('refresh');
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }


}



