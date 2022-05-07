import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanchayComponent } from './banchay.component';

describe('BanchayComponent', () => {
  let component: BanchayComponent;
  let fixture: ComponentFixture<BanchayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanchayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanchayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
