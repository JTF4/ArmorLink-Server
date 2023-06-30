import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestControlComponent } from './chest-control.component';

describe('ChestControlComponent', () => {
  let component: ChestControlComponent;
  let fixture: ComponentFixture<ChestControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChestControlComponent]
    });
    fixture = TestBed.createComponent(ChestControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
