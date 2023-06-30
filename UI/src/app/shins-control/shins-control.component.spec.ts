import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinsControlComponent } from './shins-control.component';

describe('ShinsControlComponent', () => {
  let component: ShinsControlComponent;
  let fixture: ComponentFixture<ShinsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShinsControlComponent]
    });
    fixture = TestBed.createComponent(ShinsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
