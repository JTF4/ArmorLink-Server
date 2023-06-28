import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedControlComponent } from './advanced-control.component';

describe('AdvancedControlComponent', () => {
  let component: AdvancedControlComponent;
  let fixture: ComponentFixture<AdvancedControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedControlComponent]
    });
    fixture = TestBed.createComponent(AdvancedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
