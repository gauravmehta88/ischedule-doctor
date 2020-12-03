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
  selector: "app-search-patient",
  templateUrl: "./search-patient.component.html",
  styleUrls: ["./search-patient.component.css"],
  providers: [DoctorService]
})
export class SearchPatientComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  allPatients: any = [];
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loading = true;
    this.getAllPatients();
    setTimeout(() => {
      $("#drpdown").selectpicker();
    }, 500);
  }

  getAllPatients() {
    this.doctorService.getAllPatients().subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.allPatients = res.Data;
        setTimeout(() => {
          $("#tblData").dataTable();
        }, 1000);
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  searchPatient() {
    this.doctorService.searchPatient().subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.allPatients = res.Data;
        setTimeout(() => {
          $("#tblData").dataTable();
        }, 1000);
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }



  viewProfile(id) {
    this.router.navigate(["/doctor/patientProfile/" + id]);

  }
  deletePatient(id) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      console.log(result);
      if (result) {
        this.loading = true;
        this.doctorService.deletePatient(id).subscribe(res => {
          if (res.IsSuccess) {
            this.ts.pop("success", "", "Patient removed successfully");
            this.getAllPatients();
          } else {
            this.ts.pop("error", "", res.Message);
          }
        });
      }
    });
  }
}
