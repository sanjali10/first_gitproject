import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloDeviceDetailComponent } from './hello-device-detail.component';

describe('HelloDeviceDetailComponent', () => {
  let component: HelloDeviceDetailComponent;
  let fixture: ComponentFixture<HelloDeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloDeviceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
