import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorScheduleComponent } from './add-doctor-schedule.component';

describe('AddDoctorScheduleComponent', () => {
  let component: AddDoctorScheduleComponent;
  let fixture: ComponentFixture<AddDoctorScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
