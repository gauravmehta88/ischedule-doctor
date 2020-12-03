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

declare var $;

@Component({
  selector: 'app-view-coupen',
  templateUrl: './view-coupen.component.html',
  styleUrls: ['./view-coupen.component.css'],
  providers: [DoctorService]

})
export class ViewCoupenComponent implements OnInit {
  coupenId: string = "";
  coupen: any = {};
  SimilarCoupons: any = [];
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private _route: ActivatedRoute
  ) {
    this.loading = true;
  }
  getDiscountPercnt(coupen) {

    return (coupen.value - coupen.discountedValue) * 100 / coupen.value

  }

  ngOnInit() {
    this._route.params.subscribe(data => {
      console.log(data);
      this.coupenId = data.id

      this.getCoupen()
    });


  }

  shareUrl(via: any) {

    //  let url = 'http://univto.com/projectDetail/logo-design-1234-at-test-company-5b8650cd12a86a5d1b78187e'
    let url = "http://Ischedulenow.com/viewCoupen/" + this.coupenId;
    if (via == "fb") {
      let sUrl = "http://www.facebook.com/sharer.php?u=" + url;
      window.open(sUrl, "_blank");
    } else if (via == "li") {
      let sUrl =
        "http://www.linkedin.com/shareArticle?url=" +
        url +
        "&title=" +
        "this is a live Project For you All at Takeup.in";
      window.open(sUrl, "_blank");
    } else if (via == "twitter") {
      let sUrl =
        "https://twitter.com/share?url=" +
        url +
        "&text=Checkout this Coupen Code." +
        "" +
        "&via=" +
        "http://Ischedulenow.com" +
        "&hashtags=" +
        "Coupen Codes";
      window.open(sUrl, "_blank");
    } else if (via == "gmail") {
      let sUrl = "https://plus.google.com/share?url=" + url;
      window.open(sUrl, "_blank");
    } else if (via == "wa") {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // some code..
        let sUrl =
          "https://api.whatsapp.com/send?text=" +
          "Checkout this Coupen Code." +
          url;
        window.open(sUrl, "_blank");
      } else {
        let sUrl =
          "https://web.whatsapp.com/send?text=" +
          "Checkout this Coupen Code. " +
          url;
        window.open(sUrl, "_blank");
      }
    }
  }
  getCoupen() {
    this.doctorService.getCoupen(this.coupenId).subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.coupen = res.Data;
        this.SimilarCoupons = res.SimilarCoupons
        setTimeout(() => {
          $('.carousel-item').first().addClass('active')

        }, 1000);
      } else {
        this.ts.pop("error", "", res.Message);

      }
    });
  }
}
