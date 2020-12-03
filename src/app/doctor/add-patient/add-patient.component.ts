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
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.css"],
  providers: [DoctorService]
})
export class AddPatientComponent implements OnInit {
  loading: boolean = false;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  myDateValue: Date;
  maxDate: Date;
  patientForm: FormGroup;
  errorFirstName: boolean = false;
  errorLastName: boolean = false;

  errorEmail: boolean = false;
  errorMobile: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.initPatientForm();
    setTimeout(() => {
      $("#drpdown").selectpicker();
    }, 500);
  }

  initPatientForm() {
    this.patientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      mobileNumber: [""],
      dob: [""],
      age: [""],
      gender: [""],
      email: [""],
      description: [""]
    });

    $("#drpdown").selectpicker("refresh");

  }

  onDateValueChange(value: Date): void {
    if (value) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      this.patientForm.patchValue({
        age: this.calculate_age(new Date(year, month, day))
      });
    }
  }

  calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  addPatient() {
    console.log(this.patientForm);
    if (!this.patientForm.valid) {
      if (this.patientForm.controls.firstName.value == "") {
        this.errorFirstName = true;
      } else this.errorFirstName = false;
      if (this.patientForm.controls.lastName.value == "") {
        this.errorLastName = true;
      } else this.errorLastName = false;
      if (this.patientForm.controls.email.value == "") {
        this.errorEmail = true;
      } else this.errorEmail = false;

      if (this.patientForm.controls.mobileNumber.value == "") {
        this.errorMobile = true;
      } else this.errorMobile = false;

      this.ts.pop("error", "", "fill required fields");
      return false;
    }
    if (this.patientForm.valid) {
      this.loading = true;

      this.doctorService.addPatient(this.patientForm.value).subscribe(res => {
        this.loading = false;
        console.log(res);
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Patient added successfully");
          this.initPatientForm();
          window.location.reload();
        } else this.ts.pop("error", "", res.Message);
      });
    }
  }
}
