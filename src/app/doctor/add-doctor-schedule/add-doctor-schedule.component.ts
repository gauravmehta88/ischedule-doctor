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
  selector: "app-add-doctor-schedule",
  templateUrl: "./add-doctor-schedule.component.html",
  styleUrls: ["./add-doctor-schedule.component.css"],
  providers: [DoctorService]
})
export class AddDoctorScheduleComponent implements OnInit {

  myDateValue: Date;
  doctorSchedule: FormGroup;

  maxDate: Date;
  mytime: Date = new Date();



  loading: boolean = false;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) { }

  ngOnInit() {

    this.initPatientForm();

  }

  onDateValueChange(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var doa = day + " / " + month + " / " + year;
      this.doctorSchedule.patchValue({
        eventDate: doa
      });
    }
  }

  initPatientForm() {
    this.doctorSchedule = this.fb.group({

      eventDate: [""],
      eventTime: [""],

      description: [""],

    });
  }



  addSchedule() {


    if (this.doctorSchedule.value.eventDate == "" || this.doctorSchedule.value.eventDate == null) {
      this.ts.pop("error", "", "please select date of event");
      return false;
    }
    if (this.doctorSchedule.value.description == "") {
      this.ts.pop("error", "", "please enter description");
      return false;
    }

    var dateOfEvent = new Date(this.doctorSchedule.value.eventDate);
    var month = dateOfEvent.getMonth() + 1;
    var day = dateOfEvent.getDate();
    var year = dateOfEvent.getFullYear();
    var doa = year + "-" + month + "-" + day;


    var timeOfEvent = new Date(this.doctorSchedule.value.eventTime);
    var toE = timeOfEvent.getHours() + ":" + timeOfEvent.getMinutes();


    this.doctorService
      .addDoctorSchedule(this.doctorSchedule.value)
      .subscribe(res => {
        console.log(res);
        if (res.IsSuccess) {
          this.initPatientForm();
          this.ts.pop("success", "", "Event added successfully");
        } else {
          this.ts.pop("error", "", res.Message);
        }
      });


  }
}
