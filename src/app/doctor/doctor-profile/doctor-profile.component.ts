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

import * as filestack from 'filestack-js';

const client = filestack.init('AGqWW8kQNRqi122GGl1nvz');


declare var $;
@Component({
  selector: "app-doctor-profile",
  templateUrl: "./doctor-profile.component.html",
  styleUrls: ["./doctor-profile.component.css"],
  providers: [DoctorService]
})
export class DoctorProfileComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  profileForm: FormGroup;
  firstName: string = "";
  lastName: string = "";
  mobileNumber: string = "";
  pincode: string = "";
  geoLocation: any = []
  email: string = "";
  age: string = "";
  gender: string = "";
  address: string = "";
  loading: boolean = false;
  speciality: string = "";
  aboutme: string = "";
  designation: string = "";
  hospital: string = "";
  errorFirstName: boolean = false;
  errorLastName: boolean = false;
  formD: any;
  fileName: any;
  profilePic: string = "";
  allInsurances: any = [];
  allSpecialities: any = [];
  uploadPhotosPath: any = [];

  selectedInsurances: any = [];

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private route: Router
  ) {
    this.initLoginForm();
    this.getAllInsurances();
    this.getAllSpecialities();
    this.getDoctorProfile();
  }

  getAllInsurances() {
    this.doctorService.getAllInsurances().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allInsurances = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  getAllSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSpecialities = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  onChange() {
    if (this.profileForm.controls.speciality.value == "") return false;
    let self = this;

    this.speciality = this.getSpecialityName(
      this.profileForm.controls.speciality.value
    );
    // expected output: 12
  }

  onChangeCheckBox(value) {
    if (this.selectedInsurances.indexOf(value) == -1) {
      this.selectedInsurances.push(value);
    } else {
      this.selectedInsurances.splice(this.selectedInsurances.indexOf(value), 1);
    }

    console.log(this.selectedInsurances)
  }

  getSpecialityName(id) {
    var foundSpecilaity = this.allSpecialities.find(function (element) {
      return element._id == id;
    });
    if (foundSpecilaity == undefined) return "";
    return foundSpecilaity.displayName;
  }

  onDateValueChange(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var dob = day + " / " + month + " / " + year;

    }
  }

  getDoctorProfile() {
    this.doctorService.getDoctorProfile().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.selectedInsurances = [];
        this.firstName =
          res.Data.firstName.charAt(0).toUpperCase() +
          res.Data.firstName.substring(1);
        this.lastName =
          res.Data.lastName.charAt(0).toUpperCase() +
          res.Data.lastName.substring(1);
        this.mobileNumber = res.Data.mobileNumber;
        this.pincode = res.Data.pincode;
        this.profilePic = res.Data.profilePicPath;
        this.email = res.Data.email;
        this.age = res.Data.age;
        this.gender = res.Data.gender;

        this.address = res.Data.address;
        this.speciality = this.getSpecialityName(res.Data.speciality);
        this.aboutme = res.Data.aboutme;
        this.designation = res.Data.designation;
        this.hospital = res.Data.hospital;

        this.profileForm.patchValue({
          firstName: this.firstName,
          lastName: this.lastName,
          speciality: res.Data.speciality,
          address: this.address,
          age: this.age,
          gender: this.gender,
          pincode: this.pincode,
          hospital: this.hospital,
          designation: this.designation,
          aboutme: this.aboutme,

          boardCertification: res.Data.boardCertification,
          eduAndTraining: res.Data.eduAndTraining,
          awardAndPublication: res.Data.awardAndPublication,
          npiNumber: res.Data.npiNumber,
          officeLocationAddress: res.Data.officeLocationAddress
        });

        res.Data.languagesSpeak.forEach(language => {
          $("#inputTag").tagsinput("add", language);
        });

        res.Data.insurances_ids.forEach(insurance => {
          this.selectedInsurances.push(insurance._id);
        });
        console.log(this.selectedInsurances)
        setTimeout(() => {
          $("#drpdownSpeciality").selectpicker();
          $('select').selectpicker('refresh');
        }, 500);
      } else {
        this.ts.pop("error", "", res.Message)
      }
      this.loading = false;
    });
  }

  isChecked(id) {
    if (this.selectedInsurances.indexOf(id) == -1) return false;
    else return true;
  }

  initLoginForm() {
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      speciality: [""],
      address: [""],
      gender: [""],
      age: [""],
      pincode: [""],
      hospital: [""],
      designation: [""],
      aboutme: [""],
      boardCertification: [""],
      eduAndTraining: [""],
      awardAndPublication: [""],
      npiNumber: [""],
      officeLocationAddress: [""]
    });
    $("#drpdownSpeciality").selectpicker("refresh");

  }

  ngOnInit() {
    this.loading = true;

  }

  uploadDocument() {
    const options = {
      onFileUploadFinished: file => {
        // If you throw any error in this function it will reject the file selection.
        // The error message will be displayed to the user as an alert.
        console.log(file)
        this.profilePic = file.url;
        $('#sideBarImg').attr('src', this.profilePic)
        this.saveChanges()

      }
    };


    client.picker(options).open();
  }

  uploadDocumentArray() {
    const options = {
      maxFiles: 10,
      onUploadDone: file => {
        // If you throw any error in this function it will reject the file selection.
        // The error message will be displayed to the user as an alert.
        file.filesUploaded.forEach(element => {
          this.uploadPhotosPath.push(element.url)
        });

      }
    };


    client.picker(options).open();
  }



  ngAfterViewInit() {
    $("#inputTag").tagsinput({});

    let self = this;
    $("#searchBox").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "http://dev.virtualearth.net/REST/v1/Locations",
          dataType: "jsonp",
          data: {
            key: "Aol3B6WbArCZMliaTOCrcSLjEtur7Y4A6uthDqQfehUjvGWhQZNhG8p1JOwraB-W",
            q: request.term
          },
          jsonp: "jsonp",
          success: function (data) {
            var result = data.resourceSets[0];
            if (result) {
              if (result.estimatedTotal > 0) {
                response($.map(result.resources, function (item) {
                  return {
                    data: item,
                    label: item.name + ' (' + item.address.countryRegion + ')',
                    value: item.name
                  }
                }));
              }
            }
          }
        });
      },
      minLength: 1,
      change: function (event, ui) {
        if (!ui.item)
          $("#searchBox").val('');
      },
      select: function (event, ui) {


        self.displaySelectedItem(ui.item.data);
      }
    });


  }


  displaySelectedItem(item) {
    var self = this;

    self.geoLocation = item.point.coordinates

  }

  updateProfilePic(event) {
    if (event.target.files) {
      this.formD = new FormData();

      const file: File = event.target.files[0];

      this.fileName = file.name;
      this.formD.append("file", file, file.name);
      console.log(this.formD);
      console.log(file);
      this.saveChanges()
    }
  }

  saveChanges() {
    if (!this.profileForm.valid) {
      if (this.profileForm.controls.firstName.value == "") {
        this.errorFirstName = true;
      }
      if (this.profileForm.controls.lastName.value == "") {
        this.errorLastName = true;
      }
      this.ts.pop("error", "", "fill required fields");
      return false;
    }
    let data = {
      firstName: this.profileForm.controls.firstName.value,
      lastName: this.profileForm.controls.lastName.value,
      age: $('#dob').val(),
      // this.profileForm.controls.age.value,
      gender: this.profileForm.controls.gender.value,

      address: this.profileForm.controls.address.value,
      speciality: this.profileForm.controls.speciality.value,
      specialities: (this.profileForm.controls.speciality.value == "") ? [] : this.profileForm.controls.speciality.value,
      pincode: this.profileForm.controls.pincode.value,
      hospital: this.profileForm.controls.hospital.value,
      designation: this.profileForm.controls.designation.value,
      aboutme: this.profileForm.controls.aboutme.value,
      boardCertification: this.profileForm.controls.boardCertification.value,
      eduAndTraining: this.profileForm.controls.eduAndTraining.value,
      awardAndPublication: this.profileForm.controls.awardAndPublication.value,
      npiNumber: this.profileForm.controls.npiNumber.value,
      officeLocationAddress: this.profileForm.controls.officeLocationAddress
        .value,
      languagesSpeak: $("#inputTag").tagsinput("items"),
      uploadPhotosPath: this.uploadPhotosPath,
      profilePicPath: this.profilePic,
      insurances: this.selectedInsurances,
      geoLocation: this.geoLocation
    };

    this.doctorService.updateDoctorProfile(data).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "record updated successfully");
        localStorage.setItem("profilePicPath", this.profilePic)
        this.getDoctorProfile();
        this.initLoginForm();
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
}
