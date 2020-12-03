import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEmailVerificationComponent } from './doctor-email-verification.component';

describe('DoctorEmailVerificationComponent', () => {
  let component: DoctorEmailVerificationComponent;
  let fixture: ComponentFixture<DoctorEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorEmailVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
