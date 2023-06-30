import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketControlComponent } from './bucket-control.component';

describe('BucketControlComponent', () => {
  let component: BucketControlComponent;
  let fixture: ComponentFixture<BucketControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BucketControlComponent]
    });
    fixture = TestBed.createComponent(BucketControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
