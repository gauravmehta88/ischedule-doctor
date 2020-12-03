import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDisapproveAppointmentComponent } from './approve-disapprove-appointment.component';

describe('ApproveDisapproveAppointmentComponent', () => {
  let component: ApproveDisapproveAppointmentComponent;
  let fixture: ComponentFixture<ApproveDisapproveAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDisapproveAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDisapproveAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
