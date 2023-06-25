import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusReadoutsComponent } from './status-readouts.component';

describe('StatusReadoutsComponent', () => {
  let component: StatusReadoutsComponent;
  let fixture: ComponentFixture<StatusReadoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusReadoutsComponent]
    });
    fixture = TestBed.createComponent(StatusReadoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
