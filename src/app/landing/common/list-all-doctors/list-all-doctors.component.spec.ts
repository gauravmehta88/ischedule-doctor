import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllDoctorsComponent } from './list-all-doctors.component';

describe('ListAllDoctorsComponent', () => {
  let component: ListAllDoctorsComponent;
  let fixture: ComponentFixture<ListAllDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
