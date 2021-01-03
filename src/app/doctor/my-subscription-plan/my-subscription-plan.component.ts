

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
  selector: 'app-my-subscription-plan',
  templateUrl: './my-subscription-plan.component.html',
  styleUrls: ['./my-subscription-plan.component.css'],
  providers: [DoctorService]
})
export class MySubscriptionPlanComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  allAppointments: any = [];
  allPatients: any = [];
  allPlans: any = []
  appStatus: String = "";
  svData: any[];
  svRowsOnPage: number;
  svActivePage: number = 1
  svSortBy: any;
  selectSearch: any = ""
  svSortOrder: string;
  data: any = []
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loading = true;
    this.getMyPlans();

  }




  getMyPlans() {
    this.doctorService.getMyPlans().subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        if (res.Data)
          this.allPlans = [res.Data];
        this.data = this.allPlans

        $('select').selectpicker('refresh');
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }





}


