import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShouldersControlComponent } from './shoulders-control.component';

describe('ShouldersControlComponent', () => {
  let component: ShouldersControlComponent;
  let fixture: ComponentFixture<ShouldersControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShouldersControlComponent]
    });
    fixture = TestBed.createComponent(ShouldersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
