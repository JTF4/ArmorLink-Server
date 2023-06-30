import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfxControlComponent } from './sfx-control.component';

describe('SfxControlComponent', () => {
  let component: SfxControlComponent;
  let fixture: ComponentFixture<SfxControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfxControlComponent]
    });
    fixture = TestBed.createComponent(SfxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
