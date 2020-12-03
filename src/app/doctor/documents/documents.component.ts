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

declare var $, swal;
declare var CKEDITOR, ckeditor;
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DoctorService]
})
export class DocumentsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  documents: any = [];
  title: string = "";
  description: string = "";
  documentUrl: string = "";
  documentType: string = "";
  documentStatus: string = "";
  isPrivate: boolean = false;
  subject: string = "";

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) { this.getDocuments(); }




  getDocuments() {
    this.doctorService
      .getDocuments()
      .subscribe(res => {
        if (res.IsSuccess) {

          this.documents = res.Data;
        } else {
          this.ts.pop("error", "", res.Message)
        }

      })

  }

  deleteDoc(id) {


    swal({
      title: "Are you sure wanto delete this document?...",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService
          .deleteDocument(id)
          .subscribe(res => {
            if (res.IsSuccess) {
              this.ts.pop("success", "", "Document Delete successfully");
              this.getDocuments();
            } else {
              this.ts.pop("error", "", res.Mesage)
            }
          })

      }
    });
  }

  saveDocument() {

    if (this.description == "" || this.title == "" || this.documentType == "" || this.documentStatus == "") {

      this.ts.pop("error", "", "please all required fields");
      return false;
    }

    let dataToSend = {
      "title": this.title,
      "description": this.description,
      "documentUrl": "https://www.google.com/",
      "documentType": this.documentType,
      "documentStatus": this.documentStatus,
      "isPrivate": false

    }

    this.doctorService
      .addDocument(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {


        } else {
          this.ts.pop("error", "", res.Message)
        }

      })


  }

  ngOnInit() {
  }

}
