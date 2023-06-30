import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmosphericsControlComponent } from './atmospherics-control.component';

describe('AtmosphericsControlComponent', () => {
  let component: AtmosphericsControlComponent;
  let fixture: ComponentFixture<AtmosphericsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtmosphericsControlComponent]
    });
    fixture = TestBed.createComponent(AtmosphericsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
