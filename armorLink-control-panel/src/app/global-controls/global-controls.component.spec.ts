import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalControlsComponent } from './global-controls.component';

describe('GlobalControlsComponent', () => {
  let component: GlobalControlsComponent;
  let fixture: ComponentFixture<GlobalControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalControlsComponent]
    });
    fixture = TestBed.createComponent(GlobalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
