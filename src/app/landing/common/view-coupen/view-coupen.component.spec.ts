import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoupenComponent } from './view-coupen.component';

describe('ViewCoupenComponent', () => {
  let component: ViewCoupenComponent;
  let fixture: ComponentFixture<ViewCoupenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoupenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
