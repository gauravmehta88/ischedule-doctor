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

import { CookieService } from "../../landing/services/cookie.service";
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DoctorService]

})
export class ScheduleComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;

  isMondayOpen: boolean = false;
  isTuesdayOpen: boolean = false;
  isWednesdayOpen: boolean = false;
  isThursdayOpen: boolean = false;
  isFridayOpen: boolean = false;
  isSaturdayOpen: boolean = false;
  isSundayOpen: boolean = false;
  applyToAll: boolean = false;

  mondayFromTime: String = "";
  mondayToTime: String = "";
  tuesdayFromTime: String = "";
  tuesdayToTime: String = "";
  wednesdayFromTime: String = "";
  wednesdayToTime: String = "";
  thursdayFromTime: String = "";
  thursdayToTime: String = "";
  fridayFromTime: String = "";
  fridayToTime: String = "";
  saturdayFromTime: String = "";
  saturdayToTime: String = "";
  sundayFromTime: String = "";
  sundayToTime: String = "";

  mondayBreaks: any = [{}];
  tuesdayBreaks: any = [{}];
  wednesdayBreaks: any = [{}];
  thursdayBreaks: any = [{}];
  fridayBreaks: any = [{}];
  saturdayBreaks: any = [{}];
  sundayBreaks: any = [{}];


  startDateTimeOff: Date;
  endDateTimeOff: Date;
  timeOffDesc: String = "";

  timeOffs: any = [];
  minDate: Date = new Date();
  profilePicPath: string = "";
  firstName: string = "";


  slotDuration: string = "";

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private cookieService: CookieService,


  ) {

    this.getDoctorSchedule();
    this.profilePicPath = localStorage.getItem("profilePicPath");
    if (this.profilePicPath == "null") {
      this.profilePicPath = null;
    }
    this.firstName = localStorage.getItem("profilePicPath")
  }


  getDoctorSchedule() {
    this.doctorService
      .getSchedule()
      .subscribe(res => {
        console.log(res);
        if (res.IsSuccess) {
          res.Data.forEach(ele => {

            if (ele.dayName == 'Mon') {
              this.isMondayOpen = ele.isOpen;
              this.mondayFromTime = ele.fromTime;
              this.mondayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.mondayBreaks = ele.breaks;

            }
            else if (ele.dayName == 'Tue') {
              this.isTuesdayOpen = ele.isOpen;
              this.tuesdayFromTime = ele.fromTime;
              this.tuesdayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.tuesdayBreaks = ele.breaks;
            }
            else if (ele.dayName == 'Wed') {
              this.isWednesdayOpen = ele.isOpen;
              this.wednesdayFromTime = ele.fromTime;
              this.wednesdayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.wednesdayBreaks = ele.breaks;
            }
            else if (ele.dayName == 'Thu') {
              this.isThursdayOpen = ele.isOpen;
              this.thursdayFromTime = ele.fromTime;
              this.thursdayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.thursdayBreaks = ele.breaks;
            }
            else if (ele.dayName == 'Fri') {
              this.isFridayOpen = ele.isOpen;
              this.fridayFromTime = ele.fromTime;
              this.fridayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.fridayBreaks = ele.breaks;
            }
            else if (ele.dayName == 'Sat') {
              this.isSaturdayOpen = ele.isOpen;
              this.saturdayFromTime = ele.fromTime;
              this.saturdayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.saturdayBreaks = ele.breaks;
            }
            else if (ele.dayName == 'Sun') {
              this.isSundayOpen = ele.isOpen;
              this.sundayFromTime = ele.fromTime;
              this.sundayToTime = ele.toTime;
              if (ele.breaks.length > 0) this.sundayBreaks = ele.breaks;
            }

          });


          this.timeOffs = res.timeOff
          this.slotDuration = res.slotDuration
          console.log(this.timeOffs)
          this.showTick()

        } else {
          this.ts.pop("error", "", res.Message)
        }
      })
  }

  ngOnInit() {
    $('.datepicker').datepicker({
      startDate: '-3d'
    });
  }



  addMondayBreak() {
    this.mondayBreaks.push({});
    this.showTick()
  }

  deleteMondayBreak(i) {

    this.mondayBreaks.splice(i, 1)
  }

  addTuesdayBreak() {
    this.tuesdayBreaks.push({});
    this.showTick()
  }

  deleteTuesdayBreak(i) {

    this.tuesdayBreaks.splice(i, 1)
  }

  addWednesdayBreak() {
    this.wednesdayBreaks.push({});
    this.showTick()
  }

  deleteWednesdayBreak(i) {

    this.wednesdayBreaks.splice(i, 1)
  }

  addThursdayBreak() {
    this.thursdayBreaks.push({});
    this.showTick()
  }

  deleteThursdayBreak(i) {

    this.thursdayBreaks.splice(i, 1)
  }

  addFridayBreak() {
    this.fridayBreaks.push({});
    this.showTick()
  }

  deleteFridayBreak(i) {

    this.fridayBreaks.splice(i, 1)
  }

  addSaturdayBreak() {
    this.saturdayBreaks.push({});
    this.showTick()
  }

  deleteSaturdayBreak(i) {

    this.saturdayBreaks.splice(i, 1)
  }

  addSundayBreak() {
    this.sundayBreaks.push({});
    this.showTick()
  }

  deleteSundayBreak(i) {

    this.sundayBreaks.splice(i, 1)
  }

  showTick() {
    setTimeout(() => {
      $(".show-tick").selectpicker();
    }, 400);
  }

  ngAfterViewInit() {
    let self = this
    $('input[type="checkbox"]').click(function () {

      self.showTick()
    })

  }

  saveTimeOff() {


    var date1: any = new Date(this.startDateTimeOff);
    var date2: any = new Date(this.endDateTimeOff);
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (this.startDateTimeOff > this.endDateTimeOff) {
      this.ts.pop("error", "", "Start Date cannot be greater than End Date")
    }

    else {

      this.timeOffs.push({
        "startDateTimeOff": this.startDateTimeOff,
        "endDateTimeOff": this.endDateTimeOff,
        "timeOffDesc": this.timeOffDesc,
        "diffDays": diffDays
      });

      $('#timeoff').modal('hide');
      this.startDateTimeOff = null;
      this.endDateTimeOff = null;
      this.timeOffDesc = "";
    }


  }


  deleteTimeOff(index) {


    this.timeOffs.splice(index, 1);
  }


  submit() {

    if (this.isMondayOpen && (this.mondayFromTime == "" || this.mondayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }
    if (this.isTuesdayOpen && (this.tuesdayFromTime == "" || this.tuesdayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }
    if (this.isWednesdayOpen && (this.wednesdayFromTime == "" || this.wednesdayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }
    if (this.isThursdayOpen && (this.thursdayFromTime == "" || this.thursdayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }
    if (this.isFridayOpen && (this.fridayFromTime == "" || this.fridayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }
    if (this.isSaturdayOpen && (this.saturdayFromTime == "" || this.saturdayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }
    if (this.isSundayOpen && (this.sundayFromTime == "" || this.sundayToTime == "")) {
      this.ts.pop("error", "", "please select schedule");
      return false;
    }


    let mBreak = this.mondayBreaks.filter(value => Object.keys(value).length !== 0);
    let tueBreak = this.tuesdayBreaks.filter(value => Object.keys(value).length !== 0);
    let wedBreak = this.wednesdayBreaks.filter(value => Object.keys(value).length !== 0);
    let thurBreak = this.thursdayBreaks.filter(value => Object.keys(value).length !== 0);
    let friBreak = this.fridayBreaks.filter(value => Object.keys(value).length !== 0);
    let satBreak = this.saturdayBreaks.filter(value => Object.keys(value).length !== 0);
    let sunBreak = this.sundayBreaks.filter(value => Object.keys(value).length !== 0);

    var dataToSend = {
      "days": {
        "mon": {
          "isOpen": this.isMondayOpen,
          "fromTime": this.mondayFromTime,
          "toTime": this.mondayToTime,

          "breaks": mBreak
        },

        "tue": {
          "isOpen": this.isTuesdayOpen,
          "fromTime": this.tuesdayFromTime,
          "toTime": this.tuesdayToTime,
          "breaks": tueBreak


        },

        "wed": {
          "isOpen": this.isWednesdayOpen,
          "fromTime": this.wednesdayFromTime,
          "toTime": this.wednesdayToTime,
          "breaks": wedBreak

        },

        "thu": {
          "isOpen": this.isThursdayOpen,
          "fromTime": this.thursdayFromTime,
          "toTime": this.thursdayToTime,
          "breaks": thurBreak

        },

        "fri": {
          "isOpen": this.isFridayOpen,
          "fromTime": this.fridayFromTime,
          "toTime": this.fridayToTime,
          "breaks": friBreak

        },
        "sat": {
          "isOpen": this.isSaturdayOpen,
          "fromTime": this.saturdayFromTime,
          "toTime": this.saturdayToTime,
          "breaks": satBreak


        },

        "sun": {
          "isOpen": this.isSundayOpen,
          "fromTime": this.sundayFromTime,
          "toTime": this.sundayToTime,
          "breaks": sunBreak


        }



      },
      "timeOff": this.timeOffs,
      "slotDuration": this.slotDuration
    }

    console.log(dataToSend)

    this.doctorService
      .addUpdateSchedule(dataToSend)
      .subscribe(res => {
        console.log(res)
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Schedule Updated")
        } else {
          this.ts.pop("error", "", res.Message)

        }
      })

  }

  applyToAllmethod() {

    setTimeout(() => {
      this.isMondayOpen = !this.isMondayOpen
      // this.isMondayOpen = !this.isMondayOpen
      this.isFridayOpen = this.isThursdayOpen = this.isWednesdayOpen = this.isSaturdayOpen = this.isSundayOpen = this.isTuesdayOpen = this.isMondayOpen;
      this.tuesdayFromTime = this.wednesdayFromTime = this.thursdayFromTime = this.fridayFromTime = this.saturdayFromTime = this.sundayFromTime = this.mondayFromTime;
      this.tuesdayToTime = this.wednesdayToTime = this.fridayToTime = this.saturdayToTime = this.thursdayToTime = this.sundayToTime = this.mondayToTime;
      // this.tuesdayBreaks = this.wednesdayBreaks = this.thursdayBreaks = this.fridayBreaks = this.saturdayBreaks = this.sundayBreaks = this.mondayBreaks;



      this.showTick()



    }, 200);


    setTimeout(() => {
      this.isMondayOpen = !this.isMondayOpen
      // this.isMondayOpen = !this.isMondayOpen
      this.isFridayOpen = this.isThursdayOpen = this.isWednesdayOpen = this.isSaturdayOpen = this.isSundayOpen = this.isTuesdayOpen = this.isMondayOpen;
      this.tuesdayFromTime = this.wednesdayFromTime = this.thursdayFromTime = this.fridayFromTime = this.saturdayFromTime = this.sundayFromTime = this.mondayFromTime;
      this.tuesdayToTime = this.wednesdayToTime = this.fridayToTime = this.saturdayToTime = this.thursdayToTime = this.sundayToTime = this.mondayToTime;
      // this.tuesdayBreaks = this.wednesdayBreaks = this.thursdayBreaks = this.fridayBreaks = this.saturdayBreaks = this.sundayBreaks = this.mondayBreaks;



      this.showTick()



    }, 200);
  }



}
