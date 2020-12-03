import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';


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
  providers: [LoginService]

})
export class ViewCoupenComponent implements OnInit {
  coupenId: string = "";
  coupen: any = {};
  SimilarCoupons: any = [];
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private _route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) {
    this.loading = true;
  }


  ngOnInit() {
    this._route.params.subscribe(data => {
      console.log(data);
      this.coupenId = data.id

      this.getCoupen();





    });


  }

  getDiscountPercnt(coupen) {

    return (coupen.value - coupen.discountedValue) * 100 / coupen.value

  }


  getCoupen() {
    this.loginService.getCoupen(this.coupenId).subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.coupen = res.Data;
        this.SimilarCoupons = res.SimilarCoupons
        setTimeout(() => {
          $('.carousel-item').first().addClass('active')

        }, 1000);
        this.meta.addTag({ name: 'url', content: 'http://ischedulenow.com/viewCoupen/' + this.coupenId });
        this.meta.addTag({ name: 'description', content: 'check this coupen code long description to be inserted here.' });
        this.meta.addTag({ name: 'image', content: this.coupen.images[0] });
        this.meta.addTag({ name: 'title', content: 'check out this coupen code' });
      } else {
        this.ts.pop("error", "", res.Message);

      }
    });
  }
}
