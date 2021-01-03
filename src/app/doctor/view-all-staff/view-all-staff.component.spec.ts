import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllStaffComponent } from './view-all-staff.component';

describe('ViewAllStaffComponent', () => {
  let component: ViewAllStaffComponent;
  let fixture: ComponentFixture<ViewAllStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
