import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThighsControlComponent } from './thighs-control.component';

describe('ThighsControlComponent', () => {
  let component: ThighsControlComponent;
  let fixture: ComponentFixture<ThighsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThighsControlComponent]
    });
    fixture = TestBed.createComponent(ThighsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
