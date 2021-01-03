


import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { ActivatedRoute } from "@angular/router";


import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';



import { DoctorService } from "../../doctor/services/doctor.service";

@Component({
  selector: 'app-pay-subscription',
  templateUrl: './pay-subscription.component.html',
  styleUrls: ['./pay-subscription.component.css'],
  providers: [DoctorService]
})
export class PaySubscriptionComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  public loading: boolean = false;
  noOfUsers: any = 1;
  @ViewChild(StripeCardComponent, { static: false }) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private ts: ToasterService) { }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }


  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);

          this.doctorService.subscribe({ stripeToken: result.token.id, noOfUsers: this.noOfUsers }, this.route.snapshot.paramMap.get("subsId")).subscribe(res => {
            console.log(res);
            if (res.IsSuccess) {
              console.log('came in success response....');
              this.ts.pop('success', '', 'Payment done!')

              setTimeout(() => {
                this.router.navigate(["/patient/dashboard"]);
              }, 3000);

            } else {
              console.log('came in failure response....');
              this.ts.pop('error', '', 'Some thing went wrong!')

            }
          });



        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}

