import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupenCategoryComponent } from './coupen-category.component';

describe('CoupenCategoryComponent', () => {
  let component: CoupenCategoryComponent;
  let fixture: ComponentFixture<CoupenCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupenCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupenCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
