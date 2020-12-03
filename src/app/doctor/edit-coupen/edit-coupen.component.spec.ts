import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoupenComponent } from './edit-coupen.component';

describe('EditCoupenComponent', () => {
  let component: EditCoupenComponent;
  let fixture: ComponentFixture<EditCoupenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoupenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
