import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloDetailComponent } from './hello-detail.component';

describe('HelloDetailComponent', () => {
  let component: HelloDetailComponent;
  let fixture: ComponentFixture<HelloDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
