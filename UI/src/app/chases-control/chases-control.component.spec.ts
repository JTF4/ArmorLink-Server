import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChasesControlComponent } from './chases-control.component';

describe('ChasesControlComponent', () => {
  let component: ChasesControlComponent;
  let fixture: ComponentFixture<ChasesControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChasesControlComponent]
    });
    fixture = TestBed.createComponent(ChasesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
