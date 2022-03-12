import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortPriceComponent } from './sort-price.component';

describe('SortPriceComponent', () => {
  let component: SortPriceComponent;
  let fixture: ComponentFixture<SortPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
