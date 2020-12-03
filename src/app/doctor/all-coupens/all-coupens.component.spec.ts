import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoupensComponent } from './all-coupens.component';

describe('AllCoupensComponent', () => {
  let component: AllCoupensComponent;
  let fixture: ComponentFixture<AllCoupensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCoupensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoupensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
