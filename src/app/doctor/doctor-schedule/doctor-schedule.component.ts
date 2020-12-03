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
declare var swal: any;


import { CookieService } from "../../landing/services/cookie.service";

@Component({
  selector: "app-doctor-schedule",
  templateUrl: "./doctor-schedule.component.html",
  styleUrls: ["./doctor-schedule.component.css"],
  providers: [DoctorService]
})
export class DoctorScheduleComponent implements OnInit {
  patientForm: FormGroup;
  allSpecialities: any = [];
  myDateValue: Date;
  maxDate: Date = new Date();
  minDate: Date = new Date();

  mytime: Date = new Date();
  slotArray: any = [];
  dayName: string = "";
  noSlots: boolean = false;
  dateOfReport: Date = new Date();
  errorFirstName: boolean = false;
  errorLastName: boolean = false;
  errorEmail: boolean = false;
  errorMobile: boolean = false;
  eventToDelete: any = {};
  pName: string = ""
  allEvents: any = [];
  emptySlot: boolean = false;
  loading: boolean = false;
  dateOfEvent: string = ""
  timeOfEvent: string = "";
  dateChanged: string = "";
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.initSelectize();
    this.initPatientForm();
    this.getAllSpecialities();
    this.getDoctorScheule();

    setTimeout(() => {
      $("#drpdown").selectpicker();

      this.initCalendar()
      let self = this;
      $('.fc-prev-button').click(function () {
        if ($('#calendar').fullCalendar('getView').type == 'month') {
          $('#calendar').fullCalendar('removeEventSources');
          var moment = $('#calendar').fullCalendar('getDate');
          // alert("The current date of the calendar is " + moment.format('YYYY-MM-DD'));
          self.dateOfReport = moment.format('YYYY-MM-DD');
          self.getDoctorScheule();

        }
      })

      $('.fc-next-button').click(function () {
        if ($('#calendar').fullCalendar('getView').type == 'month') {
          $('#calendar').fullCalendar('removeEventSources');
          var moment = $('#calendar').fullCalendar('getDate');
          // alert("The current date of the calendar is " + moment.format('YYYY-MM-DD'));
          self.dateOfReport = moment.format('YYYY-MM-DD');
          self.getDoctorScheule();

        }
      })
    }, 500);
  }
  initCalendar() {
    $('#calendar').fullCalendar('destroy');
    let self = this;

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },

      dayClick: function (date, jsEvent, view) {

        var todayTime = new Date(date);
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        var doa = month + "/" + (day) + "/" + year;

        if (todayTime > new Date()) {
          $('#doa').val(doa),
            self.patientForm.patchValue({
              dateOfAppointment: $('#doa').val()
            });
          //  $('#doa').attr('disabled', 'disabled')
          $('#add-appointment').modal('show');


        }



      },
      eventRender: function (event, element) {
        element.bind('mousedown', function (e) {
          if (e.which == 3) {

            self.eventToDelete = event;


            self.dateOfEvent = new Date(event.start._i).toDateString()
            self.timeOfEvent = event.timeOfApp
            $('#appointment-detail').modal('show')


          }
        })
      },
      eventClick: function (calEvent, jsEvent, view) {

        self.eventToDelete = calEvent;


        self.dateOfEvent = new Date(calEvent.start._i).toDateString()
        self.timeOfEvent = calEvent.timeOfApp
        // $('#cancel-appointment').modal('show')

        $('#cancel-appointment').modal('show');


      },
      eventDrop: function (event, delta, revertFunc) {

        // alert(info.event.title + " was dropped on " + info.event.start.toISOString());
        self.eventToDelete = event;
        var dateChanged = event.start._i[0] + "/" + (event.start._i[1] + 1) + "/" + event.start._i[2]
        self.timeOfEvent = event.start._i[3] + ":" + event.start._i[4];
        console.log(event.start._d)
        var dateOfa = new Date(event.dateOfApp);
        if (event.start._d > new Date()) {
          var month = dateOfa.getMonth() + 1;
          var day = dateOfa.getDate();
          var year = dateOfa.getFullYear();
          var doe = year + "/" + month + "/" + day;
          self.dateOfEvent = doe
          self.dateChanged = dateChanged
          self.revertFunc = revertFunc
          self.patientForm.patchValue({
            dateOfAppointment: dateChanged
          })
          self.searchSlots()
          $('#move-appointment').modal('show')
        } else {
          revertFunc()
        }


      },


      defaultView: 'month',
      editable: true,

    });
  }
  revertFunc() { }

  changeAppointment(timeOfEvent) {

    this.doctorService.changeAppointment(this.eventToDelete._id, this.dateChanged, timeOfEvent).subscribe(res => {
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Appointment changed successfully");
        $('#move-appointment').modal('hide');
        this.initCalendar()
        setTimeout(() => {

          this.getDoctorScheule()
        }, 1000);


      } else {
        this.ts.pop("error", "", res.Message)
        this.revertFunc()
      }
    })


  }


  cancelAppointment() {

    this.doctorService.cancelAppointment(this.eventToDelete._id).subscribe(res => {
      if (res) {
        this.ts.pop("success", "", "Appointment cancelled successfully");
        $('#cancel-appointment').modal('hide')

      } else {
        this.ts.pop("error", "", res.Message)

      }
    })
  }


  initPatientForm() {
    this.patientForm = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
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
    //  / $("#drpdownSpeciality").selectpicker("refresh");


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

  getAllSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSpecialities = res.Data;
        console.log(this.allSpecialities)
        setTimeout(() => {
          //  $("#drpdownSpeciality").selectpicker();
        }, 2000);
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  searchSlots() {
    this.emptySlot = false

    // this.doctorId = "5cbab271de3e275696acfbe0";

    this.doctorService.dateWiseAvailableSlots(new Date(this.patientForm.controls.dateOfAppointment.value)).subscribe(res => {
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

  getDoctorScheule() {


    var dor = new Date(this.dateOfReport);
    var month = dor.getMonth() + 1;
    var day = dor.getDate();
    var year = dor.getFullYear();
    var dateOfReport = year + "/" + month + "/" + day;

    let dataToSend = {

      "forDate": dateOfReport,
      "reportType": "Month"

    }
    this.doctorService.getDoctorScheule(dataToSend).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {



        res.Data.forEach(event => {
          var dateOfApp = new Date(event.appointmentForDate);
          var month = dateOfApp.getMonth() + 1;
          var day = dateOfApp.getDate();
          var year = dateOfApp.getFullYear();
          var doae = year + "/" + month + "/" + day;
          doae = (doae + ' ' + event.appointmentForTime)
          //if (event.status != 'ApprovedByDoctor')
          $('#calendar').fullCalendar('renderEvent', { 'title': event.firstName + ' ' + event.lastName, 'start': doae, '_id': event._id, 'timeOfApp': event.appointmentForTime, 'dateOfApp': event.appointmentForDate }, true);
        });



        setTimeout(() => {
          $("#drpdownSpeciality").selectpicker();
        }, 500);
      } else {
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



    var patData = {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      dob: "",
      service: "",
      dateOfAppointment: "",
      timeOfAppointment: slot,
      doctorId: ""
    };
    let patId = "";
    patData = this.patientForm.value;
    patData.dateOfAppointment = '12/06/2019';
    patData.timeOfAppointment = slot;
    patData.dob = dob;
    this.doctorService
      .bookAppointmentWithDoctorForNewPatient(patData)
      .subscribe(res => {
        console.log(res);
        if (res.IsSuccess) {
          this.initPatientForm();
          this.ts.pop("success", "", "Appoinment added successfully");
          this.getDoctorScheule();
        } else {
          this.ts.pop("error", "", res.Message);
        }
      });

    console.log(this.patientForm.value);
  }

  initSelectize() {
    console.log("Enter in the Selectize");

    let self = this;
    var $select = $("#searchDoctor").selectize({
      delimiter: ",",
      persist: false,
      placeholder: "Search Doctor",
      valueField: "_id",
      labelField: "firstName",
      searchField: "firstName",
      maxItems: 1,
      preload: "focus",

      load: function (query, callback) {
        $.ajax({
          url:
            "http://api.Ischedulenow.com/api/patient/" +
            self.cookieService.getItem("_id") +
            "/searchDoctorByName",
          type: "POST",
          headers: {
            Authorization: self.cookieService.getItem("Token"),
            Accept: "application/json"
          },
          contentType: "application/json",
          data: JSON.stringify({ stringToMatch: query }),

          dataType: "json",

          error: function () {
            callback();
          },
          success: function (res) {
            console.log(res);
            if (res != null)
              res.Data.forEach(element => {
                element.firstName =
                  "Dr. " +
                  element.firstName.charAt(0).toUpperCase() +
                  element.firstName.slice(1) +
                  " " +
                  element.lastName.charAt(0).toUpperCase() +
                  element.lastName.slice(1);
              });
            // if(res.specialData && res.specialData.length > 0)
            //  {  self.setHTML(res); }
            // console.log('Is it calling res.data',res.data);
            callback(res.Data);
          }
        });
      }
    });
    console.log($select[0]);
    // this.selectize = $select[0].selectize;
  }

  ngAfterViewInit() {

  }
}
