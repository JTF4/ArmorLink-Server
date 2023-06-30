import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsControlComponent } from './weapons-control.component';

describe('WeaponsControlComponent', () => {
  let component: WeaponsControlComponent;
  let fixture: ComponentFixture<WeaponsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeaponsControlComponent]
    });
    fixture = TestBed.createComponent(WeaponsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
