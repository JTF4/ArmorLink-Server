import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForarmsControlsComponent } from './forarms-controls.component';

describe('ForarmsControlsComponent', () => {
  let component: ForarmsControlsComponent;
  let fixture: ComponentFixture<ForarmsControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForarmsControlsComponent]
    });
    fixture = TestBed.createComponent(ForarmsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
