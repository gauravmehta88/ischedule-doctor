

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
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.css'],
  providers: [DoctorService]
})
export class AllBillsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  allAppointments: any = [];
  appStatus: String = "";
  invoiceDetail: any = {}
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loading = true;
    this.getAllAppointments();
    this.getAllBills();

  }

  getInvoiceSubTotal(invoiceDetail) {
    let subTotal = 0;

    if ($.isEmptyObject(invoiceDetail))
      return subTotal
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    return subTotal

  }

  getInvoiceCost(invoiceDetail) {

    let subTotal = 0;
    if ($.isEmptyObject(invoiceDetail))
      return subTotal
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    let discountInInt = subTotal * parseInt(invoiceDetail.discount) / 100;
    let taxtInInt = subTotal * parseInt(invoiceDetail.tax) / 100;

    return (subTotal - discountInInt + taxtInInt)
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

          } else {
            this.ts.pop("error", "", res.Message)

          }
        });

      }
    });



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
  getAllAppointments() {

  }

  viewInvoice(invoiceDetail) {

    this.invoiceDetail = invoiceDetail
  }

  getAllBills() {
    this.doctorService.getAllInvoices().subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.allAppointments = res.Data;
        $('select').selectpicker('refresh');
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }


}



