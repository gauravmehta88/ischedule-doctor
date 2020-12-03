import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorForgotPasswordComponent } from './doctor-forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: DoctorForgotPasswordComponent;
  let fixture: ComponentFixture<DoctorForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorForgotPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
