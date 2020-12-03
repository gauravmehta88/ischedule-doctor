import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
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
  selector: "app-book-appointment",
  templateUrl: "./book-appointment.component.html",
  styleUrls: ["./book-appointment.component.css"],
  providers: [DoctorService]
})
export class BookAppointmentComponent implements OnInit {
  patientForm: FormGroup;
  allSpecialities: any = [];
  myDateValue: Date;
  maxDate: any = new Date();
  mytime: Date = new Date();

  errorFirstName: boolean = false;
  errorLastName: boolean = false;
  errorEmail: boolean = false;
  errorMobile: boolean = false;
  slotArray: any = [];
  dayName: string = "";
  emptySlot: boolean = false;
  minDate: any = new Date()

  loading: boolean = false;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) { }

  ngOnInit() {
    this.getAllSpecialities();
    this.initPatientForm();
    setTimeout(() => {
      $("#drpdown").selectpicker();
      $('.datepicker').datepicker({
        startDate: '-3d'
      });
    }, 500);
  }

  onDateValueChange(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var doa = day + " / " + month + " / " + year;
      this.patientForm.patchValue({
        dateOfAppointment: doa
      });
    }
  }

  initPatientForm() {
    this.slotArray = []
    this.patientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      mobileNumber: [""],
      dob: [""],
      dateOfAppointment: [""],
      timeOfAppointment: [""],
      gender: [""],
      email: [""],
      description: [""],
      service: [""],
      doctorId: "5cc59085f3745d37f9d0f908"
    });
    $("#drpdown").selectpicker("refresh");

  }

  getAllSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSpecialities = res.Data;

        setTimeout(() => {
          $("#drpdownSpeciality").selectpicker();
        }, 500);
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
  searchSlots() {
    this.emptySlot = false

    // this.doctorId = "5cbab271de3e275696acfbe0";
    this.doctorService.dateWiseAvailableSlots(this.patientForm.controls.dateOfAppointment.value).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {

        this.slotArray = res.EmptySlots
        if (this.slotArray.length == 0)
          this.emptySlot = true


      } else {
        this.slotArray = [];

        this.ts.pop("error", "", res.Message)
      }


    });




  }

  bookAppointment(slot) {
    if (!this.patientForm.valid) {
      if (this.patientForm.controls.firstName.value == "") {
        this.errorFirstName = true;
      } else this.errorFirstName = false;
      if (this.patientForm.controls.email.value == "") {
        this.errorEmail = true;
      } else this.errorEmail = false;

      if (this.patientForm.controls.mobileNumber.value == "") {
        this.errorMobile = true;
      } else this.errorMobile = false;

      this.ts.pop("error", "", "fill required fields");
      return false;
    }
    if (this.patientForm.invalid) {
      this.ts.pop("error", "", "please fill the valid information");
      return false;
    }

    if (this.patientForm.value.dateOfAppointment == "") {
      this.ts.pop("error", "", "please select date of appointment");
      return false;
    }

    var today = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))

    var doaa = (this.patientForm.value.dateOfAppointment)
    doaa.setHours(slot.split(":")[0])

    if (new Date() > doaa) {
      this.ts.pop("error", "", "Invalid Appointment Time")
      return false
    }

    var dateOfApp = new Date(this.patientForm.value.dateOfAppointment);
    var month = dateOfApp.getMonth() + 1;
    var day = dateOfApp.getDate();
    var year = dateOfApp.getFullYear();
    var doa = year + "-" + month + "-" + day;

    var dateOfbirth = new Date(this.patientForm.value.dob);
    var monthd = dateOfbirth.getMonth() + 1;
    var dayd = dateOfbirth.getDate();
    var yeard = dateOfbirth.getFullYear();
    var dob = yeard + "-" + monthd + "-" + dayd;


    var toa = slot;

    var patData = {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      dob: "",
      service: "",
      dateOfAppointment: "",
      timeOfAppointment: "",
      doctorId: ""
    };
    let patId = "";
    patData = this.patientForm.value;
    patData.dateOfAppointment = doa;
    patData.timeOfAppointment = toa;
    patData.dob = dob;
    this.doctorService
      .bookAppointmentWithDoctorForNewPatient(patData)
      .subscribe(res => {
        console.log(res);
        if (res.IsSuccess) {
          this.initPatientForm();
          this.ts.pop("success", "", "Appoinment added successfully");
        } else {
          this.ts.pop("error", "", res.Message);
        }
      });

    console.log(this.patientForm.value);
  }
}
