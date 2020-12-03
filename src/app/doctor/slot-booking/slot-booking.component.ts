import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/doctor.service";
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
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css'],
  providers: [DoctorService]

})
export class SlotBookingComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      $("#drpdown").selectpicker();
    }, 500);
  }

}
