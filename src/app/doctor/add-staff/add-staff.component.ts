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
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css'],
  providers: [DoctorService]

})
export class AddStaffComponent implements OnInit {
  loading: boolean = false;
  role: any = ""
  firstName: any = "";
  lastName: any = "";
  userName: any = "";
  password: any = "";
  mobileNumber: any = ""
  confirmPassword: any = "";
  errorFirstName: boolean = false;
  errorLastName: boolean = false;

  errorRole: boolean = false;
  errorPassword: boolean = false;

  errorEmail: boolean = false;
  errorMobile: boolean = false;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  constructor(private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService) { }

  ngOnInit() {
  }

  submit() {
    if (this.role == "")
      this.errorRole = true;

    if (this.firstName == "") {
      this.errorFirstName = true;
    } else this.errorFirstName = false;
    if (this.lastName == "") {
      this.errorLastName = true;
    } else this.errorLastName = false;
    if (this.userName == "") {
      this.errorEmail = true;
    } else this.errorEmail = false;

    if (this.mobileNumber == "") {
      this.errorMobile = true;
    } else this.errorMobile = false;
    if (this.password != this.confirmPassword) {
      this.errorPassword = true;
    } else this.errorPassword = false;

    if (this.errorFirstName || this.errorLastName || this.errorEmail || this.errorMobile) {
      this.ts.pop("error", "", "please fill required fields!!")
      return false
    } else {
      this.errorFirstName = this.errorLastName = this.errorEmail = this.errorMobile = false
    }
    let datatosend = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.userName,
      password: this.password,
      mobileNumber: this.mobileNumber,
      userType: this.role[0]
    }

    this.doctorService.addStaff(datatosend).subscribe(res => {
      this.loading = false;
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Staff added successfully");
        this.initData()
        //  window.location.reload();
      } else this.ts.pop("error", "", res.Message);
    });
  }

  initData() {
    this.firstName = ""
    this.lastName = ""

    this.userName = ""
    this.mobileNumber = ""
    this.role = ""
    this.password = ""
    this.confirmPassword = ""


  }

}
