import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySubscriptionComponent } from './pay-subscription.component';

describe('PaySubscriptionComponent', () => {
  let component: PaySubscriptionComponent;
  let fixture: ComponentFixture<PaySubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaySubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
