import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorViewComponent } from './armor-view.component';

describe('ArmorViewComponent', () => {
  let component: ArmorViewComponent;
  let fixture: ComponentFixture<ArmorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmorViewComponent]
    });
    fixture = TestBed.createComponent(ArmorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
