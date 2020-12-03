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
declare var CKEDITOR, ckeditor;
@Component({
  selector: "app-compose-mail",
  templateUrl: "./compose-mail.component.html",
  styleUrls: ["./compose-mail.component.css"]
})
export class ComposeMailComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  ngAfterViewInit() {
    CKEDITOR.replace(ckeditor);
  }
}
