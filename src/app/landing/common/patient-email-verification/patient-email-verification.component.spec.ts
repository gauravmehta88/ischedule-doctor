import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmailVerificationComponent } from './patient-email-verification.component';

describe('PatientEmailVerificationComponent', () => {
  let component: PatientEmailVerificationComponent;
  let fixture: ComponentFixture<PatientEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEmailVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
