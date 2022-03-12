import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TintucAddComponent } from './tintuc-add.component';

describe('TintucAddComponent', () => {
  let component: TintucAddComponent;
  let fixture: ComponentFixture<TintucAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TintucAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TintucAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
