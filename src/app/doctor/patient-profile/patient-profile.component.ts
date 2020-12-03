import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
import { Router, ActivatedRoute } from "@angular/router";

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
import { Alert } from 'selenium-webdriver';



declare var $;

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.css"],
  providers: [DoctorService]
})
export class PatientProfileComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  firstName: string = "";
  middleName: string = "";
  profilePicPath: string = "";
  lastName: string = "";
  mobileNumber: string = "";
  pincode: string = "";
  email: string = "";
  address: string = "";
  title: string = "";
  description = "";
  patientId: string = ""
  billItems: any = [{}];
  billItemsEdit: any = []
  invoiceDetailEdit: any = []
  prescriontionArray: any = [];
  invoiceTax: string = "";
  invoiceDiscount: string = "";
  invoiceNotes: string = "";
  invoiceDueDate: Date = new Date();
  loading: boolean = false;
  documents: any = [];
  invoiceDetail: any = {}
  prescriptionEdit: any = {}
  invoiceDetails: any = [];
  prescriptionDetails: any = {}
  prescriptionEditDetails: any = {}
  prescription: any = {};
  prescriptionArray: any = [{}]
  prescriptionEditArray: any = []
  invoice: any = {}
  appointmentList: any = [];
  appid: String = ""
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private _route: ActivatedRoute
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this._route.params.subscribe(data => {
      console.log(data);
      this.patientId = data.id;
      this.getPatientProfile();


      this.getDocuments();
      this.getPatientAppointments();

    });

    setTimeout(() => {
      $('select').selectpicker();
    }, 1000);
  }


  editPrescription(prescriptionDetails) {
    console.log(prescriptionDetails)
    this.prescriptionEditDetails = prescriptionDetails
    this.prescriptionEditArray = prescriptionDetails.presc
  }

  editInvoice(invoiceDetail) {
    console.log(invoiceDetail)

    this.invoiceDetailEdit = invoiceDetail;

  }
  getPatientAppointments() {
    this.doctorService.getPatientAppointments(this.patientId).subscribe(res => {

      if (res.IsSuccess) {
        this.appointmentList = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
  addBillItem() {
    this.billItems.push({})
  }

  addBillItemEdit() {
    this.billItemsEdit.push({})

  }
  addPrescriptionToArray() {
    setTimeout(() => {
      $('select').selectpicker();
    }, 1000);
    this.prescriptionArray.push({})

  }
  deletePrescriptionFromEditArray(index) {

    this.prescriptionEditArray.splice(index, 1)

  }
  deletePrescriptionFromArray(index) {

    this.prescriptionArray.splice(index, 1)

  }

  delBillItem(index) {
    this.billItems.splice(index, 1)

  }

  delBillItemEdit(index) {
    this.billItemsEdit.splice(index, 1)

  }
  editPrescriptionToArray() {
    setTimeout(() => {
      $('select').selectpicker();
    }, 1000);
    this.prescriptionEditArray.push({})

  }


  submitInvoice() {
    if (this.billItems.length == 0) {
      this.ts.pop("error", "", "Invoice cant be empty")
      return false;
    }
    let dataToSend = {
      "appointment_id": this.appid,
      "billItems": this.billItems,
      "subTotal": "40",
      "discount": this.invoiceDiscount,
      "tax": this.invoiceTax,
      "total": "39",
      "dueDate": this.invoiceDueDate,
      "patient_id": this.patientId,
      "notes": this.invoiceNotes

    }

    this.doctorService.addInvoice(dataToSend).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Invoice added successfully")
        this.billItems = [{}];
        this.invoiceNotes = "";
        this.invoiceDiscount = "";
        this.invoiceTax = "";
        this.invoiceDueDate = new Date()
        $('#add-invoice').modal('hide')
        this.getPatientInvoice()
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  updateInvoice() {
    console.log(this.invoiceDetailEdit)
    if (this.invoiceDetailEdit.billItems.length == 0) {
      this.ts.pop("error", "", "Invoice cant be empty")
      return false;
    }
    let dataToSend = {
      "appointment_id": this.invoiceDetailEdit.appointment_id._id,
      "billItems": this.invoiceDetailEdit.billItems,
      "subTotal": this.invoiceDetailEdit.subTotal,
      "discount": this.invoiceDetailEdit.discount,
      "tax": this.invoiceDetailEdit.tax,
      "total": this.invoiceDetailEdit.total,
      "dueDate": this.invoiceDetailEdit.dueDate,
      "patient_id": this.invoiceDetailEdit.patient_id._id,
      "notes": this.invoiceDetailEdit.notes

    }

    this.doctorService.updateInvoice(dataToSend, this.invoiceDetailEdit._id).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Invoice added successfully")
        this.billItems = [{}];
        this.invoiceNotes = "";
        this.invoiceDiscount = "";
        this.invoiceTax = "";
        this.invoiceDueDate = new Date()
        $('#edit-invoice').modal('hide')
        this.getPatientInvoice()
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  getPatientProfile() {
    this.doctorService.getPatientProfile(this.patientId).subscribe(res => {
      console.log(res);
      this.loading = false;
      if (res.IsSuccess) {
        this.firstName = res.Data.firstName;
        this.lastName = res.Data.lastName;
        this.mobileNumber = res.Data.mobileNumber;
        this.pincode = res.Data.pincode;
        this.email = res.Data.email;
        this.address = res.Data.address;
        this.profilePicPath = res.Data.profilePicPath
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
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
  viewPrescription(appid) {
    this.appid = appid;
    this.getPatientPrescription()
  }

  viewInvoice(appid) {
    this.appid = appid;
    this.getPatientInvoice()
  }
  getDocuments() {
    this.doctorService
      .getDocumentsForPatient(this.patientId)
      .subscribe(res => {
        if (res.IsSuccess) {

          this.documents = res.Data;
        } else {
          this.ts.pop("error", "", res.Message)
        }

      })

  }



  getPatientInvoice() {
    this.doctorService.getPatientInvoice(this.patientId, this.appid).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        if (res.Data.length > 0)
          this.invoiceDetail = res.Data[0];
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  thisAppointment(appid) {

    this.appid = appid
  }
  addPrescription() {

    let dataToSend = {
      "appointmentId": this.appid,
      "patientId": this.patientId,

      "presc": this.prescriptionArray,
      "pharmacyDetail": this.prescription.pharmacyDetail,
      "prescriptionNote": this.prescription.prescriptionNote

    }



    console.log(dataToSend)
    this.doctorService.addPatientPrescription(dataToSend).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Prescription Added");
        $('#add-prescription').modal('hide')
        this.prescription = {};
        this.description = "";
        this.prescriptionArray = []

      } else {
        this.ts.pop("error", "", res.Message)

      }
    });
  }

  updatePrescription(pres) {
    console.log(pres)
    let dataToSend = {
      "appointmentId": pres.appointment_id._id,
      "patientId": pres.patient_id._id,

      "presc": pres.presc,
      "pharmacyDetail": pres.pharmacyDetail,
      "prescriptionNote": pres.prescriptionNote

    }



    console.log(dataToSend)
    this.doctorService.updatePatientPrescription(dataToSend, pres._id).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Prescription Updated");
        $('#edit-prescription').modal('hide')
        this.prescription = {};
        this.description = "";
        this.prescriptionArray = []

      } else {
        this.ts.pop("error", "", res.Message)

      }
    });
  }

  getPatientPrescription() {


    this.doctorService.getPatientPrescription(this.patientId, this.appid).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        if (res.Data.length > 0) {
          this.prescriptionDetails = res.Data[0];
          console.log(this.prescriptionDetails)
          setTimeout(() => {
            $('select').selectpicker();
          }, 1000);
        }
      } else {
        this.ts.pop("error", "", res.Message)

      }
    });
  }
}

