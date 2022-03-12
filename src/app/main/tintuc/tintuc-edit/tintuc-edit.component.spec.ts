import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TintucEditComponent } from './tintuc-edit.component';

describe('TintucEditComponent', () => {
  let component: TintucEditComponent;
  let fixture: ComponentFixture<TintucEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TintucEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TintucEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
