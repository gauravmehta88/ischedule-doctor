import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientForgotPasswordComponent } from './patient-forgot-password.component';

describe('PatientForgotPasswordComponent', () => {
  let component: PatientForgotPasswordComponent;
  let fixture: ComponentFixture<PatientForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
